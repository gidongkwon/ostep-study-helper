interface SectionBadgeProps {
  text: string;
  color?: "blue" | "yellow" | "gray" | "green" | "purple" | "red" | "orange" | "indigo";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SectionBadge({
  text,
  color = "blue",
  size = "md",
  className = "",
}: SectionBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
    gray: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200",
    green: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
    red: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
    >
      {text}
    </span>
  );
}
