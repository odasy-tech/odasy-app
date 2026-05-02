import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../shared/utils';

export interface XPBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current XP. */
  current: number;
  /** XP needed to reach the next level. */
  target: number;
  /** Optional label text — defaults to "{current} / {target} XP". */
  label?: string;
  /** Visual size: compact bars for cards, lg bars for the passport hero. */
  size?: 'sm' | 'md' | 'lg';
}

const heightByVariant: Record<NonNullable<XPBarProps['size']>, string> = {
  sm: 'h-[3px]',
  md: 'h-[5px]',
  lg: 'h-[8px]',
};

/**
 * Editorial XP progress bar. Pairs with `LevelIndicator` in the passport.
 */
export const XPBar = forwardRef<HTMLDivElement, XPBarProps>(
  ({ current, target, label, size = 'md', className, ...rest }, ref) => {
    const safeTarget = Math.max(target, 1);
    const pct = Math.min(100, Math.max(0, (current / safeTarget) * 100));
    const text = label ?? `${current.toLocaleString()} / ${target.toLocaleString()} XP`;
    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...rest}>
        <div
          className={cn(
            'overflow-hidden rounded-full bg-[var(--color-border-default)]',
            heightByVariant[size],
          )}
        >
          <div
            className="h-full rounded-full bg-[var(--color-accent-action)] transition-all"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={target}
            aria-valuenow={current}
          />
        </div>
        <span
          className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-secondary)] tabular-nums"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {text}
        </span>
      </div>
    );
  },
);

XPBar.displayName = 'XPBar';
