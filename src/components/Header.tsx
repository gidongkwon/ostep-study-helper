import { useTheme } from "../hooks/useTheme";
import { useStudyProgress } from "../contexts/StudyProgressContext";
import { ExportImport } from "./ExportImport";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Menu, BookOpen, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { stats } = useStudyProgress();
  const { t } = useTranslation();

  return (
    <header className="card-elevated bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  OSTEP Study Helper
                </h1>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  OSTEP
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-muted font-medium uppercase tracking-wide">
                  {t("header.overallProgress")}
                </div>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out relative"
                        style={{ width: `${stats.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[3rem]">
                      {stats.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-muted font-medium uppercase tracking-wide">
                  {t("common.chapters")}
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                  {stats.completed} / {stats.total}
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700"></div>

            <div className="hidden sm:block">
              <ExportImport />
            </div>

            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200/50 dark:border-gray-600/50 transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
