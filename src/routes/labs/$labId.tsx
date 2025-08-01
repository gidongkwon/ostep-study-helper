import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Beaker, FileText, Target } from "lucide-react";
import { useLabs } from "../../contexts/LabProvider";

export const Route = createFileRoute("/labs/$labId")({
  component: LabRoute,
});

function LabRoute() {
  const { labId } = Route.useParams();
  const { t } = useTranslation();
  const { getLabById } = useLabs();
  
  const lab = getLabById(labId);

  if (!lab) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
        <div className="text-center">
          <Beaker
            className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6"
            strokeWidth={1}
          />
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
            {t("labs.notFound", "Lab not found")}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {t(
              "labs.invalidId",
              "The lab ID '{{labId}}' does not exist.",
              { labId }
            )}
          </p>
        </div>
      </div>
    );
  }

  // Placeholder UI for future lab content
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {lab.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {lab.description}
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("labs.objectives", "Learning Objectives")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t("labs.objectivesPlaceholder", "Lab objectives will be displayed here")}
              </p>
            </div>
            
            <div className="card p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("labs.exercises", "Exercises")}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t("labs.exercisesPlaceholder", "Lab exercises will be displayed here")}
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <p className="text-center text-yellow-800 dark:text-yellow-200">
              {t(
                "labs.comingSoon",
                "Full lab content with interactive exercises, code examples, and resources will be available in a future update."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}