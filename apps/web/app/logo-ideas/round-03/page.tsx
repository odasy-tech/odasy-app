'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container, MetaLabel, ThemeProvider, ThemeToggle } from '@odasy/ui/web';
import { FAMILIES, type Family, type Variant } from './marks';
import {
  Applications,
  CompactLockup,
  Construction,
  JournalCover,
  LockupPlate,
  MarkPlate,
  ScaleLadder,
  Wordmark,
} from '../plates';

const PAPER = '#F8F4EA';
const NAVY = '#0A0918';
const INK = '#5046C8';

export default function Round03Page() {
  return (
    <ThemeProvider defaultTheme="light">
      <main
        className="ds-paper relative min-h-screen text-[var(--color-ink-primary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <PageHeader />

        <Container width="wide" className="relative z-10 flex flex-col gap-12 pb-16 pt-8 sm:gap-16 sm:pb-20 sm:pt-10 lg:gap-20 lg:pb-24 lg:pt-12">
          <FrontMatter />

          <FamilySection family={FAMILIES[0]!} romanIdx="I" />
          <FamilySection family={FAMILIES[1]!} romanIdx="II" />

          <DecisionMatrix />
          <Recommendation />

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
            <Link
              href="/logo-ideas"
              className="hidden text-[10px] uppercase tracking-[0.42em] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-accent-action)] sm:inline"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Brand · Logo proposals
            </Link>
            <span aria-hidden className="hidden h-3.5 w-px bg-[var(--color-border-default)] sm:inline-block" />
            <span
              className="hidden text-[10px] uppercase tracking-[0.42em] text-[var(--color-accent-action)] sm:inline"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              Round 03 · Letterform
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/logo-ideas"
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-accent-action)] sm:inline-flex"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <span aria-hidden>←</span>
              <span>R02</span>
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
          Round 03 · Letterform · 2026·05·02
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          For review · supersedes R02 candidates if approved
        </span>
      </div>
      <p
        className="max-w-2xl text-[14px] leading-[1.65] text-[var(--color-ink-secondary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        The O renders live from the loaded Fraunces font (variable axis). For
        production assets the chosen variant must be exported with the text
        outlined to paths so the logomark does not depend on font availability
        at runtime.
      </p>
    </footer>
  );
}

/* ── front matter ─────────────────────────────────────────────── */

