import type { HTMLAttributes } from 'react';
import { cn } from '../../shared/utils';

export interface ArchetypeMixSegment {
  /** Display name of the archetype (e.g. "Contemplador"). */
  archetype: string;
  /** Percentage 0–100. */
  pct: number;
  /** Optional explicit colour — falls back to a 4-step rotation. */
  color?: string;
}

export interface ArchetypeMixProps extends HTMLAttributes<HTMLDivElement> {
  segments: ArchetypeMixSegment[];
  /** Show the legend chips below the bar. */
  withLegend?: boolean;
  /** Bar height variant. */
  height?: 'sm' | 'md' | 'lg';
}

const DEFAULT_COLOURS = [
  'var(--color-accent-action)',
  'var(--color-accent-base)',
  'var(--color-warm-base)',
  'var(--color-info-base)',
];

const HEIGHT_CLASSES = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
} as const;

/**
 * Stacked horizontal bar showing the explorer's archetype mix.
 * Segments are rendered proportionally; the optional legend reveals
 * each archetype's percentage.
 */
export function ArchetypeMix({
  segments,
  withLegend = true,
  height = 'md',
  className,
  ...rest
}: ArchetypeMixProps) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)} {...rest}>
      <div
        className={cn(
          'flex w-full overflow-hidden rounded-full bg-[var(--color-border-default)]',
          HEIGHT_CLASSES[height],
        )}
      >
        {segments.map((segment, idx) => (
          <div
            key={segment.archetype}
            style={{
              width: `${segment.pct}%`,
              backgroundColor: segment.color ?? DEFAULT_COLOURS[idx % DEFAULT_COLOURS.length],
            }}
          />
        ))}
      </div>

      {withLegend && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {segments.map((segment, idx) => (
            <div
              key={segment.archetype}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    segment.color ?? DEFAULT_COLOURS[idx % DEFAULT_COLOURS.length],
                }}
              />
              <span>
                {segment.archetype} · {segment.pct}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
