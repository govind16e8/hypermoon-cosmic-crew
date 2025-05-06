
import React, { useEffect, useRef } from 'react';

const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    interface Star {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaChange: number;
    }
    
    const stars: Star[] = [];
    const nebulae: Array<{x: number, y: number, radius: number, color: string}> = [];
    
    // Generate star colors
    const starColors = ['#ffffff', '#fffaf0', '#f8f8ff', '#e6e6fa', '#b0c4de', '#add8e6'];
    
    // Create stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.8 + 0.2,
        alphaChange: Math.random() * 0.01
      });
    }
    
    // Create nebulae
    const nebulaColors = [
      'rgba(123, 97, 255, 0.05)',  // purple
      'rgba(0, 191, 255, 0.05)',   // deep sky blue
      'rgba(135, 206, 250, 0.05)', // light sky blue
      'rgba(221, 160, 221, 0.05)', // plum
      'rgba(255, 192, 203, 0.05)'  // pink
    ];
    
    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 100,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)]
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0c0117'); // Deep space purple
      gradient.addColorStop(1, '#1a0b2e'); // Midnight purple
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulae
      nebulae.forEach(nebula => {
        const grd = ctx.createRadialGradient(
          nebula.x, nebula.y, 0, 
          nebula.x, nebula.y, nebula.radius
        );
        grd.addColorStop(0, nebula.color.replace('0.05', '0.2'));
        grd.addColorStop(1, nebula.color.replace('0.05', '0'));
        
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
      
      // Draw and update stars
      stars.forEach(star => {
        // Update star position
        star.x += star.speedX;
        star.y += star.speedY;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Star twinkling
        star.alpha += star.alphaChange;
        if (star.alpha <= 0.2 || star.alpha >= 1) {
          star.alphaChange = -star.alphaChange;
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Add glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius + 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default DynamicBackground;
