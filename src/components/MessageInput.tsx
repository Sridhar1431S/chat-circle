
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Send, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { availableReactions } from '../data/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const MessageInput: React.FC = () => {
  const [messageText, setMessageText] = useState('');
  const { activeChat, sendMessage, setTyping } = useChatContext();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessageText('');
    setTyping(false);
    isTypingRef.current = false;

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [activeChat, setTyping]);

  const handleTyping = useCallback((text: string) => {
    setMessageText(text);

    if (text.length > 0 && !isTypingRef.current) {
      isTypingRef.current = true;
      setTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      setTyping(false);
      typingTimeoutRef.current = null;
    }, 1500);
  }, [setTyping]);

  const handleSendMessage = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedMessage = messageText.trim();
    if (trimmedMessage) {
      sendMessage(trimmedMessage);
      setMessageText('');
      isTypingRef.current = false;
      setTyping(false);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      inputRef.current?.focus();
    }
  }, [messageText, sendMessage, setTyping]);

  const handleEmojiSelect = useCallback((emoji: string) => {
    setMessageText((current) => current + emoji);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <form 
      onSubmit={handleSendMessage} 
      className="border-t p-2 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            type="button" 
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          >
            <Smile size={20} />
          </Button>
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
      <Input
        ref={inputRef}
        id="message-input"
        className="flex-1 py-2 px-4 bg-secondary rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Type a message..."
        value={messageText}
        onChange={(e) => handleTyping(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <Button 
        type="submit"
        size="icon"
        className="bg-primary text-white rounded-full hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={!messageText.trim()}
      >
        <Send size={20} />
      </Button>
    </form>
  );
};
