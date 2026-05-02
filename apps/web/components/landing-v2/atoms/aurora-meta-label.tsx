import type { ReactNode } from 'react';

type Tone = 'mute' | 'accent' | 'ink' | 'inverse';

const tones: Record<Tone, string> = {
  mute: 'text-[var(--color-aurora-ink-mute)]',
  accent: 'text-[var(--color-aurora-deep)]',
  ink: 'text-[var(--color-aurora-ink)]',
  inverse: 'text-white/70',
};

/**
 * Editorial caps label — DM Sans tracked tight, used as classification
 * markers, chapter numbering, and instrument tags. Replaces the JetBrains
 * Mono treatment of the dark landing with a more refined caps cadence.
 */
export function AuroraMetaLabel({
  children,
  tone = 'mute',
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-medium uppercase tracking-[0.32em] ${tones[tone]} ${className}`}
      style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
    >
      {children}
    </span>
  );
}
