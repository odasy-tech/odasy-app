/**
 * Public component surface — `@odasy/ui/web`.
 *
 * Tier 1 · primitives (universal):
 *   Badge · Button · Card · Container · Divider · Input · MetaLabel
 *   · SectionHead · ThemeToggle
 *
 * Tier 2 · product (MVP-aligned):
 *   ArchetypeMix · InterestSelector · LevelIndicator · MapPin
 *   · MissionCard · PlaceCard · RewardChip · Stamp · StampGrid · XPBar
 *
 * Tier 3 · editorial (landing surfaces):
 *   Archetype · ChapterRail · Compass · CompassBackdrop · Coordinates
 *   · SweepLine · TopoBg
 */

/* Tier 1 — primitives */
export { Badge } from './badge';
export type { BadgeProps, BadgeStatus } from './badge';

export { Button } from './button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './button';

export { Card } from './card';
export type { CardProps, CardVariant } from './card';

export { Container } from './container';
export type { ContainerProps } from './container';

export { Divider } from './divider';
export type { DividerProps, DividerVariant } from './divider';

export { DropCap } from './drop-cap';
export type { DropCapProps } from './drop-cap';

export { Input } from './input';
export type { InputProps, InputTone } from './input';

export { MetaLabel } from './meta-label';
export type { MetaLabelProps } from './meta-label';

export { SectionHead } from './section-head';
export type { SectionHeadProps } from './section-head';

export { ThemeToggle } from './theme-toggle';
export type { ThemeToggleProps } from './theme-toggle';

/* Tier 2 — product */
export { ArchetypeMix } from './archetype-mix';
export type { ArchetypeMixProps, ArchetypeMixSegment } from './archetype-mix';

export { InterestSelector } from './interest-selector';
export type { InterestSelectorProps, InterestOption } from './interest-selector';

export { LevelIndicator } from './level-indicator';
export type { LevelIndicatorProps } from './level-indicator';

export { MapPin } from './map-pin';
export type { MapPinProps, MapPinState } from './map-pin';

export { MissionCard } from './mission-card';
export type {
  MissionCardProps,
  MissionStatus,
  MissionType,
  MissionDifficulty,
} from './mission-card';

export { PlaceCard } from './place-card';
export type { PlaceCardProps, PlaceCategory, PlaceStatus } from './place-card';

export { RewardChip } from './reward-chip';
export type { RewardChipProps, RewardKind } from './reward-chip';

export { Stamp } from './stamp';
export type { StampProps, StampTier } from './stamp';

export { StampGrid } from './stamp-grid';
export type { StampGridProps } from './stamp-grid';

export { XPBar } from './xp-bar';
export type { XPBarProps } from './xp-bar';

/* Tier 3 — editorial */
export { Archetype } from './archetype';
export type { ArchetypeProps, ArchetypeAccent } from './archetype';

export { ChapterRail } from './chapter-rail';
export type { ChapterRailProps, ChapterEntry } from './chapter-rail';

export { Compass } from './compass';
export type { CompassProps } from './compass';

export { CompassBackdrop } from './compass-backdrop';

export { Coordinates } from './coordinates';
export type { CoordinatesProps } from './coordinates';

export { SweepLine } from './sweep-line';

export { TopoBg } from './topo-bg';
