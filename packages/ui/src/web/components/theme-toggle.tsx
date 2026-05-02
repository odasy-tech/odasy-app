'use client';

import { cn } from '../../shared/utils';
import { useTheme } from '../theme';

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Editorial theme switch — a single icon that flips between sun and moon.
 *
 * Design rationale: the header is a hairline editorial frame, so the
 * toggle is rendered as a bare glyph (no pill, no chrome). Hover lifts
 * the icon to the accent colour. Clicking calls `setTheme` directly
 * with the inverse of the current theme.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className={cn(
        'flex h-7 w-7 items-center justify-center transition-colors',
        'text-[var(--color-ink-secondary)] hover:text-[var(--color-accent-action)]',
        className,
      )}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <line x1="7" y1="0.8" x2="7" y2="2.4" />
        <line x1="7" y1="11.6" x2="7" y2="13.2" />
        <line x1="0.8" y1="7" x2="2.4" y2="7" />
        <line x1="11.6" y1="7" x2="13.2" y2="7" />
        <line x1="2.6" y1="2.6" x2="3.7" y2="3.7" />
        <line x1="10.3" y1="10.3" x2="11.4" y2="11.4" />
        <line x1="2.6" y1="11.4" x2="3.7" y2="10.3" />
        <line x1="10.3" y1="3.7" x2="11.4" y2="2.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M11.5 8.4 A 4.6 4.6 0 0 1 5.6 2.5 A 5 5 0 1 0 11.5 8.4 Z"
        fill="currentColor"
      />
    </svg>
  );
}
