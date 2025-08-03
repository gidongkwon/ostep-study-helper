import React, { useMemo } from "react";
import { type SectionColor } from "../../hooks/useColorMapper";
import { WAVE_COLORS } from "./wave-colors";

interface WaveBackgroundProps {
  color: SectionColor;
  percentage: number;
  className?: string;
}

export const WaveBackground = React.memo(function WaveBackground({ 
  color, 
  percentage, 
  className = "" 
}: WaveBackgroundProps) {
  const colors = WAVE_COLORS[color];
  
  const wavePathId = useMemo(() => `gentle-wave-${color}`, [color]);
  const viewBoxY = 44;
  const viewBoxHeight = 250;
  const waveTopPosition = `${100 - percentage}%`;

  return (
    <div 
      className={`absolute inset-0 w-full transition-all duration-500 ease-out ${className}`}
    >
      <svg
        className="wave-background absolute left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 ${viewBoxY} 150 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        style={{ top: waveTopPosition }}
        aria-hidden="true"
      >
        <defs>
          <path
            id={wavePathId}
            d="M -160 50 c 30 0 58 -6 88 -6 s 58 6 88 6 s 58 -6 88 -6 s 58 6 88 6 v 539 h -352 z"
          />
        </defs>
        <g className="wave-parallax">
          
          <use
            xlinkHref={`#${wavePathId}`}
            x="50"
            y="1"
            fill={colors.secondary}
            className="opacity-15 dark:opacity-10"
          />
          <use
            xlinkHref={`#${wavePathId}`}
            x="50"
            y="2"
            fill={colors.tertiary}
            className="opacity-10 dark:opacity-5"
          />
          <use
            xlinkHref={`#${wavePathId}`}
            x="50"
            y="0"
            fill={colors.primary}
            className="opacity-10 dark:opacity-5"
          />
        </g>
      </svg>
    </div>
  );
});