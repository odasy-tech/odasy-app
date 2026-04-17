/**
 * Odasy design tokens — "Nightfall & Volt" palette.
 *
 * Metaphor: an open passport on a jungle-night table, lit by a glowing
 * compass. Forest-ink base + volt-lime signature + warm off-white paper.
 *
 * Rule of thumb: the 90% of any screen is ink + bone. The signature volt
 * only appears on CTAs, active states, and moments of achievement.
 */

export const odasyColors = {
  // ─── Base (the "dark paper" of the night map) ─────────────────────
  ink950: '#0B0F0D',
  ink900: '#131815',
  ink800: '#1D241F',
  ink700: '#2B342D',

  // ─── Brand signature ──────────────────────────────────────────────
  volt: '#CDFA5E',
  voltDeep: '#A5D236',

  // ─── Text (warm off-whites, never sterile) ────────────────────────
  bone: '#F5F0E6',
  boneMute: '#A39F93',
  boneDim: '#6B6B64',

  // ─── Gamification accents (each has ONE job) ──────────────────────
  brass: '#F2B84C', // XP, stamps, achievements
  ember: '#E5583C', // Streaks, danger, failure
  rune: '#9B6EFF', // Legendary, premium, rare
  glacier: '#7DC5FF', // AI suggestions, info, water

  // ─── Map layers ───────────────────────────────────────────────────
  mapLand: '#2E3A2D',
  mapWater: '#1B3441',
  mapRoad: '#6B6B64',

  // ─── Stamp rarity tiers ───────────────────────────────────────────
  stampBronze: '#B06A3F',
  stampSilver: '#BBC1BD',
  stampGold: '#F2B84C',
  stampPlatinum: '#D9DFDC',
  stampDiamond: '#7DC5FF',

  // ─── Semantic (aliases so UI code reads clearly) ─────────────────
  success: '#CDFA5E',
  warning: '#F2B84C',
  danger: '#E5583C',
  info: '#7DC5FF',

  // ─── Transparency helpers (hex with alpha) ───────────────────────
  overlayDim: 'rgba(11, 15, 13, 0.72)', // Modal backdrop
  overlayGlow: 'rgba(205, 250, 94, 0.08)', // Volt wash under hero CTAs
} as const;

export const odasySpacing = {
  '0': 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const odasyRadii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  round: 9999,
} as const;

export const odasyTokens = {
  colors: odasyColors,
  spacing: odasySpacing,
  radii: odasyRadii,
} as const;

export type OdasyColors = typeof odasyColors;
export type OdasyTokens = typeof odasyTokens;
