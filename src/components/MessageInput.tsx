
import React, { useState, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Send, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { availableReactions } from '../data/mockData';

export const MessageInput: React.FC = () => {
  const [messageText, setMessageText] = useState('');
  const { activeChat, sendMessage, setTyping } = useChatContext();
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Reset message text when changing chats
  useEffect(() => {
    setMessageText('');
    setTyping(false);
  }, [activeChat, setTyping]);

  // Handle typing indicator with debounce
  const handleTyping = (text: string) => {
    setMessageText(text);
    
    // Indicate typing has started
    if (text.length > 0) {
      setTyping(true);
    }

    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to clear typing indicator after 1.5 seconds of no typing
    const newTimeout = setTimeout(() => {
      if (text.length > 0) {
        setTyping(false);
      }
    }, 1500);

    setTypingTimeout(newTimeout);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && activeChat) {
      sendMessage(messageText);
      setMessageText('');
      setTyping(false);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageText((current) => current + emoji);
    // Focus back on the input after selecting emoji
    document.getElementById('message-input')?.focus();
  };

  return (
    <form 
      onSubmit={handleSendMessage} 
      className="border-t p-2 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
    >
      <Popover>
        <PopoverTrigger asChild>
          <button 
            type="button" 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            disabled={!activeChat}
          >
            <Smile size={20} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" side="top" align="start">
          <div className="grid grid-cols-8 gap-1">
            {availableReactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="p-1.5 hover:bg-secondary rounded-sm transition-colors"
                type="button"
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <input
        id="message-input"
        className="flex-1 py-2 px-4 bg-secondary rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder={activeChat ? "Type a message..." : "Select a chat to start messaging..."}
        value={messageText}
        onChange={(e) => handleTyping(e.target.value)}
        disabled={!activeChat}
      />
      <button 
        type="submit"
        className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={!activeChat || !messageText.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
};
