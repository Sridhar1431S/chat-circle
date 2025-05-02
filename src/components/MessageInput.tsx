
import React, { useState, useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { availableReactions } from '../data/mockData';

export const MessageInput: React.FC = () => {
  const { sendMessage, setTyping } = useChatContext();
  const [message, setMessage] = useState('');
  const [typingTimeout, setTypingTimeoutRef] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle typing indicator
  useEffect(() => {
    if (message && message.length > 0) {
      setTyping(true);
      
      // Clear any existing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      // Set a new timeout
      const timeout = setTimeout(() => {
        setTyping(false);
      }, 3000); // Stop typing indicator after 3 seconds of inactivity
      
      setTypingTimeoutRef(timeout);
    } else {
      setTyping(false);
      
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    }
    
    // Cleanup
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [message, setTyping]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" align="start">
          <div className="grid grid-cols-5 gap-2">
            {availableReactions.map((emoji) => (
              <button
                key={emoji}
                className="p-2 text-xl hover:bg-secondary rounded-md transition-colors"
                onClick={() => insertEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        className="rounded-full"
      />
      
      <Button 
        onClick={handleSendMessage} 
        size="icon"
        className="rounded-full flex-shrink-0" 
        disabled={!message.trim()}
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};
