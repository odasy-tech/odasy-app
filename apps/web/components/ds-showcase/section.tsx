'use client';

import { usePathname } from 'next/navigation';
import { useId, type ReactNode } from 'react';
import { MetaLabel } from '@odasy/ui/web';
import { plateFor, type PlateEntry } from './nav';

/* ── Section hero ─────────────────────────────────────────────────── */

export interface ShowcaseSectionProps {
  /** Eyebrow / chapter mark. Falls back to the plate's auto-derived label. */
  eyebrow?: string;
  /** Main heading. */
  title: string;
  /** Italic accent shown after the title (optional pull-out). */
  titleAccent?: string;
  /** Supporting paragraph. */
  description?: ReactNode;
  /** Optional override for the right-side meta column. */
  meta?: ReactNode;
  children: ReactNode;
}

export function ShowcaseSection({
  eyebrow,
  title,
  titleAccent,
  description,
  meta,
  children,
}: ShowcaseSectionProps) {
  const pathname = usePathname();
  const plate = plateFor(pathname);

  return (
    <section className="flex flex-col gap-16">
      <PlateHero
        plate={plate}
        eyebrow={eyebrow}
        title={title}
        titleAccent={titleAccent}
        description={description}
        meta={meta}
      />
      <div className="flex flex-col gap-14">{children}</div>
    </section>
  );
}

function PlateHero({
  plate,
  eyebrow,
  title,
  titleAccent,
  description,
  meta,
}: {
  plate: PlateEntry | undefined;
  eyebrow: string | undefined;
  title: string;
  titleAccent: string | undefined;
  description: ReactNode;
  meta: ReactNode;
}) {
  return (
    <header className="relative">
      {/* corner ticks */}
      <span
        aria-hidden
        className="absolute -left-2 top-0 h-4 w-4 border-l border-t border-[var(--color-accent-action)]"
      />
      <span
        aria-hidden
        className="absolute -right-2 top-0 h-4 w-4 border-r border-t border-[var(--color-accent-action)]"
      />

      <div className="grid grid-cols-1 gap-10 pt-3 lg:grid-cols-[1fr_220px] lg:gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {plate ? (
              <span
                className="text-[28px] italic leading-none tabular-nums text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                {plate.plate}
              </span>
            ) : null}
            <span
              aria-hidden
              className="h-5 w-px bg-[var(--color-border-default)]"
            />
            <MetaLabel tone="accent">{eyebrow ?? plate?.label ?? 'Plate'}</MetaLabel>
          </div>

          <h1
            className="text-[56px] leading-[0.96] tracking-[-0.025em] text-[var(--color-ink-primary)] sm:text-[78px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
            {titleAccent ? (
              <>
                {' '}
                <span
                  className="text-[var(--color-accent-action)]"
                  style={{ fontStyle: 'italic' }}
                >
                  {titleAccent}
                </span>
              </>
            ) : null}
          </h1>

          {description ? (
            <p
              className="mt-2 max-w-2xl text-[16px] leading-[1.65] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {description}
            </p>
          ) : null}
        </div>

        {/* meta column — status, blurb, dates */}
        <aside
          className="flex flex-col gap-5 lg:border-l lg:border-[var(--color-border-default)] lg:pl-8"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {meta ?? <DefaultMeta plate={plate} />}
        </aside>
      </div>

      {/* hairline below the whole hero */}
      <div className="ds-rule mt-10" />
    </header>
  );
}

