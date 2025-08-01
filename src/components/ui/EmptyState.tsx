import { type JSX } from "react";

interface EmptyStateProps {
  icon: JSX.Element;
  title: string;
  description?: string;
  action?: JSX.Element;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-8 text-center border border-gray-200 dark:border-gray-700 rounded-xl ${className}`}
    >
      <div className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4">
        {icon}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">{title}</p>
      {description && (
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
