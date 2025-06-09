import { useContext } from "react";
import { ChatContext, ChatContextType } from "../context/ChatContextDefinition";

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
