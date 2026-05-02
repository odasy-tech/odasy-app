import type { ReactNode } from 'react';
import { cn } from '../../shared/utils';

export type RewardKind = 'xp' | 'badge' | 'stamp' | 'title';

export interface RewardChipProps {
  kind: RewardKind;
  /** Primary label (e.g. "+150 XP" or "Caficultor"). */
  label: string;
  /** Optional secondary label (e.g. tier "GOLD"). */
  hint?: string;
  /** Override leading glyph; defaults vary by kind. */
  glyph?: ReactNode;
  className?: string;
}

const KIND_DEFAULTS: Record<RewardKind, { bg: string; text: string; dot: string; defaultGlyph: string }> = {
  xp: {
    bg: 'bg-[var(--color-warm-soft)]',
    text: 'text-[var(--color-warm-base)]',
    dot: 'bg-[var(--color-warm-base)]',
    defaultGlyph: '✦',
  },
  badge: {
    bg: 'bg-[var(--color-accent-soft)]',
    text: 'text-[var(--color-accent-action)]',
    dot: 'bg-[var(--color-accent-action)]',
    defaultGlyph: '◈',
  },
  stamp: {
    bg: 'bg-[var(--color-bg-elevated)]',
    text: 'text-[var(--color-ink-primary)]',
    dot: 'bg-[var(--color-stamp-bronze)]',
    defaultGlyph: '◯',
  },
  title: {
    bg: 'bg-[var(--color-nature-soft)]',
    text: 'text-[var(--color-nature-base)]',
    dot: 'bg-[var(--color-nature-base)]',
    defaultGlyph: '⌑',
  },
};

/**
 * Reward chip — surfaces in mission cards and stamp ceremonies.
 * Communicates "what you'll earn" with a glyph + label + optional hint.
 */
export function RewardChip({ kind, label, hint, glyph, className }: RewardChipProps) {
  const style = KIND_DEFAULTS[kind];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em]',
        style.bg,
        style.text,
        className,
      )}
      style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
    >
      <span aria-hidden className="text-[12px] leading-none">
        {glyph ?? style.defaultGlyph}
      </span>
      {label}
      {hint ? (
        <span
          className="opacity-70"
          style={{ fontWeight: 500 }}
        >
          · {hint}
        </span>
      ) : null}
    </span>
  );
}
