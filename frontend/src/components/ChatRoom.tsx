
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/hooks/use-chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";

const ChatRoom: React.FC = () => {
  const { username, roomId, messages, sendMessage, leaveRoom, typingUsers, sendTypingIndicator } = useChat();
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingIndicatorSentRef = useRef<boolean>(false);

  // Handle send message
  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText("");
      setIsTyping(false);
      typingIndicatorSentRef.current = false;
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Handle typing indicator
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);

    // Send typing indicator to other users
    if (!typingIndicatorSentRef.current) {
      sendTypingIndicator();
      typingIndicatorSentRef.current = true;

      // Reset the typing indicator flag after 3 seconds
      setTimeout(() => {
        typingIndicatorSentRef.current = false;
      }, 3000);
    }

    setIsTyping(true);

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator after 1.5 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clean up typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-chatzone-dark to-black">
      {/* Header */}
      <div className="glass-panel px-4 py-3 flex justify-between items-center border-b border-white/10">
        <button
          onClick={leaveRoom}
          className="p-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="font-medium gradient-text">Room: {roomId}</h2>
          <p className="text-xs text-white/60">Active chat room</p>
        </div>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} currentUser={username} />
        ))}

        {/* Show typing indicators for other users */}
        {typingUsers.length > 0 && (
          <div className="flex flex-col gap-1">
            {typingUsers.map(user => (
              <TypingIndicator key={user} username={user} />
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-3 m-3 rounded-full">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            value={messageText}
            onChange={handleTyping}
            placeholder="Type your message..."
            className="bg-white/5 border-transparent focus:border-transparent focus:ring-0 text-white placeholder:text-white/50"
          />
          <button
            type="submit"
            className="bg-[#9b87f5] p-2 rounded-full text-white hover:bg-opacity-80 transition-colors"
            disabled={!messageText.trim()}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
