
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

export default function AssignmentComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput.length === 0) return;
    
    setMessages((prev) => [...prev, trimmedInput]);
    setInput('');
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    
    // Show typing indicator when user is typing
    if (e.target.value.length > 0 && !isTyping) {
      setIsTyping(true);
    } else if (e.target.value.length === 0 && isTyping) {
      setIsTyping(false);
    }
  };

  // Handle clear button
  const handleClear = () => {
    setMessages([]);
    setInput('');
    setIsTyping(false);
    inputRef.current?.focus();
  };

  // Auto scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-center mb-4">Simple Chat</h1>
      
      <div className="border border-gray-300 rounded-lg p-4 min-h-[200px] mb-4 bg-gray-50 max-h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className="p-2 bg-blue-100 mb-2 rounded"
            >
              {msg}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <div className="mb-2 text-sm text-gray-600">
          User is typing...
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="flex-1 p-3 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          onClick={handleSend}
          disabled={input.trim().length === 0}
          variant="default"
        >
          Send
        </Button>
        <Button
          onClick={handleClear}
          disabled={messages.length === 0}
          variant="destructive"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
