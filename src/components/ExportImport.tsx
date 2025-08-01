import { useRef } from "react";
import { useStudyProgress } from "../contexts/StudyProgressContext";

export function ExportImport() {
  const { exportProgress, importProgress } = useStudyProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ostep-progress-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importProgress(content);
        if (success) {
          alert("Progress imported successfully!");
          window.location.reload(); // Reload to update UI
        } else {
          alert("Failed to import progress. Please check the file format.");
        }
      } catch {
        alert("Error importing file. Please check the file format.");
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleExport}
        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Export progress"
      >
        Export
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Import progress"
      >
        Import
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}
