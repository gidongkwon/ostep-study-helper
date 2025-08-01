import type { StudyData, ChapterProgress, ProgressStatus } from "../types";

const STORAGE_KEY = "ostep-study-data";

const defaultStudyData: StudyData = {
  progress: {},
  theme: "light",
};

export class StorageService {
  static getData(): StudyData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return defaultStudyData;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error loading study data:", error);
      return defaultStudyData;
    }
  }

  static saveData(data: StudyData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving study data:", error);
    }
  }

  static getChapterProgress(chapterId: string): ChapterProgress | null {
    const data = this.getData();
    return data.progress[chapterId] || null;
  }

  static updateChapterProgress(
    chapterId: string,
    status: ProgressStatus,
    notes?: string,
  ): void {
    const data = this.getData();

    const existingProgress = data.progress[chapterId];

    data.progress[chapterId] = {
      chapterId,
      status,
      notes: notes !== undefined ? notes : existingProgress?.notes || "",
      lastUpdated: new Date().toISOString(),
    };

    this.saveData(data);
  }

  static updateChapterNotes(chapterId: string, notes: string): void {
    const data = this.getData();
    const existingProgress = data.progress[chapterId];

    if (existingProgress) {
      existingProgress.notes = notes;
      existingProgress.lastUpdated = new Date().toISOString();
    } else {
      data.progress[chapterId] = {
        chapterId,
        status: "not-started",
        notes,
        lastUpdated: new Date().toISOString(),
      };
    }

    this.saveData(data);
  }

  static getTheme(): "light" | "dark" {
    const data = this.getData();
    return data.theme;
  }

  static setTheme(theme: "light" | "dark"): void {
    const data = this.getData();
    data.theme = theme;
    this.saveData(data);
  }

  static exportData(): string {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  }

  static importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString) as StudyData;

      // Validate the imported data structure
      if (!data.progress || typeof data.progress !== "object") {
        throw new Error("Invalid data structure");
      }

      this.saveData(data);
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }

  static clearAllData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static getProgressStats(): {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
    percentage: number;
  } {
    const data = this.getData();
    const progressEntries = Object.values(data.progress);

    const stats = {
      total: progressEntries.length, // Total number of chapters
      completed: progressEntries.filter((p) => p.status === "completed").length,
      inProgress: progressEntries.filter((p) => p.status === "in-progress")
        .length,
      notStarted: 0,
      percentage: 0,
    };

    stats.notStarted = stats.total - stats.completed - stats.inProgress;
    stats.percentage =
      stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return stats;
  }
}
