import { useState, useMemo } from "react";
import { getChaptersBySection } from "../data/curriculum";
import { useStudyProgress } from "../contexts/StudyProgressContext";
import type { Chapter } from "../types";

interface SidebarProps {
  selectedChapter: string | null;
  onChapterSelect: (chapterId: string) => void;
}

export function Sidebar({ selectedChapter, onChapterSelect }: SidebarProps) {
  const { progress } = useStudyProgress();
  const [searchTerm, setSearchTerm] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(),
  );

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "completed":
        return (
          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-green-600 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "in-progress":
        return (
          <div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
        );
    }
  };

  const renderChapter = (chapter: Chapter) => {
    const chapterProgress = progress[chapter.id];
    const isSelected = selectedChapter === chapter.id;

    if (
      searchTerm &&
      !chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return null;
    }

    return (
      <button
        key={chapter.id}
        onClick={() => onChapterSelect(chapter.id)}
        className={`w-full text-left p-3 rounded-xl transition-all duration-200 group focus-ring animate-scale-in ${
          isSelected
            ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 shadow-sm"
            : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
        }`}
      >
        <div className="flex items-center space-x-3">
          {getStatusIcon(chapterProgress?.status)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                  isSelected
                    ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {chapter.order}
              </span>
            </div>
            <p
              className={`text-sm font-medium mt-1 truncate ${
                isSelected
                  ? "text-blue-900 dark:text-blue-100"
                  : "text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white"
              }`}
            >
              {chapter.title}
            </p>
          </div>
        </div>
      </button>
    );
  };

  const sections = [
    {
      id: "lab1",
      title: "Lab #1",
      chapters: getChaptersBySection("lab1"),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      color: "blue",
    },
    {
      id: "lab2",
      title: "Lab #2",
      chapters: getChaptersBySection("lab2"),
      icon: (
        <svg
          className="w-4 h-4"
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
      color: "purple",
    },
    {
      id: "lab3",
      title: "Lab #3",
      chapters: getChaptersBySection("lab3"),
      icon: (
        <svg
          className="w-4 h-4"
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
      ),
      color: "green",
    },
    {
      id: "lab4",
      title: "Lab #4",
      chapters: getChaptersBySection("lab4"),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "orange",
    },
    {
      id: "lab5",
      title: "Lab #5",
      chapters: getChaptersBySection("lab5"),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      color: "red",
    },
    {
      id: "filesystem",
      title: "File System",
      chapters: getChaptersBySection("filesystem"),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      color: "indigo",
    },
  ];

  const getSectionProgress = useMemo(() => {
    return (chapters: Chapter[]) => {
      const completed = chapters.filter(
        (ch) => progress[ch.id]?.status === "completed",
      ).length;
      return {
        completed,
        total: chapters.length,
        percentage: Math.round((completed / chapters.length) * 100),
      };
    };
  }, [progress]);

  return (
    <aside className="w-72 sm:w-80 h-full bg-gray-50/50 dark:bg-gray-900/50 border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h2 className="section-title">Study Progress</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-3">
          {sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);
            const progress = getSectionProgress(section.chapters);
            const filteredChapters = searchTerm
              ? section.chapters.filter((ch) =>
                  ch.title.toLowerCase().includes(searchTerm.toLowerCase()),
                )
              : section.chapters;

            if (searchTerm && filteredChapters.length === 0) return null;

            return (
              <div
                key={section.id}
                className="card animate-slide-in hover-lift"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-xl focus-ring"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          section.color === "blue"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : section.color === "purple"
                              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                              : section.color === "green"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                : section.color === "orange"
                                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                                  : section.color === "red"
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                    : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                        }`}
                      >
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        <p className="text-xs text-muted">
                          {progress.completed}/{progress.total} completed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {progress.percentage}%
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCollapsed ? "" : "rotate-90"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          section.color === "blue"
                            ? "bg-blue-500"
                            : section.color === "purple"
                              ? "bg-purple-500"
                              : section.color === "green"
                                ? "bg-green-500"
                                : section.color === "orange"
                                  ? "bg-orange-500"
                                  : section.color === "red"
                                    ? "bg-red-500"
                                    : "bg-indigo-500"
                        }`}
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                </button>

                {!isCollapsed && (
                  <div className="px-4 pb-4 space-y-2">
                    {(searchTerm ? filteredChapters : section.chapters).map(
                      renderChapter,
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {searchTerm &&
          sections.every(
            (section) =>
              !section.chapters.some((ch) =>
                ch.title.toLowerCase().includes(searchTerm.toLowerCase()),
              ),
          ) && (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 6.494A7.966 7.966 0 0112 6c-2.34 0-4.29 1.009-5.824 2.563"
                />
              </svg>
              <p className="mt-2 text-sm text-muted">No chapters found</p>
            </div>
          )}
      </div>
    </aside>
  );
}
