import { type SectionColor } from "../theme/useColorMapper";
import { getChaptersBySection } from "../chapters/curriculum";
import type { Chapter } from "../../types";

export interface ProgressSection {
  id: string;
  title: string;
  chapters: Chapter[];
  color: SectionColor;
}

export interface SectionConfig {
  id: string;
  titleKey: string;
  color: SectionColor;
}

export const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: "lab1",
    titleKey: "sections.lab1",
    color: "blue",
  },
  {
    id: "lab2", 
    titleKey: "sections.lab2",
    color: "purple",
  },
  {
    id: "lab3",
    titleKey: "sections.lab3", 
    color: "green",
  },
  {
    id: "lab4",
    titleKey: "sections.lab4",
    color: "orange",
  },
  {
    id: "lab5",
    titleKey: "sections.lab5",
    color: "red",
  },
  {
    id: "filesystem",
    titleKey: "sections.filesystem",
    color: "indigo",
  },
];

export function createProgressSections(t: (key: string) => string): ProgressSection[] {
  return SECTION_CONFIGS.map((config) => ({
    id: config.id,
    title: config.id.startsWith("lab") 
      ? `H.${config.id.slice(3)}: ${t(config.titleKey)}`
      : t(config.titleKey),
    chapters: getChaptersBySection(config.id as Chapter["section"]),
    color: config.color,
  }));
}