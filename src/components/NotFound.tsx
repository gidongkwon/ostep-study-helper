import { Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
      <div className="text-center">
        <Search
          className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6"
          strokeWidth={1}
        />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          404
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">
          {t("notFound.title", "Page not found")}
        </p>
        <p className="text-gray-400 dark:text-gray-500 mb-8">
          {t(
            "notFound.description",
            "The page you're looking for doesn't exist or has been moved.",
          )}
        </p>
        <Link to="/" className="btn-primary inline-flex items-center space-x-2">
          <Home className="w-4 h-4" />
          <span>{t("notFound.goHome", "Go to Dashboard")}</span>
        </Link>
      </div>
    </div>
  );
}
