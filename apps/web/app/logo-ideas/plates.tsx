/**
 * Logo proposal plates — adapted to Aurora.
 *
 * Each plate sits on a brand-canvas surface (paper / navy / mono) and
 * shows the mark or the lockup with corner ticks, plate metadata, and a
 * caption. The plate aesthetics live as their own primitives because
 * they only matter on `/logo-ideas` — they are not Aurora components,
 * they are *brand presentation* artefacts.
 */

import type { ComponentType, ReactNode } from 'react';
import type { MarkProps, Variant } from './marks';

/* ── tokens ───────────────────────────────────────────────────────
 * Brand canvases (from BRAND.md) — warmer than the DS UI canvases. */

const PAPER = '#F8F4EA';
const PAPER_2 = '#EFE8D6';
const NAVY = '#0A0918';
const INK = '#5046C8';
const VOLT = '#D4DAFF';

export type Surface = 'paper' | 'navy' | 'mono-light' | 'mono-dark';

const surfaceStyles: Record<Surface, { bg: string; ink: string; foot: string }> = {
  paper: { bg: PAPER, ink: NAVY, foot: 'rgba(10,9,24,0.18)' },
  navy: { bg: NAVY, ink: PAPER, foot: 'rgba(248,244,234,0.18)' },
  'mono-light': { bg: PAPER, ink: '#000000', foot: 'rgba(0,0,0,0.18)' },
  'mono-dark': { bg: '#000000', ink: PAPER, foot: 'rgba(248,244,234,0.18)' },
};

const markColor: Record<Surface, string> = {
  paper: INK,
  navy: VOLT,
  'mono-light': '#000000',
  'mono-dark': PAPER,
};

/* ── shared atoms ─────────────────────────────────────────────── */

function Ticks({ color }: { color: string }) {
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

function PlateMeta({ num, label }: { num: string; label: string }) {
  return (
    <div
      className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.16em] opacity-55"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="tabular-nums">{num}</span>
      <span>{label}</span>
    </div>
  );
}

function PlateFoot({ name, code, color }: { name: string; code: string; color: string }) {
  return (
    <div className="flex items-baseline justify-between border-t pt-2.5 text-[10px] tracking-[0.08em] opacity-60" style={{ borderColor: color }}>
      <span className="text-[13px] italic opacity-85" style={{ fontFamily: 'var(--font-display)' }}>
        {name}
      </span>
      <span className="uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
        {code}
      </span>
    </div>
  );
}

export function Wordmark({ size = 64, color, italic = true, weight = 500 }: { size?: number; color?: string; italic?: boolean; weight?: number }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: size,
        fontStyle: italic ? 'italic' : 'normal',
        fontWeight: weight,
        fontVariationSettings: '"opsz" 144, "SOFT" 50',
        letterSpacing: '-0.01em',
        lineHeight: 0.9,
        color: color ?? 'currentColor',
      }}
    >
      Odasy
    </span>
  );
}

/* ── plate base ───────────────────────────────────────────────── */

interface PlateProps {
  surface?: Surface;
  num: string;
  label: string;
  footName: string;
  footCode: string;
  height?: number;
  children: ReactNode;
}

function Plate({ surface = 'paper', num, label, footName, footCode, height, children }: PlateProps) {
  const { bg, ink, foot } = surfaceStyles[surface];
  return (
    <div
      className="relative grid grid-rows-[auto_1fr_auto] overflow-hidden"
      style={{
        background: bg,
        color: ink,
        padding: '28px 32px',
        fontFamily: 'var(--font-mono)',
        height: height ?? 'auto',
        minHeight: height ? undefined : 360,
      }}
    >
      <Ticks color={ink} />
      <PlateMeta num={num} label={label} />
      <div className="grid place-items-center py-4">
        <div style={{ color: markColor[surface] }}>{children}</div>
      </div>
      <PlateFoot name={footName} code={footCode} color={foot} />
    </div>
  );
}

/* ── plate variants ───────────────────────────────────────────── */

