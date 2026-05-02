/**
 * Cinematic compass-rose backdrop — sits behind the hero wordmark,
 * slow-rotates, very low alpha. Suggests "you are about to set sail"
 * without competing with the title.
 */
export function CompassBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 'min(84vh, 96vw)',
        height: 'min(84vh, 96vw)',
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="ds-animate-rotate h-full w-full"
        style={{ opacity: 0.085 }}
      >
        <defs>
          <radialGradient id="compass-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-action)" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--color-accent-action)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-accent-action)" stopOpacity="0" />
          </radialGradient>
          <mask id="compass-mask">
            <rect width="200" height="200" fill="url(#compass-fade)" />
          </mask>
        </defs>

        <g mask="url(#compass-mask)" stroke="var(--color-accent-action)" fill="none">
          <circle cx="100" cy="100" r="98" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="86" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="68" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="48" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="32" strokeWidth="0.3" strokeDasharray="0.8 1.6" />
          <circle cx="100" cy="100" r="18" strokeWidth="0.4" />

          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i * 360) / 32;
            const major = i % 4 === 0;
            const cardinal = i % 8 === 0;
            return (
              <line
                key={i}
                x1="100"
                y1={cardinal ? 2 : major ? 8 : 12}
                x2="100"
                y2="14"
                strokeWidth={cardinal ? 1.2 : major ? 0.8 : 0.4}
                transform={`rotate(${angle} 100 100)`}
              />
            );
          })}

          <path d="M100 14 L102 50 L100 46 L98 50 Z" fill="var(--color-accent-action)" stroke="none" />
          <path d="M100 186 L102 150 L100 154 L98 150 Z" fill="var(--color-accent-action)" stroke="none" opacity="0.6" />
          <path d="M14 100 L50 102 L46 100 L50 98 Z" fill="var(--color-accent-action)" stroke="none" opacity="0.6" />
          <path d="M186 100 L150 102 L154 100 L150 98 Z" fill="var(--color-accent-action)" stroke="none" opacity="0.6" />

          <circle cx="100" cy="100" r="2.4" fill="var(--color-accent-action)" stroke="none" />

          <line x1="20" y1="20" x2="180" y2="180" strokeWidth="0.25" strokeDasharray="0.6 2" />
          <line x1="180" y1="20" x2="20" y2="180" strokeWidth="0.25" strokeDasharray="0.6 2" />
        </g>

        <g
          fontFamily="var(--font-display)"
          fontSize="6"
          fontStyle="italic"
          fill="var(--color-accent-action)"
          opacity="0.55"
          textAnchor="middle"
        >
          <text x="100" y="9.5">N</text>
          <text x="100" y="194">S</text>
          <text x="9" y="103">W</text>
          <text x="191" y="103">E</text>
        </g>
      </svg>
    </div>
  );
}
