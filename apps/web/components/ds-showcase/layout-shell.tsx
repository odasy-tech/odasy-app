'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Container, MetaLabel, ThemeProvider, ThemeToggle } from '@odasy/ui/web';

interface NavGroup {
  label: string;
  items: { href: string; label: string }[];
}

const NAV: NavGroup[] = [
  {
    label: 'Foundations',
    items: [
      { href: '/ds', label: 'Overview' },
      { href: '/ds/tokens/colors', label: 'Colors' },
      { href: '/ds/tokens/typography', label: 'Typography' },
      { href: '/ds/tokens/spacing', label: 'Spacing & radii' },
      { href: '/ds/tokens/motion', label: 'Motion' },
    ],
  },
  {
    label: 'Tier 1 · Primitives',
    items: [
      { href: '/ds/components/button', label: 'Button' },
      { href: '/ds/components/card', label: 'Card' },
      { href: '/ds/components/input', label: 'Input' },
      { href: '/ds/components/badge', label: 'Badge' },
      { href: '/ds/components/divider', label: 'Divider' },
      { href: '/ds/components/meta-label', label: 'MetaLabel' },
      { href: '/ds/components/section-head', label: 'SectionHead' },
      { href: '/ds/components/theme-toggle', label: 'ThemeToggle' },
    ],
  },
  {
    label: 'Tier 2 · Product',
    items: [
      { href: '/ds/components/stamp', label: 'Stamp · StampGrid' },
      { href: '/ds/components/xp-bar', label: 'XPBar · LevelIndicator' },
      { href: '/ds/components/mission-card', label: 'MissionCard' },
      { href: '/ds/components/place-card', label: 'PlaceCard' },
      { href: '/ds/components/archetype-mix', label: 'ArchetypeMix' },
      { href: '/ds/components/interest-selector', label: 'InterestSelector' },
      { href: '/ds/components/map-pin', label: 'MapPin' },
      { href: '/ds/components/reward-chip', label: 'RewardChip' },
    ],
  },
  {
    label: 'Tier 3 · Editorial',
    items: [
      { href: '/ds/components/archetype', label: 'Archetype' },
      { href: '/ds/components/chapter-rail', label: 'ChapterRail' },
      { href: '/ds/components/compass', label: 'Compass' },
      { href: '/ds/components/coordinates', label: 'Coordinates' },
      { href: '/ds/components/sweep-line', label: 'SweepLine' },
      { href: '/ds/components/topo-bg', label: 'TopoBg' },
    ],
  },
];

export function ShowcaseShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ThemeProvider defaultTheme="light">
      <main
        className="ds-paper relative min-h-screen text-[var(--color-ink-primary)]"
        style={{ fontFamily: 'var(--font-family-sans)' }}
      >
        <header className="sticky top-0 z-30 border-b border-[var(--color-border-default)] bg-[var(--color-bg-canvas)]/80 backdrop-blur-md">
          <Container width="wide">
            <div className="flex items-center justify-between py-4">
              <Link
                href="/ds"
                className="text-[18px] tracking-[0.04em] text-[var(--color-ink-primary)]"
                style={{ fontFamily: 'var(--font-family-display)' }}
              >
                Odasy <span className="text-[var(--color-ink-secondary)]">/ DS</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/v2"
                  className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] hover:text-[var(--color-accent-action)]"
                >
                  Live landing →
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </Container>
        </header>

        <Container width="wide" className="py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <nav className="sticky top-24 flex flex-col gap-8">
                {NAV.map((group) => (
                  <div key={group.label} className="flex flex-col gap-3">
                    <MetaLabel tone="accent">{group.label}</MetaLabel>
                    <ul className="flex flex-col gap-1.5">
                      {group.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block text-[13px] tracking-[0.01em] transition-colors"
                              style={{
                                color: active
                                  ? 'var(--color-accent-action)'
                                  : 'var(--color-ink-secondary)',
                                fontWeight: active ? 600 : 400,
                              }}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            <div className="min-w-0">{children}</div>
          </div>
        </Container>
      </main>
    </ThemeProvider>
  );
}
