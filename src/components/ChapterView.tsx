import { useTranslation } from "react-i18next";
import type { RegularChapter, ProgressStatus } from "../types";
import { useStudyProgress } from "../contexts/StudyProgressContext";
import { Presentation, Download, FileText } from "lucide-react";
import { StatusButton } from "./ui/StatusButton";
import { IconCard } from "./ui/IconCard";
import { EmptyState } from "./ui/EmptyState";
import { PageContainer } from "./ui/PageContainer";
import { SectionHeader } from "./ui/SectionHeader";
import { StatusDisplay } from "./ui/StatusDisplay";
import { getStatusButtonConfig } from "../utils/statusButtonConfig";

interface ChapterViewProps {
  chapter: RegularChapter;
}

export function ChapterView({ chapter }: ChapterViewProps) {
  const { t } = useTranslation();
  const { getChapterProgress, updateChapterStatus } = useStudyProgress();
  const progress = getChapterProgress(chapter.id);

  const handleStatusChange = (status: ProgressStatus) => {
    updateChapterStatus(chapter.id, status);
  };

  const statusButtons = getStatusButtonConfig(t);
  const currentStatus = progress?.status || "not-started";

  return (
    <PageContainer className="space-y-8 animate-fade-in">
      <div className="">
        <div className="flex items-start justify-between mb-6">
          <SectionHeader
            title={chapter.title}
            section={chapter.section}
            className="flex-1"
          >
            <div className="flex items-center space-x-4 mb-6">
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
          </SectionHeader>
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

      <div className="">
        <h2 className="section-title">{t("chapterView.lectureMaterials")}</h2>
        <div className="mb-6">
          <IconCard
            href={chapter.lectureSlide}
            icon={<Presentation className="w-6 h-6 text-white" />}
            title={t("chapterView.lectureSlides")}
            color="purple"
          />
        </div>
      </div>

      <div className="">
        <h2 className="section-title">{t("chapterView.textbookResources")}</h2>
        {chapter.pdfs.length > 0 ? (
          <div className="space-y-4">
            {chapter.pdfs.map((pdf, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {pdf.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IconCard
                    href={pdf.englishPdf}
                    icon={<Download className="w-5 h-5 text-white" />}
                    title={t("chapterView.englishPdf")}
                    description={t("chapterView.originalContent")}
                    color="blue"
                    className="p-4"
                  />

                  {pdf.koreanPdf ? (
                    <IconCard
                      href={pdf.koreanPdf}
                      icon={<Download className="w-5 h-5 text-white" />}
                      title={t("chapterView.koreanPdf")}
                      description={t("chapterView.translatedContent")}
                      color="green"
                      className="p-4"
                    />
                  ) : (
                    <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-center h-24">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {t("chapterView.noKoreanPdf")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {t("chapterView.koreanNotAvailable")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
