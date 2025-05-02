
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Message } from './Message';

export const MessageList: React.FC = () => {
  const { users, activeChat, getMessagesForChat } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get messages for the current active chat
  const displayMessages = getMessagesForChat(activeChat);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

  // Find users who are typing (excluding the current user)
  const typingUsers = users.filter(user => user.isTyping).map(user => user.name);
  
  // Get the active chat user for header display
  const activeChatUser = activeChat ? users.find(u => u.id === activeChat) : null;
  
  return (
    <div className="flex flex-col flex-1">
      {activeChatUser && (
        <div className="border-b p-4 flex items-center gap-3">
          <img 
            src={activeChatUser.avatar} 
            alt={activeChatUser.name} 
            className="w-10 h-10 rounded-full" 
          />
          <div>
            <h2 className="font-medium">{activeChatUser.name}</h2>
            <p className="text-xs text-muted-foreground">{
              activeChatUser.status === 'online' 
                ? 'Online' 
                : activeChatUser.status === 'busy'
                  ? 'Busy'
                  : 'Away'
            }</p>
          </div>
        </div>
      )}
    
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {displayMessages.map((message) => {
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
    </div>
  );
};