function FrontMatter() {
  return (
    <section className="relative">
      <span
        aria-hidden
        className="absolute -left-2 top-0 h-4 w-4 border-l border-t border-[var(--color-accent-action)]"
      />
      <span
        aria-hidden
        className="absolute -right-2 top-0 h-4 w-4 border-r border-t border-[var(--color-accent-action)]"
      />

      <div className="grid grid-cols-1 gap-8 pt-3 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-5">
          <MetaLabel tone="accent">Brand · Logo proposal · Round 03 · Letterform</MetaLabel>

          <h1
            className="text-[40px] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink-primary)] sm:text-[56px] lg:text-[78px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What if the{' '}
            <em className="text-[var(--color-accent-action)]" style={{ fontStyle: 'italic' }}>
              O
            </em>{' '}
            is the brand?
          </h1>

          <p
            className="max-w-xl text-[18px] leading-[1.55] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Reaction to a Round 02 proposal: rather than draw a custom
            logomark, take the <em>O of Fraunces</em> — the same letter that
            opens the wordmark — and use it as the mark. Round 03 explores
            this in two registers: the letter <em>alone</em> (no container) and
            the letter <em>contained</em> in a seal.
          </p>

          <div
            className="mt-1 grid max-w-xl grid-cols-2 gap-x-8 gap-y-2 border-t border-[var(--color-border-default)] pt-3.5 text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span>Author <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>Studio · Brand</b></span>
            <span>Date <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>2026·05·02</b></span>
            <span>Revision <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>R03 — Letterform</b></span>
            <span>Status <b className="text-[var(--color-ink-primary)]" style={{ fontWeight: 500 }}>For review</b></span>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-7 border-t border-[var(--color-border-default)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <span
              className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Two families
            </span>
            <ul className="mt-3 flex flex-col gap-3.5">
              {[
                ['I', 'Pure letterform · the O alone'],
                ['II', 'Letterform + container · the O sealed'],
              ].map(([n, t]) => (
                <li key={n} className="grid grid-cols-[28px_1fr] items-baseline gap-3 border-t border-[var(--color-border-subtle)] pt-2.5">
                  <span
                    className="text-[14px] italic tabular-nums text-[var(--color-accent-action)]"
                    style={{ fontFamily: 'var(--font-display)' }}
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
              Source
            </span>
            <p
              className="mt-2 text-[14px] italic leading-relaxed text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Team proposal during R02 review: <em>"why are we drawing an O
              when Fraunces already gives us the best one?"</em> R03 makes the
              proposal concrete.
            </p>
          </div>

          <div className="flex items-baseline gap-4 border-t border-[var(--color-border-default)] pt-4">
            <span
              className="text-[80px] italic leading-none text-[var(--color-accent-action)] sm:text-[120px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontVariationSettings: '"opsz" 144, "SOFT" 50',
              }}
            >
              O
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Fraunces · italic
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                opsz 144 · weight 500
              </span>
            </div>
          </div>
        </aside>
      </div>

      <div className="ds-rule mt-10" />
    </section>
  );
}

/* ── family section ───────────────────────────────────────────── */

function FamilySection({ family, romanIdx }: { family: Family; romanIdx: string }) {
  const recommended = family.variants.find((v) => v.recommended) ?? family.variants[0];
  if (!recommended) return null;

  return (
    <section id={`f-${family.id}`} className="flex flex-col gap-7 sm:gap-9">
      <header className="flex flex-col gap-3.5">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className="text-[28px] italic leading-none text-[var(--color-accent-action)] sm:text-[36px]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            {romanIdx}
          </span>
          <h2
            className="text-[22px] leading-none tracking-[-0.015em] text-[var(--color-ink-primary)] sm:text-[28px] lg:text-[34px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {family.name}
          </h2>
          <div className="ds-rule flex-1" />
          <span
            className="hidden text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)] sm:inline"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {family.variants.length} variants
          </span>
        </div>
        <p
          className="max-w-2xl pl-9 text-[14px] italic leading-relaxed text-[var(--color-ink-secondary)] sm:pl-12 sm:text-[15px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {family.tagline}
        </p>
      </header>

      <DemoLabel num="01" label={`${family.name} · variants`} />
      <VariantGrid family={family} />

      <DemoLabel num="02" label={`Rationale`} />
      <RationaleBlock text={family.rationale} />

      <DemoLabel num="03" label={`Recommended · ${recommended.name} · across surfaces`} />
      <div className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)] sm:grid-cols-3">
        <MarkPlate variant={recommended} surface="paper" />
        <MarkPlate variant={recommended} surface="navy" />
        <MarkPlate variant={recommended} surface="mono-light" />
      </div>

      <DemoLabel num="04" label="Primary lockup" />
      <div className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)]">
        <LockupPlate variant={recommended} surface="paper" />
        <LockupPlate variant={recommended} surface="navy" />
      </div>

      <DemoLabel num="05" label="Compact lockup · scale ladder" />
      <div className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <CompactLockup variant={recommended} surface="paper" />
        <ScaleLadder variant={recommended} />
      </div>

      <DemoLabel num="06" label="Construction · specs" />
      <Construction variant={recommended} />

      <DemoLabel num="07" label="Applications" />
      <Applications variant={recommended} />

      <DemoLabel num="08" label="In context · journal cover" />
      <JournalCover variant={recommended} />
    </section>
  );
}

