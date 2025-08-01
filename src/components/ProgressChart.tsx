import { useStudyProgress } from "../contexts/StudyProgressContext";
import { getChaptersBySection } from "../data/curriculum";
import { useTranslation } from "react-i18next";

export function ProgressChart() {
  const { stats, progress } = useStudyProgress();
  const { t } = useTranslation();

  const sections = [
    {
      id: "lab1",
      title: `Lab #1: ${t("sections.lab1")}`,
      chapters: getChaptersBySection("lab1"),
      color: "blue",
    },
    {
      id: "lab2",
      title: `Lab #2: ${t("sections.lab2")}`,
      chapters: getChaptersBySection("lab2"),
      color: "purple",
    },
    {
      id: "lab3",
      title: `Lab #3: ${t("sections.lab3")}`,
      chapters: getChaptersBySection("lab3"),
      color: "green",
    },
    {
      id: "lab4",
      title: `Lab #4: ${t("sections.lab4")}`,
      chapters: getChaptersBySection("lab4"),
      color: "orange",
    },
    {
      id: "lab5",
      title: `Lab #5: ${t("sections.lab5")}`,
      chapters: getChaptersBySection("lab5"),
      color: "red",
    },
    {
      id: "filesystem",
      title: t("sections.filesystem"),
      chapters: getChaptersBySection("filesystem"),
      color: "indigo",
    },
  ];

  const getSectionStats = (chapters: { id: string }[]) => {
    const completed = chapters.filter(
      (ch) => progress[ch.id]?.status === "completed",
    ).length;
    const inProgress = chapters.filter(
      (ch) => progress[ch.id]?.status === "in-progress",
    ).length;
    const notStarted = chapters.length - completed - inProgress;

    return { completed, inProgress, notStarted, total: chapters.length };
  };

  const getColorClasses = (color: string) => {
    return color === "blue"
      ? "bg-blue-500"
      : color === "purple"
        ? "bg-purple-500"
        : color === "green"
          ? "bg-green-500"
          : color === "orange"
            ? "bg-orange-500"
            : color === "red"
              ? "bg-red-500"
              : color === "indigo"
                ? "bg-indigo-500"
                : "bg-gray-500";
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="section-title">{t("dashboard.title")}</h2>
        <p className="text-muted">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.completed}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            {t("common.completed")}
          </div>
        </div>
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.inProgress}
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            {t("common.inProgress")}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {stats.notStarted}
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {t("common.notStarted")}
          </div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.percentage}%
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            {t("common.overall")}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("dashboard.progressBySection")}
        </h3>

        <div className="space-y-4">
          {sections.map((section) => {
            const sectionStats = getSectionStats(section.chapters);
            const completionRate = Math.round(
              (sectionStats.completed / sectionStats.total) * 100,
            );

            return (
              <div
                key={section.id}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getColorClasses(section.color)}`}
                    ></div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h4>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {sectionStats.completed}/{sectionStats.total} (
                    {completionRate}%)
                  </div>
                </div>

                <div className="mb-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div
                        className={`${getColorClasses(section.color)} transition-all duration-500`}
                        style={{
                          width: `${(sectionStats.completed / sectionStats.total) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-yellow-400 transition-all duration-500"
                        style={{
                          width: `${(sectionStats.inProgress / sectionStats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full ${getColorClasses(section.color)}`}
                      ></div>
                      <span>
                        {sectionStats.completed}{" "}
                        {t("common.completed").toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <span>
                        {sectionStats.inProgress}{" "}
                        {t("common.inProgress").toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <span>
                        {sectionStats.notStarted}{" "}
                        {t("common.notStarted").toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
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
            <div className="text-right">
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text">
                {stats.percentage}%
              </div>
              <div className="text-xs text-muted">{t("common.complete")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
