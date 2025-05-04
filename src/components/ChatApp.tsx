
import React from 'react';
import { Sidebar } from './Sidebar';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ChatProvider } from '../context/ChatContext';
import { BackgroundAnimation } from './BackgroundAnimation';

export const ChatApp: React.FC = () => {
  return (
    <ChatProvider>
      <BackgroundAnimation />
      <div className="flex h-screen bg-background/80 backdrop-blur-sm">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <MessageList />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  );
};
