/**
 * Legacy "Nightfall & Volt" tokens — preserved for the original `/`
 * landing on apps/web and any consumer that still references the old
 * palette before the Aurora migration.
 *
 * ⚠️ Do not extend this. New product surfaces consume the canonical
 * tokens from `./tokens.ts`. This file exists for backwards compatibility
 * only and should be removed once every consumer is on the Aurora system.
 */

export const nightfallColors = {
  // Base — the "dark paper" of the night map
  ink950: '#0B0F0D',
  ink900: '#131815',
  ink800: '#1D241F',
  ink700: '#2B342D',

  // Brand signature
  volt: '#CDFA5E',
  voltDeep: '#A5D236',

  // Text — warm off-whites
  bone: '#F5F0E6',
  boneMute: '#A39F93',
  boneDim: '#6B6B64',

  // Gamification accents
  brass: '#F2B84C',
  ember: '#E5583C',
  rune: '#9B6EFF',
  glacier: '#7DC5FF',

  // Map layers
  mapLand: '#2E3A2D',
  mapWater: '#1B3441',
  mapRoad: '#6B6B64',

  // Stamp rarity tiers (legacy palette)
  stampBronze: '#B06A3F',
  stampSilver: '#BBC1BD',
  stampGold: '#F2B84C',
  stampPlatinum: '#D9DFDC',
  stampDiamond: '#7DC5FF',

  // Semantic aliases
  success: '#CDFA5E',
  warning: '#F2B84C',
  danger: '#E5583C',
  info: '#7DC5FF',

  // Transparency helpers
  overlayDim: 'rgba(11, 15, 13, 0.72)',
  overlayGlow: 'rgba(205, 250, 94, 0.08)',
} as const;

export const nightfallSpacing = {
  '0': 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const nightfallRadii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  round: 9999,
} as const;

/**
 * Legacy bundle. Consumed by Tamagui config and the original landing's
 * generated CSS until they migrate to Aurora.
 */
export const nightfallTokens = {
  colors: nightfallColors,
  spacing: nightfallSpacing,
  radii: nightfallRadii,
} as const;

/* Backwards-compat aliases (existing import paths). */
export {
  nightfallColors as odasyColors,
  nightfallSpacing as odasySpacing,
  nightfallRadii as odasyRadii,
  nightfallTokens as odasyTokens,
};

export type NightfallColors = typeof nightfallColors;
export type NightfallTokens = typeof nightfallTokens;
