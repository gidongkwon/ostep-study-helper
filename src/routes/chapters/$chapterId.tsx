import { createFileRoute } from "@tanstack/react-router";
import { ChapterView } from "../../components/ChapterView";
import { getChapterById } from "../../data/curriculum";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { BookOpen, Beaker, FileText, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ChapterRoute,
  pendingComponent: LoadingSpinner,
});

function LabView({ chapter }: { chapter: any }) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Beaker className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {chapter.title}
            </h1>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("labs.objectives", "Learning Objectives")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t("labs.objectivesPlaceholder", "Lab objectives will be displayed here when content is added.")}
              </p>
            </div>
            
            <div className="card p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("labs.exercises", "Exercises")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t("labs.exercisesPlaceholder", "Lab exercises will be displayed here when content is added.")}
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <p className="text-center text-yellow-800 dark:text-yellow-200">
              {t(
                "labs.comingSoon",
                "Full lab content with interactive exercises, code examples, and resources will be available in a future update."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterRoute() {
  const { chapterId } = Route.useParams();
  const { t } = useTranslation();
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
        <div className="text-center">
          <BookOpen
            className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6"
            strokeWidth={1}
          />
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
            {t("chapter.notFound", "Chapter not found")}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {t(
              "chapter.invalidId",
              "The chapter ID '{{chapterId}}' does not exist.",
              { chapterId }
            )}
          </p>
        </div>
      </div>
    );
  }

  // If it's a lab chapter, show lab view instead
  if (chapter.isLab) {
    return <LabView chapter={chapter} />;
  }

  return <ChapterView chapter={chapter} />;
}