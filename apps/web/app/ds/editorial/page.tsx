'use client';

import Link from 'next/link';
import { Compass as CompassIcon, Leaf, Sprout } from 'lucide-react';
import {
  Archetype,
  Compass,
  Coordinates,
} from '@odasy/ui/web';
import {
  ShowcaseDemo,
  ShowcaseSection,
} from '@/components/ds-showcase/section';

export default function EditorialPage() {
  return (
    <ShowcaseSection
      eyebrow="Tier III · Editorial"
      title="The landing instruments."
      titleAccent="Atmosphere as code."
      description={
        <>
          The editorial tier is environmental — components that depend on a
          long-form scrolling layout, the page edges, or a particular surface
          to make sense. Most have to be seen alive on the landing.
        </>
      }
    >
      {/* ── Archetype card ─────────────────────────────────────── */}
      <ShowcaseDemo
        title="Archetype card"
        index={1}
        description="primary · accent variants"
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <Archetype
            name="Navegante"
            copy="Siempre buscando nuevos horizontes."
            glyph={<CompassIcon size={18} strokeWidth={1.6} />}
            primary
          />
          <Archetype
            name="Contemplador"
            copy="Viaja lento. Conoce profundo."
            glyph={<Leaf size={18} strokeWidth={1.6} />}
            accent="moss"
          />
          <Archetype
            name="Consciente"
            copy="Viaja con responsabilidad e impacto."
            glyph={<Sprout size={18} strokeWidth={1.6} />}
            accent="moss"
          />
        </div>
      </ShowcaseDemo>

      {/* ── Compass + Coordinates ──────────────────────────────── */}
      <ShowcaseDemo
        title="Compass · Coordinates"
        index={2}
        description="Live-tick instruments — the dossier's signature texture."
        props={[
          { name: 'size', value: 'number (px)' },
          { name: 'baseLat / baseLon', value: '{ deg, min }' },
        ]}
      >
        <div className="flex flex-col items-center gap-8">
          <Compass size={96} />
          <Coordinates />
        </div>
      </ShowcaseDemo>

      {/* ── Environmental components ───────────────────────────── */}
      <ShowcaseDemo
        title="SweepLine · TopoBg · CompassBackdrop"
        index={3}
        description="Visible only on the live landing."
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <EnvCard
            title="SweepLine"
            blurb="A one-shot hairline that sweeps across the top of the viewport on load — the instrument powering up."
            anchor="sweep-line"
          />
          <EnvCard
            title="TopoBg"
            blurb="Topographic contour backdrop. Concentric beziers in info-blue, one highlighted in accent."
            anchor="topo-bg"
          />
          <EnvCard
            title="CompassBackdrop"
            blurb="Cinematic compass-rose backdrop, slow-rotating at very low alpha behind the hero wordmark."
            anchor="compass-backdrop"
          />
        </div>
      </ShowcaseDemo>

      <div className="mt-2 flex justify-center">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-7 py-3.5 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] transition hover:border-[var(--color-accent-action)] hover:text-[var(--color-accent-action)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          <span>See them on the live landing</span>
          <span className="block h-[1px] w-6 bg-[var(--color-ink-tertiary)] transition-all group-hover:w-10 group-hover:bg-[var(--color-accent-action)]" />
        </Link>
      </div>
    </ShowcaseSection>
  );
}

function EnvCard({
  title,
  blurb,
  anchor,
}: {
  title: string;
  blurb: string;
  anchor: string;
}) {
  return (
    <div className="flex flex-col gap-3 border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-5">
      <div className="flex items-center justify-between">
        <h4
          className="text-[16px] tracking-[-0.005em] text-[var(--color-ink-primary)]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
        >
          {title}
        </h4>
        <span
          className="text-[9.5px] uppercase tracking-[0.42em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          #{anchor}
        </span>
      </div>
      <p
        className="text-[12.5px] leading-[1.6] text-[var(--color-ink-secondary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {blurb}
      </p>
    </div>
  );
}
