'use client';

import type { ReactNode } from 'react';
import { AuroraChapterRail } from './atoms/aurora-chapter-rail';
import { useAuroraTheme } from './lib/theme-context';

/**
 * Wraps the v2 landing in a client boundary that toggles the `aurora-dark`
 * class based on the current theme. Light is the default; first paint
 * always renders light to avoid hydration drift.
 *
 * Also mounts the chapter rail (right edge, lg+) and an aria-live region
 * so screen readers are notified when the user changes the theme.
 */
export function V2Shell({ children }: { children: ReactNode }) {
  const { theme } = useAuroraTheme();
  const themeClass = theme === 'dark' ? 'aurora-dark' : '';

  return (
    <main
      className={`aurora-paper relative min-h-screen text-[var(--color-aurora-ink)] ${themeClass}`}
      style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
    >
      <AuroraChapterRail />
      <div role="status" aria-live="polite" className="sr-only">
        {theme === 'dark' ? 'Tema oscuro activo' : 'Tema claro activo'}
      </div>
      {children}
    </main>
  );
}
