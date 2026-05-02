import Link from 'next/link';
import { ArrowUpRight, Compass, Map, Sparkles } from 'lucide-react';
import { Card, MetaLabel } from '@odasy/ui/web';
import { CodeBlock } from '@/components/ds-showcase/code-block';
import {
  ShowcaseDemo,
  ShowcaseSection,
  TierBand,
} from '@/components/ds-showcase/section';
import { groupedPlates, GROUP_LABELS } from '@/components/ds-showcase/nav';

export default function DSOverview() {
  const groups = groupedPlates();

  return (
    <ShowcaseSection
      eyebrow="Atelier · Plate I"
      title="A field guide to Odasy."
      titleAccent="The atelier."
      description={
        <>
          Aurora is the design system that carries Odasy across web and mobile.
          Three layers of tokens, three tiers of components, one editorial
          voice — built to make the dossier metaphor render the same on every
          surface. This index is the master plate; every other route is one
          chapter of it.
        </>
      }
    >
      {/* ── Manifesto trio ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ManifestoCard
          marker="01"
          icon={<Compass size={18} strokeWidth={1.4} />}
          title="One source of truth."
          body="Tokens in TypeScript, generated to CSS for web, consumed directly by Tamagui on mobile. Light + dark ship together — never an afterthought."
        />
        <ManifestoCard
          marker="02"
          icon={<Map size={18} strokeWidth={1.4} />}
          title="Three tiers, one voice."
          body="Primitives are everyday hardware. Product components carry the game mechanics. Editorial pieces give the landing its dossier soul."
        />
        <ManifestoCard
          marker="03"
          icon={<Sparkles size={18} strokeWidth={1.4} />}
          title="Editorial, not corporate."
          body="Fraunces sets the title; Geist runs the UI; Geist Mono whispers the metadata. Violet ink + paper. Square radii by default. No timid grey."
        />
      </div>

      <TierBand
        marker="§"
        title="The dossier, plate by plate."
        blurb="Eleven plates. Read in order or jump in via the index on the left."
      />

      {/* ── Plate index — full table ─────────────────────────────── */}
      <div className="grid grid-cols-1 gap-12">
        {groups.map(({ group, entries }) => (
          <div key={group} className="flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <MetaLabel tone="accent">{GROUP_LABELS[group]}</MetaLabel>
              <div className="ds-rule flex-1" />
              <span
                className="text-[10px] tabular-nums text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {entries.length} plate{entries.length === 1 ? '' : 's'}
              </span>
            </div>
            <ul className="grid grid-cols-1 gap-px bg-[var(--color-border-subtle)] sm:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => (
                <li key={entry.href} className="bg-[var(--color-bg-canvas)]">
                  <Link
                    href={entry.href}
                    className="group flex items-start gap-4 p-5 transition-colors hover:bg-[var(--color-bg-elevated)]"
                  >
                    <span
                      className="mt-1 w-7 shrink-0 text-right text-[16px] italic tabular-nums text-[var(--color-accent-action)]"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                    >
                      {entry.plate}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-[15px] tracking-[-0.005em] text-[var(--color-ink-primary)]"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                        >
                          {entry.label}
                        </span>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.4}
                          className="text-[var(--color-ink-tertiary)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent-action)]"
                        />
                      </div>
                      {entry.blurb ? (
                        <span
                          className="text-[12px] leading-[1.5] text-[var(--color-ink-secondary)]"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {entry.blurb}
                        </span>
                      ) : null}
                      {entry.status && entry.status !== 'live' ? (
                        <span
                          className="mt-1 inline-flex w-fit items-center gap-1.5 text-[9px] uppercase tracking-[0.42em] text-[var(--color-ink-tertiary)]"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
                        >
                          <span
                            className="h-1 w-1 rounded-full bg-[var(--color-status-warning)]"
                            aria-hidden
                          />
                          {entry.status}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Quick install ────────────────────────────────────────── */}
      <ShowcaseDemo
        title="Drop a primitive into a Next.js page"
        index={1}
        description="Token-aware out of the box."
        compact
      >
        <CodeBlock label="app/page.tsx" language="tsx">
          {`import { Button, Card, MetaLabel } from '@odasy/ui/web';

export default function Page() {
  return (
    <Card cornerTicks>
      <MetaLabel tone="accent">Capítulo III · El campo</MetaLabel>
      <h2 style={{ fontFamily: 'var(--font-display)' }}>
        Empezamos donde nació el café.
      </h2>
      <Button variant="primary" withArrow>Abrir expediente</Button>
    </Card>
  );
}`}
        </CodeBlock>
      </ShowcaseDemo>
    </ShowcaseSection>
  );
}

/* ── Local helpers ─────────────────────────────────────────────── */

function ManifestoCard({
  marker,
  icon,
  title,
  body,
}: {
  marker: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card cornerTicks>
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.42em] text-[var(--color-accent-action)]"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
        >
          {marker}
        </span>
        <span className="text-[var(--color-accent-action)] opacity-70">{icon}</span>
      </div>
      <h3
        className="mt-5 text-[26px] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink-primary)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-[14px] leading-[1.65] text-[var(--color-ink-secondary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {body}
      </p>
    </Card>
  );
}
