
import React from "react";
import Auth from "@/components/Auth";
import ChatRoom from "@/components/ChatRoom";
import { ChatProvider, useChat } from "@/context/ChatContext";

const ChatApp: React.FC = () => {
  const { isConnected } = useChat();
  
  return (
    <div className="min-h-screen bg-chatzone-dark">
      {isConnected ? <ChatRoom /> : <Auth />}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
};

export default Index;
