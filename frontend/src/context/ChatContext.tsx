
import React, { useState, ReactNode, useRef, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { ChatContext, ChatContextType, Message } from "./ChatContextDefinition";

interface WSMessage {
  text: string;
  sender: string;
}

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [participantCount, setParticipantCount] = useState<number>(0);

  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    // Use environment variable if available, otherwise fallback to local development URL
    const wsUrl = import.meta.env.VITE_WS_URL || 
      `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.hostname}:8080`;
    ws.current = new WebSocket(wsUrl);
    
    ws.current.onopen = () => {
      reconnectAttempts.current = 0;
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

    ws.current.onmessage = (event) => {
      try {
        const data: WSMessage = JSON.parse(event.data);

        if (data.text === '__TYPING__' && data.sender !== username) {
          setTypingUsers(prev => {
            if (!prev.includes(data.sender)) {
              return [...prev, data.sender];
            }
            return prev;
          });

          setTimeout(() => {
            setTypingUsers(prev => prev.filter(user => user !== data.sender));
          }, 3000);

          return;
        }

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

    ws.current.onerror = () => {
      toast.error("Connection error. Please try again.");
    };

    ws.current.onclose = () => {
      if (isConnected && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        setTimeout(() => {
          toast.info("Reconnecting...");
          connectWebSocket();
        }, 2000 * reconnectAttempts.current);
      } else if (reconnectAttempts.current >= maxReconnectAttempts) {
        toast.error("Could not reconnect. Please try again later.");
        setIsConnected(false);
      }
    };
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || !isConnected) return;

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

  const joinRoom = () => {
    if (!username || !roomId) return;
    connectWebSocket();
    setIsConnected(true);
  };

  const leaveRoom = () => {
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


