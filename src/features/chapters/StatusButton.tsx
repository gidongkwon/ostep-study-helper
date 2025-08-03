import { type JSX } from "react";
import type { ProgressStatus } from "../../types";

interface StatusButtonProps {
  status: ProgressStatus;
  label: string;
  color: "green" | "yellow" | "gray";
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function StatusButton({
  label,
  color,
  icon,
  isActive,
  onClick,
  className = "",
}: StatusButtonProps) {
  const colorClasses = {
    green: {
      active:
        "border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20",
      inactive:
        "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800",
      iconActive: "bg-green-500 text-white",
      iconInactive:
        "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
      textActive: "text-green-700 dark:text-green-300",
      textInactive: "text-gray-900 dark:text-white",
    },
    yellow: {
      active:
        "border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
      inactive:
        "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800",
      iconActive: "bg-yellow-500 text-white",
      iconInactive:
        "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
      textActive: "text-yellow-700 dark:text-yellow-300",
      textInactive: "text-gray-900 dark:text-white",
    },
    gray: {
      active:
        "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/20",
      inactive:
        "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800",
      iconActive: "bg-gray-500 text-white",
      iconInactive:
        "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
      textActive: "text-gray-700 dark:text-gray-300",
      textInactive: "text-gray-900 dark:text-white",
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        isActive ? `${colors.active} shadow-md` : colors.inactive
      } ${className}`}
    >
      <div className="flex items-center space-x-2">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isActive ? colors.iconActive : colors.iconInactive
          }`}
        >
          <div className="w-3 h-3">{icon}</div>
        </div>
        <span
          className={`font-medium text-sm ${
            isActive ? colors.textActive : colors.textInactive
          }`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
