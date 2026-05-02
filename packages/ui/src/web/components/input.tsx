'use client';

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../shared/utils';

export type InputTone = 'default' | 'inverse';

interface InputOwnProps {
  tone?: InputTone;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Element rendered to the left of the input. */
  prefix?: ReactNode;
  /** Element rendered to the right of the input. */
  suffix?: ReactNode;
}

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> & InputOwnProps;

/**
 * Editorial text input.
 *
 * Variants:
 *   default — paper bg, ink text, violet focus ring.
 *   inverse — for dark bands (e.g., the Expedition CTA in light mode).
 *
 * Always declares its own `<label>` and accessibility wiring; consumers
 * just pass `label`, `hint`, `error` strings.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      tone = 'default',
      label,
      hint,
      error,
      prefix,
      suffix,
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    const isInverse = tone === 'inverse';

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label ? (
          <label
            htmlFor={inputId}
            className={cn(
              'text-[10px] uppercase tracking-[0.32em]',
              isInverse
                ? 'text-white/70'
                : 'text-[var(--color-ink-secondary)]',
            )}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            {label}
          </label>
        ) : null}
        <div
          className={cn(
            'flex items-center gap-2 border px-4 py-3 transition-colors',
            'focus-within:border-[var(--color-accent-action)]',
            error
              ? 'border-[var(--color-status-danger)]'
              : isInverse
                ? 'border-white/15 bg-white/5'
                : 'border-[var(--color-border-default)] bg-[var(--color-bg-surface)]',
          )}
        >
          {prefix ? <span className="shrink-0">{prefix}</span> : null}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error || undefined}
            aria-describedby={describedBy}
            className={cn(
              'flex-1 bg-transparent text-sm tracking-wide outline-none',
              isInverse
                ? 'text-white placeholder:text-white/40'
                : 'text-[var(--color-ink-primary)] placeholder:text-[var(--color-ink-tertiary)]',
            )}
            style={{ fontFamily: 'var(--font-sans)' }}
            {...rest}
          />
          {suffix ? <span className="shrink-0">{suffix}</span> : null}
        </div>
        {hint && !error ? (
          <span
            id={hintId}
            className={cn(
              'text-[11px] leading-relaxed',
              isInverse ? 'text-white/55' : 'text-[var(--color-ink-secondary)]',
            )}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {hint}
          </span>
        ) : null}
        {error ? (
          <span
            id={errorId}
            className="text-[11px] leading-relaxed text-[var(--color-status-danger)]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
