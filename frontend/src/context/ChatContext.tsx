
import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

// Define message type
export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type: "user" | "other" | "system";
}

// Define WebSocket message types
interface WSMessage {
  text: string;
  sender: string;
}

// Define chat context type
interface ChatContextType {
  username: string;
  roomId: string;
  messages: Message[];
  isConnected: boolean;
  typingUsers: string[];
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
  sendMessage: (text: string) => void;
  joinRoom: () => void;
  leaveRoom: () => void;
  sendTypingIndicator: () => void;
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [participantCount, setParticipantCount] = useState<number>(0);

  // WebSocket reference
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 5;

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Handle WebSocket connection
  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    // Create WebSocket connection using the proxy
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    ws.current = new WebSocket(wsUrl);

    // Connection opened
    ws.current.onopen = () => {
      console.log('WebSocket connection established');
      reconnectAttempts.current = 0;

      // Send join message
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          type: 'join',
          payload: {
            roomId,
            username
          }
        }));
      }
    };

    // Listen for messages
    ws.current.onmessage = (event) => {
      try {
        const data: WSMessage = JSON.parse(event.data);

        // Handle typing indicator
        if (data.text === '__TYPING__' && data.sender !== username) {
          setTypingUsers(prev => {
            if (!prev.includes(data.sender)) {
              return [...prev, data.sender];
            }
            return prev;
          });

          // Remove typing indicator after 3 seconds
          setTimeout(() => {
            setTypingUsers(prev => prev.filter(user => user !== data.sender));
          }, 3000);

          return;
        }

        // Handle regular messages
        const newMessage: Message = {
          id: Date.now().toString(),
          text: data.text,
          sender: data.sender,
          timestamp: new Date(),
          type: data.sender === username ? "user" : data.sender === "System" ? "system" : "other"
        };

        setMessages(prev => [...prev, newMessage]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    // Handle errors
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error("Connection error. Please try again.");
    };

    // Handle connection close
    ws.current.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);

      // Attempt to reconnect if not intentionally closed
      if (isConnected && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        setTimeout(() => {
          toast.info("Reconnecting...");
          connectWebSocket();
        }, 2000 * reconnectAttempts.current); // Exponential backoff
      } else if (reconnectAttempts.current >= maxReconnectAttempts) {
        toast.error("Could not reconnect. Please try again later.");
        setIsConnected(false);
      }
    };
  };

  // Send a message
  const sendMessage = (text: string) => {
    if (!text.trim() || !isConnected) return;

    // We don't add the message to local state immediately anymore
    // because the server will echo it back to us

    // Send message through WebSocket
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'chat',
        payload: {
          message: text
        }
      }));
    } else {
      toast.error("Connection lost. Trying to reconnect...");
      connectWebSocket();
    }
  };

  // Send typing indicator
  const sendTypingIndicator = () => {
    if (!isConnected) return;

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'chat',
        payload: {
          message: '__TYPING__'
        }
      }));
    }
  };

  // Join a room
  const joinRoom = () => {
    if (!username || !roomId) return;

    // Connect to WebSocket
    connectWebSocket();
    setIsConnected(true);
  };

  // Leave the room
  const leaveRoom = () => {
    // Close WebSocket connection
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }

    setIsConnected(false);
    setMessages([]);
    setTypingUsers([]);
  };

  const value = {
    username,
    roomId,
    messages,
    isConnected,
    typingUsers,
    setUsername,
    setRoomId,
    sendMessage,
    joinRoom,
    leaveRoom,
    sendTypingIndicator
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook for using the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
