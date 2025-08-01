import { createContext, useContext, type ReactNode } from "react";

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

interface LabContextValue {
  labs: Lab[];
  getLabById: (id: string) => Lab | undefined;
  getLabsByChapter: (chapterId: string) => Lab[];
}

const LabContext = createContext<LabContextValue | undefined>(undefined);

// Placeholder labs - to be expanded in the future
const LABS: Lab[] = [
  {
    id: "lab1",
    name: "Lab 1: Introduction to OS",
    description: "Getting started with operating systems concepts",
    chapters: ["intro-os", "arch-support", "processes"],
    order: 1,
  },
  {
    id: "lab2",
    name: "Lab 2: CPU Scheduling",
    description: "Understanding CPU scheduling and virtual memory",
    chapters: ["cpu-scheduling", "virtual-memory"],
    order: 2,
  },
  {
    id: "lab3",
    name: "Lab 3: Paging and Memory",
    description: "Deep dive into paging, page tables, and TLB",
    chapters: ["paging", "page-tables", "tlb", "memory-mapping"],
    order: 3,
  },
  {
    id: "lab4",
    name: "Lab 4: Advanced Memory",
    description: "Swapping, VM implementations, and threads",
    chapters: ["swapping", "vm-implementations", "threads"],
    order: 4,
  },
  {
    id: "lab5",
    name: "Lab 5: Concurrency and Storage",
    description: "Synchronization primitives and storage devices",
    chapters: [
      "locks",
      "semaphores",
      "condition-variables",
      "storage-devices",
      "ssds",
    ],
    order: 5,
  },
];

export function LabProvider({ children }: { children: ReactNode }) {
  const getLabById = (id: string) => {
    return LABS.find((lab) => lab.id === id);
  };

  const getLabsByChapter = (chapterId: string) => {
    return LABS.filter((lab) => lab.chapters.includes(chapterId));
  };

  const value: LabContextValue = {
    labs: LABS,
    getLabById,
    getLabsByChapter,
  };

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
}

export function useLabs() {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error("useLabs must be used within a LabProvider");
  }
  return context;
}
