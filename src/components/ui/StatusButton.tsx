import { type JSX } from "react";
import type { ProgressStatus } from "../../types";

interface StatusButtonProps {
  status: ProgressStatus;
  label: string;
  color: string;
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
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        isActive
          ? `border-${color}-300 dark:border-${color}-600 bg-${color}-50 dark:bg-${color}-900/20 shadow-md`
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
      } ${className}`}
      style={
        isActive
          ? {
              borderColor:
                color === "green"
                  ? "#86efac"
                  : color === "yellow"
                    ? "#fde68a"
                    : "#d1d5db",
              backgroundColor:
                color === "green"
                  ? "#f0fdf4"
                  : color === "yellow"
                    ? "#fefce8"
                    : "#f9fafb",
              ...(document.documentElement.classList.contains("dark") && {
                borderColor:
                  color === "green"
                    ? "#166534"
                    : color === "yellow"
                      ? "#b45309"
                      : "#374151",
                backgroundColor:
                  color === "green"
                    ? "#14532d20"
                    : color === "yellow"
                      ? "#78350f20"
                      : "#1f293720",
              }),
            }
          : {}
      }
    >
      <div className="flex items-center space-x-2">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isActive
              ? color === "green"
                ? "bg-green-500 text-white"
                : color === "yellow"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          }`}
        >
          <div className="w-3 h-3">{icon}</div>
        </div>
        <span
          className={`font-medium text-sm ${
            isActive
              ? color === "green"
                ? "text-green-700 dark:text-green-300"
                : color === "yellow"
                  ? "text-yellow-700 dark:text-yellow-300"
                  : "text-gray-700 dark:text-gray-300"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
