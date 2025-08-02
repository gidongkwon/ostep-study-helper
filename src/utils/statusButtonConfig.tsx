import type { JSX } from "react";
import { Clock, Zap, CheckCircle } from "lucide-react";
import type { ProgressStatus } from "../types";
import type { TFunction } from "i18next";

export interface StatusButtonConfig {
  status: ProgressStatus;
  label: string;
  color: "green" | "yellow" | "gray";
  description: string;
  icon: JSX.Element;
}

export function getStatusButtonConfig(t: TFunction): StatusButtonConfig[] {
  return [
    {
      status: "not-started",
      label: t("chapterView.status.notStarted") || "Not Started",
      color: "gray",
      description:
        t("chapterView.status.notStartedDesc") || "Haven't started this yet",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      status: "in-progress",
      label: t("chapterView.status.inProgress") || "In Progress",
      color: "yellow",
      description:
        t("chapterView.status.inProgressDesc") || "Currently working on this",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      status: "completed",
      label: t("chapterView.status.completed") || "Completed",
      color: "green",
      description: t("chapterView.status.completedDesc") || "Finished this",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];
}
