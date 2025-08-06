export interface PdfResource {
  title: string;
  englishPdf: string;
  koreanPdf?: string;
}

export interface LinkResource {
  title: string;
  titleKo?: string;
  link: string;
}

export interface KAISTResource {
  name: string;
  pptUrl: string;
  videoLinksWithDurations?: { url: string; duration: string; name?: string }[];
  mappedToChapter: string | null;
}

interface BaseChapter {
  id: string;
  title: string;
  lectureSlide?: string;
  section: "lab1" | "lab2" | "lab3" | "lab4" | "lab5" | "filesystem";
}

export interface RegularChapter extends BaseChapter {
  isLab?: false;
  pdfs: PdfResource[];
}

export interface Lab extends BaseChapter {
  isLab: true;
  description?: string;
  descriptionKo?: string;
  resources?: LinkResource[];
}

export type Chapter = RegularChapter | Lab;

// Type guard helpers
export function isLab(chapter: Chapter): chapter is Lab {
  return chapter.isLab ?? false;
}

export function isRegularChapter(chapter: Chapter): chapter is RegularChapter {
  return !chapter.isLab;
}

export type ProgressStatus = "not-started" | "in-progress" | "completed";

export interface ChapterProgress {
  chapterId: string;
  status: ProgressStatus;
  notes: string;
  lastUpdated: string;
  materialsRead?: Record<string, boolean>;
}

export interface StudyData {
  progress: Record<string, ChapterProgress>;
  theme: "light" | "dark";
}
