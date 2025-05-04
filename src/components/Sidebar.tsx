
import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { UserStatus } from './UserStatus';

export const Sidebar: React.FC = () => {
  const { users, currentUser, activeChat, setActiveChat } = useChatContext();

  // Get all online users except the current user
  const onlineUsers = users.filter(user => 
    user.id !== currentUser?.id && user.status !== 'offline'
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'online':
        return 'status-online';
      case 'busy':
        return 'status-busy';
      case 'away':
        return 'status-away';
      default:
        return 'bg-gray-300';
    }
  };

  const handleUserClick = (userId: string) => {
    setActiveChat(userId === activeChat ? null : userId);
  };

  return (
    <div className="w-64 bg-sidebar border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg mb-4">Chat Circle</h2>
        {currentUser && (
          <div className="flex items-center gap-3 py-2">
            <div className="relative">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full"
              />
              <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${getStatusClass(currentUser.status)}`}></div>
            </div>
            <div>
              <div className="font-medium">{currentUser.name}</div>
              <UserStatus />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-3 px-3 pt-3">
          <h3 className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
            Online — {onlineUsers.length}
          </h3>
        </div>
        
        <div className="space-y-1">
          {onlineUsers.map((user) => (
            <button 
              key={user.id}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors text-left ${activeChat === user.id ? 'bg-secondary/80' : ''}`}
              onClick={() => handleUserClick(user.id)}
            >
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full" 
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusClass(user.status)}`}></div>
              </div>
              <div>
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                  {user.statusMessage}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
