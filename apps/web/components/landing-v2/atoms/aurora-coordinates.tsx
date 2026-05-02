'use client';

import { useEffect, useState } from 'react';

/**
 * Ticking coordinates centred on Salento, Quindío. Sub-arcseconds wiggle
 * deterministically — the dossier feels alive, never chaotic.
 */
export function AuroraCoordinates({ className = '' }: { className?: string }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((p) => p + 1), 220);
    return () => clearInterval(id);
  }, []);

  const latSec = (42 + Math.sin(t / 14) * 2.7).toFixed(2);
  const lonSec = (17 + Math.cos(t / 13) * 2.4).toFixed(2);

  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-aurora-ink-mute)] tabular-nums ${className}`}
      style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-[var(--color-aurora-deep)] opacity-70"
      />
      N 04°32&apos;{latSec}&quot; · W 075°40&apos;{lonSec}&quot;
    </span>
  );
}
