import React from "react";
import { useTranslation } from "react-i18next";
import { StatCard } from "./StatCard";

export interface StatsData {
  completed: number;
  inProgress: number;
  notStarted: number;
}

interface StatsGridProps {
  stats: StatsData;
  className?: string;
}

export const StatsGrid = React.memo(function StatsGrid({ 
  stats, 
  className = "" 
}: StatsGridProps) {
  const { t } = useTranslation();

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      <StatCard
        value={stats.completed}
        label={t("common.completed")}
        color="blue"
      />
      <StatCard
        value={stats.inProgress}
        label={t("common.inProgress")}
        color="yellow"
      />
      <StatCard
        value={stats.notStarted}
        label={t("common.notStarted")}
        color="gray"
      />
    </div>
  );
});