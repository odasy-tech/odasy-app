'use client';

import { cn } from '../../shared/utils';
import { useTheme } from '../theme';

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme switch — two icon buttons. Active icon is rendered in the
 * accent colour, inactive in muted ink.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        'inline-flex items-center gap-1 rounded-full border p-1',
        className,
      )}
      style={{
        borderColor: 'var(--color-border-default)',
        backgroundColor: 'var(--color-bg-elevated)',
      }}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={!isDark}
        aria-label="Light theme"
        className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
        style={{
          color: !isDark
            ? 'var(--color-accent-action)'
            : 'var(--color-ink-secondary)',
        }}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={isDark}
        aria-label="Dark theme"
        className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
        style={{
          color: isDark
            ? 'var(--color-accent-action)'
            : 'var(--color-ink-secondary)',
        }}
      >
        <MoonIcon />
      </button>
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M11.5 8.4 A 4.6 4.6 0 0 1 5.6 2.5 A 5 5 0 1 0 11.5 8.4 Z"
        fill="currentColor"
      />
    </svg>
  );
}
