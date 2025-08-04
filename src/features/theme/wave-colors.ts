import { type SectionColor } from "./useColorMapper";

export interface WaveColorScheme {
  primary: string;
  secondary: string;
  tertiary: string;
}

export type WaveColorMap = Record<SectionColor | "yellow" | "gray", WaveColorScheme>;

export const WAVE_COLORS: WaveColorMap = {
  blue: {
    primary: "#60a5fa",
    secondary: "#3b82f6",
    tertiary: "#2563eb",
  },
  purple: {
    primary: "#a78bfa",
    secondary: "#8b5cf6",
    tertiary: "#7c3aed",
  },
  green: {
    primary: "#34d399",
    secondary: "#10b981",
    tertiary: "#059669",
  },
  orange: {
    primary: "#fbbf24",
    secondary: "#f59e0b",
    tertiary: "#d97706",
  },
  red: {
    primary: "#f87171",
    secondary: "#ef4444",
    tertiary: "#dc2626",
  },
  indigo: {
    primary: "#818cf8",
    secondary: "#6366f1",
    tertiary: "#4f46e5",
  },
  yellow: {
    primary: "#fde047",
    secondary: "#facc15",
    tertiary: "#eab308",
  },
  gray: {
    primary: "#d1d5db",
    secondary: "#9ca3af",
    tertiary: "#6b7280",
  },
};;