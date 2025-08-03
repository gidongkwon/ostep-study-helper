import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { getChaptersBySection } from "../data/curriculum";
import { useStudyProgress } from "../contexts/StudyProgressContext";
import { useTranslation } from "react-i18next";
import type { Chapter } from "../types";
import { isLab } from "../types";
import {
  BarChart3,
  ChevronRight,
  Lightbulb,
  Clock,
  FileText,
  Copy,
  Lock,
  Folder,
  Beaker,
  Check,
} from "lucide-react";
import { StatusIndicator } from "./ui/StatusIndicator";
import { useColorMapper, type SectionColor } from "../hooks/useColorMapper";
import { useSectionProgress } from "../hooks/useSectionProgress";

export function Sidebar() {
  const { progress } = useStudyProgress();
  const { t } = useTranslation();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(),
  );
  const { getIconBgClasses, getColorClasses } = useColorMapper();
  const getSectionProgress = useSectionProgress(progress);

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const location = useLocation();

  const renderChapter = (chapter: Chapter) => {
    const chapterProgress = progress[chapter.id];
    const isSelected = location.pathname === `/chapters/${chapter.id}`;

    return (
      <Link
        key={chapter.id}
        to="/chapters/$chapterId"
        params={{ chapterId: chapter.id }}
        className={`block w-full text-left p-2 min-h-[44px] rounded-xl transition-all duration-200 group focus-ring animate-scale-in ${
          isLab(chapter)
            ? chapterProgress?.status === "completed"
              ? "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
              : "border-2 border-dashed border-amber-300 dark:border-amber-600 hover:border-amber-400 dark:hover:border-amber-500"
            : "border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
        } ${
          isSelected
            ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700 shadow-sm"
            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
        }`}
      >
        <div className="flex items-center space-x-3">
          {isLab(chapter) ? (
            <div className="relative">
              <Beaker
                className={`w-5 h-5 ${
                  chapterProgress?.status === "completed"
                    ? "text-green-600 dark:text-green-400"
                    : chapterProgress?.status === "in-progress"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : isSelected
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                }`}
              />
              {chapterProgress?.status === "completed" && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <Check className="w-2 h-2 text-white" strokeWidth={3} />
                </div>
              )}
              {chapterProgress?.status === "in-progress" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </div>
          ) : (
            <StatusIndicator
              status={
                chapterProgress?.status as
                  | "completed"
                  | "in-progress"
                  | "not-started"
                  | undefined
              }
              variant="badge"
              size="sm"
            />
          )}
          <p
            className={`text-sm font-medium truncate ${
              isSelected
                ? "text-blue-900 dark:text-blue-100"
                : "text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white"
            }`}
          >
            {chapter.title}
          </p>
        </div>
      </Link>
    );
  };

  const sections = [
    {
      id: "lab1",
      title: "H.1",
      chapters: getChaptersBySection("lab1"),
      icon: <Lightbulb className="w-4 h-4" />,
      color: "blue" as SectionColor,
    },
    {
      id: "lab2",
      title: "H.2",
      chapters: getChaptersBySection("lab2"),
      icon: <Clock className="w-4 h-4" />,
      color: "purple" as SectionColor,
    },
    {
      id: "lab3",
      title: "H.3",
      chapters: getChaptersBySection("lab3"),
      icon: <FileText className="w-4 h-4" />,
      color: "green" as SectionColor,
    },
    {
      id: "lab4",
      title: "H.4",
      chapters: getChaptersBySection("lab4"),
      icon: <Copy className="w-4 h-4" />,
      color: "orange" as SectionColor,
    },
    {
      id: "lab5",
      title: "H.5",
      chapters: getChaptersBySection("lab5"),
      icon: <Lock className="w-4 h-4" />,
      color: "red" as SectionColor,
    },
    {
      id: "filesystem",
      title: "File System",
      chapters: getChaptersBySection("filesystem"),
      icon: <Folder className="w-4 h-4" />,
      color: "indigo" as SectionColor,
    },
  ];

  return (
    <aside className="w-full sm:w-80 h-full lg:border-r lg:border-gray-200/50 lg:dark:border-gray-700/50 flex flex-col backdrop-blur-sm mt-9 lg:mt-0">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Dashboard Button */}
        <div className="card animate-slide-in hover-lift">
          <Link
            to="/"
            className={`block w-full p-4 min-h-[44px] text-left transition-colors rounded-xl focus-ring ${
              location.pathname === "/"
                ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 shadow-sm"
                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      location.pathname === "/"
                        ? "text-blue-900 dark:text-blue-100"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {t("sidebar.dashboard")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("sidebar.overallProgressOverview")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-3">
          {sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);
            const progress = getSectionProgress(section.chapters);
            console.log(section);

            return (
              <div
                key={section.id}
                className="card animate-slide-in hover-lift"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 min-h-[44px] text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-xl focus-ring"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-1.5 rounded-lg ${getIconBgClasses(section.color)}`}
                      >
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {t("sidebar.sectionProgress", {
                            completed: progress.completed,
                            total: progress.total,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {progress.percentage}%
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCollapsed ? "" : "rotate-90"}`}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${getColorClasses(section.color)}`}
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                </button>

                {!isCollapsed && (
                  <div className="px-2 pb-2 space-y-2">
                    {section.chapters.map(renderChapter)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
