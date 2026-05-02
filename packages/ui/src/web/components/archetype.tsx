'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '../../shared/utils';

export type ArchetypeAccent = 'violet' | 'moss';

export interface ArchetypeProps {
  /** Italic display name (e.g. "Navegante", "Contemplador"). */
  name: string;
  /** One-line copy describing the archetype. */
  copy: string;
  /** Glyph rendered in the top-left chip. */
  glyph: ReactNode;
  /** When true, the card is the user's primary archetype (highlights). */
  primary?: boolean;
  /** When true, accent uses moss (nature/conscious archetypes). */
  accent?: ArchetypeAccent;
  className?: string;
}

/**
 * Compact archetype card. Glyph in tier-color, italic name, single-line
 * copy. Hover lifts subtly. The "primary" variant gets a brand chip
 * floating above the card edge.
 */
export function Archetype({
  name,
  copy,
  glyph,
  primary = false,
  accent = 'violet',
  className,
}: ArchetypeProps) {
  const accentVar =
    accent === 'moss'
      ? 'var(--color-nature-base)'
      : 'var(--color-accent-action)';
  const softVar =
    accent === 'moss' ? 'var(--color-nature-soft)' : 'var(--color-accent-soft)';
  const primaryLabel = 'Primario';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={cn('ds-card group relative flex flex-col gap-3 p-5', className)}
      style={{ borderColor: primary ? accentVar : 'var(--color-border-default)' }}
    >
      {primary && (
        <span
          aria-hidden
          className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[8px] uppercase tracking-[0.32em]"
          style={{
            backgroundColor: accentVar,
            color: '#FFFFFF',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
          }}
        >
          {primaryLabel}
        </span>
      )}

      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: softVar, color: accentVar }}
        >
          {glyph}
        </div>
        <span
          aria-hidden
          className="block h-px w-8 transition-all duration-500 group-hover:w-12"
          style={{ backgroundColor: 'var(--color-border-default)' }}
        />
      </div>

      <div
        className="text-[18px] leading-[1.15] tracking-[-0.005em] text-[var(--color-ink-primary)]"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
        }}
      >
        {name}
      </div>

      <p
        className="text-[12px] leading-[1.55] text-[var(--color-ink-secondary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {copy}
      </p>
    </motion.div>
  );
}
