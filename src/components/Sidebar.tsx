
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
    // Always set the active chat when clicking a user
    setActiveChat(userId);
    
    // Call the onChatSelect callback if provided (for mobile view)
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
              <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background ${getStatusClass(currentUser.status)}`}></div>
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
            placeholder="Search or start new chat"
          />
        </div>
      </div>
      
      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          {onlineUsers.map((user) => (
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
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusClass(user.status)}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm flex justify-between">
                  <span className="truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">10:30 AM</span>
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user.statusMessage || 'Hey there! I am using Chat Circle.'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
