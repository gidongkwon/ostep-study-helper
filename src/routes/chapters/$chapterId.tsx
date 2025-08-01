import { createFileRoute } from "@tanstack/react-router";
import { ChapterView } from "../../components/ChapterView";
import { getChapterById } from "../../data/curriculum";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { BookOpen, Beaker } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useStudyProgress } from "../../contexts/StudyProgressContext";
import type { Chapter, ProgressStatus } from "../../types";
import { StatusButton } from "../../components/ui/StatusButton";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageContainer } from "../../components/ui/PageContainer";
import { LabPlaceholder } from "../../components/ui/LabPlaceholder";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatusDisplay } from "../../components/ui/StatusDisplay";
import { getStatusButtonConfig } from "../../utils/statusButtonConfig";

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ChapterRoute,
  pendingComponent: LoadingSpinner,
});

function LabView({ chapter }: { chapter: Chapter }) {
  const { t } = useTranslation();
  const { getChapterProgress, updateChapterStatus } = useStudyProgress();
  const progress = getChapterProgress(chapter.id);

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
              label={`${t("chapterView.currentStatus", "Current Status")}: ${currentStatus.replace("-", " ")}`}
              icon={
                statusButtons.find((btn) => btn.status === currentStatus)
                  ?.icon || <></>
              }/>
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
      <div className="card p-8">
        <LabPlaceholder />
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
  if (chapter.isLab) {
    return <LabView chapter={chapter} />;
  }

  return <ChapterView chapter={chapter} />;
}
