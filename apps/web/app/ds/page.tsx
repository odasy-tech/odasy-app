import { Card, MetaLabel } from '@odasy/ui/web';
import { ShowcaseDemo, ShowcaseSection } from '@/components/ds-showcase/section';

export default function DSOverview() {
  return (
    <ShowcaseSection
      eyebrow="Odasy · Design System"
      title="Atelier Cartographique"
      description={
        <>
          The token + component library that carries Odasy across web and mobile.
          Built around an editorial light surface (paper + violet ink) with a
          parallel dark mode, fluid typography, semantic accents, and a focused
          set of product components aligned to the seven pillars in{' '}
          <code className="px-1 text-[var(--color-accent-action)]">VISION.md</code>.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card cornerTicks>
          <MetaLabel tone="accent">Foundations</MetaLabel>
          <h3
            className="mt-4 text-[28px] leading-[1.05] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            One source of truth.
          </h3>
          <p
            className="mt-3 text-[14px] leading-[1.7] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Tokens declared in TypeScript, generated to CSS for web and consumed
            directly by Tamagui on mobile. Light + dark themes ship together.
          </p>
        </Card>

        <Card cornerTicks>
          <MetaLabel tone="accent">Tier 1 · Primitives</MetaLabel>
          <h3
            className="mt-4 text-[28px] leading-[1.05] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            The everyday hardware.
          </h3>
          <p
            className="mt-3 text-[14px] leading-[1.7] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Button, Card, Input, Badge, Divider, MetaLabel, SectionHead,
            ThemeToggle, Container. Tight contracts, sensible defaults, full
            keyboard + screen reader support.
          </p>
        </Card>

        <Card cornerTicks>
          <MetaLabel tone="accent">Tier 2 · Product</MetaLabel>
          <h3
            className="mt-4 text-[28px] leading-[1.05] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            The Odasy soul.
          </h3>
          <p
            className="mt-3 text-[14px] leading-[1.7] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Stamp, XPBar, LevelIndicator, MissionCard, PlaceCard, MapPin,
            ArchetypeMix, RewardChip, InterestSelector. Editorial + game
            mechanics in one vocabulary.
          </p>
        </Card>
      </div>

      <ShowcaseDemo title="Quick proof" description="A live snippet using DS components.">
        <Card variant="quiet" className="w-full max-w-md">
          <MetaLabel tone="accent">Capítulo III · El campo</MetaLabel>
          <h3
            className="mt-4 text-[32px] leading-[1.05] text-[var(--color-ink-primary)]"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Empezamos donde nació el café.
          </h3>
        </Card>
      </ShowcaseDemo>
    </ShowcaseSection>
  );
}
