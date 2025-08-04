import React from "react";
import { useTheme } from "../theme/useTheme";
import { useStudyProgress } from "../progress/StudyProgressContext";
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
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
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
          alert(t("exportImport.importSuccess", "Progress imported successfully!"));
          window.location.reload(); // Reload to update UI
        } else {
          alert(t("exportImport.importError", "Failed to import progress. Please check the file format."));
        }
      } catch {
        alert(t("exportImport.fileError", "Error importing file. Please check the file format."));
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 transition-all-smooth">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                className="h-10 w-10"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
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
            <div className="sm:hidden flex items-center space-x-3">
              <Badge variant="outline" className="text-xs">
                {stats.completed}/{stats.total}
              </Badge>
              <Progress 
                value={stats.percentage} 
                className="w-12 h-2"
              />
            </div>

            {/* Desktop progress section */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                    {t("header.overallProgress")}
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    <Progress 
                      value={stats.percentage} 
                      className="w-24 h-2"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[3ch]">
                      {stats.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                  {t("common.chapters")}
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.completed} / {stats.total}
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-800"></div>

            <div className="hidden sm:flex items-center space-x-1">
              <Button
                variant="ghost" 
                size="icon"
                onClick={handleExport}
                className="h-9 w-9"
                title={t("exportImport.exportProgress")}
              >
                <Download className="w-4 h-4" />
                <span className="sr-only">{t("exportImport.exportProgress")}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon" 
                onClick={() => fileInputRef.current?.click()}
                className="h-9 w-9"
                title={t("exportImport.importProgress")}
              >
                <Upload className="w-4 h-4" />
                <span className="sr-only">{t("exportImport.importProgress")}</span>
              </Button>
            </div>

            {/* Mobile action menu */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <MoreVertical className="w-5 h-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{t("common.options")}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleTheme}>
                    <div className="flex items-center gap-3">
                      {theme === "light" ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                      <span>{t("theme.toggle")}</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {
                    const newLang = i18n.language === "en" ? "ko" : "en";
                    i18n.changeLanguage(newLang);
                  }}>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4" />
                      <span>{t("language.label")}</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleExport}>
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4" />
                      <span>{t("exportImport.exportProgress")}</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                    <div className="flex items-center gap-3">
                      <Upload className="w-4 h-4" />
                      <span>{t("exportImport.importProgress")}</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10 hidden sm:block"
            >
              {theme === "light" ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
