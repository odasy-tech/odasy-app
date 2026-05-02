'use client';

import {
  Coffee,
  Compass as CompassIcon,
  Landmark,
  Leaf,
  Mountain,
  Theater,
  Utensils,
} from 'lucide-react';
import {
  ArchetypeMix,
  InterestSelector,
  LevelIndicator,
  MapPin,
  MissionCard,
  PlaceCard,
  RewardChip,
  Stamp,
  StampGrid,
  XPBar,
} from '@odasy/ui/web';
import {
  ShowcaseDemo,
  ShowcaseSection,
} from '@/components/ds-showcase/section';

export default function ProductPage() {
  return (
    <ShowcaseSection
      eyebrow="Tier II · Product"
      title="The Odasy soul."
      titleAccent="Game in dossier voice."
      description={
        <>
          Stamps, missions, places, archetypes. These components carry the
          gameplay vocabulary — how Odasy turns a trip into a story you
          actually want to look back on.
        </>
      }
    >
      {/* ── Stamps ─────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Stamp · all tiers"
        index={1}
        description="bronze · silver · gold · platinum · diamond"
        props={[
          { name: 'tier', value: '"bronze" | "silver" | "gold" | "platinum" | "diamond"' },
          { name: 'earned', value: 'boolean' },
          { name: 'glyph', value: 'ReactNode' },
        ]}
      >
        <StampGrid cols={3} smCols={2} className="w-full max-w-2xl">
          <Stamp index={0} title="Origen Café" place="Salento, Quindío" date="2026-07-14" tier="bronze" glyph={<Coffee size={22} strokeWidth={1.3} />} />
          <Stamp index={1} title="Pueblo Patrimonio" place="Filandia" date="2026-07-28" tier="silver" glyph={<Landmark size={22} strokeWidth={1.3} />} />
          <Stamp index={2} title="Caminante del Valle" place="Valle de Cocora" date="2026-08-10" tier="gold" glyph={<Leaf size={22} strokeWidth={1.3} />} />
          <Stamp index={3} title="Cumbre" place="Nevado del Ruiz" tier="platinum" glyph={<Mountain size={22} strokeWidth={1.3} />} earned={false} />
          <Stamp index={4} title="Leyenda" place="???" tier="diamond" glyph={<CompassIcon size={22} strokeWidth={1.3} />} earned={false} />
        </StampGrid>
      </ShowcaseDemo>

      {/* ── XPBar + LevelIndicator ─────────────────────────────── */}
      <ShowcaseDemo
        title="XPBar · LevelIndicator"
        index={2}
        description="The progression cluster."
        props={[
          { name: 'current', value: 'number' },
          { name: 'target', value: 'number' },
          { name: 'level', value: 'number' },
        ]}
      >
        <div className="flex w-full max-w-md flex-col gap-6">
          <XPBar current={620} target={1000} />
          <LevelIndicator level={3} title="Contemplador" xp={620} xpToNext={1000} />
        </div>
      </ShowcaseDemo>

      {/* ── MissionCard ────────────────────────────────────────── */}
      <ShowcaseDemo
        title="MissionCard"
        index={3}
        description="in-progress · locked"
        props={[
          { name: 'type', value: '"gastronomy" | "exploration" | …' },
          { name: 'difficulty', value: '1..5' },
          { name: 'status', value: '"available" | "in-progress" | "locked" | "completed"' },
        ]}
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

      {/* ── PlaceCard ──────────────────────────────────────────── */}
      <ShowcaseDemo
        title="PlaceCard"
        index={4}
        description="discovered · wishlisted"
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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
        </div>
      </ShowcaseDemo>

      {/* ── ArchetypeMix ───────────────────────────────────────── */}
      <ShowcaseDemo
        title="ArchetypeMix"
        index={5}
        description="A traveler's identity, broken into a coloured ribbon."
      >
        <ArchetypeMix
          className="w-full max-w-md"
          segments={[
            { archetype: 'Contemplador', pct: 38 },
            { archetype: 'Cultural', pct: 27 },
            { archetype: 'Sibarita', pct: 18 },
            { archetype: 'Navegante', pct: 17 },
          ]}
        />
      </ShowcaseDemo>

      {/* ── InterestSelector ───────────────────────────────────── */}
      <ShowcaseDemo
        title="InterestSelector"
        index={6}
        description="Multi-select chip group used during onboarding."
      >
        <InterestSelector
          options={[
            { id: 'coffee', label: 'Café', glyph: <Coffee size={14} strokeWidth={1.7} /> },
            { id: 'nature', label: 'Naturaleza', glyph: <Leaf size={14} strokeWidth={1.7} /> },
            { id: 'towns', label: 'Pueblos', glyph: <Landmark size={14} strokeWidth={1.7} /> },
            { id: 'food', label: 'Gastronomía', glyph: <Utensils size={14} strokeWidth={1.7} /> },
            { id: 'culture', label: 'Cultura', glyph: <Theater size={14} strokeWidth={1.7} /> },
          ]}
        />
      </ShowcaseDemo>

      {/* ── MapPin ─────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="MapPin · states"
        index={7}
        description="active · discovered · visited · undiscovered"
      >
        <div className="flex flex-wrap items-center justify-center gap-8">
          <MapPin state="active" label="Salento" />
          <MapPin state="discovered" label="Pereira" />
          <MapPin state="visited" label="Manizales" />
          <MapPin state="undiscovered" label="Filandia" />
        </div>
      </ShowcaseDemo>

      {/* ── RewardChip ─────────────────────────────────────────── */}
      <ShowcaseDemo
        title="RewardChip"
        index={8}
        description="xp · badge · stamp · title"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <RewardChip kind="xp" label="+150 XP" />
          <RewardChip kind="badge" label="Caficultor" hint="Gold" />
          <RewardChip kind="stamp" label="Salento" hint="Bronze" />
          <RewardChip kind="title" label="Soul of Coffee" />
        </div>
      </ShowcaseDemo>
    </ShowcaseSection>
  );
}
