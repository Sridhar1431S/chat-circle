
import React, { useState, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Send } from 'lucide-react';

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

  return (
    <form 
      onSubmit={handleSendMessage} 
      className="border-t p-2 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
    >
      <input
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
