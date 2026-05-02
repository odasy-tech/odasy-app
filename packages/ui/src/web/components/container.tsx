import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../shared/utils';

type ContainerWidth = 'narrow' | 'default' | 'wide' | 'bleed';

const widthClasses: Record<ContainerWidth, string> = {
  narrow: 'max-w-[900px]',
  default: 'max-w-[1100px]',
  wide: 'max-w-[1320px]',
  bleed: 'max-w-none',
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  /** Whether to apply the page gutter. Defaults to true. */
  gutter?: boolean;
}

/**
 * Editorial centred container. Choose `narrow` for long-form copy,
 * `default` for standard sections, `wide` for hero/showcase layouts.
 *
 * Pairs well with vertical rhythm spacing (py-24, py-32) on parents.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ width = 'default', gutter = true, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mx-auto w-full',
        widthClasses[width],
        gutter && 'px-6 sm:px-12',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
);

Container.displayName = 'Container';
