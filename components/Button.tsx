import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-sm font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm";
  
  const variants = {
    primary: "border-transparent text-bordeaux-950 bg-gold-500 hover:bg-gold-400 shadow-lg shadow-gold-500/10",
    outline: "border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-bordeaux-950",
    ghost: "border-transparent text-white/70 hover:text-white hover:bg-white/10"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};