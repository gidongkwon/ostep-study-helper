import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ErrorBoundary() {
  // Error will be passed as prop in TanStack Router v1
  console.error("Error boundary triggered");
  
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
      <div className="text-center">
        <AlertCircle
          className="mx-auto h-24 w-24 text-red-500 dark:text-red-400 mb-6"
          strokeWidth={1}
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("errors.title")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {t("errors.description")}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          {t("errors.refreshButton")}
        </button>
      </div>
    </div>
  );
}
