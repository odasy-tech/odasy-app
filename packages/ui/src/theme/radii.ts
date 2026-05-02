/**
 * Odasy border radii.
 *
 * The editorial voice favours hairlines and squared corners; rounded
 * surfaces are reserved for chips, pills, avatars, and the rare
 * "soft card" treatment.
 *
 * Default surfaces (cards, inputs) use square corners (`none`).
 */

export const radii = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

export type Radii = typeof radii;
export type RadiiKey = keyof Radii;
