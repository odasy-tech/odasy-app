/**
 * Odasy palette — raw colour values, no semantic intent.
 *
 * This is the lowest layer of the token system. Anything in the rest of the
 * design system that needs a colour MUST go through `tokens.ts` first; this
 * file is the only place where literal hex / rgba lives.
 *
 * Structure: families of related hues, each family progressing from light
 * to dark or from the primary saturated shade to its supportive variants.
 *
 * Naming convention:
 *   <family><step>
 *   step uses the 50/100/.../900 scale (Material-style) where 500 is the
 *   "ideal" shade and lower numbers are lighter.
 */

/** Brand violet — the saturated centre of gravity. */
export const violet = {
  50: '#EDE9FF',
  100: '#D4CDFF',
  200: '#B8AEFF',
  300: '#9C8EFF',
  400: '#8270F5',
  500: '#6B5CE7', // brand
  600: '#5046C8', // primary action
  700: '#3D2D9E', // hero / pressed
  800: '#2A1F7F',
  900: '#1A1240',
} as const;

/** Cool secondary — used for subtle accents and decorative SVG strokes. */
export const blue = {
  50: '#E8ECFF',
  100: '#CFD7FF',
  200: '#B4BEFF',
  300: '#A8B2FF',
  400: '#8B9EFF', // accent
  500: '#6B82F2',
  600: '#4F66E0',
  700: '#3850C0',
  800: '#23399A',
  900: '#162470',
} as const;

/** Warm secondary — heritage, gold tier, achievements, "discovered" zones. */
export const amber = {
  50: '#FBE9C0',
  100: '#F8DC97',
  200: '#F5CD6E',
  300: '#F2BE52',
  400: '#F2B84C', // primary amber
  500: '#E8A640',
  600: '#CC8A30',
  700: '#A06C24',
  800: '#735018',
  900: '#4A340E',
} as const;

/** Nature secondary — "conscious" archetype, organic regions. */
export const moss = {
  50: '#D7E8DD',
  100: '#B5D4C0',
  200: '#90BE9F',
  300: '#6BA67F',
  400: '#4A8B6F', // primary moss
  500: '#3F7960',
  600: '#306450',
  700: '#234D3D',
  800: '#16352A',
  900: '#0B201A',
} as const;

/** Neutral cool — light mode surfaces and dark mode text. */
export const paper = {
  50: '#FFFFFF',
  100: '#F7F6FC',
  200: '#F0EEF8',
  300: '#EEEAF7',
  400: '#D9D5EA',
  500: '#C5BFD8',
  600: '#A8A4C0',
  700: '#7B7699',
  800: '#3D3A55',
  900: '#1A1830',
} as const;

/** Neutral dark — dark mode surfaces. */
export const ink = {
  50: '#A39FB7',
  100: '#7A7596',
  200: '#5A5479',
  300: '#3D3859',
  400: '#2A2542',
  500: '#1A1930',
  600: '#141322',
  700: '#0F0E1A',
  800: '#0A0918',
  900: '#050410',
} as const;

/** Stamp tier metals — earned achievements, jewel tones. */
export const metal = {
  bronze: '#CD7F32',
  silver: '#A8A9AD',
  gold: '#FFD700',
  platinum: '#D9DFDC',
} as const;

/** Status colours — reserved for system messages. */
export const status = {
  successLight: '#4A8B6F', // alias to moss-400
  warningLight: '#F2B84C', // alias to amber-400
  dangerLight: '#C45C2E',
  infoLight: '#8B9EFF', // alias to blue-400

  successDark: '#7DC59B',
  warningDark: '#FAD27D',
  dangerDark: '#E58864',
  infoDark: '#B4BEFF',
} as const;

/** Pure tones (use sparingly). */
export const pure = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

/**
 * Palette barrel — every literal colour value in one object.
 * Consumers should generally NOT import from here directly; reach for
 * `tokens.ts` instead. This export exists for codegen + the showcase.
 */
export const palette = {
  violet,
  blue,
  amber,
  moss,
  paper,
  ink,
  metal,
  status,
  pure,
} as const;

export type Palette = typeof palette;
