
import React from "react";
import { Message } from "../context/ChatContextDefinition";
import { formatDistance } from "date-fns";

interface MessageBubbleProps {
  message: Message;
  currentUser: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, currentUser }) => {
  const { text, sender, timestamp, type } = message;

  const getMessageTime = () => {
    return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
  };

  if (type === "system") {
    return (
      <div className="flex justify-center w-full my-2">
        <div className="message-bubble message-system py-1 px-4 max-w-fit rounded-full">
          {text}
        </div>
      </div>
    );
  }

  const isUserMessage = sender === currentUser;

  return (
    <div className={`flex mb-3 ${isUserMessage ? "justify-end" : "justify-start"}`}>
      <div className={`message-bubble ${isUserMessage ? "message-user" : "message-other"}`}>
        {!isUserMessage && <p className="text-xs text-white/70 font-medium mb-1">{sender}</p>}
        <p className="text-sm">{text}</p>
        <p className="text-xs text-white/50 text-right mt-1">{getMessageTime()}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
