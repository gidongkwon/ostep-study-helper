import { createFileRoute } from "@tanstack/react-router";
import { ChapterView } from "../../components/ChapterView";
import { getChapterById } from "../../data/curriculum";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { BookOpen, Beaker, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useStudyProgress } from "../../contexts/StudyProgressContext";
import type {
  Lab,
  RegularChapter,
  ProgressStatus,
  LinkResource,
} from "../../types";
import { isLab } from "../../types";
import { StatusButton } from "../../components/ui/StatusButton";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageContainer } from "../../components/ui/PageContainer";
import { LabPlaceholder } from "../../components/ui/LabPlaceholder";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatusDisplay } from "../../components/ui/StatusDisplay";
import { getStatusButtonConfig } from "../../utils/statusButtonConfig";
import markdownit from "markdown-it";

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ChapterRoute,
  pendingComponent: LoadingSpinner,
});

const md = markdownit();

function LabView({ chapter }: { chapter: Lab }) {
  const { t, i18n } = useTranslation();
  const { getChapterProgress, updateChapterStatus } = useStudyProgress();
  const progress = getChapterProgress(chapter.id);
  const isKorean = i18n.language === "ko";

  // Helper function to detect if a resource is a video
  const isVideoResource = (resource: LinkResource) => {
    return (
      resource.link.includes("youtube.com") ||
      resource.link.includes("youtu.be") ||
      resource.title.toLowerCase().includes("video") ||
      resource.title.toLowerCase().includes("tutorial")
    );
  };

  const handleStatusChange = (status: ProgressStatus) => {
    updateChapterStatus(chapter.id, status);
  };

  const statusButtons = getStatusButtonConfig(t);

  const currentStatus = progress?.status || "not-started";

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="">
        <div className="flex items-start justify-between mb-6">
          <SectionHeader
            title={chapter.title}
            section={chapter.section}
            icon={
              <Beaker className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            }
          />
        </div>

        {/* Progress Tracking */}
        <div className="flex items-center justify-between mb-4">
          <StatusDisplay
            status={currentStatus}
            label={
              statusButtons.find((btn) => btn.status === currentStatus)
                ?.label || ""
            }
            icon={
              statusButtons.find((btn) => btn.status === currentStatus)
                ?.icon || <></>
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {statusButtons.map(({ status, label, color, icon }) => {
            const isActive = currentStatus === status;
            return (
              <StatusButton
                key={status}
                status={status}
                label={label}
                color={color}
                icon={icon}
                isActive={isActive}
                onClick={() => handleStatusChange(status)}
              />
            );
          })}
        </div>
      </div>

      {/* Lab Content */}
      <div className="space-y-6">
        {/* Description */}
        {(chapter.description || chapter.descriptionKo) && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {t("labs.overview", "Overview")}
            </h2>
            <div 
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: md.render(isKorean && chapter.descriptionKo ? chapter.descriptionKo : chapter.description || '') 
              }}
            />
          </div>
        )}

        {/* Resources */}
        {chapter.resources && chapter.resources.length > 0 && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("labs.resources", "Resources")}
            </h2>
            <div className="space-y-3">
              {chapter.resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {isVideoResource(resource) ? (
                      <Play className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      {isKorean && resource.titleKo ? resource.titleKo : resource.title}
                    </span>
                  </div>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    {t("chapter.viewResource", "View →")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If no content available, show placeholder */}
        {!chapter.description &&
          !chapter.descriptionKo &&
          (!chapter.resources || chapter.resources.length === 0) && (
            <div className="card p-8">
              <LabPlaceholder />
            </div>
          )}
      </div>
    </PageContainer>
  );
}

function ChapterRoute() {
  const { chapterId } = Route.useParams();
  const { t } = useTranslation();
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return (
      <PageContainer className="flex items-center justify-center">
        <EmptyState
          icon={<BookOpen className="h-24 w-24" strokeWidth={1} />}
          title={t("chapter.notFound", "Chapter not found")}
          description={t(
            "chapter.invalidId",
            "The chapter ID '{{chapterId}}' does not exist.",
            { chapterId },
          )}
          className="border-0 bg-transparent"
        />
      </PageContainer>
    );
  }

  // If it's a lab chapter, show lab view instead
  if (isLab(chapter)) {
    return <LabView chapter={chapter} />;
  }

  return <ChapterView chapter={chapter as RegularChapter} />;
}
