/**
 * Stylised compass rose. Rotates imperceptibly (360° over 4 minutes) to give
 * the page the feel of a live instrument. Pure CSS animation, no JS.
 */
export function Compass({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-slow-rotate text-bone-mute"
      aria-hidden
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.25" />

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
            strokeWidth={long ? 0.8 : 0.4}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}

      {/* N arrow in volt — the only saturated element */}
      <path
        d="M50 10 L53 48 L50 44 L47 48 Z"
        fill="var(--color-volt)"
        stroke="var(--color-volt)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* S arrow (muted) */}
      <path
        d="M50 90 L53 52 L50 56 L47 52 Z"
        fill="currentColor"
        fillOpacity="0.35"
      />

      {/* Centre hub */}
      <circle cx="50" cy="50" r="1.6" fill="var(--color-volt)" />
      <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth="0.4" />

      {/* N label */}
      <text
        x="50"
        y="3.4"
        fontSize="3.6"
        textAnchor="middle"
        fill="var(--color-volt)"
        fontFamily="var(--font-mono)"
        letterSpacing="0.4"
      >
        N
      </text>
    </svg>
  );
}
