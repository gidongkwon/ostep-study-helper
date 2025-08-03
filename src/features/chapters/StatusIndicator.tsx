import { Check, Clock, Circle, type LucideIcon } from "lucide-react";

interface StatusIndicatorProps {
  status: "completed" | "in-progress" | "not-started" | undefined;
  size?: "sm" | "md" | "lg";
  variant?: "dot" | "badge";
  className?: string;
}

type StatusConfig = {
  icon: LucideIcon;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  strokeWidth: number;
};

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

  const statusConfigs: Record<string, StatusConfig> = {
    completed: {
      icon: Check,
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-300 dark:border-green-700",
      iconColor: "text-green-600 dark:text-green-400",
      strokeWidth: 3,
    },
    "in-progress": {
      icon: Clock,
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      borderColor: "border-yellow-300 dark:border-yellow-700",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      strokeWidth: 2.5,
    },
    "not-started": {
      icon: Circle,
      bgColor: "bg-gray-100 dark:bg-gray-800",
      borderColor: "border-gray-300 dark:border-gray-600",
      iconColor: "text-gray-400 dark:text-gray-500",
      strokeWidth: 2,
    },
  };

  const config = statusConfigs[status || "not-started"];
  const Icon = config.icon;
  const badgeClasses = variant === "badge" ? "shadow-lg border-2" : "";

  return (
    <div
      className={`${sizeClasses[size]} shrink-0 rounded-full ${config.bgColor} ${config.borderColor} flex items-center justify-center ${badgeClasses} ${className}`}
    >
      <Icon
        className={`${iconSizeClasses[size]} ${config.iconColor}`}
        strokeWidth={config.strokeWidth}
      />
    </div>
  );
}
