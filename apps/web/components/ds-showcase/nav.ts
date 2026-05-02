/**
 * Showcase navigation — single source of truth for the DS index.
 *
 * Every entry has a plate number (Roman) so the editorial chrome
 * (header marker, sidebar, prev/next footer) can be derived from one
 * list. The order of plates in this file IS the order of the dossier.
 */

export interface PlateEntry {
  /** URL path. */
  href: string;
  /** Title shown in the sidebar. */
  label: string;
  /** Roman numeral plate marker. */
  plate: string;
  /** Group label for the sidebar (matches GROUP_LABELS keys). */
  group: PlateGroup;
  /** Short status: 'live', 'draft', 'wip'. Drives the dot color. */
  status?: 'live' | 'draft' | 'wip';
  /** One-line description used by the page hero meta column. */
  blurb?: string;
}

export type PlateGroup = 'foundations' | 'tier1' | 'tier2' | 'tier3' | 'practice';

export const GROUP_LABELS: Record<PlateGroup, string> = {
  foundations: 'Foundations',
  tier1: 'Tier I · Primitives',
  tier2: 'Tier II · Product',
  tier3: 'Tier III · Editorial',
  practice: 'In practice',
};

export const PLATES: PlateEntry[] = [
  {
    href: '/ds',
    label: 'Overview',
    plate: 'I',
    group: 'foundations',
    status: 'live',
    blurb: 'A field guide to the Aurora design system.',
  },
  {
    href: '/ds/tokens/colors',
    label: 'Colors',
    plate: 'II',
    group: 'foundations',
    status: 'live',
    blurb: 'Three-layer palette: raw, semantic, component.',
  },
  {
    href: '/ds/tokens/typography',
    label: 'Typography',
    plate: 'III',
    group: 'foundations',
    status: 'live',
    blurb: 'Fraunces × Geist, fluid scale, editorial caps.',
  },
  {
    href: '/ds/tokens/spacing',
    label: 'Spacing & radii',
    plate: 'IV',
    group: 'foundations',
    status: 'live',
    blurb: '4-pixel base, square radii, generous rhythm.',
  },
  {
    href: '/ds/tokens/motion',
    label: 'Motion',
    plate: 'V',
    group: 'foundations',
    status: 'live',
    blurb: 'Six durations × six easings, named keyframes.',
  },
  {
    href: '/ds/tokens/iconography',
    label: 'Iconography',
    plate: 'VI',
    group: 'foundations',
    status: 'draft',
    blurb: 'Lucide at 1.3 stroke weight, custom marks for stamps.',
  },
  {
    href: '/ds/primitives',
    label: 'Primitives',
    plate: 'VII',
    group: 'tier1',
    status: 'live',
    blurb: 'Button, Card, Input, Badge, Divider, MetaLabel, more.',
  },
  {
    href: '/ds/product',
    label: 'Product',
    plate: 'VIII',
    group: 'tier2',
    status: 'live',
    blurb: 'Stamp, XPBar, MissionCard, PlaceCard — game in dossier voice.',
  },
  {
    href: '/ds/editorial',
    label: 'Editorial',
    plate: 'IX',
    group: 'tier3',
    status: 'live',
    blurb: 'Compass, ChapterRail, TopoBg — the landing instruments.',
  },
  {
    href: '/ds/patterns',
    label: 'Patterns',
    plate: 'X',
    group: 'practice',
    status: 'draft',
    blurb: 'Compositions: hero, dossier card, mission grid.',
  },
  {
    href: '/ds/identity',
    label: 'Identity',
    plate: 'XI',
    group: 'practice',
    status: 'draft',
    blurb: 'Voice, name origin, palette rationale.',
  },
];

/**
 * Group plates for sidebar rendering.
 */
export function groupedPlates(): { group: PlateGroup; entries: PlateEntry[] }[] {
  const order: PlateGroup[] = ['foundations', 'tier1', 'tier2', 'tier3', 'practice'];
  return order
    .map((group) => ({
      group,
      entries: PLATES.filter((p) => p.group === group),
    }))
    .filter((g) => g.entries.length > 0);
}

/**
 * Find the plate entry for a path.
 */
export function plateFor(pathname: string): PlateEntry | undefined {
  return PLATES.find((p) => p.href === pathname);
}

/**
 * Adjacent plates (prev / next) for a given path.
 */
export function siblings(pathname: string): {
  prev: PlateEntry | null;
  next: PlateEntry | null;
} {
  const i = PLATES.findIndex((p) => p.href === pathname);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? PLATES[i - 1] ?? null : null,
    next: i < PLATES.length - 1 ? PLATES[i + 1] ?? null : null,
  };
}
