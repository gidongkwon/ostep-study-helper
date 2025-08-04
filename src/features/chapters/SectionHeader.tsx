import { type ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  statusBadge?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  statusBadge,
  icon,
  children,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex-1 ${className}`}>
      {statusBadge && (
        <div className="flex items-center space-x-3 mb-2">
          {statusBadge}
        </div>
      )}
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}
