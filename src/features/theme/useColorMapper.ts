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
        return "bg-blue-500 dark:bg-blue-600 text-white";
      case "purple":
        return "bg-purple-500 dark:bg-purple-600 text-white";
      case "green":
        return "bg-green-500 dark:bg-green-600 text-white";
      case "orange":
        return "bg-orange-500 dark:bg-orange-600 text-white";
      case "red":
        return "bg-red-500 dark:bg-red-600 text-white";
      case "indigo":
        return "bg-indigo-500 dark:bg-indigo-600 text-white";
      default:
        return "bg-gray-500 dark:bg-gray-600 text-white";
    }
  };

  return {
    getColorClasses,
    getIconBgClasses,
  };
}
