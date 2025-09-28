import React from 'react';

type ButtonVariant = 'primary' | 'option';
type ButtonState = 'default' | 'correct' | 'incorrect' | 'disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  state?: ButtonState;
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', state = 'default', ...props }) => {
  
  const baseClasses = "w-full font-bold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white",
    option: "text-xl text-white bg-slate-700/50 border-2 border-slate-600 hover:bg-slate-700 hover:border-cyan-500 disabled:opacity-50"
  };
  
  const stateClasses: { [key in ButtonState]: string } = {
    default: "",
    correct: "bg-green-500/80 border-green-400 text-white transform scale-105",
    incorrect: "bg-red-500/80 border-red-400 text-white transform scale-95 opacity-80",
    disabled: "opacity-40 bg-slate-700/30 border-slate-700",
  };

  const appliedClasses = variant === 'option' ? `${variantClasses.option} ${stateClasses[state]}` : variantClasses.primary;

  return (
    <button
      className={`${baseClasses} ${appliedClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;