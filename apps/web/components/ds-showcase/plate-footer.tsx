'use client';

import Link from 'next/link';
import { siblings, type PlateEntry } from './nav';

export function PlateFooter({ pathname }: { pathname: string }) {
  const { prev, next } = siblings(pathname);
  if (!prev && !next) return null;

  return (
    <footer className="flex flex-col gap-6 pt-6">
      <div className="ds-rule" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PlateLink direction="prev" entry={prev} />
        <PlateLink direction="next" entry={next} />
      </div>
    </footer>
  );
}

function PlateLink({
  direction,
  entry,
}: {
  direction: 'prev' | 'next';
  entry: PlateEntry | null;
}) {
  const isNext = direction === 'next';

  if (!entry) {
    return (
      <div
        aria-hidden
        className={[
          'flex flex-col gap-2 border border-dashed border-[var(--color-border-subtle)] p-5 opacity-40',
          isNext ? 'sm:items-end sm:text-right' : '',
        ].join(' ')}
      >
        <span
          className="text-[9px] uppercase tracking-[0.42em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          {isNext ? 'End of dossier' : 'Beginning'}
        </span>
        <span
          className="text-[14px] italic text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          —
        </span>
      </div>
    );
  }

  return (
    <Link
      href={entry.href}
      className={[
        'group relative flex flex-col gap-2 border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-5 transition-all',
        'hover:border-[var(--color-accent-action)] hover:bg-[var(--color-bg-elevated)]',
        isNext ? 'sm:items-end sm:text-right' : '',
      ].join(' ')}
    >
      <span
        className="flex items-center gap-2 text-[9px] uppercase tracking-[0.42em] text-[var(--color-ink-tertiary)] group-hover:text-[var(--color-accent-action)]"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
      >
        {!isNext && <span aria-hidden>←</span>}
        <span>{isNext ? 'Next plate' : 'Previous plate'}</span>
        <span className="text-[var(--color-border-default)]">·</span>
        <span
          className="italic tabular-nums"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {entry.plate}
        </span>
        {isNext && <span aria-hidden>→</span>}
      </span>
      <span
        className="text-[22px] leading-[1.1] tracking-[-0.015em] text-[var(--color-ink-primary)] sm:text-[26px]"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
      >
        {entry.label}
      </span>
      {entry.blurb ? (
        <span
          className="max-w-sm text-[12.5px] leading-[1.55] text-[var(--color-ink-secondary)]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {entry.blurb}
        </span>
      ) : null}
    </Link>
  );
}
