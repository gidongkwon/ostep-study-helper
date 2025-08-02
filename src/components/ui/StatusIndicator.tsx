import { Check, Clock, Circle } from "lucide-react";

interface StatusIndicatorProps {
  status: "completed" | "in-progress" | "not-started" | undefined;
  size?: "sm" | "md" | "lg";
  variant?: "dot" | "badge";
  className?: string;
}

export function StatusIndicator({
  status,
  size = "md",
  variant = "dot",
  className = "",
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: variant === "badge" ? "w-6 h-6" : "w-4 h-4",
    md: variant === "badge" ? "w-7 h-7" : "w-5 h-5",
    lg: variant === "badge" ? "w-8 h-8" : "w-6 h-6",
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const badgeClasses = variant === "badge" ? "shadow-lg border-2" : "";

  switch (status) {
    case "completed":
      return (
        <div
          className={`${sizeClasses[size]} rounded-full bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 flex items-center justify-center ${badgeClasses} ${className}`}
        >
          <Check
            className={`${iconSizeClasses[size]} text-green-600 dark:text-green-400`}
            strokeWidth={3}
          />
        </div>
      );
    case "in-progress":
      return (
        <div
          className={`${sizeClasses[size]} rounded-full bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 flex items-center justify-center ${badgeClasses} ${className}`}
        >
          <Clock
            className={`${iconSizeClasses[size]} text-yellow-600 dark:text-yellow-400`}
            strokeWidth={2.5}
          />
        </div>
      );
    default:
      return (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 flex items-center justify-center ${badgeClasses} ${className}`}
        >
          <Circle
            className={`${iconSizeClasses[size]} text-gray-400 dark:text-gray-500`}
            strokeWidth={2}
          />
        </div>
      );
  }
}
