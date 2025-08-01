export function LoadingSpinner() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50/30 dark:bg-gray-900/30">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-500 dark:border-t-blue-400"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
