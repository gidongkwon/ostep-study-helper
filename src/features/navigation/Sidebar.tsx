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
  const { getIconBgClasses } = useColorMapper();
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

  const handleKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSection(sectionId);
    }
  };

  const location = useLocation();

  const renderChapter = (chapter: Chapter) => {
    const chapterProgress = progress[chapter.id];
    const isSelected = location.pathname === `/chapters/${chapter.id}`;
    const isCompleted = chapterProgress?.status === "completed";
    const isInProgress = chapterProgress?.status === "in-progress";

    return (
      <Link
        key={chapter.id}
        to="/chapters/$chapterId"
        params={{ chapterId: chapter.id }}
        className={`sidebar-chapter-link flex items-center px-3 py-1.5 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
          isSelected
            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
        }`}
        aria-current={isSelected ? "page" : undefined}
      >
        <div className="flex items-center space-x-3 w-full">
          {isLab(chapter) ? (
            <div className="relative flex-shrink-0">
              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                isSelected 
                  ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200" 
                  : isCompleted
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500"
                    : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500"
              }`}>
                <Beaker className="w-3 h-3" />
              </div>
              {(isCompleted || isInProgress) && (
                <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
                  isCompleted ? "bg-green-500" : "bg-yellow-500"
                }`} />
              )}
            </div>
          ) : (
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isCompleted
                ? "bg-green-500"
                : isInProgress
                  ? "bg-yellow-500"
                  : isSelected
                    ? "bg-blue-400 dark:bg-blue-500"
                    : "bg-slate-300 dark:bg-slate-600"
            }`} />
          )}
          <span className={`text-sm font-medium truncate ${
            isCompleted ? "line-through opacity-75" : ""
          }`}>
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
      title: t("sections.filesystem", "File System"),
      chapters: getChaptersBySection("filesystem"),
      icon: <Folder className="w-4 h-4" />,
      color: "indigo" as SectionColor,
    },
  ];

  return (
    <aside className="w-full sm:w-72 h-full lg:border-r lg:border-slate-200 lg:dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 mt-9 lg:mt-0">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {/* Dashboard Button */}
        <Link
          to="/"
          className={`sidebar-dashboard-link flex items-center px-3 py-2 mb-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
            location.pathname === "/"
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 shadow-sm border border-blue-200 dark:border-blue-700"
              : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          <span className="font-medium">{t("sidebar.dashboard")}</span>
        </Link>

        <div className="space-y-1">
          {sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);
            const progress = getSectionProgress(section.chapters);

            return (
              <div key={section.id}>
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  onKeyDown={(e) => handleKeyDown(e, section.id)}
                  className="sidebar-section-button w-full flex items-center justify-between px-3 py-3 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  aria-expanded={!isCollapsed}
                  aria-controls={`section-${section.id}`}
                  aria-label={`${section.title} section, ${progress.completed} of ${progress.total} chapters completed, ${progress.percentage}% progress`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${getIconBgClasses(section.color)}`}>
                      {React.cloneElement(section.icon, { className: "w-3.5 h-3.5 text-white" })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {section.title}
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-2">
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                      {progress.percentage > 0 && (
                        <div className="mt-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              progress.percentage === 100 
                                ? "bg-green-500" 
                                : "bg-blue-600"
                            }`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isCollapsed ? "" : "rotate-90"}`}
                  />
                </button>

                {/* Chapter List */}
                {!isCollapsed && (
                  <div className="ml-3 mt-1 space-y-1" id={`section-${section.id}`}>
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
