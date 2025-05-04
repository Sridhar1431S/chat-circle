import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface LoveParticleProps {
  id: number;
  x: number;
  y: number;
}

const LoveParticle: React.FC<LoveParticleProps> = ({ id, x, y }) => {
  const randomSize = React.useMemo(() => Math.random() * 10 + 5, []);
  const randomOpacity = React.useMemo(() => Math.random() * 0.3 + 0.1, []);
  const randomDuration = React.useMemo(() => Math.random() * 3 + 2, []);
  const randomRotation = React.useMemo(() => Math.random() * 360, []);
  
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        animation: `float-up ${randomDuration}s linear forwards`,
        opacity: randomOpacity,
      }}
    >
      <Heart 
        size={randomSize} 
        className="text-pink-400" 
        style={{ transform: `rotate(${randomRotation}deg)` }}
        fill="currentColor"
      />
    </div>
  );
};

interface LoveParticlesProps {
  activeChat: string | null;
}

export const LoveParticles: React.FC<LoveParticlesProps> = ({ activeChat }) => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  // Create initial particles when a chat is activated
  useEffect(() => {
    if (activeChat) {
      // Create a burst of particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
      
      // Add more particles periodically
      const interval = setInterval(() => {
        setParticles(prev => {
          const newParticle = {
            id: Date.now(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          };
          return [...prev, newParticle];
        });
      }, 500);
      
      // Clean up old particles
      const cleanup = setInterval(() => {
        setParticles(prev => {
          // Keep only particles that are less than 3 seconds old
          const threshold = Date.now() - 3000;
          return prev.filter(p => p.id > threshold);
        });
      }, 1000);
      
      return () => {
        clearInterval(interval);
        clearInterval(cleanup);
      };
    } else {
      // Clear all particles when no chat is active
      setParticles([]);
    }
  }, [activeChat]);
  
  if (!activeChat || particles.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {particles.map(particle => (
        <LoveParticle 
          key={particle.id}
          id={particle.id}
          x={particle.x}
          y={particle.y}
        />
      ))}
    </div>
  );
};
