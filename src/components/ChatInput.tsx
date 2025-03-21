
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel relative mb-4 mx-auto max-w-3xl rounded-2xl p-2 shadow-sm transition-all duration-300 ease-in-out focus-within:shadow-md"
    >
      <div className="flex items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about nutrition..."
          className="max-h-[120px] min-h-[40px] w-full resize-none border-0 bg-transparent p-2 pr-10 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`absolute bottom-3 right-3 rounded-full p-1.5 transition-all duration-200 
          ${
            message.trim() && !isLoading
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <Send size={16} className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
