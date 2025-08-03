import React from "react";
import { useStudyProgress } from "./StudyProgressContext";
import { useTranslation } from "react-i18next";
import { StatsGrid } from "./StatsGrid";
import { OverallProgressCard } from "./OverallProgressCard";
import { SectionProgressCard } from "./SectionProgressCard";
import { useSections } from "./useSections";

export const ProgressChart = React.memo(function ProgressChart() {
  const { stats, progress } = useStudyProgress();
  const { t } = useTranslation();
  const { sections } = useSections(progress);

  return (
    <div className="card p-4 sm:p-6">
      <h2 className="section-title mb-6">{t("dashboard.title")}</h2>

      <StatsGrid stats={stats} className="mb-8" />

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("dashboard.progressBySection")}
        </h3>

        <OverallProgressCard stats={stats} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sections.map((section) => (
            <SectionProgressCard
              key={section.id}
              title={section.title}
              color={section.color}
              sectionStats={section.sectionStats}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
