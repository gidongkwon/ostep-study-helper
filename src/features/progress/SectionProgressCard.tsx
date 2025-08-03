import React, { useMemo } from "react";
import { type SectionColor } from "../theme/useColorMapper";
import { type SectionProgress } from "./useSectionProgress";
import { WaveBackground } from "../theme/WaveBackground";
import { CircularProgress } from "./CircularProgress";
import { ProgressLegend } from "./ProgressLegend";

interface SectionProgressCardProps {
  title: string;
  color: SectionColor;
  sectionStats: SectionProgress;
  className?: string;
}

export const SectionProgressCard = React.memo(function SectionProgressCard({
  title,
  color,
  sectionStats,
  className = "",
}: SectionProgressCardProps) {
  const completionRate = useMemo(
    () => Math.round((sectionStats.completed / sectionStats.total) * 100),
    [sectionStats.completed, sectionStats.total],
  );

  const progressText = useMemo(
    () => `${sectionStats.completed}/${sectionStats.total} chapters`,
    [sectionStats.completed, sectionStats.total],
  );

  return (
    <div
      className={`
        relative bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        rounded-xl flex flex-col items-start
        shadow-sm overflow-hidden
        ${className}
      `}
      role="region"
      aria-label={`${title} progress: ${completionRate}% complete`}
    >
      <WaveBackground color={color} percentage={completionRate} />

      <div className="relative z-10 w-fit p-2 sm:p-4 flex flex-col h-full">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h4>

        <div
          className="text-sm text-gray-600 dark:text-gray-400 mb-3"
          aria-label={`Progress: ${progressText}`}
        >
          {progressText}
        </div>

        <div className="flex gap-4 w-fit items-center">
          <CircularProgress
            percentage={completionRate}
            size="lg"
            color={color}
            showLabel={true}
            aria-label={`${title} completion: ${completionRate}%`}
          />
          <ProgressLegend
            completed={sectionStats.completed}
            inProgress={sectionStats.inProgress}
            notStarted={sectionStats.notStarted}
            sectionColor={color}
            size="sm"
            className="h-fit"
          />
        </div>
      </div>
    </div>
  );
});
