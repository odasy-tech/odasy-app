import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../shared/utils';

export type DividerVariant = 'plain' | 'pulse-pin';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
}

/**
 * Section divider. The `pulse-pin` variant places a saturated accent dot
 * at the centre with a pulsing halo — used to mark editorial transitions.
 * The `plain` variant is a hairline only.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ variant = 'plain', className, ...rest }, ref) => {
    if (variant === 'plain') {
      return (
        <div
          ref={ref}
          aria-hidden
          className={cn('ds-rule mx-auto max-w-5xl', className)}
          {...rest}
        />
      );
    }
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          'relative mx-auto flex max-w-5xl items-center justify-center py-20',
          className,
        )}
        {...rest}
      >
        <div className="ds-rule flex-1" />
        <div className="relative mx-5 flex h-3 w-3 items-center justify-center">
          <span className="absolute h-2 w-2 rounded-full bg-[var(--color-accent-action)]" />
          <span className="ds-animate-pulse absolute h-2 w-2 rounded-full bg-[var(--color-accent-action)]" />
        </div>
        <div className="ds-rule flex-1" />
      </div>
    );
  },
);

Divider.displayName = 'Divider';