export function MarkPlate({ variant, surface = 'paper', size = 220 }: { variant: Variant; surface?: Surface; size?: number }) {
  const Mark = variant.component;
  return (
    <Plate
      surface={surface}
      num={variant.id.toUpperCase()}
      label={`logomark / ${surface}`}
      footName={variant.name}
      footCode={`odasy-logomark-${variant.id}.svg`}
    >
      <Mark size={size} />
    </Plate>
  );
}

export function LockupPlate({ variant, surface = 'paper' }: { variant: Variant; surface?: Surface }) {
  const Mark = variant.component;
  return (
    <Plate
      surface={surface}
      num={variant.id.toUpperCase()}
      label={`primary lockup / ${surface}`}
      footName={variant.name}
      footCode={`odasy-lockup--${variant.id}--${surface}.svg`}
    >
      <LockupRow>
        <Mark size={120} />
        <span style={{ width: 1, height: 56, background: 'currentColor', opacity: 0.25 }} />
        <Wordmark size={104} />
      </LockupRow>
    </Plate>
  );
}

export function CompactLockup({ variant, surface = 'paper' }: { variant: Variant; surface?: Surface }) {
  const Mark = variant.component;
  return (
    <Plate
      surface={surface}
      num={variant.id.toUpperCase()}
      label="compact lockup"
      footName={`Compact · ${variant.name}`}
      footCode={`odasy-lockup-compact--${variant.id}.svg`}
      height={300}
    >
      <LockupRow gap={14}>
        <Mark size={56} />
        <Wordmark size={48} />
      </LockupRow>
    </Plate>
  );
}

export function ScaleLadder({ variant }: { variant: Variant }) {
  const Mark = variant.component;
  const sizes = [96, 64, 40, 28, 20, 16, 12];
  return (
    <Plate
      surface="paper"
      num={variant.id.toUpperCase()}
      label="scale ladder · 96 → 12 px"
      footName="Legibility floor at 16px"
      footCode="—"
      height={300}
    >
      <div className="flex items-baseline gap-7" style={{ color: NAVY }}>
        {sizes.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Mark size={s} />
            <span
              className="text-[9px] tracking-[0.14em] tabular-nums"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.55)' }}
            >
              {s}px
            </span>
          </div>
        ))}
      </div>
    </Plate>
  );
}

/* ── helpers ──────────────────────────────────────────────────── */

function LockupRow({ children, gap = 22 }: { children: ReactNode; gap?: number }) {
  return (
    <div className="flex items-center" style={{ gap }}>
      {children}
    </div>
  );
}

/* ── compare 3 sub-variants ───────────────────────────────────── */

