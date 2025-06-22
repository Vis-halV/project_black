import React from 'react';
import { cn } from '../lib/utils'; 

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-light tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2';

  const variants = {
    primary: 'bg-gray-950 text-gray-100 hover:bg-gray-900',
    secondary: 'border border-gray-200 bg-white text-gray-900 hover:bg-gray-100',
    ghost: 'text-gray-900 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
