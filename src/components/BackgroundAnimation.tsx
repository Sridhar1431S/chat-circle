
import React, { useEffect, useState } from 'react';

interface HeartProps {
  id: number;
}

const Heart: React.FC<HeartProps> = ({ id }) => {
  const randomLeft = React.useMemo(() => Math.random() * 100, []);
  const randomDelay = React.useMemo(() => Math.random() * 15, []);
  const randomSize = React.useMemo(() => Math.random() * 0.5 + 0.5, []);
  
  return (
    <div 
      className="floating-heart"
      style={{
        left: `${randomLeft}%`,
        animationDelay: `${randomDelay}s`,
        fontSize: `${24 * randomSize}px`
      }}
    >
      {id % 3 === 0 ? '❤️' : id % 3 === 1 ? '💕' : '💘'}
    </div>
  );
};

export const BackgroundAnimation: React.FC = () => {
  const [hearts, setHearts] = useState<number[]>([]);
  
  useEffect(() => {
    // Create 15 hearts
    setHearts(Array.from({ length: 15 }, (_, i) => i));
    
    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeartId = prev.length > 0 ? Math.max(...prev) + 1 : 0;
        return [...prev, newHeartId];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="neon-background">
      {/* Neon glows */}
      <div className="neon-glow"></div>
      <div className="neon-glow"></div>
      <div className="neon-glow"></div>
      
      {/* Hearts */}
      {hearts.map(id => (
        <Heart key={id} id={id} />
      ))}
    </div>
  );
};
