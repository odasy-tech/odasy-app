import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { fraunces } from '../../theme/typography';
import { cn } from '../../shared/utils';
import { MetaLabel } from './meta-label';

export interface SectionHeadProps extends HTMLAttributes<HTMLDivElement> {
  /** Eyebrow / chapter marker (e.g., "Capítulo III · El campo"). */
  meta?: ReactNode;
  /** Heading text — pass either a string or rich children for inline accents. */
  heading: ReactNode;
  /** Optional supporting paragraph below the heading. */
  description?: ReactNode;
  /** Centre the block. Default 'center'. */
  align?: 'left' | 'center';
  /** Display preset for Fraunces axes. */
  expression?: 'refined' | 'editorial' | 'wonky';
  /** Show a hairline rule between meta and heading (editorial). */
  withRule?: boolean;
}

/**
 * Editorial section head — meta-label, headline, optional supporting copy.
 * Used to introduce every chapter in the landing and DS showcase.
 *
 * The `expression` prop tunes Fraunces' variable axes so the same
 * component can read as a calm chapter intro or a dramatic hero.
 */
export const SectionHead = forwardRef<HTMLDivElement, SectionHeadProps>(
  (
    {
      meta,
      heading,
      description,
      align = 'center',
      expression = 'editorial',
      withRule = false,
      className,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-7',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
      {...rest}
    >
      {meta ? (
        <div
          className={cn(
            'flex items-center gap-4',
            align === 'center' && 'justify-center',
          )}
        >
          {withRule && align === 'center' ? (
            <span aria-hidden className="h-px w-12 bg-[var(--color-border-default)]" />
          ) : null}
          <MetaLabel tone="accent">{meta}</MetaLabel>
          {withRule ? (
            <span aria-hidden className="h-px w-12 bg-[var(--color-border-default)]" />
          ) : null}
        </div>
      ) : null}
      <h2
        className="max-w-4xl leading-[1.04] tracking-[-0.025em] text-[var(--color-ink-primary)]"
        style={{
          fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-display)',
          fontVariationSettings: fraunces[expression],
          fontWeight: 500,
        }}
      >
        {heading}
      </h2>
      {description ? (
        <p
          className="max-w-2xl text-base leading-[1.7] text-[var(--color-ink-secondary)] sm:text-lg"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {description}
        </p>
      ) : null}
    </div>
  ),
);

SectionHead.displayName = 'SectionHead';
