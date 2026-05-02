import type { HTMLAttributes } from 'react';
import { cn } from '../../shared/utils';
import { XPBar } from './xp-bar';

export interface LevelIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  level: number;
  /** Optional title attached to the level (e.g. "Explorador"). */
  title?: string;
  /** XP into the current level. */
  xp: number;
  /** XP required to reach next level. */
  xpToNext: number;
}

/**
 * Compact level + progress widget. Used inside the passport cover and
 * the explorer profile chip in the navbar.
 */
export function LevelIndicator({
  level,
  title,
  xp,
  xpToNext,
  className,
  ...rest
}: LevelIndicatorProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...rest}>
      <div className="flex items-baseline gap-2">
        <span
          className="leading-none text-[var(--color-accent-action)]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '2.4rem',
          }}
        >
          {level}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          Nivel
        </span>
        {title ? (
          <span
            className="ml-2 text-[12px] italic text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </span>
        ) : null}
      </div>
      <XPBar current={xp} target={xpToNext} size="sm" />
    </div>
  );
}
