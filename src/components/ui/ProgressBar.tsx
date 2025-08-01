interface ProgressBarProps {
  percentage: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  percentage,
  color = "blue",
  size = "md",
  showLabel = true,
  className = "",
  animated = true,
}: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const barWidth = size === "sm" ? "w-20" : size === "md" ? "w-32" : "w-40";

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div
        className={`${barWidth} bg-gray-200 dark:bg-gray-700 rounded-full ${sizeClasses[size]} relative overflow-hidden`}
      >
        <div
          className={`bg-gradient-to-r from-${color}-400 to-${color}-500 ${sizeClasses[size]} rounded-full transition-all duration-700 ease-out ${
            animated ? "relative" : ""
          }`}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          )}
        </div>
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {percentage}%
        </span>
      )}
    </div>
  );
}
