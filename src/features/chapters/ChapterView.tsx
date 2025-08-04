import { useTranslation } from "react-i18next";
import type { RegularChapter, ProgressStatus } from "../../types";
import { useStudyProgress } from "../progress/StudyProgressContext";
import { Presentation, Download, FileText, Video, ExternalLink } from "lucide-react";
import { StatusButton } from "./StatusButton";
import { IconCard } from "../../components/ui/IconCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageContainer } from "../../components/ui/PageContainer";
import { SectionHeader } from "./SectionHeader";
import { StatusDisplay } from "./StatusDisplay";
import { getStatusButtonConfig } from "../../utils/statusButtonConfig";
import { getAlignedResourcesForChapter } from "../../utils/kaistResources";
import { triggerCompletionConfetti } from "../../utils/confetti";

interface ChapterViewProps {
  chapter: RegularChapter;
}

export function ChapterView({ chapter }: ChapterViewProps) {
  const { t } = useTranslation();
  const { getChapterProgress, updateChapterStatus } = useStudyProgress();
  const progress = getChapterProgress(chapter.id);
  const alignedResources = getAlignedResourcesForChapter(chapter.pdfs, chapter.id);

  const handleStatusChange = (status: ProgressStatus) => {
    const previousStatus = progress?.status || "not-started";
    updateChapterStatus(chapter.id, status);
    
    // Trigger confetti when marking as completed (and it wasn't completed before)
    if (status === "completed" && previousStatus !== "completed") {
      setTimeout(() => {
        triggerCompletionConfetti();
      }, 100); // Small delay to let the UI update first
    }
  };

  const statusButtons = getStatusButtonConfig(t);
  const currentStatus = progress?.status || "not-started";

  return (
    <PageContainer className="space-y-8 animate-fade-in">
      <div className="">
        <div className="flex items-start justify-between mb-6">
          <SectionHeader
            title={chapter.title}
            statusBadge={
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
            }
            className="flex-1"
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

      {/* University Headers - Desktop Only */}
      <div className="hidden lg:grid grid-cols-2 gap-8 mb-4">
        <div className="flex justify-center">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">SNU</span>
        </div>
        <div className="flex justify-center">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">KAIST</span>
        </div>
      </div>

      {/* Aligned Resources */}
      <div className="space-y-6">
        {/* Lecture Slides as first item */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SNU Side - Lecture Slides */}
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {t("chapterView.lectureSlides")}
                </h4>
                <span className="lg:hidden bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">SNU</span>
              </div>
              <div className="space-y-2">
                <IconCard
                  href={chapter.lectureSlide}
                  icon={<Presentation className="w-4 h-4 text-white" />}
                  title={t("chapterView.lectureSlides")}
                  description="SNU lecture slides"
                  color="purple"
                  className="p-2"
                />
              </div>
            </div>
          </div>

          {/* KAIST Side - Empty for lecture slides */}
          <div className="space-y-4">
            {/* Intentionally left empty for lecture slides */}
          </div>
        </div>

        {/* Other aligned resources */}
        {alignedResources.map((alignedResource, index) => (
          <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SNU Side */}
            <div className="space-y-4">
              {alignedResource.snuPdf ? (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {alignedResource.snuPdf.title}
                    </h4>
                    <span className="lg:hidden bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">SNU</span>
                  </div>
                  <div className="space-y-2">
                    <IconCard
                      href={alignedResource.snuPdf.englishPdf}
                      icon={<Download className="w-4 h-4 text-white" />}
                      title={t("chapterView.englishPdf")}
                      description={t("chapterView.originalContent")}
                      color="blue"
                      className="p-2"
                    />
                    {alignedResource.snuPdf.koreanPdf && (
                      <IconCard
                        href={alignedResource.snuPdf.koreanPdf}
                        icon={<Download className="w-4 h-4 text-white" />}
                        title={t("chapterView.koreanPdf")}
                        description={t("chapterView.translatedContent")}
                        color="green"
                        className="p-2"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center text-gray-400 dark:text-gray-600">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No SNU material</p>
                  </div>
                </div>
              )}
            </div>

            {/* KAIST Side */}
            <div className="space-y-4">
              {alignedResource.kaistResource ? (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {alignedResource.kaistResource.name}
                    </h4>
                    <span className="lg:hidden bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">KAIST</span>
                  </div>
                  <div className="space-y-2">
                    <IconCard
                      href={alignedResource.kaistResource.pptUrl}
                      icon={<Presentation className="w-4 h-4 text-white" />}
                      title={t("chapterView.powerPointSlides", "PowerPoint Slides")}
                      description="KAIST lecture slides"
                      color="orange"
                      className="p-2"
                    />
                    {alignedResource.kaistResource.videoLinks.map((videoLink, videoIndex) => (
                      <IconCard
                        key={videoIndex}
                        href={videoLink}
                        icon={<Video className="w-4 h-4 text-white" />}
                        title={`${t("chapterView.videoLecture", "Video Lecture")}${alignedResource.kaistResource!.videoLinks.length > 1 ? ` ${videoIndex + 1}` : ''}`}
                        description="KAIST video content"
                        color="red"
                        className="p-2"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center text-gray-400 dark:text-gray-600">
                    <ExternalLink className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No KAIST material</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {alignedResources.length === 0 && (
          <EmptyState
            icon={<FileText className="w-12 h-12" />}
            title={t("chapterView.noReadingMaterials")}
            description={t("chapterView.noOstepChapters")}
          />
        )}
      </div>
    </PageContainer>
  );
}
