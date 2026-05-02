/**
 * Odasy typography — **Fraunces (variable) + Geist** editorial pairing.
 *
 *   • Display — Fraunces, with variable axes (weight 300–900, SOFT,
 *     WONK, opsz). Fraunces handles every editorial moment: from a
 *     gentle book-set body italic up to a wonky, high-contrast hero.
 *   • Sans   — Geist, the modern humanist sans Vercel ships. Reads
 *     beautifully at body sizes and at meta-label tracking.
 *
 * Both are free, both are distinctive without being kitschy, and both
 * are already loaded by the web layout via `next/font/google` so no
 * extra runtime cost.
 *
 * The mono slot points back at Geist intentionally — when components
 * apply `font-mono` we want them to fall back to a sans with letter-
 * spacing, not to a generic monospaced system font that breaks the
 * editorial silhouette.
 */

/**
 * Font family CSS values.
 *
 * Web wires these to next/font CSS variables (`--font-display`,
 * `--font-sans`) at app boot. Mobile (Tamagui / RN) consumes the literal
 * family names below.
 */
export const fonts = {
  display: {
    web: 'var(--font-display), "Fraunces", "Times New Roman", Georgia, serif',
    /** Mobile family resolved at expo-font load time. */
    native: 'Fraunces_500Medium',
  },
  sans: {
    web: 'var(--font-sans), "Geist", system-ui, sans-serif',
    native: 'Geist_400Regular',
  },
} as const;

/**
 * Type scale — fluid where it makes sense, fixed where it shouldn't move.
 *
 * UI scale (≤19px) is fixed because UI text shouldn't ride the viewport.
 * Display sizes use `clamp(min, vw, max)` so the page breathes smoothly
 * across breakpoints without explicit media queries.
 */
export const scale = {
  /** 11px — coordinates, eyebrows, the smallest legible label. */
  meta: '11px',
  /** 12px — micro labels, button text, badges. */
  micro: '12px',
  /** 14px — small body, captions. */
  small: '14px',
  /** 16px — default body copy. */
  body: '16px',
  /** 19px — lead paragraphs, important short copy. */
  lead: '19px',
  /** 22px — h4 / sub-section headers. */
  h4: '22px',
  /** 30px — h3 / card headlines. */
  h3: '30px',
  /** 40 → 72px — h2 / section headlines. */
  h2: 'clamp(2.5rem, 4.6vw, 4.5rem)',
  /** 64 → 144px — h1 / page hero. */
  h1: 'clamp(4rem, 9.5vw, 9rem)',
  /** 80 → 200px — full-bleed display, marketing hero. */
  hero: 'clamp(5rem, 16vw, 12.5rem)',
} as const;

/**
 * Font weights — Fraunces is a true variable axis (300–900) and Geist
 * supports 100/200/.../900. Stick to these named steps.
 */
export const weight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const;

/**
 * Letter-spacing (tracking) — em-relative so it scales with font-size.
 */
export const tracking = {
  tightest: '-0.045em', // mega-display only (h1 hero)
  tight: '-0.025em',    // h1 / h2
  snug: '-0.012em',     // h3 / h4
  normal: '0',
  wide: '0.06em',       // small caps emphasis
  wider: '0.16em',      // metadata caps
  widest: '0.32em',     // editorial meta-labels
} as const;

/**
 * Line-height (leading) — unitless multipliers.
 */
export const leading = {
  display: 0.95,        // hero / h1 — tight, dramatic
  tight: 1.04,          // h2 / h3 — snug
  snug: 1.18,           // h4 / large body
  body: 1.55,           // standard body
  loose: 1.7,           // long-form reading
} as const;

/**
 * Optional Fraunces variable-axis presets.
 * Apply these as inline `style={{ fontVariationSettings: ... }}` when
 * a piece of display copy wants extra personality.
 *
 *   refined  → close to a book serif, low SOFT, no WONK
 *   editorial → balanced; the default for mid-size headlines
 *   wonky    → high SOFT + a touch of WONK, for hero moments
 */
export const fraunces = {
  refined: '"opsz" 14, "SOFT" 30, "WONK" 0',
  editorial: '"opsz" 60, "SOFT" 50, "WONK" 0',
  wonky: '"opsz" 144, "SOFT" 100, "WONK" 1',
} as const;

/**
 * Typography contract — the public shape consumed by themes, codegen
 * and the component library.
 */
export const typography = {
  fonts,
  scale,
  weight,
  tracking,
  leading,
  fraunces,
} as const;

export type Typography = typeof typography;
export type FontScale = keyof typeof scale;
export type FontWeight = keyof typeof weight;
export type Tracking = keyof typeof tracking;
export type Leading = keyof typeof leading;
export type FrauncesPreset = keyof typeof fraunces;
