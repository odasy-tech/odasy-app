'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../shared/utils';

export interface InterestOption {
  id: string;
  label: string;
  glyph?: ReactNode;
}

export interface InterestSelectorProps {
  options: InterestOption[];
  value?: string[];
  onChange?: (next: string[]) => void;
  /** Cap selectable options. Default: unlimited. */
  max?: number;
  className?: string;
}

/**
 * Multi-select interest chips for onboarding. Maintains internal state
 * if `value` is omitted (uncontrolled). Calls `onChange` with the new
 * array on every change.
 */
export function InterestSelector({
  options,
  value,
  onChange,
  max,
  className,
}: InterestSelectorProps) {
  const [internal, setInternal] = useState<string[]>(value ?? []);
  const selected = value ?? internal;

  const toggle = (id: string) => {
    let next: string[];
    if (selected.includes(id)) {
      next = selected.filter((s) => s !== id);
    } else if (max && selected.length >= max) {
      return;
    } else {
      next = [...selected, id];
    }
    if (!value) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            aria-pressed={isSelected}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.22em] transition',
              isSelected
                ? 'border-[var(--color-accent-action)] bg-[var(--color-accent-soft)] text-[var(--color-accent-action)]'
                : 'border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-ink-secondary)] hover:border-[var(--color-accent-action)] hover:text-[var(--color-accent-action)]',
            )}
            style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
          >
            {opt.glyph ? <span aria-hidden>{opt.glyph}</span> : null}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
