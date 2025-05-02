
import React from 'react';

interface EmojiReactionProps {
  emoji: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export const EmojiReaction: React.FC<EmojiReactionProps> = ({ 
  emoji, 
  count,
  isActive,
  onClick 
}) => {
  return (
    <button 
      className={`emoji-reaction ${isActive ? 'emoji-reaction-active' : ''}`}
      onClick={onClick}
    >
      <span className="mr-1">{emoji}</span>
      <span>{count}</span>
    </button>
  );
};
