import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ChapterView } from "./components/ChapterView";
import { ProgressChart } from "./components/ProgressChart";
import { getChapterById } from "./data/curriculum";
import { BookOpen, BarChart3 } from "lucide-react";

function App() {
  const { t } = useTranslation();
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"dashboard" | "chapters">(
    "dashboard",
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedChapter = selectedChapterId
    ? getChapterById(selectedChapterId)
    : null;

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setViewMode("chapters");
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out lg:transition-none`}
        >
          <Sidebar
            selectedChapter={selectedChapterId}
            onChapterSelect={handleChapterSelect}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        <main className="flex-1 flex flex-col">

          {viewMode === "dashboard" ? (
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
              <div className="max-w-6xl mx-auto">
                <ProgressChart />
              </div>
            </div>
          ) : selectedChapter ? (
            <ChapterView chapter={selectedChapter} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
              <div className="text-center">
                <BookOpen className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6" strokeWidth={1} />
                <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
                  {t("chapter.readyToStart", "Ready to start studying?")}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
                  {t(
                    "chapter.selectChapter",
                    "Select a chapter from the sidebar to begin your OS learning journey",
                  )}
                </p>
                <button
                  onClick={() => setViewMode("dashboard")}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>{t("sidebar.dashboard")}</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
