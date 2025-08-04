import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LabContext, type Lab, type LabContextValue } from "./LabContext";

// Placeholder labs - to be expanded in the future

export function LabProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const LABS: Lab[] = [
    {
      id: "lab1",
      name: t("labs.lab1.name", "Lab 1: Introduction to OS"),
      description: t("labs.lab1.description", "Getting started with operating systems concepts"),
      chapters: ["intro-os", "arch-support", "processes"],
      order: 1,
    },
    {
      id: "lab2",
      name: t("labs.lab2.name", "Lab 2: CPU Scheduling"),
      description: t("labs.lab2.description", "Understanding CPU scheduling and virtual memory"),
      chapters: ["cpu-scheduling", "virtual-memory"],
      order: 2,
    },
    {
      id: "lab3",
      name: t("labs.lab3.name", "Lab 3: Paging and Memory"),
      description: t("labs.lab3.description", "Deep dive into paging, page tables, and TLB"),
      chapters: ["paging", "page-tables", "tlb", "memory-mapping"],
      order: 3,
    },
    {
      id: "lab4",
      name: t("labs.lab4.name", "Lab 4: Advanced Memory"),
      description: t("labs.lab4.description", "Swapping, VM implementations, and threads"),
      chapters: ["swapping", "vm-implementations", "threads"],
      order: 4,
    },
    {
      id: "lab5",
      name: t("labs.lab5.name", "Lab 5: Concurrency and Storage"),
      description: t("labs.lab5.description", "Synchronization primitives and storage devices"),
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
