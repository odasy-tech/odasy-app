'use client';

import { useEffect, useState } from 'react';

/**
 * Reflects the user's `prefers-reduced-motion` system setting.
 * Returns `true` when motion should be reduced, `false` otherwise.
 *
 * Components that opt into motion can use this hook to bail out of
 * animations gracefully.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
