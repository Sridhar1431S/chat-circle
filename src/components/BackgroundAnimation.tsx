
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface ParticleProps {
  id: number;
}

const HeartParticle: React.FC<ParticleProps> = ({ id }) => {
  const randomLeft = React.useMemo(() => Math.random() * 100, []);
  const randomDelay = React.useMemo(() => Math.random() * 15, []);
  const randomSize = React.useMemo(() => Math.random() * 0.5 + 0.25, []); // Smaller size range
  const randomDuration = React.useMemo(() => Math.random() * 10 + 10, []); // Varied duration
  const randomOpacity = React.useMemo(() => Math.random() * 0.2 + 0.1, []); // Lower opacity
  
  const heartEmojis = ['❤️', '💕', '💘', '💓', '💗', '💖', '💞', '💝'];
  const emoji = React.useMemo(() => heartEmojis[id % heartEmojis.length], [id]);
  
  return (
    <div 
      className="floating-heart"
      style={{
        left: `${randomLeft}%`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        fontSize: `${16 * randomSize}px`, // Smaller base size
        opacity: randomOpacity
      }}
    >
      {emoji}
    </div>
  );
};

export const BackgroundAnimation: React.FC = () => {
  const [particles, setParticles] = useState<number[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Create initial particles - fewer on mobile
    const initialCount = isMobile ? 10 : 20;
    setParticles(Array.from({ length: initialCount }, (_, i) => i));
    
    // Add new particles periodically
    const interval = setInterval(() => {
      setParticles(prev => {
        // Cap the maximum number of particles
        if (prev.length > (isMobile ? 15 : 30)) {
          return [...prev.slice(1), prev[prev.length - 1] + 1];
        }
        const newParticleId = prev.length > 0 ? Math.max(...prev) + 1 : 0;
        return [...prev, newParticleId];
      });
    }, isMobile ? 4000 : 3000); // Slower generation on mobile
    
    return () => clearInterval(interval);
  }, [isMobile]);
  
  return (
    <div className="neon-background">
      {/* Neon glows - responsive sizing */}
      <div className={`neon-glow ${isMobile ? 'neon-glow-mobile' : ''}`}></div>
      <div className={`neon-glow ${isMobile ? 'neon-glow-mobile' : ''}`}></div>
      <div className={`neon-glow ${isMobile ? 'neon-glow-mobile' : ''}`}></div>
      
      {/* Heart particles */}
      {particles.map(id => (
        <HeartParticle key={id} id={id} />
      ))}
    </div>
  );
};
