import type { ReactNode } from "react";
import { LabContext, type Lab, type LabContextValue } from "./LabContext";

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