function VariantGrid({ family }: { family: Family }) {
  return (
    <div
      className="relative grid gap-5 p-6 sm:gap-6 sm:p-10 lg:p-12"
      style={{ background: PAPER, color: NAVY }}
    >
      <CornerTicks color={NAVY} />
      <div
        className={
          'grid grid-cols-1 gap-5 ' +
          (family.variants.length === 4
            ? 'sm:grid-cols-2 lg:grid-cols-4'
            : 'sm:grid-cols-3')
        }
      >
        {family.variants.map((v) => (
          <VariantCard key={v.id} variant={v} />
        ))}
      </div>
    </div>
  );
}

function VariantCard({ variant }: { variant: Variant }) {
  const Mark = variant.component;
  return (
    <div
      className="relative flex flex-col items-center gap-3 border p-6"
      style={{ borderColor: 'rgba(10,9,24,0.10)', background: '#FBF8EF' }}
    >
      {variant.recommended && (
        <span
          className="absolute right-2.5 top-2.5 border px-1.5 py-0.5 text-[8px] uppercase tracking-[0.18em]"
          style={{ fontFamily: 'var(--font-mono)', color: INK, borderColor: INK }}
        >
          Recommended
        </span>
      )}

      <div style={{ color: INK }}>
        <Mark size={150} />
      </div>

      <div className="text-[18px] italic" style={{ fontFamily: 'var(--font-display)', color: NAVY }}>
        {variant.name}
      </div>

      <div
        className="text-[9px] uppercase tracking-[0.16em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.55)' }}
      >
        {variant.sub}
      </div>

      <p
        className="m-0 max-w-[28ch] text-center text-[13px] leading-snug"
        style={{ fontFamily: 'var(--font-display)', color: 'rgba(10,9,24,0.7)' }}
      >
        {variant.description}
      </p>

      <div
        className="mt-2 flex w-full items-end justify-around border-t pt-3"
        style={{ borderColor: 'rgba(10,9,24,0.10)', color: NAVY }}
      >
        <Mark size={48} />
        <Mark size={28} />
        <Mark size={16} />
        <Mark size={11} />
      </div>
    </div>
  );
}

function RationaleBlock({ text }: { text: string }) {
  return (
    <div
      className="relative border-l py-1 pl-6"
      style={{ borderColor: 'var(--color-accent-action)' }}
    >
      <p
        className="m-0 max-w-[70ch] text-[15px] italic leading-relaxed text-[var(--color-ink-secondary)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {text}
      </p>
    </div>
  );
}

/* ── decision matrix ──────────────────────────────────────────── */

interface MatrixRow {
  criterion: string;
  pure: string;
  framed: string;
  notes: string;
}

const MATRIX_ROWS: MatrixRow[] = [
  {
    criterion: 'Coherence with wordmark',
    pure: 'Maximum — same axis, same letter',
    framed: 'Maximum — same letter, with frame',
    notes: 'Both win. The font does the work.',
  },
  {
    criterion: 'Distinctiveness',
    pure: 'Weak — any Fraunces user has a similar O',
    framed: 'Strong — the frame is the signature',
    notes: 'Framed wins.',
  },
  {
    criterion: 'Legibility at 16px (favicon)',
    pure: 'Risk — italic letterform reads as cropped text',
    framed: 'Solid — the frame survives even when the O blurs',
    notes: 'Framed wins.',
  },
  {
    criterion: 'Editorial register',
    pure: 'Pure typographic — Aesop / Penguin level',
    framed: 'Editorial + instrument — closer to Field Notes',
    notes: 'Both pass; different flavours.',
  },
  {
    criterion: 'Implementation cost',
    pure: 'Zero',
    framed: 'Zero (frame is trivial)',
    notes: 'Tied.',
  },
  {
    criterion: 'Survives single-ink reproduction',
    pure: 'Yes (just type)',
    framed: 'Yes (ring is a single shape)',
    notes: 'Tied.',
  },
  {
    criterion: 'Risk of looking accidental',
    pure: 'Real — "did the wordmark get cropped?"',
    framed: 'Negligible — the frame signals intention',
    notes: 'Framed wins.',
  },
];

