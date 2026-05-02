import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../shared/utils';

export type CardVariant = 'default' | 'quiet' | 'tight';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Render the four corner ticks (instrumented look). */
  cornerTicks?: boolean;
  /** Apply diagonal hatch overlay. */
  hatch?: boolean;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'ds-card p-7 sm:p-10',
  quiet: 'ds-card-quiet p-6 sm:p-8',
  tight: 'ds-card p-5',
};

/**
 * Editorial card surface. Vellum bg, hairline border, restrained shadow.
 * The `cornerTicks` variant adds four L-shaped accent ticks at the corners
 * for the "instrumented" look used in the Dossier section.
 *
 *   <Card cornerTicks hatch>...</Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', cornerTicks = false, hatch = false, className, children, ...rest },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'relative',
        variantClasses[variant],
        hatch && 'ds-hatch',
        className,
      )}
      {...rest}
    >
      {cornerTicks && (
        <div aria-hidden className="ds-corners pointer-events-none absolute inset-0">
          <span className="ds-corner tl" />
          <span className="ds-corner tr" />
          <span className="ds-corner bl" />
          <span className="ds-corner br" />
        </div>
      )}
      {children}
    </div>
  ),
);

Card.displayName = 'Card';
