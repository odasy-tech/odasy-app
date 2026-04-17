'use client';

import { useEffect, useState } from 'react';

/**
 * Ticking coordinates — gives the page the feel of a live instrument.
 * Centred near the Eje Cafetero (Quindío approximate).
 */
export function LiveCoordinates({ className = '' }: { className?: string }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((prev) => prev + 1), 180);
    return () => clearInterval(id);
  }, []);

  // Wiggle sub-arcseconds deterministically so it feels alive, not chaotic.
  const latSec = (42 + Math.sin(t / 14) * 2.7).toFixed(2);
  const lonSec = (17 + Math.cos(t / 13) * 2.4).toFixed(2);

  return (
    <span className={`font-mono text-[10px] tracking-[0.18em] uppercase text-bone-mute ${className}`}>
      N 04°32&apos;{latSec}&quot; · W 075°40&apos;{lonSec}&quot;
    </span>
  );
}
