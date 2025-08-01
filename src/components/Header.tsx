import { useTheme } from "../hooks/useTheme";
import { useStudyProgress } from "../contexts/StudyProgressContext";
import { ExportImport } from "./ExportImport";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Menu, BookOpen, Moon, Sun } from "lucide-react";
import { IconButton } from "./ui/IconButton";
import { ProgressBar } from "./ui/ProgressBar";
import { GradientCard } from "./ui/GradientCard";

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
            <div className="lg:hidden">
              <IconButton
                icon={<Menu className="w-5 h-5" />}
                onClick={onToggleSidebar}
                ariaLabel="Toggle sidebar"
                variant="secondary"
              />
            </div>
            <div className="flex items-center space-x-3">
              <GradientCard
                from="blue-500"
                to="blue-600"
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                padding="sm"
              >
                <BookOpen className="w-6 h-6 text-white" />
              </GradientCard>
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
                  <ProgressBar
                    percentage={stats.percentage}
                    size="sm"
                    animated={true}
                    className="min-w-[6rem]"
                  />
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

            <IconButton
              icon={
                theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )
              }
              onClick={toggleTheme}
              ariaLabel="Toggle theme"
              variant="secondary"
              className="border border-gray-200/50 dark:border-gray-600/50"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
