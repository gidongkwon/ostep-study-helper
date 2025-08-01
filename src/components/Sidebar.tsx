import { useState, useMemo } from "react";
import { getChaptersBySection } from "../data/curriculum";
import { useStudyProgress } from "../contexts/StudyProgressContext";
import type { Chapter } from "../types";
import { Check, Search, BarChart3, ChevronRight, Lightbulb, Clock, FileText, Copy, Lock, Folder, SearchX } from "lucide-react";

interface SidebarProps {
  selectedChapter: string | null;
  onChapterSelect: (chapterId: string) => void;
  viewMode?: "dashboard" | "chapters";
  onViewModeChange?: (mode: "dashboard" | "chapters") => void;
}

export function Sidebar({ selectedChapter, onChapterSelect, viewMode, onViewModeChange }: SidebarProps) {
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
            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
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
        className={`w-full text-left p-3 rounded-xl transition-all duration-200 group focus-ring animate-scale-in ${isSelected
          ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 shadow-sm"
          : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
          }`}
      >
        <div className="flex items-center space-x-3">
          {getStatusIcon(chapterProgress?.status)}
          <p
            className={`text-sm font-medium truncate ${isSelected
              ? "text-blue-900 dark:text-blue-100"
              : "text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white"
              }`}
          >
            {chapter.title}
          </p>
        </div>
      </button>
    );
  };

  const sections = [
    {
      id: "lab1",
      title: "Lab #1",
      chapters: getChaptersBySection("lab1"),
      icon: <Lightbulb className="w-4 h-4" />,
      color: "blue",
    },
    {
      id: "lab2",
      title: "Lab #2",
      chapters: getChaptersBySection("lab2"),
      icon: <Clock className="w-4 h-4" />,
      color: "purple",
    },
    {
      id: "lab3",
      title: "Lab #3",
      chapters: getChaptersBySection("lab3"),
      icon: <FileText className="w-4 h-4" />,
      color: "green",
    },
    {
      id: "lab4",
      title: "Lab #4",
      chapters: getChaptersBySection("lab4"),
      icon: <Copy className="w-4 h-4" />,
      color: "orange",
    },
    {
      id: "lab5",
      title: "Lab #5",
      chapters: getChaptersBySection("lab5"),
      icon: <Lock className="w-4 h-4" />,
      color: "red",
    },
    {
      id: "filesystem",
      title: "File System",
      chapters: getChaptersBySection("filesystem"),
      icon: <Folder className="w-4 h-4" />,
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Dashboard Button */}
        {onViewModeChange && (
          <div className="card animate-slide-in hover-lift">
            <button
              onClick={() => onViewModeChange("dashboard")}
              className={`w-full p-4 text-left transition-colors rounded-xl focus-ring ${viewMode === "dashboard"
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
                    <h3 className={`font-semibold ${viewMode === "dashboard"
                        ? "text-blue-900 dark:text-blue-100"
                        : "text-gray-900 dark:text-white"
                      }`}>
                      Dashboard
                    </h3>
                    <p className="text-xs text-muted">
                      Overall progress overview
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}

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
                        className={`p-1.5 rounded-lg ${section.color === "blue"
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
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCollapsed ? "" : "rotate-90"}`} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${section.color === "blue"
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
              <SearchX className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-muted">No chapters found</p>
            </div>
          )}
      </div>
    </aside>
  );
}
