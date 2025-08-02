interface StatCardProps {
  value: string | number;
  label: string;
  color?: "blue" | "yellow" | "gray" | "green" | "purple" | "red" | "orange" | "indigo";
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

  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      valueText: "text-blue-600 dark:text-blue-400",
      labelText: "text-blue-700 dark:text-blue-300",
    },
    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      valueText: "text-yellow-600 dark:text-yellow-400",
      labelText: "text-yellow-700 dark:text-yellow-300",
    },
    gray: {
      bg: "bg-gray-50 dark:bg-gray-900/20",
      valueText: "text-gray-600 dark:text-gray-400",
      labelText: "text-gray-700 dark:text-gray-300",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      valueText: "text-green-600 dark:text-green-400",
      labelText: "text-green-700 dark:text-green-300",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      valueText: "text-purple-600 dark:text-purple-400",
      labelText: "text-purple-700 dark:text-purple-300",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      valueText: "text-red-600 dark:text-red-400",
      labelText: "text-red-700 dark:text-red-300",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      valueText: "text-orange-600 dark:text-orange-400",
      labelText: "text-orange-700 dark:text-orange-300",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      valueText: "text-indigo-600 dark:text-indigo-400",
      labelText: "text-indigo-700 dark:text-indigo-300",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`text-center ${sizeClasses[size]} ${colors.bg} rounded-xl ${className}`}
    >
      <div
        className={`${textSizeClasses[size]} font-bold ${colors.valueText}`}
      >
        {value}
      </div>
      <div
        className={`${labelSizeClasses[size]} ${colors.labelText}`}
      >
        {label}
      </div>
    </div>
  );
}
