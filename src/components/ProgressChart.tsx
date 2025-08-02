import { useStudyProgress } from "../contexts/StudyProgressContext";
import { getChaptersBySection } from "../data/curriculum";
import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";
import { StatCard } from "./ui/StatCard";
import { GradientCard } from "./ui/GradientCard";
import { ProgressLegend } from "./ui/ProgressLegend";
import { CircularProgress } from "./ui/CircularProgress";
import { type SectionColor } from "../hooks/useColorMapper";
import { useSectionProgress } from "../hooks/useSectionProgress";

export function ProgressChart() {
  const { stats, progress } = useStudyProgress();
  const { t } = useTranslation();
  const getSectionStats = useSectionProgress(progress);

  const sections = [
    {
      id: "lab1",
      title: `Lab #1: ${t("sections.lab1")}`,
      chapters: getChaptersBySection("lab1"),
      color: "blue" as SectionColor,
    },
    {
      id: "lab2",
      title: `Lab #2: ${t("sections.lab2")}`,
      chapters: getChaptersBySection("lab2"),
      color: "purple" as SectionColor,
    },
    {
      id: "lab3",
      title: `Lab #3: ${t("sections.lab3")}`,
      chapters: getChaptersBySection("lab3"),
      color: "green" as SectionColor,
    },
    {
      id: "lab4",
      title: `Lab #4: ${t("sections.lab4")}`,
      chapters: getChaptersBySection("lab4"),
      color: "orange" as SectionColor,
    },
    {
      id: "lab5",
      title: `Lab #5: ${t("sections.lab5")}`,
      chapters: getChaptersBySection("lab5"),
      color: "red" as SectionColor,
    },
    {
      id: "filesystem",
      title: t("sections.filesystem"),
      chapters: getChaptersBySection("filesystem"),
      color: "indigo" as SectionColor,
    },
  ];

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="section-title">{t("dashboard.title")}</h2>
        <p className="text-muted">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          value={stats.completed}
          label={t("common.completed")}
          color="blue"
        />
        <StatCard
          value={stats.inProgress}
          label={t("common.inProgress")}
          color="yellow"
        />
        <StatCard
          value={stats.notStarted}
          label={t("common.notStarted")}
          color="gray"
        />
        <StatCard
          value={`${stats.percentage}%`}
          label={t("common.overall")}
          color="green"
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("dashboard.progressBySection")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const sectionStats = getSectionStats(section.chapters);
            const completionRate = Math.round(
              (sectionStats.completed / sectionStats.total) * 100,
            );

            return (
              <div
                key={section.id}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4">
                  <CircularProgress
                    percentage={completionRate}
                    size="lg"
                    color={section.color}
                    showLabel={true}
                  />
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h4>

                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {sectionStats.completed}/{sectionStats.total} chapters
                </div>

                <ProgressLegend
                  completed={sectionStats.completed}
                  inProgress={sectionStats.inProgress}
                  notStarted={sectionStats.notStarted}
                  sectionColor={section.color}
                  size="sm"
                />
              </div>
            );
          })}
        </div>

        <GradientCard
          from="blue-50"
          to="green-50"
          className="border border-blue-200/50 dark:border-blue-700/50"
        >
          <div className="flex items-center space-x-4">
            <GradientCard
              from="blue-500"
              to="green-500"
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              padding="sm"
            >
              <Zap className="w-8 h-8 text-white" />
            </GradientCard>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {t("dashboard.keepUpTheWork")}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("dashboard.completedDescription", {
                  completed: stats.completed,
                  total: stats.total,
                })}
                {stats.completed > 0 &&
                  ` ${t("dashboard.percentageDescription", { percentage: stats.percentage })}`}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <CircularProgress
                percentage={stats.percentage}
                size="xl"
                color="blue"
                showLabel={true}
              />
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("common.complete")}
                </div>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
