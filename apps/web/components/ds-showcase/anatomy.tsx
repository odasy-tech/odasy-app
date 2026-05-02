import type { ReactNode } from 'react';

export interface AnatomyAnnotation {
  /** Where the leader line lands on the subject (% from top-left of subject area). */
  x: number;
  y: number;
  /** Where the label sits (% from top-left of full diagram). */
  labelX: number;
  labelY: number;
  /** Side the label connects to. */
  side: 'left' | 'right' | 'top' | 'bottom';
  /** Label content. */
  label: string;
  /** Optional secondary line. */
  hint?: string;
}

export interface AnatomyProps {
  /** The component to dissect. */
  children: ReactNode;
  /** Annotations layered on top. */
  notes: AnatomyAnnotation[];
  /** Caption shown beneath the diagram. */
  caption?: string;
}

/**
 * Component anatomy diagram — overlays leader lines and labels on top of a
 * live render, evoking architectural drafting plates. Coordinates are in
 * percentages so the layout responds at any size.
 */
export function Anatomy({ children, notes, caption }: AnatomyProps) {
  return (
    <figure className="flex flex-col gap-4">
      <div className="relative w-full">
        {/* subject — sits in a centered box so labels have margin */}
        <div className="mx-auto flex w-full max-w-[80%] items-center justify-center py-12">
          {children}
        </div>

        {/* svg overlay for leader lines */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {notes.map((n, i) => (
            <line
              key={i}
              x1={(n.x / 100) * 80 + 10}
              y1={n.y}
              x2={n.labelX}
              y2={n.labelY}
              stroke="var(--color-accent-action)"
              strokeWidth="0.18"
              strokeDasharray="0.6 0.6"
              opacity="0.6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* labels */}
        {notes.map((n, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${n.labelX}%`,
              top: `${n.labelY}%`,
              transform:
                n.side === 'left'
                  ? 'translate(-100%, -50%) translateX(-8px)'
                  : n.side === 'right'
                    ? 'translate(0, -50%) translateX(8px)'
                    : n.side === 'top'
                      ? 'translate(-50%, -100%) translateY(-8px)'
                      : 'translate(-50%, 0) translateY(8px)',
              maxWidth: '180px',
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span
                className="whitespace-nowrap text-[9.5px] uppercase tracking-[0.42em] text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
              >
                {n.label}
              </span>
              {n.hint ? (
                <span
                  className="text-[10.5px] italic text-[var(--color-ink-secondary)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {n.hint}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {caption ? (
        <figcaption
          className="border-t border-[var(--color-border-subtle)] pt-3 text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
