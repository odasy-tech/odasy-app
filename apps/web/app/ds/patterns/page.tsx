'use client';

import { Coffee, Landmark, Leaf, Mountain, Compass as CompassIcon } from 'lucide-react';
import {
  Button,
  Card,
  MetaLabel,
  MissionCard,
  PlaceCard,
  Stamp,
  StampGrid,
  XPBar,
} from '@odasy/ui/web';
import {
  ShowcaseDemo,
  ShowcaseSection,
} from '@/components/ds-showcase/section';

export default function PatternsPage() {
  return (
    <ShowcaseSection
      eyebrow="In practice · Patterns"
      title="Compositions, not components."
      titleAccent="Recipes."
      description={
        <>
          Patterns are how the primitives + product tier come together into the
          shapes you'll actually ship. Each one is opinionated — you can lift
          the whole composition into a page and edit copy.
        </>
      }
    >
      {/* ── Pattern 01 · Hero ──────────────────────────────────── */}
      <ShowcaseDemo
        title="Hero · editorial dossier"
        index={1}
        description="The Opener pattern. Subhead → display title → subtitle → primary + ghost CTA."
        compact
      >
        <div className="flex w-full flex-col items-center gap-7 px-4 py-12 text-center">
          <MetaLabel tone="accent">Expedición · Expediente · Clasificación · Pública</MetaLabel>
          <h2
            className="text-[64px] leading-[0.92] tracking-[-0.035em] text-[var(--color-ink-primary)] sm:text-[88px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Odasy
            <span
              aria-hidden
              className="ml-2 align-top text-[14px] tracking-[0.32em] text-[var(--color-accent-action)]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              01
            </span>
          </h2>
          <p
            className="max-w-md text-[15px] leading-[1.55] text-[var(--color-ink-secondary)] sm:text-[18px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Un instrumento de campo para exploradores que sus viajes{' '}
            <em className="text-[var(--color-accent-action)]">signifiquen algo</em>.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="primary" withArrow>
              Abrir expediente
            </Button>
            <Button variant="secondary">I Capítulo · La premisa</Button>
          </div>
        </div>
      </ShowcaseDemo>

      {/* ── Pattern 02 · Dossier card ──────────────────────────── */}
      <ShowcaseDemo
        title="Dossier card · with stamps"
        index={2}
        description="Card cornerTicks + StampGrid + XPBar — the cluster used on the Artifact section."
        compact
      >
        <Card cornerTicks className="w-full max-w-2xl">
          <div className="flex items-center justify-between gap-4">
            <MetaLabel tone="accent">Expediente · Valentina Restrepo</MetaLabel>
            <span
              className="text-[10px] tabular-nums text-[var(--color-ink-tertiary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              REG. 0042 · 2026-08
            </span>
          </div>
          <h3
            className="mt-4 text-[28px] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tres sellos. Una historia.
          </h3>
          <div className="mt-5">
            <StampGrid cols={3} smCols={3}>
              <Stamp index={0} title="Origen Café" place="Salento" date="2026-07-14" tier="bronze" glyph={<Coffee size={20} strokeWidth={1.3} />} />
              <Stamp index={1} title="Pueblo Patrimonio" place="Filandia" date="2026-07-28" tier="silver" glyph={<Landmark size={20} strokeWidth={1.3} />} />
              <Stamp index={2} title="Caminante" place="Cocora" date="2026-08-10" tier="gold" glyph={<Leaf size={20} strokeWidth={1.3} />} />
            </StampGrid>
          </div>
          <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-5">
            <XPBar current={620} target={1000} />
          </div>
        </Card>
      </ShowcaseDemo>

      {/* ── Pattern 03 · Mission grid ──────────────────────────── */}
      <ShowcaseDemo
        title="Mission grid"
        index={3}
        description="Two-column mission selection with mixed states."
        compact
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <MissionCard
            title="Ruta del Sabor"
            description="Sigue el rastro del sabor de Quindío, mercado por mercado."
            type="gastronomy"
            difficulty={4}
            status="in-progress"
            location="Armenia · Quindío"
            reward="+150 XP"
            stepsDone={3}
            stepsTotal={5}
            onClick={() => undefined}
          />
          <MissionCard
            title="Cumbre"
            description="Conquista el volcán al amanecer."
            type="exploration"
            difficulty={5}
            status="locked"
            location="Nevado del Ruiz"
            reward="+400 XP · Platinum"
          />
        </div>
      </ShowcaseDemo>

      {/* ── Pattern 04 · Place strip ───────────────────────────── */}
      <ShowcaseDemo
        title="Place strip"
        index={4}
        description="Horizontal scroller of PlaceCard. Used on the Field section."
        compact
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <PlaceCard
            name="Finca El Ocaso"
            location="Salento, Quindío"
            category="coffee"
            status="discovered"
            description="Café de origen entre montañas."
          />
          <PlaceCard
            name="Valle de Cocora"
            location="Salento, Quindío"
            category="nature"
            status="wishlisted"
            description="Las palmas más altas del mundo."
          />
          <PlaceCard
            name="Filandia"
            location="Quindío"
            category="culture"
            status="discovered"
            description="Pueblo patrimonio, balcones de colores."
          />
        </div>
      </ShowcaseDemo>

      {/* ── Pattern 05 · Empty state ───────────────────────────── */}
      <ShowcaseDemo
        title="Empty state · expedition"
        index={5}
        description="What greets a brand-new explorer before their first stamp."
        compact
      >
        <Card variant="quiet" className="w-full max-w-lg text-center">
          <div className="flex flex-col items-center gap-5 p-2">
            <div className="ds-animate-breathe text-[var(--color-accent-action)] opacity-60">
              <CompassIcon size={42} strokeWidth={1.2} />
            </div>
            <MetaLabel tone="accent">Expediente · vacío</MetaLabel>
            <h3
              className="text-[22px] leading-[1.15] tracking-[-0.01em] text-[var(--color-ink-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Aún no hay sellos.
            </h3>
            <p
              className="max-w-xs text-[13px] leading-[1.6] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Tu primera misión te espera en Salento. Cuando completes la ruta,
              este expediente se abre.
            </p>
            <Button variant="primary" withArrow size="sm">
              Empezar expedición
            </Button>
          </div>
        </Card>
      </ShowcaseDemo>

      {/* ── Pattern 06 · Locked tier ───────────────────────────── */}
      <ShowcaseDemo
        title="Locked summit"
        index={6}
        description="A teaser for a yet-unearned platinum stamp."
        compact
      >
        <Card cornerTicks hatch className="w-full max-w-md text-center">
          <div className="flex flex-col items-center gap-4">
            <Stamp index={0} title="Cumbre" place="Nevado del Ruiz" tier="platinum" glyph={<Mountain size={22} strokeWidth={1.3} />} earned={false} />
            <h3
              className="text-[20px] leading-[1.15] tracking-[-0.01em] text-[var(--color-ink-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Reservado para los que llegan al amanecer.
            </h3>
            <Button variant="ghost" size="sm">
              Ver requisitos
            </Button>
          </div>
        </Card>
      </ShowcaseDemo>
    </ShowcaseSection>
  );
}