function DecisionMatrix() {
  return (
    <section className="flex flex-col gap-6">
      <DemoLabel num="·" label="Decision matrix · Pure vs Framed" />

      {/* Desktop · 4-column grid */}
      <div
        className="hidden gap-px overflow-hidden border lg:grid lg:grid-cols-[1.2fr_1fr_1fr_1fr]"
        style={{ background: 'var(--color-border-subtle)', borderColor: 'var(--color-border-default)' }}
      >
        <Cell head>Criterion</Cell>
        <Cell head>Pure letterform</Cell>
        <Cell head>Framed (recommended)</Cell>
        <Cell head>Verdict</Cell>

        {MATRIX_ROWS.map((row) => (
          <DesktopRow key={row.criterion} {...row} />
        ))}
      </div>

      {/* Mobile · stacked card per row */}
      <div className="flex flex-col gap-3 lg:hidden">
        {MATRIX_ROWS.map((row) => (
          <MobileCard key={row.criterion} {...row} />
        ))}
      </div>
    </section>
  );
}

function DesktopRow({ criterion, pure, framed, notes }: MatrixRow) {
  return (
    <>
      <Cell>{criterion}</Cell>
      <Cell>{pure}</Cell>
      <Cell highlight>{framed}</Cell>
      <Cell muted>{notes}</Cell>
    </>
  );
}

function MobileCard({ criterion, pure, framed, notes }: MatrixRow) {
  return (
    <article
      className="flex flex-col gap-3 border p-4"
      style={{ borderColor: 'var(--color-border-default)', background: 'var(--color-bg-canvas)' }}
    >
      <div className="flex flex-col gap-1">
        <span
          className="text-[9px] uppercase tracking-[0.32em] text-[var(--color-accent-action)]"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
        >
          Criterion
        </span>
        <h4
          className="m-0 text-[16px] italic leading-snug text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
        >
          {criterion}
        </h4>
      </div>

      <div className="flex flex-col gap-2.5 border-t pt-3" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <MobileField label="Pure letterform" value={pure} />
        <MobileField label="Framed (recommended)" value={framed} highlight />
        <MobileField label="Verdict" value={notes} muted />
      </div>
    </article>
  );
}

function MobileField({
  label,
  value,
  highlight,
  muted,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="grid gap-0.5">
      <span
        className="text-[9px] uppercase tracking-[0.28em] text-[var(--color-ink-tertiary)]"
        style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
      >
        {label}
      </span>
      <p
        className="m-0 text-[13px] italic leading-snug"
        style={{
          fontFamily: 'var(--font-display)',
          color: muted
            ? 'var(--color-ink-tertiary)'
            : highlight
              ? 'var(--color-ink-primary)'
              : 'var(--color-ink-secondary)',
          fontWeight: highlight ? 500 : 400,
          fontStyle: muted ? 'normal' : 'italic',
        }}
      >
        {value}
      </p>
    </div>
  );
}

function Cell({
  children,
  head,
  highlight,
  muted,
}: {
  children: ReactNode;
  head?: boolean;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={[
        'p-4 text-[13px] leading-snug',
        head ? 'text-[10px] uppercase tracking-[0.32em]' : '',
      ].join(' ')}
      style={{
        background: 'var(--color-bg-canvas)',
        color: head
          ? 'var(--color-accent-action)'
          : muted
            ? 'var(--color-ink-tertiary)'
            : highlight
              ? 'var(--color-ink-primary)'
              : 'var(--color-ink-secondary)',
        fontFamily: head ? 'var(--font-mono)' : 'var(--font-display)',
        fontStyle: head || muted ? 'normal' : 'italic',
        fontWeight: head ? 600 : highlight ? 500 : 400,
      }}
    >
      {children}
    </div>
  );
}

/* ── recommendation ───────────────────────────────────────────── */

