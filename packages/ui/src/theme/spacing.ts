/**
 * Odasy spacing — 4-pixel base scale.
 *
 * Layout, padding, gaps, and component internal whitespace MUST come from
 * this scale. Avoid raw pixel values in components.
 *
 * Naming: numeric step. Each step = 4px.
 *   1 → 4px, 2 → 8px, 3 → 12px, ... 12 → 48px, 16 → 64px.
 *
 * Some steps are skipped because the editorial voice wants generous
 * negative space at large sizes (no need for 80px exact, jump to 96px).
 */

export const spacing = {
  px: '1px',
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  40: '160px',
  48: '192px',
} as const;

/**
 * Container max widths. The narrative editorial voice prefers narrower
 * line-lengths than typical SaaS landing pages.
 */
export const container = {
  narrow: '900px',     // Long-form reading, manifesto-style sections
  default: '1100px',   // Standard editorial composition
  wide: '1320px',      // Hero + dashboards + showcase
  bleed: '100%',       // Full-bleed sections
} as const;

/**
 * Page gutter — horizontal padding around the container at any breakpoint.
 */
export const gutter = {
  mobile: '24px',
  tablet: '32px',
  desktop: '48px',
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;
export type Container = keyof typeof container;
