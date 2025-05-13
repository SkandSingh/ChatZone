
import React from "react";

interface TypingIndicatorProps {
  username?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ username }) => {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-400 p-2 animate-fade-in">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-chatzone-purple animate-typing-dot-1"></div>
        <div className="w-2 h-2 rounded-full bg-chatzone-purple animate-typing-dot-2"></div>
        <div className="w-2 h-2 rounded-full bg-chatzone-purple animate-typing-dot-3"></div>
      </div>
      {username && <span className="ml-2">{username} is typing...</span>}
    </div>
  );
};

export default TypingIndicator;
