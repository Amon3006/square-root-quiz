import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-xl border border-slate-700 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;