function DefaultMeta({ plate }: { plate: PlateEntry | undefined }) {
  const today = new Date().toISOString().slice(0, 10);
  const status = plate?.status ?? 'live';
  return (
    <>
      <MetaRow label="Plate" value={plate?.plate ?? '—'} />
      <MetaRow
        label="Status"
        value={
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className={[
                'h-1.5 w-1.5 rounded-full',
                status === 'live'
                  ? 'bg-[var(--color-status-success)] ds-animate-pulse'
                  : status === 'draft'
                    ? 'bg-[var(--color-status-warning)]'
                    : 'bg-[var(--color-ink-tertiary)]',
              ].join(' ')}
            />
            <span className="uppercase tracking-[0.18em]">{status}</span>
          </span>
        }
      />
      <MetaRow label="Updated" value={today} />
      <MetaRow label="Version" value="v1.0.0" />
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-[9.5px] uppercase tracking-[0.42em] text-[var(--color-ink-tertiary)]"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
      >
        {label}
      </span>
      <span
        className="text-[12px] tabular-nums text-[var(--color-ink-primary)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Demo card ────────────────────────────────────────────────────── */

export interface ShowcaseDemoProps {
  title?: string;
  description?: ReactNode;
  /** Quick prop reference shown in the strip below the demo well. */
  props?: { name: string; value: string }[];
  /** Demo number; auto-numbered by ShowcaseDemoIndex if omitted. */
  index?: number | string;
  /** Make the demo well denser (less padding, no min-height). */
  compact?: boolean;
  /** Render with a hatched (instrumented) backdrop. */
  hatch?: boolean;
  children: ReactNode;
}

/**
 * One demo unit: title strip → corner-ticked well → optional props strip.
 * Designed to feel like an architectural drawing on a vellum sheet.
 */
export function ShowcaseDemo({
  title,
  description,
  props,
  index,
  compact = false,
  hatch = false,
  children,
}: ShowcaseDemoProps) {
  const headingId = useId();

  return (
    <article className="flex flex-col gap-3" aria-labelledby={title ? headingId : undefined}>
      {(title || index !== undefined) && (
        <div className="flex items-baseline gap-3">
          {index !== undefined ? (
            <span
              className="shrink-0 text-[10px] italic tabular-nums text-[var(--color-accent-action)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Fig.&nbsp;{typeof index === 'number' ? String(index).padStart(2, '0') : index}
            </span>
          ) : null}
          {title ? (
            <h3
              id={headingId}
              className="text-[12px] uppercase tracking-[0.36em] text-[var(--color-ink-primary)]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              {title}
            </h3>
          ) : null}
          <span
            aria-hidden
            className="ds-rule mt-px h-px flex-1 self-center"
          />
          {description ? (
            <span
              className="hidden text-[11px] text-[var(--color-ink-tertiary)] sm:inline"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {description}
            </span>
          ) : null}
        </div>
      )}

      <div
        className={[
          'relative border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]',
          hatch ? 'ds-hatch' : '',
          compact
            ? 'flex flex-col items-center justify-center p-6'
            : 'flex min-h-[200px] flex-col items-center justify-center gap-6 p-8 sm:p-12',
        ].join(' ')}
      >
        {/* corner ticks */}
        <span aria-hidden className="ds-corners pointer-events-none absolute inset-0">
          <span className="ds-corner tl" />
          <span className="ds-corner tr" />
          <span className="ds-corner bl" />
          <span className="ds-corner br" />
        </span>
        {children}
      </div>

      {props && props.length > 0 ? (
        <ul
          className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pl-1 pt-1 text-[10.5px] tabular-nums text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {props.map((p) => (
            <li key={p.name} className="flex items-center gap-1.5">
              <span className="text-[var(--color-ink-secondary)]">{p.name}</span>
              <span aria-hidden>=</span>
              <span className="text-[var(--color-accent-action)]">{p.value}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

/* ── Tier separator ───────────────────────────────────────────────── */

export interface TierBandProps {
  /** Roman numeral or short marker. */
  marker: string;
  /** Title of the tier. */
  title: string;
  /** Optional descriptor sentence. */
  blurb?: string;
}

/**
 * Big editorial separator inside a long page. Useful when a single
 * showcase route covers multiple tiers (eg. Primitives → Product).
 */
export function TierBand({ marker, title, blurb }: TierBandProps) {
  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex items-center gap-4">
        <span
          className="text-[36px] italic leading-none text-[var(--color-accent-action)]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
        >
          {marker}
        </span>
        <h2
          className="text-[28px] leading-none tracking-[-0.015em] text-[var(--color-ink-primary)] sm:text-[34px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        <div className="ds-rule flex-1" />
      </div>
      {blurb ? (
        <p
          className="max-w-2xl pl-12 text-[14px] leading-[1.65] text-[var(--color-ink-secondary)]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {blurb}
        </p>
      ) : null}
    </div>
  );
}
