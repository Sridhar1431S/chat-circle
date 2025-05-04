
import React from 'react';
import { Sidebar } from './Sidebar';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ChatProvider } from '../context/ChatContext';
import { BackgroundAnimation } from './BackgroundAnimation';
import { useIsMobile } from '../hooks/use-mobile';

export const ChatApp: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <ChatProvider>
      <BackgroundAnimation />
      <div className={`flex ${isMobile ? 'flex-col' : 'h-screen'} bg-background/80 backdrop-blur-sm relative`}>
        <div className={isMobile ? 'h-[30vh] min-h-[200px] overflow-auto' : 'h-screen w-72'}>
          <Sidebar />
        </div>
        <div className={`flex-1 flex flex-col ${isMobile ? 'h-[70vh]' : 'h-screen'}`}>
          <MessageList />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  );
};
