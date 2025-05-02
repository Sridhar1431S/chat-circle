
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Message } from './Message';

export const MessageList: React.FC = () => {
  const { messages, users } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Find users who are typing (excluding the current user)
  const typingUsers = users.filter(user => user.isTyping).map(user => user.name);
  
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-1">
        {messages.map((message) => {
          const sender = users.find(u => u.id === message.userId) || {
            id: 'unknown',
            name: 'Unknown User',
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Unknown',
            status: 'offline' as const,
            statusMessage: '',
            isTyping: false
          };
          
          return (
            <Message 
              key={message.id} 
              message={message} 
              sender={sender}
            />
          );
        })}
        
        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground ml-2 mt-2">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
            <span>
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing...`
                : `${typingUsers.join(', ')} are typing...`
              }
            </span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
