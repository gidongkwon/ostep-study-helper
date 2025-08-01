import { useTranslation } from "react-i18next";
import { Target, FileText } from "lucide-react";
import { IconCard } from "./IconCard";
import { GradientCard } from "./GradientCard";

export function LabPlaceholder() {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
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

        <IconCard
          icon={<FileText className="w-6 h-6 text-white" />}
          title={t("labs.exercises", "Exercises")}
          color="green"
          hoverable={false}
        >
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              {t(
                "labs.exercisesPlaceholder",
                "Lab exercises will be displayed here when content is added.",
              )}
            </p>
          </div>
        </IconCard>
      </div>

      <GradientCard
        from="yellow-50"
        to="yellow-50"
        className="mt-8 border border-yellow-200 dark:border-yellow-800"
      >
        <p className="text-center text-yellow-800 dark:text-yellow-200">
          {t(
            "labs.comingSoon",
            "Full lab content with interactive exercises, code examples, and resources will be available in a future update.",
          )}
        </p>
      </GradientCard>
    </>
  );
}
