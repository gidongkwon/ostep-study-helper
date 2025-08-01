import { createFileRoute } from "@tanstack/react-router";
import { ChapterView } from "../../components/ChapterView";
import { getChapterById } from "../../data/curriculum";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { BookOpen, Beaker, FileText, Target, Clock, Zap, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useStudyProgress } from "../../contexts/StudyProgressContext";
import type { Chapter, ProgressStatus } from "../../types";

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ChapterRoute,
  pendingComponent: LoadingSpinner,
});

function LabView({ chapter }: { chapter: Chapter }) {
  const { t } = useTranslation();
  const { getChapterProgress, updateChapterStatus } = useStudyProgress();
  const progress = getChapterProgress(chapter.id);

  const handleStatusChange = (status: ProgressStatus) => {
    updateChapterStatus(chapter.id, status);
  };

  const statusButtons = [
    {
      status: "not-started" as ProgressStatus,
      label: t("chapterView.status.notStarted", "Not Started"),
      color: "gray",
      description: t("chapterView.status.notStartedDesc", "Haven't started this lab yet"),
      icon: <Clock className="w-5 h-5" />,
    },
    {
      status: "in-progress" as ProgressStatus,
      label: t("chapterView.status.inProgress", "In Progress"),
      color: "yellow",
      description: t("chapterView.status.inProgressDesc", "Currently working on this lab"),
      icon: <Zap className="w-5 h-5" />,
    },
    {
      status: "completed" as ProgressStatus,
      label: t("chapterView.status.completed", "Completed"),
      color: "green",
      description: t("chapterView.status.completedDesc", "Finished this lab"),
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const currentStatus = progress?.status || "not-started";

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="card p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                  {chapter.section.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Beaker className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {chapter.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="card p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("chapterView.progressTracking", "Progress Tracking")}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("chapterView.currentStatus", "Current Status")}: <span className="font-medium capitalize">{currentStatus.replace("-", " ")}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {statusButtons.map(({ status, label, color, icon }) => {
                const isActive = currentStatus === status;
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      isActive
                        ? color === "gray"
                          ? "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/20 shadow-md"
                          : color === "yellow"
                          ? "border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 shadow-md"
                          : "border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`${
                        isActive
                          ? color === "gray"
                            ? "text-gray-600 dark:text-gray-400"
                            : color === "yellow"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-green-600 dark:text-green-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {icon}
                      </div>
                      <span className={`text-sm font-medium ${
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}>
                        {label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lab Content */}
        <div className="card p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("labs.objectives", "Learning Objectives")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t("labs.objectivesPlaceholder", "Lab objectives will be displayed here when content is added.")}
              </p>
            </div>
            
            <div className="card p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("labs.exercises", "Exercises")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t("labs.exercisesPlaceholder", "Lab exercises will be displayed here when content is added.")}
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <p className="text-center text-yellow-800 dark:text-yellow-200">
              {t(
                "labs.comingSoon",
                "Full lab content with interactive exercises, code examples, and resources will be available in a future update."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterRoute() {
  const { chapterId } = Route.useParams();
  const { t } = useTranslation();
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
        <div className="text-center">
          <BookOpen
            className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6"
            strokeWidth={1}
          />
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
            {t("chapter.notFound", "Chapter not found")}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {t(
              "chapter.invalidId",
              "The chapter ID '{{chapterId}}' does not exist.",
              { chapterId }
            )}
          </p>
        </div>
      </div>
    );
  }

  // If it's a lab chapter, show lab view instead
  if (chapter.isLab) {
    return <LabView chapter={chapter} />;
  }

  return <ChapterView chapter={chapter} />;
}