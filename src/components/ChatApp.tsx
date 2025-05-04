
import React from 'react';
import { Sidebar } from './Sidebar';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ChatProvider, useChatContext } from '../context/ChatContext';
import { BackgroundAnimation } from './BackgroundAnimation';
import { LoveParticles } from './LoveParticles';

// Create an inner component that can access the context
const ChatAppInner: React.FC = () => {
  const { activeChat } = useChatContext();
  
  return (
    <>
      <BackgroundAnimation />
      <LoveParticles activeChat={activeChat} />
      <div className="flex h-screen bg-background/80 backdrop-blur-sm">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <MessageList />
          <MessageInput />
        </div>
      </div>
    </>
  );
};

export const ChatApp: React.FC = () => {
  return (
    <ChatProvider>
      <ChatAppInner />
    </ChatProvider>
  );
};
