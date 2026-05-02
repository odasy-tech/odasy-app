/**
 * Cinematic compass-rose backdrop for the v2 opener — sits behind the
 * "Odasy" wordmark, slow-rotating, very low alpha. Its job is to suggest
 * "you are about to set sail" without competing with the title.
 *
 * Sized at 84vh (limited to viewport), centred horizontally, slightly
 * offset upward so the wordmark crosses through its centre.
 */
export function AuroraCompassBackdrop() {
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
        className="animate-slow-rotate h-full w-full"
        style={{ opacity: 0.085 }}
      >
        <defs>
          <radialGradient id="compassFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-aurora-deep)" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--color-aurora-deep)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-aurora-deep)" stopOpacity="0" />
          </radialGradient>
          <mask id="compassMask">
            <rect width="200" height="200" fill="url(#compassFade)" />
          </mask>
        </defs>

        <g mask="url(#compassMask)" stroke="var(--color-aurora-deep)" fill="none">
          {/* Outer rings */}
          <circle cx="100" cy="100" r="98" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="86" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="68" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="48" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="32" strokeWidth="0.3" strokeDasharray="0.8 1.6" />
          <circle cx="100" cy="100" r="18" strokeWidth="0.4" />

          {/* 32 ticks */}
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

          {/* Cardinal stars (N E S W spokes pointing in) */}
          <path d="M100 14 L102 50 L100 46 L98 50 Z" fill="var(--color-aurora-deep)" stroke="none" />
          <path d="M100 186 L102 150 L100 154 L98 150 Z" fill="var(--color-aurora-deep)" stroke="none" opacity="0.6" />
          <path d="M14 100 L50 102 L46 100 L50 98 Z" fill="var(--color-aurora-deep)" stroke="none" opacity="0.6" />
          <path d="M186 100 L150 102 L154 100 L150 98 Z" fill="var(--color-aurora-deep)" stroke="none" opacity="0.6" />

          {/* Centre hub */}
          <circle cx="100" cy="100" r="2.4" fill="var(--color-aurora-deep)" stroke="none" />

          {/* Diagonal cross-hairs (very faint) */}
          <line x1="20" y1="20" x2="180" y2="180" strokeWidth="0.25" strokeDasharray="0.6 2" />
          <line x1="180" y1="20" x2="20" y2="180" strokeWidth="0.25" strokeDasharray="0.6 2" />
        </g>

        {/* Cardinal labels */}
        <g
          fontFamily="var(--font-family-aurora-display)"
          fontSize="6"
          fontStyle="italic"
          fill="var(--color-aurora-deep)"
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
