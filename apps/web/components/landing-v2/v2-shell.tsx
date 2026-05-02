'use client';

import type { ReactNode } from 'react';
import { useAuroraTheme } from './lib/theme-context';

/**
 * Wraps the v2 landing in a client boundary that toggles the `aurora-dark`
 * class based on the current theme. Light is the default; first paint
 * always renders light to avoid hydration drift.
 */
export function V2Shell({ children }: { children: ReactNode }) {
  const { theme } = useAuroraTheme();
  const themeClass = theme === 'dark' ? 'aurora-dark' : '';

  return (
    <main
      className={`aurora-paper relative min-h-screen text-[var(--color-aurora-ink)] ${themeClass}`}
      style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
    >
      {children}
    </main>
  );
}
