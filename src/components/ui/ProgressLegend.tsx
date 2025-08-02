import { useTranslation } from "react-i18next";
import { useColorMapper, type SectionColor } from "../../hooks/useColorMapper";

interface ProgressLegendProps {
  completed: number;
  inProgress: number;
  notStarted: number;
  sectionColor?: SectionColor;
  size?: "sm" | "md";
  className?: string;
}

export function ProgressLegend({
  completed,
  inProgress,
  notStarted,
  sectionColor,
  size = "md",
  className = "",
}: ProgressLegendProps) {
  const { t } = useTranslation();
  const { getColorClasses } = useColorMapper();

  const sizeClasses = {
    sm: "text-xs",
    md: "text-xs",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
  };

  const spacingClasses = {
    sm: "space-x-3",
    md: "space-x-4",
  };

  return (
    <div
      className={`flex items-center ${spacingClasses[size]} ${sizeClasses[size]} text-muted-foreground lg:flex-col ${className}`}
    >
      <div className="flex items-center space-x-1">
        <div
          className={`${dotSizeClasses[size]} rounded-full ${
            sectionColor ? getColorClasses(sectionColor) : "bg-green-500"
          }`}
        />
        <span>
          {completed} {t("common.completed").toLowerCase()}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <div className={`${dotSizeClasses[size]} rounded-full bg-yellow-400`} />
        <span>
          {inProgress} {t("common.inProgress").toLowerCase()}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <div className={`${dotSizeClasses[size]} rounded-full bg-gray-400`} />
        <span>
          {notStarted} {t("common.notStarted").toLowerCase()}
        </span>
      </div>
    </div>
  );
}
