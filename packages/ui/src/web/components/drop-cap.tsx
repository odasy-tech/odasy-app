import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { fraunces } from '../../theme/typography';
import { cn } from '../../shared/utils';

export interface DropCapProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * The leading character — typically the first letter of the paragraph.
   * Pass an explicit string so the rest of the paragraph can run naturally.
   */
  cap: string;
  /** Lower-case rest of the paragraph (no leading character). */
  children: ReactNode;
  /** Tone the cap. */
  capTone?: 'accent' | 'ink';
}

/**
 * Editorial drop cap — a Fraunces-set initial floats over four lines of
 * Geist body copy. Brings magazine-grade typography into long-form
 * sections (Premise, Field paragraph, etc.).
 */
export const DropCap = forwardRef<HTMLParagraphElement, DropCapProps>(
  ({ cap, children, capTone = 'accent', className, ...rest }, ref) => (
    <p
      ref={ref}
      className={cn(
        'relative pl-[3.6rem] text-[17px] leading-[1.7] text-[var(--color-ink-secondary)] sm:text-lg',
        className,
      )}
      style={{ fontFamily: 'var(--font-sans)' }}
      {...rest}
    >
      <span
        aria-hidden
        className="float-left mr-3 mt-1 -ml-[3.6rem] inline-block leading-[0.8] tracking-[-0.05em]"
        style={{
          fontFamily: 'var(--font-display)',
          fontVariationSettings: fraunces.wonky,
          fontWeight: 500,
          fontSize: '4.6rem',
          color:
            capTone === 'accent'
              ? 'var(--color-accent-action)'
              : 'var(--color-ink-primary)',
        }}
      >
        {cap}
      </span>
      {children}
    </p>
  ),
);

DropCap.displayName = 'DropCap';
