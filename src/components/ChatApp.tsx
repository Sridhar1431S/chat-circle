
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ChatProvider } from '../context/ChatContext';
import { BackgroundAnimation } from './BackgroundAnimation';
import { useIsMobile } from '../hooks/use-mobile';

export const ChatApp: React.FC = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen bg-background">
        <div className="flex flex-1 overflow-hidden relative">
          {/* Background only shows when in a chat */}
          <div className="absolute inset-0 z-0">
            <BackgroundAnimation />
          </div>
          
          {/* Sidebar */}
          <div className={`${showSidebar ? 'block' : 'hidden'} ${isMobile ? 'fixed inset-0 z-50 bg-background' : 'w-72 border-r'}`}>
            <Sidebar onChatSelect={isMobile ? () => setShowSidebar(false) : undefined} />
          </div>
          
          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${isMobile && showSidebar ? 'hidden' : 'block'} relative z-10`}>
            <MessageList onBackClick={isMobile ? () => setShowSidebar(true) : undefined} />
            <MessageInput />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};
