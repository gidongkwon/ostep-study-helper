import { type SectionColor } from "./useColorMapper";

export interface WaveColorScheme {
  primary: string;
  secondary: string;
  tertiary: string;
}

export type WaveColorMap = Record<SectionColor | "yellow" | "gray", WaveColorScheme>;

export const WAVE_COLORS: WaveColorMap = {
  blue: {
    primary: "#4579e2",
    secondary: "#3461c1",
    tertiary: "#2d55aa",
  },
  purple: {
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    tertiary: "#6d28d9",
  },
  green: {
    primary: "#10b981",
    secondary: "#059669",
    tertiary: "#047857",
  },
  orange: {
    primary: "#f97316",
    secondary: "#ea580c",
    tertiary: "#dc2626",
  },
  red: {
    primary: "#ef4444",
    secondary: "#dc2626",
    tertiary: "#b91c1c",
  },
  indigo: {
    primary: "#6366f1",
    secondary: "#4f46e5",
    tertiary: "#4338ca",
  },
  yellow: {
    primary: "#fbbf24",
    secondary: "#f59e0b",
    tertiary: "#d97706",
  },
  gray: {
    primary: "#9ca3af",
    secondary: "#6b7280",
    tertiary: "#4b5563",
  },
};