import { cn } from '../../shared/utils';

export type MapPinState = 'discovered' | 'undiscovered' | 'active' | 'visited';

export interface MapPinProps {
  state?: MapPinState;
  /** Pin label rendered to the right. */
  label?: string;
  /** Compact mode hides the label. */
  iconOnly?: boolean;
  className?: string;
}

const STATE_STYLES: Record<MapPinState, { dot: string; ring: string; label: string }> = {
  active: {
    dot: 'bg-[var(--color-warm-base)]',
    ring: 'ring-[var(--color-warm-base)]/40',
    label: 'text-[var(--color-warm-base)] font-bold',
  },
  visited: {
    dot: 'bg-[var(--color-accent-action)]',
    ring: 'ring-[var(--color-accent-action)]/40',
    label: 'text-[var(--color-accent-action)] font-semibold',
  },
  discovered: {
    dot: 'bg-[var(--color-accent-action)]',
    ring: 'ring-[var(--color-accent-action)]/20',
    label: 'text-[var(--color-accent-action)] font-semibold',
  },
  undiscovered: {
    dot: 'bg-transparent border border-dashed border-[var(--color-ink-tertiary)]',
    ring: '',
    label: 'text-[var(--color-ink-tertiary)] font-medium opacity-70',
  },
};

/**
 * Map pin atom — used inline in maps, lists, and the field schematic.
 *
 * The 4 states map to the Living Map pillar in VISION.md:
 *   discovered    — visited at least once
 *   undiscovered  — known to exist, not yet visited
 *   active        — current beachhead / "you are here"
 *   visited       — completed (full mission depth at this place)
 */
export function MapPin({ state = 'undiscovered', label, iconOnly, className }: MapPinProps) {
  const styles = STATE_STYLES[state];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        className,
      )}
    >
      <span className="relative flex items-center justify-center">
        {state === 'active' && (
          <span
            aria-hidden
            className="ds-animate-pulse absolute h-3 w-3 rounded-full bg-[var(--color-warm-base)]"
          />
        )}
        <span
          aria-hidden
          className={cn(
            'h-2 w-2 rounded-full ring-4 ring-offset-0',
            styles.dot,
            styles.ring,
          )}
        />
      </span>
      {label && !iconOnly ? (
        <span
          className={cn(
            'text-[10px] uppercase tracking-[0.28em]',
            styles.label,
          )}
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
