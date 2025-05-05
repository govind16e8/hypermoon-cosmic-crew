
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  className, 
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props 
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      className={cn(
        'glow-button bg-gradient-to-r from-cosmic-purple to-cosmic-pink font-orbitron tracking-wider',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GlowButton;
