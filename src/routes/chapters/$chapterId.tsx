import { createFileRoute } from "@tanstack/react-router";
import { ChapterView } from "../../components/ChapterView";
import { getChapterById } from "../../data/curriculum";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ChapterRoute,
  pendingComponent: LoadingSpinner,
});

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

  return <ChapterView chapter={chapter} />;
}