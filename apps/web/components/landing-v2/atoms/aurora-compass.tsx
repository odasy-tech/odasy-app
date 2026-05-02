/**
 * Cartographic compass rose — light surface, deep-violet north arrow.
 * Rotates 360° over 4 minutes (almost imperceptible) to convey "live
 * instrument" without being decorative.
 */
export function AuroraCompass({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className="animate-slow-rotate text-[var(--color-aurora-ink-mute)]"
      aria-hidden
    >
      {/* Outer rings */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.4" />

      {/* Cardinal ticks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const long = i % 4 === 0;
        return (
          <line
            key={i}
            x1="50"
            y1="4"
            x2="50"
            y2={long ? 10 : 7}
            stroke="currentColor"
            strokeOpacity={long ? 0.85 : 0.5}
            strokeWidth={long ? 0.8 : 0.4}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}

      {/* N arrow — only saturated element */}
      <path
        d="M50 10 L53 48 L50 44 L47 48 Z"
        fill="var(--color-aurora-deep)"
        stroke="var(--color-aurora-deep)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* S arrow muted */}
      <path
        d="M50 90 L53 52 L50 56 L47 52 Z"
        fill="currentColor"
        fillOpacity="0.32"
      />

      {/* Centre hub */}
      <circle cx="50" cy="50" r="1.6" fill="var(--color-aurora-deep)" />
      <circle cx="50" cy="50" r="4" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.4" />

      {/* N label */}
      <text
        x="50"
        y="3.4"
        fontSize="3.6"
        textAnchor="middle"
        fill="var(--color-aurora-deep)"
        fontFamily="var(--font-family-aurora-sans)"
        fontWeight="600"
        letterSpacing="0.4"
      >
        N
      </text>
    </svg>
  );
}
