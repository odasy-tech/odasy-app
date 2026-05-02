'use client';

import { Coffee, Compass as CompassIcon, Landmark, Leaf, Mountain, Sprout, Theater, Utensils } from 'lucide-react';
import {
  Archetype,
  ArchetypeMix,
  Badge,
  Button,
  Card,
  Compass,
  Container,
  Coordinates,
  Divider,
  Input,
  InterestSelector,
  LevelIndicator,
  MapPin,
  MetaLabel,
  MissionCard,
  PlaceCard,
  RewardChip,
  SectionHead,
  Stamp,
  StampGrid,
  ThemeToggle,
  XPBar,
} from '@odasy/ui/web';
import { ShowcaseDemo, ShowcaseSection } from '@/components/ds-showcase/section';

export default function ComponentsOverview() {
  return (
    <ShowcaseSection
      eyebrow="Components · Index"
      title="All components, at a glance"
      description="Every DS component with at least one variant on display. Each one has a dedicated page with full props documentation and copy-paste snippets in subsequent iterations."
    >
      {/* Tier 1 · Primitives */}
      <Tier label="Tier 1 · Primitives">
        <ShowcaseDemo title="Button">
          <Container width="narrow" gutter={false} className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" withArrow>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" size="sm">Delete</Button>
            <Button loading>Loading…</Button>
            <Button disabled>Disabled</Button>
          </Container>
        </ShowcaseDemo>

        <ShowcaseDemo title="Card · variants & corners">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card variant="default">
              <MetaLabel tone="accent">Default</MetaLabel>
              <p className="mt-3 text-[13px] text-[var(--color-ink-secondary)]">Standard card surface.</p>
            </Card>
            <Card variant="quiet">
              <MetaLabel tone="accent">Quiet</MetaLabel>
              <p className="mt-3 text-[13px] text-[var(--color-ink-secondary)]">Elevated muted bg, subtle border.</p>
            </Card>
            <Card variant="default" cornerTicks hatch>
              <MetaLabel tone="accent">+ corners + hatch</MetaLabel>
              <p className="mt-3 text-[13px] text-[var(--color-ink-secondary)]">Instrumented look.</p>
            </Card>
          </div>
        </ShowcaseDemo>

        <ShowcaseDemo title="Input">
          <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Email" placeholder="you@expedition.co" />
            <Input label="Password" type="password" hint="At least 8 characters" />
            <Input label="Alias" defaultValue="Valentina" error="Already taken." />
            <Input label="Search" placeholder="Find a place…" />
          </div>
        </ShowcaseDemo>

        <ShowcaseDemo title="Badge">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Badge status="live" pulse>Live</Badge>
            <Badge status="beta">Beta</Badge>
            <Badge status="success">Success</Badge>
            <Badge status="warning">Warning</Badge>
            <Badge status="danger">Danger</Badge>
            <Badge status="info">Info</Badge>
            <Badge status="neutral">Neutral</Badge>
          </div>
        </ShowcaseDemo>

        <ShowcaseDemo title="Divider">
          <Divider />
          <Divider variant="pulse-pin" />
        </ShowcaseDemo>

        <ShowcaseDemo title="MetaLabel · tones">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MetaLabel tone="mute">mute</MetaLabel>
            <MetaLabel tone="accent">accent</MetaLabel>
            <MetaLabel tone="ink">ink</MetaLabel>
          </div>
        </ShowcaseDemo>

        <ShowcaseDemo title="SectionHead">
          <SectionHead
            meta="Capítulo III · El campo"
            heading="Empezamos donde nació el café."
            description="El Eje Cafetero es nuestro primer campo. Lo suficientemente pequeño para trabajarlo con obsesión."
          />
        </ShowcaseDemo>

        <ShowcaseDemo title="ThemeToggle">
          <ThemeToggle />
        </ShowcaseDemo>
      </Tier>

      {/* Tier 2 · Product */}
      <Tier label="Tier 2 · Product">
        <ShowcaseDemo title="Stamp · all tiers">
          <StampGrid cols={3} smCols={2} className="w-full max-w-2xl">
            <Stamp index={0} title="Origen Café" place="Salento, Quindío" date="2026-07-14" tier="bronze" glyph={<Coffee size={22} strokeWidth={1.3} />} />
            <Stamp index={1} title="Pueblo Patrimonio" place="Filandia" date="2026-07-28" tier="silver" glyph={<Landmark size={22} strokeWidth={1.3} />} />
            <Stamp index={2} title="Caminante del Valle" place="Valle de Cocora" date="2026-08-10" tier="gold" glyph={<Leaf size={22} strokeWidth={1.3} />} />
            <Stamp index={3} title="Cumbre" place="Nevado del Ruiz" tier="platinum" glyph={<Mountain size={22} strokeWidth={1.3} />} earned={false} />
            <Stamp index={4} title="Leyenda" place="???" tier="diamond" glyph={<CompassIcon size={22} strokeWidth={1.3} />} earned={false} />
          </StampGrid>
        </ShowcaseDemo>

        <ShowcaseDemo title="XPBar · LevelIndicator">
          <div className="flex w-full max-w-md flex-col gap-6">
            <XPBar current={620} target={1000} />
            <LevelIndicator level={3} title="Contemplador" xp={620} xpToNext={1000} />
          </div>
        </ShowcaseDemo>

        <ShowcaseDemo title="MissionCard">
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

        <ShowcaseDemo title="PlaceCard">
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

        <ShowcaseDemo title="ArchetypeMix">
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

        <ShowcaseDemo title="InterestSelector">
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

        <ShowcaseDemo title="MapPin · states">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MapPin state="active" label="Salento" />
            <MapPin state="discovered" label="Pereira" />
            <MapPin state="visited" label="Manizales" />
            <MapPin state="undiscovered" label="Filandia" />
          </div>
        </ShowcaseDemo>

        <ShowcaseDemo title="RewardChip">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <RewardChip kind="xp" label="+150 XP" />
            <RewardChip kind="badge" label="Caficultor" hint="Gold" />
            <RewardChip kind="stamp" label="Salento" hint="Bronze" />
            <RewardChip kind="title" label="Soul of Coffee" />
          </div>
        </ShowcaseDemo>
      </Tier>

      {/* Tier 3 · Editorial */}
      <Tier label="Tier 3 · Editorial">
        <ShowcaseDemo title="Archetype card">
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

        <ShowcaseDemo title="Compass · Coordinates">
          <div className="flex flex-col items-center gap-6">
            <Compass size={88} />
            <Coordinates />
          </div>
        </ShowcaseDemo>

        <ShowcaseDemo title="ChapterRail · SweepLine · TopoBg" description="Visible only on the live landing.">
          <p className="text-center text-[12px] text-[var(--color-ink-secondary)]">
            These three editorial components are environmental — anchored to the
            viewport edges and dependent on a long-form scrolling layout. See
            them live at{' '}
            <a className="text-[var(--color-accent-action)]" href="/v2">
              /v2
            </a>
            .
          </p>
        </ShowcaseDemo>
      </Tier>
    </ShowcaseSection>
  );
}

function Tier({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <MetaLabel tone="accent">{label}</MetaLabel>
        <div className="ds-rule flex-1" />
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}
