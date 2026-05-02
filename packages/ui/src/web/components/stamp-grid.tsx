import type { ReactNode } from 'react';
import { cn } from '../../shared/utils';

export interface StampGridProps {
  /** Pre-rendered Stamp components or any ReactNode children. */
  children: ReactNode;
  /** Columns at small breakpoint. Defaults to 2. */
  smCols?: 2 | 3;
  /** Columns at sm+ breakpoint. Defaults to 3. */
  cols?: 2 | 3 | 4;
  className?: string;
}

const colClass = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
} as const;

const smColClass = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
} as const;

/**
 * Responsive grid for Stamp collections. Default: 2-up on mobile, 3-up
 * on sm+. Generous vertical gap to accommodate the hand-pressed tilt.
 */
export function StampGrid({
  children,
  smCols = 2,
  cols = 3,
  className,
}: StampGridProps) {
  return (
    <div
      className={cn(
        'grid gap-x-5 gap-y-12 sm:gap-x-10 sm:gap-y-14',
        colClass[smCols],
        smColClass[cols],
        className,
      )}
    >
      {children}
    </div>
  );
}
