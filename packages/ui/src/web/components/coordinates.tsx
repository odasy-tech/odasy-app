'use client';

import { useEffect, useState } from 'react';
import { cn } from '../../shared/utils';

export interface CoordinatesProps {
  /** Origin latitude (degrees, minutes). Salento by default. */
  baseLat?: { deg: number; min: number };
  /** Origin longitude (degrees, minutes). Salento by default. */
  baseLon?: { deg: number; min: number };
  /** Cardinal direction for latitude. */
  latDir?: 'N' | 'S';
  /** Cardinal direction for longitude. */
  lonDir?: 'E' | 'W';
  /** Show a leading violet status dot. */
  withDot?: boolean;
  className?: string;
}

/**
 * Live-tick coordinate display. Sub-arcseconds wobble deterministically,
 * giving the page the texture of a live instrument. Defaults to Salento,
 * Quindío — the v2 landing's anchor.
 */
export function Coordinates({
  baseLat = { deg: 4, min: 32 },
  baseLon = { deg: 75, min: 40 },
  latDir = 'N',
  lonDir = 'W',
  withDot = true,
  className,
}: CoordinatesProps) {
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((p) => p + 1), 220);
    return () => clearInterval(id);
  }, []);

  const latSec = (42 + Math.sin(t / 14) * 2.7).toFixed(2);
  const lonSec = (17 + Math.cos(t / 13) * 2.4).toFixed(2);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-secondary)] tabular-nums',
        className,
      )}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {withDot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-action)] opacity-70"
        />
      )}
      {latDir} {String(baseLat.deg).padStart(2, '0')}°{baseLat.min}&apos;{latSec}&quot; ·{' '}
      {lonDir} {String(baseLon.deg).padStart(3, '0')}°{baseLon.min}&apos;{lonSec}&quot;
    </span>
  );
}
