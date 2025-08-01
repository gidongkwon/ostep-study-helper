import { type ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
}

export function PageContainer({
  children,
  className = "",
  maxWidth = "4xl",
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto ${className}`}>
        {children}
      </div>
    </div>
  );
}