function Recommendation() {
  return (
    <section
      className="relative grid grid-cols-1 gap-7 p-6 sm:gap-8 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-12"
      style={{ background: PAPER, color: NAVY }}
    >
      <CornerTicks color={NAVY} />
      <div className="flex flex-col gap-5">
        <span
          className="text-[10px] uppercase tracking-[0.32em]"
          style={{ fontFamily: 'var(--font-mono)', color: INK }}
        >
          Recommendation
        </span>
        <h3
          className="m-0 text-[28px] leading-[1.05] tracking-[-0.02em] sm:text-[40px] lg:text-[52px]"
          style={{ fontFamily: 'var(--font-display)', color: NAVY }}
        >
          Framed · Minimal ring +{' '}
          <em style={{ color: INK, fontStyle: 'italic' }}>O</em> at display
          axis.
        </h3>
        <p
          className="m-0 max-w-[55ch] text-[16px] leading-relaxed italic"
          style={{ fontFamily: 'var(--font-display)', color: 'rgba(10,9,24,0.7)' }}
        >
          The thin ring keeps the mark legible at 16 px. The O stays the
          live Fraunces axis the team approved for the wordmark — every change
          to the wordmark family propagates to the logomark for free, no new
          file to maintain. This converges the four R02 votes (Stamp A, Origin
          A/B, Horizon C) into a single letterform-first direction that the
          team proposal pointed to.
        </p>
        <div className="mt-2 flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(10,9,24,0.18)' }}>
          <span
            className="text-[10px] uppercase tracking-[0.18em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.55)' }}
          >
            Next steps
          </span>
          <ol
            className="m-0 list-decimal pl-5 text-[14px] leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)', color: NAVY }}
          >
            <li>Team confirms the direction (or proposes a new one).</li>
            <li>Outline the Fraunces O at the chosen axis to a static SVG path.</li>
            <li>
              Export the deliverables listed in <code style={{ fontFamily: 'var(--font-mono)', color: INK }}>BRAND.md §Deliverables</code>: source SVGs, colour variants, raster exports, favicon multi-resolution.
            </li>
            <li>Update <code style={{ fontFamily: 'var(--font-mono)', color: INK }}>BRAND.md §Open decisions</code> — mark the logomark direction resolved.</li>
          </ol>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div
          className="grid h-full max-h-[420px] w-full max-w-[420px] place-items-center border"
          style={{ borderColor: 'rgba(10,9,24,0.10)', background: '#FBF8EF' }}
        >
          <div style={{ color: INK }}>
            <Wordmark size={48} />
          </div>
          <div className="my-4 h-px w-12" style={{ background: 'rgba(10,9,24,0.18)' }} />
          <RecommendedHero />
        </div>
      </div>
    </section>
  );
}

function RecommendedHero() {
  // Live render of the recommended Framed_MinimalRing at hero size.
  return (
    <svg width={260} height={260} viewBox="0 0 256 256" fill="none">
      <circle cx="128" cy="128" r="112" stroke={INK} strokeWidth="3" />
      <text
        x="128"
        y="128"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontWeight={500}
        fontSize={170}
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
        fill={INK}
        textAnchor="middle"
        dominantBaseline="central"
      >
        O
      </text>
    </svg>
  );
}

/* ── shared atoms ─────────────────────────────────────────────── */

function CornerTicks({ color }: { color: string }) {
  const s = { borderColor: color, opacity: 0.55 } as const;
  return (
    <>
      <span aria-hidden className="absolute h-3 w-3 border-l border-t" style={{ top: 14, left: 14, ...s }} />
      <span aria-hidden className="absolute h-3 w-3 border-r border-t" style={{ top: 14, right: 14, ...s }} />
      <span aria-hidden className="absolute h-3 w-3 border-b border-l" style={{ bottom: 14, left: 14, ...s }} />
      <span aria-hidden className="absolute h-3 w-3 border-b border-r" style={{ bottom: 14, right: 14, ...s }} />
    </>
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
