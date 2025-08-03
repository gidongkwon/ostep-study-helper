import { useTranslation } from "react-i18next";
import { Target } from "lucide-react";
import { IconCard } from "./IconCard";

export function LabPlaceholder() {
  const { t } = useTranslation();

  return (
    <IconCard
      icon={<Target className="w-6 h-6 text-white" />}
      title={t("labs.objectives", "Learning Objectives")}
      color="blue"
      hoverable={false}
    >
      <div className="mt-4">
        <p className="text-gray-600 dark:text-gray-400">
          {t(
            "labs.objectivesPlaceholder",
            "Lab objectives will be displayed here when content is added.",
          )}
        </p>
      </div>
    </IconCard>
  );
}
