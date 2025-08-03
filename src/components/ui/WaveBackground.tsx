import { type SectionColor } from "../../hooks/useColorMapper";

interface WaveBackgroundProps {
  color: SectionColor;
  percentage: number;
  className?: string;
}

const colorMap = {
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

export function WaveBackground({ color, percentage, className = "" }: WaveBackgroundProps) {
  const colors = colorMap[color];

  return (
    <div 
      className={`absolute inset-0 w-full transition-all duration-500 ease-out ${className}`}
    >
      {/* Solid color fill background */}
      {/* <div 
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{ backgroundColor: colors.primary, height: `${percentage}%` }}
      /> */}
      
      {/* Thin wave animation at the top of the fill */}
      <svg
        className="wave-background absolute left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 44 150 250"
        preserveAspectRatio="none"
        style={{ top: `${100 - percentage}%` }}
      >
        <defs>
          <path
            id={`gentle-wave-${color}`}
            d="M -160 50 c 30 0 58 -6 88 -6 s 58 6 88 6 s 58 -6 88 -6 s 58 6 88 6 v 539 h -352 z"
          />
        </defs>
        <g className="wave-parallax">
          
          <use
            xlinkHref={`#gentle-wave-${color}`}
            x="50"
            y="1"
            fill={colors.secondary}
            className="opacity-25 dark:opacity-10"
          />
          <use
            xlinkHref={`#gentle-wave-${color}`}
            x="50"
            y="2"
            fill={colors.tertiary}
            className="opacity-20 dark:opacity-[0.08]"
          />
          <use
            xlinkHref={`#gentle-wave-${color}`}
            x="50"
            y="0"
            fill={colors.primary}
            className="opacity-15 dark:opacity-5"
          />
        </g>
      </svg>
    </div>
  );
}