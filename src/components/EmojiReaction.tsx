
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
      className={`inline-flex items-center justify-center px-2 py-1 text-xs rounded-full transition-colors ${
        isActive 
          ? 'bg-primary/20 text-primary hover:bg-primary/30' 
          : 'bg-secondary hover:bg-secondary/80'
      }`}
      onClick={onClick}
      aria-label={`React with ${emoji}`}
    >
      <span className="mr-1">{emoji}</span>
      <span>{count}</span>
    </button>
  );
};
