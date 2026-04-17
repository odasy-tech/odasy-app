import type { ReactNode } from 'react';

/**
 * Small monospace caps label used throughout the dossier. Gives the
 * "classified metadata" texture that signals this is not marketing copy.
 */
export function MetaLabel({
  children,
  tone = 'mute',
  className = '',
}: {
  children: ReactNode;
  tone?: 'mute' | 'volt' | 'bone';
  className?: string;
}) {
  const color =
    tone === 'volt'
      ? 'text-volt'
      : tone === 'bone'
        ? 'text-bone'
        : 'text-bone-mute';
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${color} ${className}`}
    >
      {children}
    </span>
  );
}