export function VariantsCompare({ variants, name, tagline, rationale }: { variants: Variant[]; name: string; tagline: string; rationale: string }) {
  return (
    <div
      className="relative grid gap-6 p-10 sm:p-12"
      style={{ background: PAPER, color: NAVY }}
    >
      <Ticks color={NAVY} />
      <div className="flex items-baseline gap-3.5 pb-1">
        <h3
          className="text-[11px] uppercase tracking-[0.24em]"
          style={{ fontFamily: 'var(--font-mono)', color: INK, margin: 0 }}
        >
          {name} · sub-variants
        </h3>
        <em
          className="text-[16px]"
          style={{ fontFamily: 'var(--font-display)', color: NAVY, fontStyle: 'italic' }}
        >
          {tagline}
        </em>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {variants.map((v) => {
          const Mark = v.component;
          return (
            <div
              key={v.id}
              className="relative flex flex-col items-center gap-3 border p-6"
              style={{ borderColor: 'rgba(10,9,24,0.10)', background: '#FBF8EF' }}
            >
              {v.recommended && (
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

              <div
                className="text-[18px] italic"
                style={{ fontFamily: 'var(--font-display)', color: NAVY }}
              >
                {v.name}
              </div>

              <div
                className="text-[9px] uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.55)' }}
              >
                {v.sub}
              </div>

              <p
                className="m-0 max-w-[28ch] text-center text-[13px] leading-snug"
                style={{ fontFamily: 'var(--font-display)', color: 'rgba(10,9,24,0.7)', fontStyle: 'normal' }}
              >
                {v.description}
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
        })}
      </div>

      <div
        className="mt-2 border-t pt-4 text-[14px] italic leading-relaxed"
        style={{
          borderColor: 'rgba(10,9,24,0.18)',
          fontFamily: 'var(--font-display)',
          color: 'rgba(10,9,24,0.7)',
          maxWidth: '70ch',
        }}
      >
        <strong
          className="mr-3 text-[10px] uppercase tracking-[0.18em] not-italic"
          style={{ fontFamily: 'var(--font-mono)', color: INK }}
        >
          Rationale
        </strong>
        {rationale}
      </div>
    </div>
  );
}

/* ── construction grid ────────────────────────────────────────── */

export function Construction({ variant }: { variant: Variant }) {
  const Mark = variant.component;
  return (
    <div
      className="relative grid grid-cols-1 gap-9 p-10 sm:p-12 lg:grid-cols-[1.1fr_1fr]"
      style={{ background: PAPER, color: NAVY }}
    >
      <Ticks color={NAVY} />
      <div>
        <h3
          className="m-0 mb-4 text-[11px] uppercase tracking-[0.24em]"
          style={{ fontFamily: 'var(--font-mono)', color: INK }}
        >
          Construction · {variant.name}
        </h3>
        <div
          className="relative grid place-items-center border p-4"
          style={{ borderColor: 'rgba(10,9,24,0.10)', background: '#FBF8EF', minHeight: 360 }}
        >
          <svg width="320" height="320" viewBox="0 0 256 256" className="absolute inset-0 m-auto">
            {Array.from({ length: 7 }).map((_, i) => (
              <g key={i}>
                <line x1={(i + 1) * 32} y1="0" x2={(i + 1) * 32} y2="256" stroke={INK} strokeWidth="0.4" opacity="0.18" />
                <line x1="0" y1={(i + 1) * 32} x2="256" y2={(i + 1) * 32} stroke={INK} strokeWidth="0.4" opacity="0.18" />
              </g>
            ))}
            <rect x="34" y="34" width="188" height="188" fill="none" stroke={INK} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.55" />
            <line x1="0" y1="128" x2="256" y2="128" stroke={INK} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
            <line x1="128" y1="0" x2="128" y2="256" stroke={INK} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="128" cy="128" r="108" fill="none" stroke={INK} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
            <text x="6" y="12" fill={INK} fontSize="6" fontFamily="var(--font-mono)">
              0,0
            </text>
            <text x="220" y="252" fill={INK} fontSize="6" fontFamily="var(--font-mono)">
              256,256
            </text>
            <text x="36" y="46" fill={INK} fontSize="6" fontFamily="var(--font-mono)">
              SAFE 188
            </text>
          </svg>
          <div style={{ color: INK, position: 'relative' }}>
            <Mark size={280} />
          </div>
        </div>
      </div>

      <div
        className="border-l py-1 pl-6 text-[16px] leading-relaxed"
        style={{ borderColor: 'rgba(10,9,24,0.18)', fontFamily: 'var(--font-display)', color: NAVY }}
      >
        <h3
          className="m-0 mb-3 text-[11px] uppercase tracking-[0.24em]"
          style={{ fontFamily: 'var(--font-mono)', color: INK }}
        >
          Specifications
        </h3>
        <p className="m-0 mb-3 italic">{variant.description}</p>

        <div
          className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 border-t pt-3 text-[10px] uppercase tracking-[0.06em]"
          style={{ borderColor: 'rgba(10,9,24,0.18)', fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.55)' }}
        >
          <span>
            viewBox <b style={{ color: NAVY, fontWeight: 500 }}>256 × 256</b>
          </span>
          <span>
            safe area <b style={{ color: NAVY, fontWeight: 500 }}>188 × 188</b>
          </span>
          <span>
            min size <b style={{ color: NAVY, fontWeight: 500 }}>16 px</b>
          </span>
          <span>
            clear space <b style={{ color: NAVY, fontWeight: 500 }}>≥ 32 u</b>
          </span>
          <span>
            strokes <b style={{ color: NAVY, fontWeight: 500 }}>currentColor</b>
          </span>
          <span>
            fills <b style={{ color: NAVY, fontWeight: 500 }}>currentColor</b>
          </span>
          <span>
            file <b style={{ color: NAVY, fontWeight: 500 }}>logomark-{variant.id}.svg</b>
          </span>
          <span>
            format <b style={{ color: NAVY, fontWeight: 500 }}>SVG · optimized</b>
          </span>
        </div>

        <p className="mt-3.5 text-[14px] italic" style={{ fontFamily: 'var(--font-display)' }}>
          The mark holds against — <em style={{ color: INK }}>Editorial</em>, <em style={{ color: INK }}>Restrained</em>,{' '}
          <em style={{ color: INK }}>Specific</em>, <em style={{ color: INK }}>Modern artefact</em>.{' '}
          <em style={{ color: INK }}>Earned</em> is carried by usage context (stamp surfaces in product), not by the mark in isolation.
        </p>
      </div>
    </div>
  );
}

/* ── applications grid ────────────────────────────────────────── */

export function Applications({ variant }: { variant: Variant }) {
  const Mark = variant.component;
  return (
    <div className="relative grid grid-rows-[auto_1fr] gap-6 p-10 sm:p-12" style={{ background: PAPER, color: NAVY }}>
      <Ticks color={NAVY} />
      <div className="flex items-baseline justify-between">
        <h3
          className="m-0 text-[11px] uppercase tracking-[0.24em]"
          style={{ fontFamily: 'var(--font-mono)', color: INK }}
        >
          Applications · {variant.name}
        </h3>
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.55)' }}
        >
          app · favicon · browser · stamp
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <AppCell label="App · paper">
          <IosIcon><Mark size={56} /></IosIcon>
        </AppCell>
        <AppCell label="App · violet">
          <IosIcon variant="violet"><Mark size={56} /></IosIcon>
        </AppCell>
        <AppCell label="App · navy">
          <IosIcon variant="navy"><Mark size={56} /></IosIcon>
        </AppCell>

        <AppCell label="Browser · 14px">
          <BrowserBar Mark={Mark} />
        </AppCell>

        <AppCell label="Avatar · 64">
          <IosIcon size={64} radius={14}>
            <Mark size={32} />
          </IosIcon>
        </AppCell>

        <AppCell label="Favicon · 32">
          <IosIcon size={32} radius={6}>
            <Mark size={20} />
          </IosIcon>
        </AppCell>

        <AppCell label="Favicon · 16">
          <IosIcon size={18} radius={3}>
            <Mark size={12} />
          </IosIcon>
        </AppCell>

        <AppCell label="Stamp imprint">
          <div
            className="flex items-center justify-center border border-dashed"
            style={{ background: PAPER_2, borderColor: 'rgba(10,9,24,0.18)', width: 220, height: 80 }}
          >
            <div className="flex items-center gap-3.5" style={{ color: 'rgba(10,9,24,0.55)' }}>
              <Mark size={48} />
              <div
                className="text-left text-[9px] uppercase tracking-[0.14em] leading-tight"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                ODASY
                <br />
                SELLO · BRONCE
                <br />
                2026·07·14
              </div>
            </div>
          </div>
        </AppCell>
      </div>
    </div>
  );
}

function AppCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {children}
      <div
        className="text-[9px] uppercase tracking-[0.14em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.55)' }}
      >
        {label}
      </div>
    </div>
  );
}

function IosIcon({
  variant = 'paper',
  size = 96,
  radius = 22,
  children,
}: {
  variant?: 'paper' | 'violet' | 'navy';
  size?: number;
  radius?: number;
  children: ReactNode;
}) {
  const styles = {
    paper: { background: PAPER, borderColor: 'rgba(10,9,24,0.18)', color: INK },
    violet: { background: INK, borderColor: 'rgba(0,0,0,0.15)', color: PAPER },
    navy: { background: NAVY, borderColor: 'rgba(0,0,0,0.4)', color: VOLT },
  }[variant];
  return (
    <div
      className="grid place-items-center border"
      style={{
        ...styles,
        width: size,
        height: size,
        borderRadius: radius,
        boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(10,9,24,0.08)',
      }}
    >
      {children}
    </div>
  );
}

function BrowserBar({ Mark }: { Mark: ComponentType<MarkProps> }) {
  return (
    <div
      className="w-full overflow-hidden border"
      style={{ borderColor: 'rgba(10,9,24,0.18)', background: '#FBF8EF', borderRadius: 10, fontFamily: 'var(--font-mono)' }}
    >
      <div className="flex h-[22px] items-center gap-1 px-2" style={{ background: '#ECE3CD' }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(10,9,24,0.25)' }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(10,9,24,0.25)' }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(10,9,24,0.25)' }} />
      </div>
      <div
        className="flex items-center gap-2 border-b px-3 py-2 text-[10px]"
        style={{ borderColor: 'rgba(10,9,24,0.10)', background: PAPER, color: NAVY }}
      >
        <span style={{ color: INK }}>
          <Mark size={14} />
        </span>
        <span className="flex-1 truncate">Odasy — Salento, 2026</span>
        <span style={{ opacity: 0.4 }}>×</span>
      </div>
      <div className="px-3 py-2 text-[10px]" style={{ color: 'rgba(10,9,24,0.55)' }}>
        odasy.com / journal / 2026-07-14
      </div>
    </div>
  );
}

/* ── in-context journal cover ─────────────────────────────────── */

export function JournalCover({ variant }: { variant: Variant }) {
  const Mark = variant.component;
  return (
    <div className="relative" style={{ background: PAPER, color: NAVY, height: 580 }}>
      <Ticks color={NAVY} />

      <div
        className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.5)' }}
      >
        <span>EDITION · 01</span>
        <span>IN CONTEXT — JOURNAL COVER</span>
      </div>

      <div
        className="absolute grid gap-7 border p-6"
        style={{ inset: 36, gridTemplateRows: 'auto 1fr auto', borderColor: 'rgba(10,9,24,0.18)' }}
      >
        <div className="flex items-center gap-4.5">
          <div style={{ color: INK }}>
            <Mark size={48} />
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.18em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.6)' }}
          >
            Odasy · A field instrument for the modern explorer
          </span>
        </div>

        <div className="flex flex-col justify-center gap-1.5">
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ fontFamily: 'var(--font-mono)', color: INK }}
          >
            Salento, Quindío · 2026·07·14
          </span>
          <h2
            className="m-0 text-[56px] italic"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontVariationSettings: '"opsz" 144, "SOFT" 60',
              letterSpacing: '-0.015em',
              lineHeight: 1,
              color: NAVY,
            }}
          >
            Soul of Coffee.
          </h2>
          <span
            className="mt-1.5 text-[18px]"
            style={{ fontFamily: 'var(--font-display)', color: 'rgba(10,9,24,0.7)', maxWidth: '38ch' }}
          >
            Tres sellos. Una historia. Reservado para quienes llegan al amanecer.
          </span>
        </div>

        <div
          className="flex items-baseline justify-between border-t pt-3 text-[10px] uppercase tracking-[0.16em]"
          style={{ borderColor: 'rgba(10,9,24,0.18)', fontFamily: 'var(--font-mono)', color: 'rgba(10,9,24,0.6)' }}
        >
          <span>04°38′06″N · 75°34′12″W</span>
          <span>03 stamps · earned</span>
          <span>R · 01</span>
        </div>
      </div>
    </div>
  );
}
