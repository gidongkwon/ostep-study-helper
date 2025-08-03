import React from "react";
import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";
import { GradientCard } from "./GradientCard";
import { CircularProgress } from "./CircularProgress";

export interface OverallStatsData {
  completed: number;
  total: number;
  percentage: number;
}

interface OverallProgressCardProps {
  stats: OverallStatsData;
  className?: string;
}

export const OverallProgressCard = React.memo(function OverallProgressCard({ 
  stats, 
  className = "" 
}: OverallProgressCardProps) {
  const { t } = useTranslation();

  return (
    <GradientCard
      from="blue-50"
      to="green-50"
      className={`border border-blue-200/50 dark:border-blue-700/50 ${className}`}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <CircularProgress
          percentage={stats.percentage}
          size="md"
          color="blue"
          showLabel={true}
          className="sm:hidden flex-shrink-0"
          aria-label={t("dashboard.overallProgress", { percentage: stats.percentage })}
        />

        <GradientCard
          from="blue-500"
          to="green-500"
          className="hidden sm:flex w-16 h-16 rounded-full items-center justify-center shadow-lg flex-shrink-0"
          padding="sm"
        >
          <Zap className="w-8 h-8 text-white" aria-hidden="true" />
        </GradientCard>

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {t("dashboard.keepUpTheWork")}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            {t("dashboard.completedDescription", {
              completed: stats.completed,
              total: stats.total,
            })}
            {stats.completed > 0 &&
              ` ${t("dashboard.percentageDescription", { percentage: stats.percentage })}`}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <CircularProgress
            percentage={stats.percentage}
            size="lg"
            color="blue"
            showLabel={true}
            aria-label={t("dashboard.overallProgress", { percentage: stats.percentage })}
          />
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("common.complete")}
            </div>
          </div>
        </div>
      </div>
    </GradientCard>
  );
});