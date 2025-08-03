import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createProgressSections, type ProgressSection } from "../progress/progress-sections";
import { useSectionProgress, type SectionProgress } from "../progress/useSectionProgress";

export interface SectionWithProgress extends ProgressSection {
  sectionStats: SectionProgress;
}

interface UseSectionsResult {
  sections: SectionWithProgress[];
}

export function useSections(
  progress: Record<string, { status?: string }>
): UseSectionsResult {
  const { t } = useTranslation();
  const getSectionStats = useSectionProgress(progress);

  const sections = useMemo(() => {
    const baseSections = createProgressSections(t);
    
    return baseSections.map((section): SectionWithProgress => ({
      ...section,
      sectionStats: getSectionStats(section.chapters),
    }));
  }, [t, getSectionStats]);

  return { sections };
}