import { type JSX } from "react";

interface IconButtonProps {
  icon: JSX.Element;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export function IconButton({
  icon,
  onClick,
  variant = "secondary",
  size = "md",
  className = "",
  ariaLabel,
  disabled = false,
}: IconButtonProps) {
  const sizeClasses = {
    sm: "p-1.5 w-7 h-7",
    md: "p-2.5 w-10 h-10",
    lg: "p-3 w-12 h-12",
  };

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",
    secondary:
      "bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-gray-600/50",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon}
    </button>
  );
}
