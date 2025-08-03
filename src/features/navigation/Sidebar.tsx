import React, { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { getChaptersBySection } from "../chapters/curriculum";
import { useStudyProgress } from "../progress/StudyProgressContext";
import { useTranslation } from "react-i18next";
import type { Chapter } from "../../types";
import { isLab } from "../../types";
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
} from "lucide-react";
import { useColorMapper, type SectionColor } from "../theme/useColorMapper";
import { useSectionProgress } from "../progress/useSectionProgress";

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
        className={`group flex items-center px-1 py-0.5 rounded-sm transition-all duration-200 focus-ring-primary ${
          isLab(chapter)
            ? chapterProgress?.status === "completed"
              ? "text-green-700 dark:text-green-400"
              : "text-amber-700 dark:text-amber-400"
            : ""
        } ${
          isSelected
            ? "bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100"
            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`}
      >
        <div className="flex items-center space-x-1.5 w-full">
          {isLab(chapter) ? (
            <div className="relative flex-shrink-0">
              <Beaker className="w-3 h-3" />
              {chapterProgress?.status === "completed" && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full" />
              )}
              {chapterProgress?.status === "in-progress" && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-500 rounded-full" />
              )}
            </div>
          ) : (
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              chapterProgress?.status === "completed"
                ? "bg-green-500"
                : chapterProgress?.status === "in-progress"
                  ? "bg-yellow-500"
                  : "bg-gray-300 dark:bg-gray-600"
            }`} />
          )}
          <span className="text-base font-medium truncate">
            {chapter.title}
          </span>
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
    <aside className="w-full sm:w-72 h-full lg:border-r lg:border-gray-200/50 lg:dark:border-gray-800/50 flex flex-col backdrop-blur-sm mt-9 lg:mt-0">
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {/* Dashboard Button */}
        <Link
          to="/"
          className={`group flex items-center px-2 py-1.5 rounded-md transition-all-smooth hover:bg-gray-100 dark:hover:bg-gray-800/50 focus-ring-primary ${
            location.pathname === "/"
              ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          <div className={`w-5 h-5 rounded-sm flex items-center justify-center mr-2 ${
            location.pathname === "/"
              ? "bg-primary-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          }`}>
            <BarChart3 className="w-3 h-3" />
          </div>
          <span className="text-lg font-medium">{t("sidebar.dashboard")}</span>
        </Link>

        <div className="space-y-0.5">
          {sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);
            const progress = getSectionProgress(section.chapters);

            return (
              <div key={section.id} className="group">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all-smooth focus-ring-primary"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center ${getIconBgClasses(section.color)}`}>
                      {React.cloneElement(section.icon, { className: "w-2.5 h-2.5" })}
                    </div>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </span>
                    <span className="text-base text-gray-500 dark:text-gray-400">
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-mono text-gray-500 dark:text-gray-400 w-10 text-right">
                      {progress.percentage}%
                    </span>
                    <ChevronRight
                      className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isCollapsed ? "" : "rotate-90"}`}
                    />
                  </div>
                </button>

                {/* Ultra-thin Progress Bar */}
                <div className="mx-2 mt-0.5">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-0.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getColorClasses(section.color)}`}
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Chapter List */}
                {!isCollapsed && (
                  <div className="ml-6 mt-1 space-y-0.5 border-l border-gray-200 dark:border-gray-700 pl-2">
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
