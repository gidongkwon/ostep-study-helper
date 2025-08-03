import { type JSX } from "react";
import type { ProgressStatus } from "../../types";

interface StatusDisplayProps {
  status: ProgressStatus;
  label: string;
  icon: JSX.Element;
  size?: "sm" | "md";
  className?: string;
}

export function StatusDisplay({
  status,
  label,
  icon,
  size = "md",
  className = "",
}: StatusDisplayProps) {
  const sizeClasses = {
    sm: {
      container: "px-2 py-1 text-sm",
      icon: "space-x-1",
    },
    md: {
      container: "px-2 py-1 text-sm",
      icon: "space-x-1",
    },
  };

  const statusClasses = {
    completed:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    "in-progress":
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    "not-started":
      "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
  };

  return (
    <div
      className={`inline-flex items-center ${sizeClasses[size].icon} ${sizeClasses[size].container} rounded-md font-medium ${statusClasses[status]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
