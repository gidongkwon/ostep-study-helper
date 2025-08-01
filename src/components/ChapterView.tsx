import { type JSX } from "react";
import { useTranslation } from "react-i18next";
import type { Chapter, ProgressStatus } from "../types";
import { useStudyProgress } from "../contexts/StudyProgressContext";

interface ChapterViewProps {
  chapter: Chapter;
}

export function ChapterView({ chapter }: ChapterViewProps) {
  const { t } = useTranslation();
  const { getChapterProgress, updateChapterStatus } = useStudyProgress();
  const progress = getChapterProgress(chapter.id);

  const handleStatusChange = (status: ProgressStatus) => {
    updateChapterStatus(chapter.id, status);
  };

  const statusButtons: {
    status: ProgressStatus;
    label: string;
    color: string;
    icon: JSX.Element;
    description: string;
  }[] = [
    {
      status: "not-started",
      label: t("chapterView.status.notStarted"),
      color: "gray",
      description: t("chapterView.status.notStartedDesc"),
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      status: "in-progress",
      label: t("chapterView.status.inProgress"),
      color: "yellow",
      description: t("chapterView.status.inProgressDesc"),
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      status: "completed",
      label: t("chapterView.status.completed"),
      color: "green",
      description: t("chapterView.status.completedDesc"),
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const getProgressPercentage = () => {
    switch (progress?.status) {
      case "completed":
        return 100;
      case "in-progress":
        return 50;
      default:
        return 0;
    }
  };

  const currentStatus = progress?.status || "not-started";

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="card card-elevated p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                  {t("chapterView.chapter")} {chapter.order}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-muted">
                    {t("chapterView.ostepCurriculum")}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {chapter.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {getProgressPercentage()}%
                  </span>
                </div>
                <div
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium ${
                    currentStatus === "completed"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : currentStatus === "in-progress"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {
                    statusButtons.find((btn) => btn.status === currentStatus)
                      ?.icon
                  }
                  <span>
                    {
                      statusButtons.find((btn) => btn.status === currentStatus)
                        ?.label
                    }
                  </span>
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
                          ? `border-${color}-300 dark:border-${color}-600 bg-${color}-50 dark:bg-${color}-900/20 shadow-md`
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                      style={
                        isActive
                          ? {
                              borderColor:
                                color === "green"
                                  ? "#86efac"
                                  : color === "yellow"
                                    ? "#fde68a"
                                    : "#d1d5db",
                              backgroundColor:
                                color === "green"
                                  ? "#f0fdf4"
                                  : color === "yellow"
                                    ? "#fefce8"
                                    : "#f9fafb",
                              ...(document.documentElement.classList.contains(
                                "dark",
                              ) && {
                                borderColor:
                                  color === "green"
                                    ? "#166534"
                                    : color === "yellow"
                                      ? "#b45309"
                                      : "#374151",
                                backgroundColor:
                                  color === "green"
                                    ? "#14532d20"
                                    : color === "yellow"
                                      ? "#78350f20"
                                      : "#1f293720",
                              }),
                            }
                          : {}
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isActive
                              ? color === "green"
                                ? "bg-green-500 text-white"
                                : color === "yellow"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-gray-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          <div className="w-3 h-3">{icon}</div>
                        </div>
                        <span
                          className={`font-medium text-sm ${
                            isActive
                              ? color === "green"
                                ? "text-green-700 dark:text-green-300"
                                : color === "yellow"
                                  ? "text-yellow-700 dark:text-yellow-300"
                                  : "text-gray-700 dark:text-gray-300"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title">{t("chapterView.lectureMaterials")}</h2>
          <div className="mb-6">
            <a
              href={chapter.lectureSlide}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 3H8a1 1 0 00-1 1v16a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 group-hover:text-purple-900 dark:group-hover:text-purple-100 text-lg">
                    {t("chapterView.lectureSlides")}
                  </h3>
                  <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                    {t("chapterView.lectureSlidesDesc")}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title">
            {t("chapterView.textbookResources")}
          </h2>
          {chapter.pdfs.length > 0 ? (
            <div className="space-y-4">
              {chapter.pdfs.map((pdf, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {pdf.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href={pdf.englishPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-blue-100">
                            {t("chapterView.englishPdf")}
                          </h4>
                          <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
                            {t("chapterView.originalContent")}
                          </p>
                        </div>
                      </div>
                    </a>

                    <a
                      href={pdf.koreanPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800 dark:text-green-200 group-hover:text-green-900 dark:group-hover:text-green-100">
                            {t("chapterView.koreanPdf")}
                          </h4>
                          <p className="text-xs text-green-600 dark:text-green-300 mt-0.5">
                            {t("chapterView.translatedContent")}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center border border-gray-200 dark:border-gray-700 rounded-xl">
              <svg
                className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                {t("chapterView.noReadingMaterials")}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {t("chapterView.noOstepChapters")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
