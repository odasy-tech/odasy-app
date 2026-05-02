import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../shared/utils';

export type BadgeStatus = 'live' | 'beta' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const statusStyles: Record<BadgeStatus, { dot: string; bg: string; text: string }> = {
  live: {
    dot: 'bg-[var(--color-status-success)]',
    bg: 'bg-[var(--color-nature-soft)]',
    text: 'text-[var(--color-nature-base)]',
  },
  beta: {
    dot: 'bg-[var(--color-warm-base)]',
    bg: 'bg-[var(--color-warm-soft)]',
    text: 'text-[var(--color-warm-base)]',
  },
  success: {
    dot: 'bg-[var(--color-status-success)]',
    bg: 'bg-[var(--color-nature-soft)]',
    text: 'text-[var(--color-status-success)]',
  },
  warning: {
    dot: 'bg-[var(--color-status-warning)]',
    bg: 'bg-[var(--color-warm-soft)]',
    text: 'text-[var(--color-status-warning)]',
  },
  danger: {
    dot: 'bg-[var(--color-status-danger)]',
    bg: 'bg-[color-mix(in_srgb,var(--color-status-danger)_18%,transparent)]',
    text: 'text-[var(--color-status-danger)]',
  },
  info: {
    dot: 'bg-[var(--color-info-base)]',
    bg: 'bg-[var(--color-info-soft)]',
    text: 'text-[var(--color-info-base)]',
  },
  neutral: {
    dot: 'bg-[var(--color-ink-secondary)]',
    bg: 'bg-[var(--color-bg-elevated)]',
    text: 'text-[var(--color-ink-secondary)]',
  },
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus;
  /** Show a leading status dot. Defaults to true. */
  withDot?: boolean;
  /** Pulse the dot (useful for "live" / "beta" states). */
  pulse?: boolean;
  children: ReactNode;
}

/**
 * Status pill. Compact uppercase tracked label with an optional leading dot.
 * Use semantic statuses; resist the urge to colour these decoratively.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ status = 'neutral', withDot = true, pulse = false, className, children, ...rest }, ref) => {
    const style = statusStyles[status];
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]',
          style.bg,
          style.text,
          className,
        )}
        style={{ fontFamily: 'var(--font-sans)' }}
        {...rest}
      >
        {withDot && (
          <span
            aria-hidden
            className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', style.dot)}
          >
            {pulse && (
              <span
                className={cn(
                  'ds-animate-pulse absolute inset-0 rounded-full',
                  style.dot,
                )}
              />
            )}
          </span>
        )}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
