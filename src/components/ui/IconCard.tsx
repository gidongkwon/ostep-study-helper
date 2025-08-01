import { type JSX, type ReactNode } from "react";

interface IconCardProps {
  icon: JSX.Element;
  title: string;
  description?: string;
  color?: string;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function IconCard({
  icon,
  title,
  description,
  color = "blue",
  href,
  onClick,
  children,
  className = "",
  hoverable = true,
}: IconCardProps) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700/50",
    green:
      "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700/50",
    purple:
      "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700/50",
    yellow:
      "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700/50",
    red: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700/50",
    indigo:
      "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700/50",
  };

  const iconColorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
    indigo: "bg-indigo-600",
  };

  const textColorClasses = {
    blue: "text-blue-800 dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-blue-100",
    green:
      "text-green-800 dark:text-green-200 group-hover:text-green-900 dark:group-hover:text-green-100",
    purple:
      "text-purple-800 dark:text-purple-200 group-hover:text-purple-900 dark:group-hover:text-purple-100",
    yellow:
      "text-yellow-800 dark:text-yellow-200 group-hover:text-yellow-900 dark:group-hover:text-yellow-100",
    red: "text-red-800 dark:text-red-200 group-hover:text-red-900 dark:group-hover:text-red-100",
    indigo:
      "text-indigo-800 dark:text-indigo-200 group-hover:text-indigo-900 dark:group-hover:text-indigo-100",
  };

  const baseClasses = `group block p-6 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl border ${
    hoverable
      ? "hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      : ""
  } ${className}`;

  const content = (
    <>
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 ${iconColorClasses[color as keyof typeof iconColorClasses]} rounded-xl flex items-center justify-center shadow-lg ${
            hoverable ? "group-hover:shadow-xl transition-all duration-200" : ""
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3
            className={`font-semibold ${textColorClasses[color as keyof typeof textColorClasses]} text-lg`}
          >
            {title}
          </h3>
          {description && (
            <p
              className={`text-xs mt-0.5 ${
                color === "blue"
                  ? "text-blue-600 dark:text-blue-300"
                  : color === "green"
                    ? "text-green-600 dark:text-green-300"
                    : color === "purple"
                      ? "text-purple-600 dark:text-purple-300"
                      : color === "yellow"
                        ? "text-yellow-600 dark:text-yellow-300"
                        : color === "red"
                          ? "text-red-600 dark:text-red-300"
                          : "text-indigo-600 dark:text-indigo-300"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {content}
      </button>
    );
  }

  return (
    <div className={baseClasses.replace("group block", "block")}>{content}</div>
  );
}
