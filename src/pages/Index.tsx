
import React from 'react';
import { ChatApp } from '../components/ChatApp';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Chat Application</h1>
        </div>
      </div>
      <ChatApp />
    </div>
  );
};

export default Index;
