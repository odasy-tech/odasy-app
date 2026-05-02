/**
 * Odasy theme — public barrel.
 *
 * Cross-platform consumers import canonical tokens from here:
 *
 *   import { tokens, typography, motion } from '@odasy/ui/theme';
 *
 * Web also consumes the codegen output (`@odasy/ui/styles/tokens.css`)
 * for Tailwind `@theme` integration; mobile consumes the TS objects
 * directly via Tamagui themes.
 */

// Aurora (canonical) — used by every new consumer.
export { palette } from './palette';
export { tokens, lightTokens, darkTokens } from './tokens';
export type { Theme, Tokens } from './tokens';

export { typography, fonts, scale, weight, tracking, leading, fraunces } from './typography';
export type {
  Typography,
  FontScale,
  FontWeight,
  Tracking,
  Leading,
  FrauncesPreset,
} from './typography';

export { spacing, container, gutter } from './spacing';
export type { Spacing, SpacingKey, Container } from './spacing';

export { radii } from './radii';
export type { Radii, RadiiKey } from './radii';

export { shadows, lightShadows, darkShadows } from './shadows';
export type { Shadows, ShadowKey } from './shadows';

export { motion, duration, easing, easingPoints, spring, keyframes } from './motion';
export type { Motion, Duration, Easing, Spring, KeyframeName } from './motion';

// Legacy (Nightfall & Volt) — kept for the original landing only.
export {
  nightfallColors,
  nightfallSpacing,
  nightfallRadii,
  nightfallTokens,
  // Backwards-compat aliases:
  odasyColors,
  odasySpacing,
  odasyRadii,
  odasyTokens,
} from './legacy';
export type { NightfallColors, NightfallTokens } from './legacy';
