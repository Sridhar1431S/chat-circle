
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, Message, initialUsers, initialMessages, currentUserId } from "../data/mockData";

interface ChatContextType {
  currentUser: User | null;
  users: User[];
  messages: Message[];
  activeChat: string | null;
  setActiveChat: (userId: string | null) => void;
  sendMessage: (text: string, receiverId?: string, isBot?: boolean) => void;
  setTyping: (isTyping: boolean) => void;
  addReaction: (messageId: string, emoji: string) => void;
  setUserStatus: (status: 'online' | 'busy' | 'away' | 'offline', statusMessage: string) => void;
  getMessagesForChat: (userId: string | null) => Message[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  useEffect(() => {
    // Set the current user on mount
    const user = users.find(u => u.id === currentUserId);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const getMessagesForChat = (userId: string | null) => {
    if (!userId) return [];
    return messages.filter(m => 
      (m.userId === currentUser?.id && m.receiverId === userId) || 
      (m.userId === userId && m.receiverId === currentUser?.id)
    );
  };

  const sendMessage = (text: string, receiverId?: string, isBot?: boolean) => {
    if (!text.trim()) return;
    
    const sender = isBot ? activeChat : currentUser?.id;
    const receiver = isBot ? currentUser?.id : (receiverId || activeChat);
    
    if (!sender || !receiver) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      userId: sender,
      receiverId: receiver,
      text: text.trim(),
      timestamp: new Date(),
      reactions: []
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Reset typing indicator after sending message
    if (!isBot) {
      setTyping(false);
    }
  };

  const setTyping = (isTyping: boolean) => {
    if (!currentUser) return;
    
    setUsers(prev => 
      prev.map(user => 
        user.id === currentUser.id ? { ...user, isTyping } : user
      )
    );
  };

  const addReaction = (messageId: string, emoji: string) => {
    if (!currentUser) return;
    
    setMessages(prev => 
      prev.map(message => {
        if (message.id !== messageId) return message;

        // Find if this emoji reaction already exists
        const existingReaction = message.reactions.find(r => r.emoji === emoji);

        // If user already reacted with this emoji, remove their reaction
        if (existingReaction && existingReaction.userIds.includes(currentUser.id)) {
          const updatedUserIds = existingReaction.userIds.filter(id => id !== currentUser.id);
          
          if (updatedUserIds.length === 0) {
            // Remove the reaction entirely if no users are left
            return {
              ...message,
              reactions: message.reactions.filter(r => r.emoji !== emoji)
            };
          } else {
            // Update the reaction with the user removed
            return {
              ...message,
              reactions: message.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: updatedUserIds.length, userIds: updatedUserIds }
                  : r
              )
            };
          }
        } 
        
        // If user hasn't reacted with this emoji, add their reaction
        if (existingReaction) {
          // Add user to existing reaction
          return {
            ...message,
            reactions: message.reactions.map(r => 
              r.emoji === emoji 
                ? { 
                    ...r, 
                    count: r.count + 1, 
                    userIds: [...r.userIds, currentUser.id] 
                  }
                : r
            )
          };
        } else {
          // Create new reaction
          return {
            ...message,
            reactions: [
              ...message.reactions,
              { emoji, count: 1, userIds: [currentUser.id] }
            ]
          };
        }
      })
    );
  };

  const setUserStatus = (status: 'online' | 'busy' | 'away' | 'offline', statusMessage: string) => {
    if (!currentUser) return;
    
    const updatedUser = { 
      ...currentUser, 
      status,
      statusMessage 
    };
    
    setCurrentUser(updatedUser);
    
    setUsers(prev => 
      prev.map(user => 
        user.id === currentUser.id ? updatedUser : user
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        users,
        messages,
        activeChat,
        setActiveChat,
        sendMessage,
        setTyping,
        addReaction,
        setUserStatus,
        getMessagesForChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
