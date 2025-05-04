
import React, { useEffect, useRef, useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Message } from './Message';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MessageListProps {
  onBackClick?: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({ onBackClick }) => {
  const { users, activeChat, getMessagesForChat, sendMessage, currentUser } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Bot response state
  const [isBotTyping, setIsBotTyping] = useState(false);
  
  // Get messages for the current active chat
  const displayMessages = getMessagesForChat(activeChat);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

  // Find user who is typing (excluding the current user)
  const typingUsers = users
    .filter(user => user.isTyping && user.id !== currentUser?.id && (activeChat ? user.id === activeChat : false))
    .map(user => user.name);
  
  // Get the active chat user for header display
  const activeChatUser = activeChat ? users.find(u => u.id === activeChat) : null;

  // Process new messages to trigger bot responses
  useEffect(() => {
    if (!activeChat || !currentUser) return;
    
    const lastMessage = displayMessages[displayMessages.length - 1];
    
    // Check if the last message is from the current user and needs a bot response
    if (lastMessage && 
        lastMessage.userId === currentUser.id && 
        !isBotTyping) {
      
      // Start bot typing indicator
      setIsBotTyping(true);
      
      // Generate a bot response after a delay
      const timer = setTimeout(() => {
        const botResponse = generateBotResponse(lastMessage.text);
        if (activeChat) {
          // Send message as the chat partner
          sendMessage(botResponse, activeChat, true);
        }
        setIsBotTyping(false);
      }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s
      
      return () => clearTimeout(timer);
    }
  }, [displayMessages, activeChat, currentUser]);
  
  // Simple chatbot response generation
  const generateBotResponse = (message: string) => {
    // Simple keyword-based responses
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi ') || message === 'hi') {
      return 'Hi there! How are you today? 👋';
    }
    else if (message.includes('how are you')) {
      return 'I\'m doing great, thanks for asking! How about you? 😊';
    }
    else if (message.includes('name')) {
      return 'My name is ChatBot! Nice to meet you! What can I help you with today?';
    }
    else if (message.includes('love') || message.includes('heart') || message.includes('❤️')) {
      return 'Love is in the air! 💖💕';
    }
    else if (message.includes('bye') || message.includes('goodbye')) {
      return 'Goodbye! Hope to chat again soon! 👋';
    }
    else if (message.includes('weather')) {
      return 'I don\'t have real-time weather data, but I hope it\'s sunny where you are! ☀️';
    }
    else if (message.includes('thank')) {
      return 'You\'re welcome! Anything else I can help with? 😊';
    }
    else if (message.includes('help')) {
      return 'I can chat about various topics! Just ask me something specific and I\'ll try to respond.';
    }
    else {
      // Generic responses for anything else
      const genericResponses = [
        'That\'s interesting! Tell me more.',
        'I understand. What else is on your mind?',
        'Great! Is there anything specific you\'d like to talk about?',
        'I see. How does that make you feel?',
        'Thanks for sharing that with me!',
        'That sounds fascinating.',
        'I appreciate you telling me about that.',
        'I\'d love to hear more about that.',
        'That\'s really cool!',
      ];
      return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
  };
    
  return (
    <div className="flex flex-col flex-1 bg-background/80">
      {activeChatUser ? (
        <div className="border-b p-2 flex items-center gap-3 bg-primary/10">
          {onBackClick && (
            <button 
              onClick={onBackClick}
              className="p-2 rounded-full hover:bg-secondary"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={activeChatUser.avatar} alt={activeChatUser.name} />
            <AvatarFallback>{activeChatUser.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="font-medium">{activeChatUser.name}</h2>
            <p className="text-xs text-muted-foreground">
              {typingUsers.length > 0 
                ? `${activeChatUser.name} is typing...` 
                : activeChatUser.status === 'online' 
                  ? 'Online' 
                  : activeChatUser.status === 'busy'
                    ? 'Busy'
                    : 'Away'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-2">Welcome to Chat Circle</p>
            <p className="text-sm">Select a conversation to start chatting</p>
          </div>
        </div>
      )}
      
      {activeChatUser && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {displayMessages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>No messages yet</p>
                <p className="text-sm mt-2">Say hello to start the conversation!</p>
              </div>
            ) : (
              displayMessages.map((message) => {
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
              })
            )}
            
            {/* Bot typing indicator */}
            {isBotTyping && activeChat && activeChatUser && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground ml-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={activeChatUser.avatar} alt={activeChatUser.name} />
                  <AvatarFallback>{activeChatUser.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <span>{activeChatUser.name} is typing...</span>
              </div>
            )}
            
            {/* Regular typing indicator */}
            {typingUsers.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground ml-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={activeChatUser?.avatar} alt={activeChatUser?.name} />
                  <AvatarFallback>{activeChatUser?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <span>
                  {typingUsers.join(', ')} is typing...
                </span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};
