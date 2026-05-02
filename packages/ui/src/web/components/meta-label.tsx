import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../shared/utils';

type MetaLabelTone = 'mute' | 'accent' | 'ink' | 'inverse';
type MetaLabelSize = 'sm' | 'md';

const toneStyles: Record<MetaLabelTone, string> = {
  mute: 'text-[var(--color-ink-secondary)]',
  accent: 'text-[var(--color-accent-action)]',
  ink: 'text-[var(--color-ink-primary)]',
  inverse: 'text-white/70',
};

const sizeStyles: Record<MetaLabelSize, string> = {
  sm: 'text-[10px] tracking-[0.32em]',
  md: 'text-[11px] tracking-[0.28em]',
};

export interface MetaLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual tone. Defaults to `'mute'` for sub-headings, classification, ticker text. */
  tone?: MetaLabelTone;
  /** Visual size. Defaults to `'sm'`. */
  size?: MetaLabelSize;
  /** Decorative leading marker (e.g., "01" or a glyph). */
  marker?: ReactNode;
  children: ReactNode;
}

/**
 * Editorial micro-label — Geist 600 caps, tightly tracked.
 * Used for chapter markers, classification tags, technical coordinates,
 * and any other "instrumented metadata" texture.
 *
 * The optional `marker` slot adds a leading numeric or glyphic flag
 * separated by a thin rule, useful for "Capítulo 01 · Premisa" patterns.
 */
export const MetaLabel = forwardRef<HTMLSpanElement, MetaLabelProps>(
  (
    { tone = 'mute', size = 'sm', marker, className, children, ...rest },
    ref,
  ) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2.5 font-semibold uppercase',
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
      style={{ fontFamily: 'var(--font-family-sans)' }}
      {...rest}
    >
      {marker ? (
        <>
          <span className="font-bold tabular-nums">{marker}</span>
          <span aria-hidden className="h-3 w-px bg-current opacity-30" />
        </>
      ) : null}
      {children}
    </span>
  ),
);

MetaLabel.displayName = 'MetaLabel';
