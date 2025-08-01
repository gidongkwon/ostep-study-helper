import { AlertCircle } from "lucide-react";

export function ErrorBoundary() {
  // Error will be passed as prop in TanStack Router v1
  console.error("Error boundary triggered");

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
      <div className="text-center">
        <AlertCircle
          className="mx-auto h-24 w-24 text-red-500 dark:text-red-400 mb-6"
          strokeWidth={1}
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}