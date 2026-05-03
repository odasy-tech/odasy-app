'use client';

import Link from 'next/link';
import { Container, MetaLabel, ThemeProvider, ThemeToggle } from '@odasy/ui/web';
import { DIRECTIONS, type Direction } from './marks';
import {
  Applications,
  CompactLockup,
  Construction,
  JournalCover,
  LockupPlate,
  MarkPlate,
  ScaleLadder,
  VariantsCompare,
  Wordmark,
} from './plates';

export default function LogoIdeasPage() {
  return (
    <ThemeProvider defaultTheme="light">
      <main
        className="ds-paper relative min-h-screen text-[var(--color-ink-primary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <PageHeader />

        <Container width="wide" className="relative z-10 flex flex-col gap-12 pb-16 pt-8 sm:gap-16 sm:pb-20 sm:pt-10 lg:gap-20 lg:pb-24 lg:pt-12">
          <FrontMatter />

          {DIRECTIONS.map((direction) => (
            <DirectionSection key={direction.id} direction={direction} />
          ))}

          <PageFooter />
        </Container>
      </main>
    </ThemeProvider>
  );
}

/* ── chrome ───────────────────────────────────────────────────── */

function PageHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border-default)] bg-[var(--color-bg-canvas)]/85 backdrop-blur-md">
      <div
        aria-hidden
        className="ds-ticker pointer-events-none absolute inset-x-0 bottom-0 h-[3px] opacity-50"
      />
      <Container width="wide">
        <div className="flex items-center justify-between gap-6 py-4 sm:py-5">
          <div className="flex items-baseline gap-3">
            <Link
              href="/"
              className="text-[20px] tracking-[-0.01em] text-[var(--color-ink-primary)] sm:text-[22px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Odasy
            </Link>
            <span aria-hidden className="hidden h-3.5 w-px bg-[var(--color-border-default)] sm:inline-block" />
            <span
              className="hidden text-[10px] uppercase tracking-[0.42em] text-[var(--color-ink-secondary)] sm:inline"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Brand · Logo proposals R02
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/logo-ideas/round-03"
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--color-accent-action)] transition-colors hover:text-[var(--color-accent-deep)] sm:inline-flex"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              <span>R03 · Letterform</span>
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/ds/identity"
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-accent-action)] sm:inline-flex"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <span>Brand identity</span>
              <span aria-hidden>→</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="flex flex-col gap-4 border-t border-[var(--color-border-default)] pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <span
          className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Round 02 · Refinement · 2026·05·02
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          For review · not the final mark
        </span>
      </div>
      <p
        className="max-w-2xl text-[14px] leading-[1.65] text-[var(--color-ink-secondary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        These are exploration plates, not delivered assets. The wordmark is
        Path A (Fraunces italic, opsz 144, weight 500). The chosen logomark
        will be refined into the canonical SVG set listed in{' '}
        <code className="text-[var(--color-accent-action)]">technical/BRAND.md §Deliverables</code>.
      </p>
    </footer>
  );
}

/* ── front matter ─────────────────────────────────────────────── */

