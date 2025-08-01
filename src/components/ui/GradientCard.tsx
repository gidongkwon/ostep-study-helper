import { type ReactNode } from "react";

interface GradientCardProps {
  children: ReactNode;
  from?: string;
  to?: string;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export function GradientCard({
  children,
  from = "blue-50",
  to = "blue-100",
  className = "",
  padding = "md",
}: GradientCardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-gradient-to-br from-${from} to-${to} dark:from-${from.replace("-50", "-900/20").replace("-100", "-800/20")} dark:to-${to.replace("-50", "-900/20").replace("-100", "-800/20")} rounded-xl ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
