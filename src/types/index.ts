export interface PdfResource {
  title: string;
  englishPdf: string;
  koreanPdf?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lectureSlide?: string;
  pdfs: PdfResource[];
  section: "lab1" | "lab2" | "lab3" | "lab4" | "lab5" | "filesystem";
  isLab?: boolean;
}

export type ProgressStatus = "not-started" | "in-progress" | "completed";

export interface ChapterProgress {
  chapterId: string;
  status: ProgressStatus;
  notes: string;
  lastUpdated: string;
}

export interface StudyData {
  progress: Record<string, ChapterProgress>;
  theme: "light" | "dark";
}
