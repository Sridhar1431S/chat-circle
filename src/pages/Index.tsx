
import React from 'react';
import { ChatApp } from '../components/ChatApp';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Chat Application</h1>
          <Link to="/assignment">
            <Button variant="secondary">Assignment Component</Button>
          </Link>
        </div>
      </div>
      <ChatApp />
    </div>
  );
};

export default Index;
