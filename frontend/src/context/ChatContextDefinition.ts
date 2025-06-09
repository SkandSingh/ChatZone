import { createContext } from "react";

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type: "user" | "other" | "system";
}

export interface ChatContextType {
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

export const ChatContext = createContext<ChatContextType | undefined>(undefined);
