import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { StorageService } from "../persistence/storage";
import type { ChapterProgress, ProgressStatus } from "../../types";
import { StudyProgressContext } from "./StudyProgressContext";

interface StudyProgressProviderProps {
  children: ReactNode;
}

export function StudyProgressProvider({
  children,
}: StudyProgressProviderProps) {
  const [progress, setProgress] = useState<Record<string, ChapterProgress>>({});
  const [stats, setStats] = useState(StorageService.getProgressStats());

  // Load initial data
  useEffect(() => {
    const data = StorageService.getData();
    setProgress(data.progress);
    setStats(StorageService.getProgressStats());
  }, []);

  const updateChapterStatus = useCallback(
    (chapterId: string, status: ProgressStatus) => {
      StorageService.updateChapterProgress(chapterId, status);

      // Update local state
      const data = StorageService.getData();
      setProgress(data.progress);
      setStats(StorageService.getProgressStats());
    },
    [],
  );

  const updateChapterNotes = useCallback((chapterId: string, notes: string) => {
    StorageService.updateChapterNotes(chapterId, notes);

    // Update local state
    const data = StorageService.getData();
    setProgress(data.progress);
  }, []);

  const updateMaterialRead = useCallback((chapterId: string, materialId: string, read: boolean) => {
    StorageService.updateMaterialRead(chapterId, materialId, read);

    // Update local state
    const data = StorageService.getData();
    setProgress(data.progress);
  }, []);

  const getChapterProgress = useCallback(
    (chapterId: string): ChapterProgress | null => {
      return progress[chapterId] || null;
    },
    [progress],
  );

  const exportProgress = useCallback(() => {
    return StorageService.exportData();
  }, []);

  const importProgress = useCallback((jsonString: string): boolean => {
    const success = StorageService.importData(jsonString);
    if (success) {
      // Reload data
      const data = StorageService.getData();
      setProgress(data.progress);
      setStats(StorageService.getProgressStats());
    }
    return success;
  }, []);

  const value = {
    progress,
    stats,
    updateChapterStatus,
    updateChapterNotes,
    updateMaterialRead,
    getChapterProgress,
    exportProgress,
    importProgress,
  };

  return (
    <StudyProgressContext.Provider value={value}>
      {children}
    </StudyProgressContext.Provider>
  );
}
