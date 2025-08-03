export type SectionColor =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "red"
  | "indigo";

export function useColorMapper() {
  const getColorClasses = (color: SectionColor): string => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "purple":
        return "bg-purple-500";
      case "green":
        return "bg-green-500";
      case "orange":
        return "bg-orange-500";
      case "red":
        return "bg-red-500";
      case "indigo":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  const getIconBgClasses = (color: SectionColor): string => {
    switch (color) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      case "purple":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "green":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "orange":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
      case "red":
        return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
      case "indigo":
        return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400";
    }
  };

  return {
    getColorClasses,
    getIconBgClasses,
  };
}
