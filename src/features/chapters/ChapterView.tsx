import { useTranslation } from "react-i18next";
import type { RegularChapter, ProgressStatus } from "../../types";
import { useStudyProgress } from "../progress/StudyProgressContext";
import { Presentation, FileText, Video, ExternalLink } from "lucide-react";
import { StatusButton } from "./StatusButton";

import { MaterialCard } from "../../components/ui/MaterialCard";
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
  const { getChapterProgress, updateChapterStatus, updateMaterialRead } = useStudyProgress();
  const progress = getChapterProgress(chapter.id);
  const alignedResources = getAlignedResourcesForChapter(chapter.pdfs, chapter.lectureSlide, chapter.id);

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

  const handleMaterialReadToggle = (materialId: string, read: boolean) => {
    updateMaterialRead(chapter.id, materialId, read);
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

      {/* Resource Headers - Desktop Only */}
      <div className={`hidden lg:grid gap-8 mb-4 ${alignedResources.some(r => r.snuLectureSlide) ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <div className="flex justify-center">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">OSTEP</span>
        </div>
        <div className="flex justify-center">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">KAIST</span>
        </div>
        {alignedResources.some(r => r.snuLectureSlide) && (
          <div className="flex justify-center">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">SNU</span>
          </div>
        )}
      </div>

      {/* Aligned Resources */}
      <div className="space-y-6">
        {/* Render each aligned resource */}
        {alignedResources.map((alignedResource, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            {/* All resources in a single row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* OSTEP Side */}
                <div className="space-y-4">
                  {alignedResource.ostepPdf ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {alignedResource.ostepPdf.title}
                        </h4>
                        <span className="lg:hidden bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">OSTEP</span>
                      </div>
                      <div className="space-y-2">
                        <MaterialCard
                          href={alignedResource.ostepPdf.englishPdf}
                          icon={<FileText className="w-4 h-4 text-white" />}
                          title={t("chapterView.englishPdf")}
                          description={t("chapterView.ostepTextbookChapter")}
                          color="green"
                          className="p-2"
                          materialId={`${chapter.id}-${index}-ostep-en`}
                          isRead={progress?.materialsRead?.[`${chapter.id}-${index}-ostep-en`]}
                          onReadToggle={handleMaterialReadToggle}
                        />
                        {alignedResource.ostepPdf.koreanPdf && (
                          <MaterialCard
                            href={alignedResource.ostepPdf.koreanPdf}
                            icon={<FileText className="w-4 h-4 text-white" />}
                            title={t("chapterView.koreanPdf")}
                            description={t("chapterView.ostepTextbookChapterKorean")}
                            color="green"
                            className="p-2"
                            materialId={`${chapter.id}-${index}-ostep-ko`}
                            isRead={progress?.materialsRead?.[`${chapter.id}-${index}-ostep-ko`]}
                            onReadToggle={handleMaterialReadToggle}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center p-8">
                      <div className="text-center text-gray-400 dark:text-gray-600">
                        <ExternalLink className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">{t("chapterView.noOstepMaterial")}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* KAIST Side */}
                <div className="space-y-4">
                  {alignedResource.kaistResource ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {alignedResource.kaistResource.name}
                        </h4>
                        <span className="lg:hidden bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">KAIST</span>
                      </div>
                      <div className="space-y-2">
                        <MaterialCard
                          href={alignedResource.kaistResource.pptUrl}
                          icon={<Presentation className="w-4 h-4 text-white" />}
                          title={t("chapterView.powerPointSlides", "PowerPoint Slides")}
                          description={t("chapterView.kaistLectureSlides")}
                          color="orange"
                          className="p-2"
                          materialId={`${chapter.id}-${index}-kaist-ppt`}
                          isRead={progress?.materialsRead?.[`${chapter.id}-${index}-kaist-ppt`]}
                          onReadToggle={handleMaterialReadToggle}
                        />
                        {(alignedResource.kaistResource.videoLinksWithDurations || []).map((videoData: { url: string; duration: string; name?: string }, videoIndex: number) => (
                          <MaterialCard
                            key={videoIndex}
                            href={videoData.url}
                            icon={<Video className="w-4 h-4 text-white" />}
                            title={videoData.name || `${t("chapterView.videoLecture", "Video Lecture")}${(alignedResource.kaistResource?.videoLinksWithDurations || []).length > 1 ? ` ${videoIndex + 1}` : ''}`}
                            description={`${t("chapterView.kaistVideoContent")} • ${videoData.duration}`}
                            color="red"
                            className="p-2"
                            materialId={`${chapter.id}-${index}-kaist-video-${videoIndex}`}
                            isRead={progress?.materialsRead?.[`${chapter.id}-${index}-kaist-video-${videoIndex}`]}
                            onReadToggle={handleMaterialReadToggle}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center p-8">
                      <div className="text-center text-gray-400 dark:text-gray-600">
                        <ExternalLink className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">{t("chapterView.noKaistMaterial")}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* SNU Side - Lecture Slides (3rd column, empty when no content) */}
                <div className="space-y-4">
                  {alignedResource.snuLectureSlide ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {t("chapterView.lectureSlides")}
                        </h4>
                        <span className="lg:hidden bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">SNU</span>
                      </div>
                      <div className="space-y-2">
                        <MaterialCard
                          href={alignedResource.snuLectureSlide}
                          icon={<Presentation className="w-4 h-4 text-white" />}
                          title={t("chapterView.lectureSlides")}
                          description={t("chapterView.snuLectureSlides")}
                          color="purple"
                          className="p-2"
                          materialId={`${chapter.id}-${index}-snu-slides`}
                          isRead={progress?.materialsRead?.[`${chapter.id}-${index}-snu-slides`]}
                          onReadToggle={handleMaterialReadToggle}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
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
