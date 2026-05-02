'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface AuroraArchetypeProps {
  name: string;
  copy: string;
  glyph: ReactNode;
  /** When true, the card is the user's primary archetype (mock highlight). */
  primary?: boolean;
  /** When true, accent uses moss (nature/conscious archetypes). */
  natural?: boolean;
}

/**
 * Compact archetype card. Glyph in tier-color, italic name, single-line copy.
 * Hover lifts subtly. The "primary" variant gets a violet rule on top + chip.
 */
export function AuroraArchetype({
  name,
  copy,
  glyph,
  primary = false,
  natural = false,
}: AuroraArchetypeProps) {
  const accent = natural ? 'var(--color-aurora-moss)' : 'var(--color-aurora-deep)';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="aurora-card group relative flex flex-col gap-3 p-5"
      style={{ borderColor: primary ? accent : 'var(--color-rule)' }}
    >
      {primary && (
        <span
          aria-hidden
          className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[8px] uppercase tracking-[0.32em]"
          style={{
            backgroundColor: accent,
            color: '#FFFFFF',
            fontFamily: 'var(--font-family-aurora-sans)',
            fontWeight: 700,
          }}
        >
          PRIMARIO
        </span>
      )}

      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{
            backgroundColor: natural
              ? 'var(--color-aurora-moss-soft)'
              : 'var(--color-aurora-soft)',
            color: accent,
          }}
        >
          {glyph}
        </div>
        <span
          aria-hidden
          className="block h-px w-8 transition-all duration-500 group-hover:w-12"
          style={{ backgroundColor: 'var(--color-rule)' }}
        />
      </div>

      <div
        className="text-[18px] leading-[1.15] tracking-[-0.005em] text-[var(--color-aurora-ink)]"
        style={{
          fontFamily: 'var(--font-family-aurora-display)',
          fontStyle: 'italic',
        }}
      >
        {name}
      </div>

      <p
        className="text-[12px] leading-[1.55] text-[var(--color-aurora-ink-mute)]"
        style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
      >
        {copy}
      </p>
    </motion.div>
  );
}
