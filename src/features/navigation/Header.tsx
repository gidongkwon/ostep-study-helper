import React, { useState } from "react";
import { useTheme } from "../theme/useTheme";
import { useStudyProgress } from "../progress/StudyProgressContext";
import { ExportImport } from "../persistence/ExportImport";
import { LanguageSwitcher } from "../i18n/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import {
  Menu,
  Moon,
  Sun,
  MoreVertical,
  Globe,
  Download,
  Upload,
} from "lucide-react";
import { IconButton } from "../../components/ui/IconButton";
import { ProgressBar } from "../progress/ProgressBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { stats, exportProgress, importProgress } = useStudyProgress();
  const { t, i18n } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ostep-progress-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMobileMenuOpen(false); // Close menu after export
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importProgress(content);
        if (success) {
          alert("Progress imported successfully!");
          setMobileMenuOpen(false); // Close menu
          window.location.reload(); // Reload to update UI
        } else {
          alert("Failed to import progress. Please check the file format.");
        }
      } catch {
        alert("Error importing file. Please check the file format.");
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50">
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
              <div className="hidden lg:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  OSTEP Tracker
                </h1>
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  OSTEP
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Mobile progress indicator */}
            <div className="sm:hidden flex items-center space-x-2 flex-col">
              <div className="text-xs font-semibold text-gray-900 dark:text-white">
                {stats.completed}/{stats.total}
              </div>
              <ProgressBar
                percentage={stats.percentage}
                size="sm"
                animated={true}
                showLabel={false}
                className="min-w-[3rem]"
              />
            </div>

            {/* Desktop progress section */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
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
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
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

            {/* Mobile action menu */}
            <div className="sm:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <IconButton
                    icon={<MoreVertical className="w-5 h-5" />}
                    onClick={() => {}}
                    ariaLabel="More options"
                    variant="secondary"
                    className="border border-gray-200/50 dark:border-gray-600/50 min-h-[44px] min-w-[44px]"
                  />
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <SheetHeader>
                    <SheetTitle>{t("common.options")}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {theme === "light" ? (
                          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                        <span className="text-gray-900 dark:text-white">
                          {t("theme.toggle")}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {theme === "light" ? t("theme.light") : t("theme.dark")}
                      </span>
                    </button>

                    {/* Language Toggle */}
                    <button
                      onClick={() => {
                        const newLang = i18n.language === "en" ? "ko" : "en";
                        i18n.changeLanguage(newLang);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {t("language.label")}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {i18n.language === "en" ? "English" : "한국어"}
                      </span>
                    </button>

                    {/* Export Progress */}
                    <button
                      onClick={handleExport}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {t("exportImport.exportProgress")}
                        </span>
                      </div>
                    </button>

                    {/* Import Progress */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {t("exportImport.importProgress")}
                        </span>
                      </div>
                    </button>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <IconButton
              icon={
                theme === "light" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              }
              onClick={toggleTheme}
              ariaLabel="Toggle theme"
              variant="secondary"
              className="border border-gray-200/50 dark:border-gray-600/50 min-h-[44px] min-w-[44px] hidden sm:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
