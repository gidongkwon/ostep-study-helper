import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Beaker } from "lucide-react";

export const Route = createFileRoute("/labs/$labId")({
  component: LabRoute,
});

function LabRoute() {
  const { labId } = Route.useParams();
  const { t } = useTranslation();

  // Placeholder for future lab content
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
      <div className="text-center">
        <Beaker
          className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6"
          strokeWidth={1}
        />
        <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
          {t("labs.comingSoon", "Lab Content Coming Soon")}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          {t(
            "labs.placeholder",
            "Lab {{labId}} content will be available in a future update.",
            { labId }
          )}
        </p>
      </div>
    </div>
  );
}