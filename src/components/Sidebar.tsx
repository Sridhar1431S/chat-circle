
import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { UserStatus } from './UserStatus';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';

interface SidebarProps {
  onChatSelect?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const { users, currentUser, activeChat, setActiveChat } = useChatContext();

  // Get only online users except the current user
  const onlineUsers = users.filter(user => 
    user.id !== currentUser?.id && user.status === 'online'
  );

  const handleUserClick = (userId: string) => {
    setActiveChat(userId);
    
    if (onChatSelect) {
      onChatSelect();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 bg-primary/10">
        <h2 className="font-bold text-lg mb-4">Chat Circle</h2>
        {currentUser && (
          <div className="flex items-center gap-3 py-2">
            <div className="relative">
              <Avatar>
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background bg-green-500`}></div>
            </div>
            <div>
              <div className="font-medium">{currentUser.name}</div>
              <UserStatus />
            </div>
          </div>
        )}
      </div>
      
      {/* Search */}
      <div className="px-4 py-2 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            className="w-full bg-secondary/50 pl-9 pr-3 py-2 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search online users"
          />
        </div>
      </div>
      
      {/* Online users list */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="font-medium text-sm px-4 py-2 text-muted-foreground">Online Users</h3>
        <div className="space-y-1 p-2">
          {onlineUsers.length > 0 ? (
            onlineUsers.map((user) => (
              <button 
                key={user.id}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-secondary transition-colors text-left ${activeChat === user.id ? 'bg-secondary/80' : ''}`}
                onClick={() => handleUserClick(user.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background bg-green-500"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm flex justify-between">
                    <span className="truncate">{user.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user.statusMessage || 'Online'}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No users online at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
