interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatCard({
  value,
  label,
  color = "blue",
  size = "md",
  className = "",
}: StatCardProps) {
  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={`text-center ${sizeClasses[size]} bg-${color}-50 dark:bg-${color}-900/20 rounded-xl ${className}`}
    >
      <div
        className={`${textSizeClasses[size]} font-bold text-${color}-600 dark:text-${color}-400`}
      >
        {value}
      </div>
      <div
        className={`${labelSizeClasses[size]} text-${color}-700 dark:text-${color}-300`}
      >
        {label}
      </div>
    </div>
  );
}
