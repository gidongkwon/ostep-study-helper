import { Check } from "lucide-react";

interface StatusIndicatorProps {
  status: "completed" | "in-progress" | "not-started" | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusIndicator({
  status,
  size = "md",
  className = "",
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  switch (status) {
    case "completed":
      return (
        <div
          className={`${sizeClasses[size]} rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center ${className}`}
        >
          <Check
            className={`${iconSizeClasses[size]} text-green-600 dark:text-green-400`}
          />
        </div>
      );
    case "in-progress":
      return (
        <div
          className={`${sizeClasses[size]} rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center ${className}`}
        >
          <div
            className={`${size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-2.5 h-2.5"} rounded-full bg-yellow-500`}
          ></div>
        </div>
      );
    default:
      return (
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 dark:border-gray-600 ${className}`}
        ></div>
      );
  }
}
