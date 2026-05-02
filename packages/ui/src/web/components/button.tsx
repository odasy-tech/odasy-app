import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../shared/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Append a sliding underscore on the right (signature CTA flourish). */
  withArrow?: boolean;
  /** Loading state — disables interaction and replaces label with spinner. */
  loading?: boolean;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional trailing icon. */
  iconRight?: ReactNode;
  children?: ReactNode;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonOwnProps;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-7 py-3.5 text-[11px]',
  lg: 'px-9 py-4.5 text-[12px]',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-[var(--color-accent-action)] text-[var(--color-ink-on-accent)]',
    'hover:bg-[var(--color-accent-hover)]',
    'disabled:bg-[var(--color-bg-elevated)] disabled:text-[var(--color-ink-tertiary)]',
  ),
  secondary: cn(
    'border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-ink-secondary)]',
    'hover:border-[var(--color-accent-action)] hover:text-[var(--color-accent-action)]',
    'disabled:opacity-50',
  ),
  ghost: cn(
    'bg-transparent text-[var(--color-accent-action)]',
    'hover:bg-[var(--color-accent-soft)]',
    'disabled:opacity-50',
  ),
  danger: cn(
    'bg-[var(--color-status-danger)] text-white',
    'hover:opacity-90',
    'disabled:opacity-50',
  ),
};

/**
 * Editorial CTA. Three primary variants (primary/secondary/ghost) plus a
 * danger variant for destructive actions. Set `withArrow` for the
 * signature sliding underscore that the landing CTAs use.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      withArrow = false,
      loading = false,
      icon,
      iconRight,
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'group inline-flex items-center justify-center gap-3 uppercase tracking-[0.32em]',
        'font-semibold transition disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      style={{ fontFamily: 'var(--font-sans)' }}
      {...rest}
    >
      {icon && !loading && <span aria-hidden>{icon}</span>}
      <span className={cn(loading && 'opacity-0')}>{children}</span>
      {withArrow && !loading && !iconRight && (
        <span
          aria-hidden
          className="block h-px w-6 bg-current transition-all group-hover:w-10"
        />
      )}
      {iconRight && !loading && (
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
      {loading && (
        <span aria-hidden className="absolute inline-flex">
          <Spinner />
        </span>
      )}
    </button>
  ),
);

Button.displayName = 'Button';

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