function FrontMatter() {
  return (
    <section className="relative">
      {/* corner ticks */}
      <span
        aria-hidden
        className="absolute -left-2 top-0 h-4 w-4 border-l border-t border-[var(--color-accent-action)]"
      />
      <span
        aria-hidden
        className="absolute -right-2 top-0 h-4 w-4 border-r border-t border-[var(--color-accent-action)]"
      />

      <div className="grid grid-cols-1 gap-8 pt-3 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-5">
          <MetaLabel tone="accent">Brand · Logo brief · Round 02 · Refinement</MetaLabel>

          <h1
            className="text-[40px] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink-primary)] sm:text-[56px] lg:text-[72px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Refined:{' '}
            <em className="text-[var(--color-accent-action)]" style={{ fontStyle: 'italic' }}>
              Stamp
            </em>
            ,{' '}
            <em className="text-[var(--color-accent-action)]" style={{ fontStyle: 'italic' }}>
              Origin
            </em>
            ,{' '}
            <em className="text-[var(--color-accent-action)]" style={{ fontStyle: 'italic' }}>
              Horizon
            </em>
            .
          </h1>

          <p
            className="max-w-xl text-[18px] leading-[1.55] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Three directions taken forward from Round 01. Each is shown as
            three sub-variants <em>(a · b · c)</em> on a single comparison
            sheet, then the recommended variant is taken through scale tests,
            lockups across paper / navy / single ink, construction grid, and
            applications.
          </p>

          <div
            className="mt-1 grid max-w-xl grid-cols-2 gap-x-8 gap-y-2 border-t border-[var(--color-border-default)] pt-3.5 text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span>Author <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>Studio · Brand</b></span>
            <span>Date <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>2026·05·02</b></span>
            <span>Revision <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>R02 — Refinement</b></span>
            <span>Status <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>For review</b></span>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-7 border-t border-[var(--color-border-default)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <span
              className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Direction · brief
            </span>
            <ul className="mt-3 flex flex-col gap-3.5">
              {[
                ['01', 'Stamp · the dossier seal'],
                ['02', 'Origin · the cartographic glyph'],
                ['03', 'Horizon · the dawn returned'],
              ].map(([n, t]) => (
                <li key={n} className="grid grid-cols-[28px_1fr] items-baseline gap-3 border-t border-[var(--color-border-subtle)] pt-2.5">
                  <span
                    className="text-[10px] tracking-[0.1em] text-[var(--color-accent-action)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {n}
                  </span>
                  <span
                    className="text-[18px] italic text-[var(--color-ink-primary)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[var(--color-border-default)] pt-3.5">
            <span
              className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Path · Wordmark
            </span>
            <div className="mt-2 text-[16px] italic leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-[var(--color-ink-primary)]">Fraunces italic</span>
              <span className="mx-1.5 text-[var(--color-accent-action)]" style={{ fontStyle: 'normal' }}>·</span>
              <span className="text-[var(--color-ink-primary)]">opsz 144</span>
              <span className="mx-1.5 text-[var(--color-accent-action)]" style={{ fontStyle: 'normal' }}>·</span>
              <span className="text-[var(--color-ink-primary)]">weight 500</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-[var(--color-border-default)] pt-4">
            <div style={{ color: 'var(--color-accent-action)' }}>
              <Wordmark size={56} />
            </div>
            <span
              className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              wordmark · path A
            </span>
          </div>
        </aside>
      </div>

      <div className="ds-rule mt-10" />
    </section>
  );
}

/* ── direction section ────────────────────────────────────────── */

function DirectionSection({ direction }: { direction: Direction }) {
  const recommended = direction.variants.find((v) => v.recommended) ?? direction.variants[0];
  if (!recommended) return null;

  return (
    <section id={`d-${direction.id}`} className="flex flex-col gap-7 sm:gap-10">
      <header className="flex flex-col gap-3.5">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className="text-[28px] italic leading-none text-[var(--color-accent-action)] sm:text-[36px]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            {romanFor(direction.id)}
          </span>
          <h2
            className="text-[24px] leading-none tracking-[-0.015em] text-[var(--color-ink-primary)] sm:text-[28px] lg:text-[34px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {direction.name}
          </h2>
          <div className="ds-rule flex-1" />
          <span
            className="hidden text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)] sm:inline"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {direction.variants.length} variants
          </span>
        </div>
        <p
          className="max-w-2xl pl-9 text-[14px] italic leading-relaxed text-[var(--color-ink-secondary)] sm:pl-12 sm:text-[15px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {direction.tagline}
        </p>
      </header>

      <DemoLabel num="01" label="Sub-variants · a / b / c" />
      <VariantsCompare
        variants={direction.variants}
        name={direction.name}
        tagline={direction.tagline}
        rationale={direction.rationale}
      />

      <DemoLabel num="02" label={`Recommended · ${recommended.name} · across surfaces`} />
      <div className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)] sm:grid-cols-3">
        <MarkPlate variant={recommended} surface="paper" />
        <MarkPlate variant={recommended} surface="navy" />
        <MarkPlate variant={recommended} surface="mono-light" />
      </div>

      <DemoLabel num="03" label="Primary lockup · across surfaces" />
      <div className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)]">
        <LockupPlate variant={recommended} surface="paper" />
        <LockupPlate variant={recommended} surface="navy" />
        <LockupPlate variant={recommended} surface="mono-dark" />
      </div>

      <DemoLabel num="04" label="Compact lockup · scale ladder" />
      <div className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <CompactLockup variant={recommended} surface="paper" />
        <ScaleLadder variant={recommended} />
      </div>

      <DemoLabel num="05" label="Construction & specs" />
      <Construction variant={recommended} />

      <DemoLabel num="06" label="Applications" />
      <Applications variant={recommended} />

      <DemoLabel num="07" label="In context · journal cover" />
      <JournalCover variant={recommended} />
    </section>
  );
}

function DemoLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span
        className="shrink-0 text-[10px] italic tabular-nums text-[var(--color-accent-action)]"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
      >
        Fig.&nbsp;{num}
      </span>
      <span
        className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-primary)] sm:text-[12px] sm:tracking-[0.36em]"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
      >
        {label}
      </span>
      <span aria-hidden className="ds-rule mt-px h-px min-w-8 flex-1 self-center" />
    </div>
  );
}

function romanFor(id: Direction['id']): string {
  return id === 'stamp' ? 'I' : id === 'origin' ? 'II' : 'III';
}
