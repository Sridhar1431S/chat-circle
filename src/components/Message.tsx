
import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Message as MessageType, User, availableReactions } from '../data/mockData';
import { EmojiReaction } from './EmojiReaction';

interface MessageProps {
  message: MessageType;
  sender: User;
}

export const Message: React.FC<MessageProps> = ({ message, sender }) => {
  const { currentUser, addReaction } = useChatContext();
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  const isOwnMessage = currentUser?.id === message.userId;
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handleReactionClick = (emoji: string) => {
    addReaction(message.id, emoji);
    setShowReactionPicker(false);
  };

  return (
    <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%]">
        {!isOwnMessage && (
          <div className="flex items-center mb-1">
            <img 
              src={sender.avatar} 
              alt={sender.name} 
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{sender.name}</span>
          </div>
        )}
        
        <div className="relative group">
          <div className={`message-bubble ${isOwnMessage ? 'message-bubble-sent' : 'message-bubble-received'}`}>
            {message.text}
            <div className="text-xs opacity-70 mt-1">
              {formattedTime}
            </div>
          </div>
          
          {/* Reaction button */}
          <button 
            onClick={() => setShowReactionPicker(!showReactionPicker)}
            className={`absolute ${isOwnMessage ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded-full`}
          >
            <span className="text-lg">😊</span>
          </button>
          
          {/* Reaction picker */}
          {showReactionPicker && (
            <div className={`absolute ${isOwnMessage ? 'right-full mr-2' : 'left-full ml-2'} top-0 bg-background shadow-md rounded-lg p-2 z-10 flex`}>
              {availableReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReactionClick(emoji)}
                  className="p-1 hover:bg-secondary rounded-full transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Display reactions */}
        {message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 ml-1">
            {message.reactions.map((reaction) => (
              <EmojiReaction 
                key={reaction.emoji}
                emoji={reaction.emoji}
                count={reaction.count}
                isActive={currentUser ? reaction.userIds.includes(currentUser.id) : false}
                onClick={() => addReaction(message.id, reaction.emoji)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
