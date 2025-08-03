import { createContext, useContext } from "react";

// Define the structure for lab content
export interface LabContent {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  prerequisites?: string[];
  resources?: {
    title: string;
    url: string;
    type: "video" | "article" | "code" | "pdf";
  }[];
  exercises?: {
    id: string;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
  }[];
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  chapters: string[]; // Related chapter IDs
  content?: LabContent;
  order: number;
}

export interface LabContextValue {
  labs: Lab[];
  getLabById: (id: string) => Lab | undefined;
  getLabsByChapter: (chapterId: string) => Lab[];
}

export const LabContext = createContext<LabContextValue | undefined>(undefined);

export function useLabs() {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error("useLabs must be used within a LabProvider");
  }
  return context;
}
