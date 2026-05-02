import { Card, MetaLabel } from '@odasy/ui/web';
import {
  ShowcaseDemo,
  ShowcaseSection,
} from '@/components/ds-showcase/section';

export default function IdentityPage() {
  return (
    <ShowcaseSection
      eyebrow="In practice · Identity"
      title="The voice behind the marks."
      titleAccent="Why Aurora."
      description={
        <>
          A design system can ship a thousand tokens and still feel like
          nothing. This plate explains the choices behind <em>Aurora</em>:
          where the name comes from, why violet on paper, and how the dossier
          metaphor anchors every component decision.
        </>
      }
    >
      {/* ── Origin ─────────────────────────────────────────────── */}
      <ShowcaseDemo title="Name · Aurora" index={1} compact>
        <div className="flex w-full max-w-3xl flex-col gap-5 p-2">
          <p
            className="text-[18px] leading-[1.65] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <em>Aurora</em> — the dawn that breaks over a finished expedition.
            A traveler closes their dossier at sunrise, reads back over the
            stamps, and realises the trip <em>meant something</em>.
          </p>
          <p
            className="text-[14px] leading-[1.7] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            The name had to do two jobs: signal a moment of clarity (which the
            DS gives the brand visually), and avoid sounding like another
            startup gradient. Aurora is editorial without being precious;
            warm without being soft.
          </p>
        </div>
      </ShowcaseDemo>

      {/* ── Voice ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <VoiceCard
          tone="Editorial, not corporate"
          do={[
            '"Un instrumento de campo para exploradores."',
            '"Reservado para quienes llegan al amanecer."',
          ]}
          dont={[
            '"The all-in-one travel platform."',
            '"Unlock rewards as you explore!"',
          ]}
        />
        <VoiceCard
          tone="Specific, not vague"
          do={[
            '"Tres sellos. Una historia."',
            '"Salento, Quindío · 2026-07-14"',
          ]}
          dont={[
            '"Many adventures await."',
            '"Around the world."',
          ]}
        />
        <VoiceCard
          tone="Earned, not inflated"
          do={[
            '"Caminante del Valle"',
            '"Sello bronce — el primero."',
          ]}
          dont={[
            '"Legendary explorer 🚀"',
            '"Epic gold-tier badge!!"',
          ]}
        />
      </div>

      {/* ── Palette rationale ──────────────────────────────────── */}
      <ShowcaseDemo
        title="Why violet on paper"
        index={2}
        description="The Nightfall × Volt rationale, in two minutes."
        compact
      >
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <PaletteCallout
            label="Paper"
            hex="#F4F1E8 → #FAF7EE"
            body="Warm vellum, never #FFFFFF. Reads as a document, not a screen. Carries the dossier metaphor without ever saying 'dossier' out loud."
            swatch="#F8F4EA"
          />
          <PaletteCallout
            label="Violet ink"
            hex="#5046C8 (action) · #1A1830 (deep)"
            body="Deeper than the usual SaaS violet. Closer to historical ink than to 'tech purple.' Works for accent, action, and primary text in the dark theme."
            swatch="#5046C8"
          />
          <PaletteCallout
            label="Volt highlight"
            hex="#D4DAFF (dark theme accent)"
            body="The high-key counterpart in dark mode. Used for ChapterRail dots, accent italics, and any 'aha' moment where the eye should land."
            swatch="#D4DAFF"
          />
          <PaletteCallout
            label="Moss"
            hex="#5B7A4F"
            body="The single non-violet accent. Reserved for nature-archetype components (Contemplador, Consciente). Never used for UI states."
            swatch="#5B7A4F"
          />
        </div>
      </ShowcaseDemo>

      {/* ── Typography pairing ─────────────────────────────────── */}
      <ShowcaseDemo
        title="The trio"
        index={3}
        description="Fraunces — Geist — Geist Mono. One for the title, one for the body, one for the metadata."
      >
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
          <FontCard
            name="Fraunces"
            role="Display · titles · italics"
            sample="Tres sellos."
            font="var(--font-display)"
            italic
          />
          <FontCard
            name="Geist"
            role="Body · UI · labels"
            sample="Empezamos donde nació el café."
            font="var(--font-sans)"
          />
          <FontCard
            name="Geist Mono"
            role="Metadata · coordinates · code"
            sample="04°32'42.18&quot; N · 075°40'17.42&quot; W"
            font="var(--font-mono)"
            mono
          />
        </div>
      </ShowcaseDemo>

      {/* ── Closing pull-quote ─────────────────────────────────── */}
      <Card variant="quiet" cornerTicks>
        <div className="flex flex-col gap-4 p-2 text-center">
          <MetaLabel tone="accent">Manifesto</MetaLabel>
          <p
            className="mx-auto max-w-2xl text-[24px] leading-[1.35] tracking-[-0.005em] text-[var(--color-ink-primary)] sm:text-[28px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            We don't build screens.{' '}
            <em className="text-[var(--color-accent-action)]">
              We bind expedition dossiers
            </em>{' '}
            — and we want every page to feel like a plate someone took the
            time to engrave.
          </p>
        </div>
      </Card>
    </ShowcaseSection>
  );
}

/* ── Helpers ────────────────────────────────────────────────────── */

function VoiceCard({
  tone,
  do: doList,
  dont,
}: {
  tone: string;
  do: string[];
  dont: string[];
}) {
  return (
    <Card>
      <MetaLabel tone="accent">{tone}</MetaLabel>
      <ul className="mt-5 flex flex-col gap-2.5">
        {doList.map((line) => (
          <li
            key={line}
            className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-action)]" aria-hidden />
            <span className="italic">{line}</span>
          </li>
        ))}
      </ul>
      <div className="ds-rule my-5" />
      <ul className="flex flex-col gap-2.5">
        {dont.map((line) => (
          <li
            key={line}
            className="flex items-start gap-2.5 text-[12.5px] leading-[1.55] text-[var(--color-ink-tertiary)] line-through decoration-[var(--color-ink-tertiary)]/40"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full border border-[var(--color-ink-tertiary)]" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function PaletteCallout({
  label,
  hex,
  body,
  swatch,
}: {
  label: string;
  hex: string;
  body: string;
  swatch: string;
}) {
  return (
    <div className="flex gap-5 border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-5">
      <div
        className="h-20 w-20 shrink-0 border border-[var(--color-border-default)]"
        style={{ backgroundColor: swatch }}
        aria-hidden
      />
      <div className="flex flex-col gap-2">
        <MetaLabel tone="accent">{label}</MetaLabel>
        <span
          className="text-[11px] tabular-nums text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {hex}
        </span>
        <p
          className="text-[12.5px] leading-[1.6] text-[var(--color-ink-secondary)]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function FontCard({
  name,
  role,
  sample,
  font,
  italic = false,
  mono = false,
}: {
  name: string;
  role: string;
  sample: string;
  font: string;
  italic?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6">
      <div className="flex items-baseline justify-between">
        <span
          className="text-[18px] tracking-[-0.005em] text-[var(--color-ink-primary)]"
          style={{ fontFamily: font, fontWeight: 500 }}
        >
          {name}
        </span>
        <span
          className="text-[9.5px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          {role}
        </span>
      </div>
      <div className="ds-rule" />
      <div
        className={[
          'text-[20px] leading-[1.3] text-[var(--color-ink-primary)]',
          mono ? 'tabular-nums text-[14px]' : '',
          italic ? 'italic' : '',
        ].join(' ')}
        style={{ fontFamily: font }}
      >
        {sample}
      </div>
    </div>
  );
}
