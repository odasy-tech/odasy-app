'use client';

import { useAuroraTheme } from '../lib/theme-context';

/**
 * Theme switch — sun / moon. Two-cell chip mirroring the previous
 * language-toggle composition. Active cell solid violet (light theme keeps
 * the violet-deep, dark theme keeps the same brand violet for continuity).
 */
export function AuroraThemeToggle() {
  const { theme, setTheme } = useAuroraTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center gap-px border border-[var(--color-rule)] bg-[var(--color-vellum)] p-0.5 backdrop-blur"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label="Light theme"
        className={`flex h-7 w-9 items-center justify-center transition ${
          theme === 'light'
            ? 'bg-[var(--color-aurora-deep)] text-white'
            : 'text-[var(--color-aurora-ink-mute)] hover:text-[var(--color-aurora-ink)]'
        }`}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label="Dark theme"
        className={`flex h-7 w-9 items-center justify-center transition ${
          theme === 'dark'
            ? 'bg-[var(--color-aurora-deep)] text-white'
            : 'text-[var(--color-aurora-ink-mute)] hover:text-[var(--color-aurora-ink)]'
        }`}
      >
        <MoonIcon />
      </button>
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.2" />
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
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
