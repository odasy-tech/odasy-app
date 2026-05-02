'use client';

import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  Coffee,
  Leaf,
  Map,
  MapPin,
  Mountain,
  Search,
  Star,
  Sun,
  Theater,
  Utensils,
  Wind,
} from 'lucide-react';
import {
  ShowcaseDemo,
  ShowcaseSection,
} from '@/components/ds-showcase/section';

const ICONS = [
  { I: Compass, label: 'compass' },
  { I: Map, label: 'map' },
  { I: MapPin, label: 'map-pin' },
  { I: Mountain, label: 'mountain' },
  { I: Leaf, label: 'leaf' },
  { I: Sun, label: 'sun' },
  { I: Wind, label: 'wind' },
  { I: Coffee, label: 'coffee' },
  { I: Utensils, label: 'utensils' },
  { I: Theater, label: 'theater' },
  { I: Star, label: 'star' },
  { I: Search, label: 'search' },
  { I: ArrowUpRight, label: 'arrow-up-right' },
  { I: ArrowDown, label: 'arrow-down' },
];

export default function IconographyPage() {
  return (
    <ShowcaseSection
      eyebrow="Foundations · Iconography"
      title="Lucide, drawn light."
      titleAccent="Stroke 1.3."
      description={
        <>
          The DS uses <em>Lucide</em> at a <strong>1.3</strong> stroke weight
          (lighter than the default 2). It feels closer to draftsman ink than
          to a UI toolkit, which keeps the editorial register intact even
          inside dense product surfaces.
        </>
      }
    >
      {/* ── Stroke comparison ──────────────────────────────────── */}
      <ShowcaseDemo
        title="Stroke weights"
        index={1}
        description="Why 1.3 — comparison against the default 2."
        props={[{ name: 'strokeWidth', value: '1.3 (default in this DS)' }]}
      >
        <div className="grid w-full max-w-3xl grid-cols-3 gap-6">
          {([1.0, 1.3, 2.0] as const).map((w) => (
            <div key={w} className="flex flex-col items-center gap-3">
              <Compass size={56} strokeWidth={w} className="text-[var(--color-ink-primary)]" />
              <span
                className="text-[11px] tabular-nums text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                strokeWidth = {w.toFixed(1)}
                {w === 1.3 ? ' ←' : ''}
              </span>
            </div>
          ))}
        </div>
      </ShowcaseDemo>

      {/* ── Sizes ──────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Size scale"
        index={2}
        description="14 · 18 · 22 · 32 · 56"
      >
        <div className="flex flex-wrap items-end gap-8">
          {[14, 18, 22, 32, 56].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Compass size={s} strokeWidth={1.3} className="text-[var(--color-ink-primary)]" />
              <span
                className="text-[10px] tabular-nums text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {s}px
              </span>
            </div>
          ))}
        </div>
      </ShowcaseDemo>

      {/* ── Glyph index ────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Working set"
        index={3}
        description="The icons we reach for again and again. Pull from lucide-react."
      >
        <ul className="grid w-full grid-cols-2 gap-px bg-[var(--color-border-subtle)] sm:grid-cols-4 lg:grid-cols-7">
          {ICONS.map(({ I, label }) => (
            <li
              key={label}
              className="flex flex-col items-center justify-center gap-2 bg-[var(--color-bg-canvas)] p-5"
            >
              <I size={22} strokeWidth={1.3} className="text-[var(--color-ink-primary)]" />
              <span
                className="text-[9.5px] uppercase tracking-[0.28em] text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </ShowcaseDemo>

      {/* ── Custom glyphs ──────────────────────────────────────── */}
      <ShowcaseDemo
        title="Stamp glyphs"
        index={4}
        description="Stamps overlay a Lucide glyph at strokeWidth 1.3 inside an editorial frame. See Tier II · Stamp."
        compact
      >
        <p
          className="max-w-md text-center text-[12.5px] leading-[1.65] text-[var(--color-ink-secondary)]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Custom marks (Odasy logomark, compass star, regional pictograms) live
          in <code className="text-[var(--color-accent-action)]">packages/ui/src/web/glyphs</code>{' '}
          and follow the same 1.3 weight rule.
        </p>
      </ShowcaseDemo>
    </ShowcaseSection>
  );
}
