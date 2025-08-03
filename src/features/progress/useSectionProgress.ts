import { useMemo } from "react";
import type { Chapter } from "../../types";

export interface SectionProgress {
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
  percentage: number;
}

export function useSectionProgress(
  progress: Record<string, { status?: string }>,
) {
  return useMemo(() => {
    return (chapters: Chapter[]): SectionProgress => {
      const completed = chapters.filter(
        (ch) => progress[ch.id]?.status === "completed",
      ).length;
      const inProgress = chapters.filter(
        (ch) => progress[ch.id]?.status === "in-progress",
      ).length;
      const notStarted = chapters.length - completed - inProgress;

      return {
        completed,
        inProgress,
        notStarted,
        total: chapters.length,
        percentage: Math.round((completed / chapters.length) * 100),
      };
    };
  }, [progress]);
}
