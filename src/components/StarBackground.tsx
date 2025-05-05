
import React, { useEffect, useRef } from 'react';

interface StarBackgroundProps {
  className?: string;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Create stars
    const starCount = Math.floor((containerWidth * containerHeight) / 2000);
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 3;
      
      // Random animation delay
      const animationDelay = Math.random() * 5;
      
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${animationDelay}s`;
      
      // Add the animation class
      star.classList.add('animate-stars');
      
      container.appendChild(star);
    }
  }, []);
  
  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden ${className || ''}`}></div>
  );
};

export default StarBackground;
