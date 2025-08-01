import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Beaker } from "lucide-react";
import { useLabs } from "../../contexts/LabProvider";
import { PageContainer } from "../../components/ui/PageContainer";
import { LabPlaceholder } from "../../components/ui/LabPlaceholder";

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
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <Beaker
            className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6"
            strokeWidth={1}
          />
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
            {t("labs.notFound", "Lab not found")}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {t("labs.invalidId", "The lab ID '{{labId}}' does not exist.", {
              labId,
            })}
          </p>
        </div>
      </PageContainer>
    );
  }

  // Placeholder UI for future lab content
  return (
    <PageContainer>
      <div className="card p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {lab.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {lab.description}
        </p>

        <LabPlaceholder />
      </div>
    </PageContainer>
  );
}
