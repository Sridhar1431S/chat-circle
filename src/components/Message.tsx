
import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Message as MessageType, User, availableReactions } from '../data/mockData';
import { EmojiReaction } from './EmojiReaction';
import { format } from 'date-fns';

interface MessageProps {
  message: MessageType;
  sender: User;
}

export const Message: React.FC<MessageProps> = ({ message, sender }) => {
  const { currentUser, addReaction } = useChatContext();
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  const isOwnMessage = currentUser?.id === message.userId;
  const formattedTime = format(new Date(message.timestamp), 'HH:mm');

  const handleReactionClick = (emoji: string) => {
    addReaction(message.id, emoji);
    setShowReactionPicker(false);
  };

  return (
    <div className={`flex mb-1 ${isOwnMessage ? 'justify-end' : 'justify-start'} relative`}>
      <div 
        className={`max-w-[80%] relative ${message.reactions.length > 0 ? 'mb-2' : ''}`} 
        onMouseEnter={() => setShowReactionPicker(true)}
        onMouseLeave={() => setShowReactionPicker(false)}
      >
        <div className={`message-bubble ${isOwnMessage ? 'message-bubble-sent' : 'message-bubble-received'}`}>
          {message.text}
          <div className="text-xs opacity-70 text-right -mb-0.5 mt-1 inline-flex ml-2 items-center">
            {formattedTime}
            {isOwnMessage && (
              <svg className="w-3 h-3 ml-1 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
              </svg>
            )}
          </div>
        </div>
        
        {/* Reaction button */}
        {showReactionPicker && (
          <div className={`absolute ${isOwnMessage ? 'right-full mr-2' : 'left-full ml-2'} top-0 bg-background shadow-md rounded-lg p-1.5 z-10 flex`}>
            {availableReactions.slice(0, 6).map((emoji) => (
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
        
        {/* Display reactions */}
        {message.reactions.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-0.5 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
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
