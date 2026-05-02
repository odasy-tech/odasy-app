'use client';

import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Input,
  MetaLabel,
  SectionHead,
  ThemeToggle,
} from '@odasy/ui/web';
import { CodeBlock } from '@/components/ds-showcase/code-block';
import {
  ShowcaseDemo,
  ShowcaseSection,
} from '@/components/ds-showcase/section';
import { Anatomy } from '@/components/ds-showcase/anatomy';

export default function PrimitivesPage() {
  return (
    <ShowcaseSection
      eyebrow="Tier I · Primitives"
      title="Everyday hardware."
      titleAccent="Nine pieces."
      description={
        <>
          Universal primitives — what every screen builds from. Tight props,
          sensible defaults, full keyboard + screen-reader support. If a
          pattern can be built from these, it should be.
        </>
      }
    >
      {/* ── Button ─────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Button"
        index={1}
        description="primary · secondary · ghost · danger"
        props={[
          { name: 'variant', value: '"primary" | "secondary" | "ghost" | "danger"' },
          { name: 'size', value: '"sm" | "md" | "lg"' },
          { name: 'withArrow', value: 'boolean' },
        ]}
      >
        <Container width="narrow" gutter={false} className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" withArrow>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger" size="sm">Delete</Button>
          <Button loading>Loading…</Button>
          <Button disabled>Disabled</Button>
        </Container>
      </ShowcaseDemo>

      <ShowcaseDemo title="Anatomy" index={2} compact>
        <Anatomy
          notes={[
            { x: 12, y: 50, labelX: 5, labelY: 50, side: 'left', label: 'Label', hint: 'Geist 600 caps' },
            { x: 78, y: 30, labelX: 96, labelY: 25, side: 'right', label: 'Arrow', hint: 'Optional · ghosted on hover' },
            { x: 50, y: 92, labelX: 50, labelY: 99, side: 'bottom', label: 'Padding', hint: '14px × 28px' },
          ]}
          caption="Button · primary · md"
        >
          <Button variant="primary" withArrow>Abrir expediente</Button>
        </Anatomy>
      </ShowcaseDemo>

      <ShowcaseDemo title="Snippet" index={3} compact>
        <CodeBlock label="button.tsx" language="tsx">
          {`<Button variant="primary" withArrow>
  Abrir expediente
</Button>`}
        </CodeBlock>
      </ShowcaseDemo>

      {/* ── Card ───────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Card · variants & corners"
        index={4}
        description="default · quiet · cornerTicks · hatch"
        props={[
          { name: 'variant', value: '"default" | "quiet" | "tight"' },
          { name: 'cornerTicks', value: 'boolean' },
          { name: 'hatch', value: 'boolean' },
        ]}
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <Card variant="default">
            <MetaLabel tone="accent">Default</MetaLabel>
            <p className="mt-3 text-[13px] text-[var(--color-ink-secondary)]">
              Standard card surface.
            </p>
          </Card>
          <Card variant="quiet">
            <MetaLabel tone="accent">Quiet</MetaLabel>
            <p className="mt-3 text-[13px] text-[var(--color-ink-secondary)]">
              Elevated muted bg, subtle border.
            </p>
          </Card>
          <Card variant="default" cornerTicks hatch>
            <MetaLabel tone="accent">+ corners + hatch</MetaLabel>
            <p className="mt-3 text-[13px] text-[var(--color-ink-secondary)]">
              The instrumented look.
            </p>
          </Card>
        </div>
      </ShowcaseDemo>

      {/* ── Input ──────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Input"
        index={5}
        description="default · with hint · with error"
        props={[
          { name: 'label', value: 'string' },
          { name: 'hint', value: 'string?' },
          { name: 'error', value: 'string?' },
        ]}
      >
        <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Email" placeholder="you@expedition.co" />
          <Input label="Password" type="password" hint="At least 8 characters" />
          <Input label="Alias" defaultValue="Valentina" error="Already taken." />
          <Input label="Search" placeholder="Find a place…" />
        </div>
      </ShowcaseDemo>

      {/* ── Badge ──────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Badge"
        index={6}
        description="seven statuses, optional pulse"
        props={[
          { name: 'status', value: '"live" | "beta" | "success" | "warning" | "danger" | "info" | "neutral"' },
          { name: 'pulse', value: 'boolean' },
        ]}
      >
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

      {/* ── Divider ────────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Divider"
        index={7}
        description="default · pulse-pin"
      >
        <div className="flex w-full max-w-md flex-col gap-8">
          <Divider />
          <Divider variant="pulse-pin" />
        </div>
      </ShowcaseDemo>

      {/* ── MetaLabel ──────────────────────────────────────────── */}
      <ShowcaseDemo
        title="MetaLabel · tones"
        index={8}
        description="The micro-typography of the dossier."
        props={[
          { name: 'tone', value: '"mute" | "accent" | "ink" | "inverse"' },
          { name: 'size', value: '"sm" | "md"' },
        ]}
      >
        <div className="flex flex-wrap items-center justify-center gap-8">
          <MetaLabel tone="mute">mute</MetaLabel>
          <MetaLabel tone="accent">accent</MetaLabel>
          <MetaLabel tone="ink">ink</MetaLabel>
          <MetaLabel tone="accent" marker="01">capítulo</MetaLabel>
        </div>
      </ShowcaseDemo>

      {/* ── SectionHead ────────────────────────────────────────── */}
      <ShowcaseDemo
        title="SectionHead"
        index={9}
        description="The standard section opener."
      >
        <SectionHead
          meta="Capítulo III · El campo"
          heading="Empezamos donde nació el café."
          description="El Eje Cafetero es nuestro primer campo. Lo suficientemente pequeño para trabajarlo con obsesión."
        />
      </ShowcaseDemo>

      {/* ── ThemeToggle ────────────────────────────────────────── */}
      <ShowcaseDemo
        title="ThemeToggle"
        index={10}
        description="Light / dark switch — sticky on the showcase shell."
      >
        <ThemeToggle />
      </ShowcaseDemo>

      {/* ── Container ──────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Container · widths"
        index={11}
        description="narrow 900 · default 1100 · wide 1320 · bleed"
        compact
      >
        <div className="flex w-full flex-col gap-2">
          {(['narrow', 'default', 'wide', 'bleed'] as const).map((w) => (
            <div
              key={w}
              className="flex items-center gap-3 border-l border-[var(--color-accent-action)] pl-3 text-[10px] uppercase tracking-[0.32em]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="w-16 text-[var(--color-ink-secondary)]">{w}</span>
              <span className="text-[var(--color-ink-tertiary)]">
                {w === 'narrow' && '900px'}
                {w === 'default' && '1100px'}
                {w === 'wide' && '1320px'}
                {w === 'bleed' && '∞'}
              </span>
            </div>
          ))}
        </div>
      </ShowcaseDemo>
    </ShowcaseSection>
  );
}
