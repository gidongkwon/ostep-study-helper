interface SectionBadgeProps {
  text: string;
  color?: string;
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

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium bg-${color}-100 dark:bg-${color}-900/30 text-${color}-800 dark:text-${color}-200 ${sizeClasses[size]} ${className}`}
    >
      {text}
    </span>
  );
}
