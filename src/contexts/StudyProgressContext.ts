import { createContext, useContext } from "react";
import type { ChapterProgress, ProgressStatus } from "../types";

export interface StudyProgressContextType {
  progress: Record<string, ChapterProgress>;
  stats: {
    completed: number;
    inProgress: number;
    notStarted: number;
    total: number;
    percentage: number;
  };
  updateChapterStatus: (chapterId: string, status: ProgressStatus) => void;
  updateChapterNotes: (chapterId: string, notes: string) => void;
  getChapterProgress: (chapterId: string) => ChapterProgress | null;
  exportProgress: () => string;
  importProgress: (jsonString: string) => boolean;
}

export const StudyProgressContext = createContext<
  StudyProgressContextType | undefined
>(undefined);

export function useStudyProgress() {
  const context = useContext(StudyProgressContext);
  if (context === undefined) {
    throw new Error(
      "useStudyProgress must be used within a StudyProgressProvider",
    );
  }
  return context;
}
