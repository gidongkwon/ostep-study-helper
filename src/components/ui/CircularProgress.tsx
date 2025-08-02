interface CircularProgressProps {
  percentage: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  percentage,
  size = "md",
  color = "blue",
  showLabel = true,
  className = "",
}: CircularProgressProps) {
  const sizeConfig = {
    sm: {
      radius: 16,
      strokeWidth: 3,
      containerSize: "w-10 h-10",
      fontSize: "text-xs",
    },
    md: {
      radius: 24,
      strokeWidth: 4,
      containerSize: "w-16 h-16",
      fontSize: "text-sm",
    },
    lg: {
      radius: 32,
      strokeWidth: 5,
      containerSize: "w-20 h-20",
      fontSize: "text-lg",
    },
    xl: {
      radius: 40,
      strokeWidth: 6,
      containerSize: "w-24 h-24",
      fontSize: "text-xl",
    },
  };

  const config = sizeConfig[size as keyof typeof sizeConfig];
  const circumference = 2 * Math.PI * config.radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    purple: "stroke-purple-500",
    orange: "stroke-orange-500",
    red: "stroke-red-500",
    indigo: "stroke-indigo-500",
  };

  return (
    <div className={`relative ${config.containerSize} ${className}`}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox={`0 0 ${(config.radius + config.strokeWidth + 2) * 2} ${(config.radius + config.strokeWidth + 2) * 2}`}
      >
        <circle
          cx={config.radius + config.strokeWidth + 2}
          cy={config.radius + config.strokeWidth + 2}
          r={config.radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={config.radius + config.strokeWidth + 2}
          cy={config.radius + config.strokeWidth + 2}
          r={config.radius}
          strokeWidth={config.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-700 ease-out ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}
        />
      </svg>
      {showLabel && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${config.fontSize} font-semibold text-gray-900 dark:text-white`}
        >
          {percentage}%
        </div>
      )}
    </div>
  );
}
