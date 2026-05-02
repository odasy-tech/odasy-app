import type { ReactNode } from 'react';
import { MetaLabel } from '@odasy/ui/web';

interface ShowcaseSectionProps {
  /** Eyebrow / chapter mark. */
  eyebrow?: string;
  /** Main heading. */
  title: string;
  /** Supporting paragraph. */
  description?: ReactNode;
  children: ReactNode;
}

export function ShowcaseSection({
  eyebrow,
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  return (
    <section className="flex flex-col gap-8 pb-20">
      <header className="flex flex-col gap-3">
        {eyebrow ? <MetaLabel tone="accent">{eyebrow}</MetaLabel> : null}
        <h1
          className="text-[44px] leading-[1.05] tracking-[-0.025em] text-[var(--color-ink-primary)] sm:text-[56px]"
          style={{ fontFamily: 'var(--font-family-display)' }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="max-w-2xl text-[16px] leading-[1.7] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

interface ShowcaseDemoProps {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
}

/** A single demo card — title + content well. */
export function ShowcaseDemo({ title, description, children }: ShowcaseDemoProps) {
  return (
    <div className="flex flex-col gap-3">
      {title ? (
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className="text-[14px] uppercase tracking-[0.32em] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}
          >
            {title}
          </h3>
          {description ? (
            <span
              className="text-[12px] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-family-sans)' }}
            >
              {description}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="ds-card flex min-h-[180px] flex-col items-center justify-center gap-6 p-10">
        {children}
      </div>
    </div>
  );
}
