/**
 * Odasy semantic tokens — the contract between palette and product.
 *
 * Every token has a *role* (what it does) and resolves to a value from
 * `palette.ts`. This is where the design system commits to meaning.
 *
 * Structure:
 *   tokens.light = light-mode resolution
 *   tokens.dark  = dark-mode resolution
 *
 * Both shapes MUST match key-for-key — the codegen and theme provider
 * rely on this invariant.
 *
 * Naming convention (semantic, not visual):
 *   bg.canvas       → the page background
 *   ink.primary     → the dominant text colour
 *   accent.action   → the colour you click
 *
 * Avoid naming after hue (e.g. `violet.500`); the palette layer owns hues.
 */

import { amber, blue, ink, metal, moss, paper, pure, status, violet } from './palette';

interface TokenSet {
  /** Page-level surfaces. */
  bg: {
    canvas: string;       // root page background
    surface: string;      // cards, primary content containers
    elevated: string;     // raised surfaces (modals, popovers, on-card insets)
    muted: string;        // subtle bands and section dividers
  };

  /** Text and iconography. */
  ink: {
    primary: string;      // body copy, headings
    secondary: string;    // metadata, secondary copy
    tertiary: string;     // hints, placeholders, disabled labels
    inverse: string;      // text on saturated backgrounds (white on violet)
    onAccent: string;     // text rendered on top of accent.action
  };

  /** Borders, hairlines, dividers. */
  border: {
    default: string;      // standard component borders
    strong: string;       // emphasised borders, focus rings
    subtle: string;       // background dividers, very faint hairlines
  };

  /** Brand action colour (the violet family in Aurora). */
  accent: {
    base: string;         // brand violet (decorative)
    action: string;       // primary CTA fill
    hover: string;        // hovered/pressed action
    deep: string;         // deepest brand violet, hero band, signature
    soft: string;         // tinted background (chip, hover, glow)
    onSurface: string;    // accent text on a paper-like surface
  };

  /** Secondary brand accents (warm + nature + cool info). */
  warm: {
    base: string;         // amber primary
    soft: string;
    ink: string;          // text on amber bg (always cool dark)
  };
  nature: {
    base: string;         // moss primary
    soft: string;
    ink: string;
  };
  info: {
    base: string;         // blue primary
    soft: string;
  };

  /** Status (system messages, never decoration). */
  status: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };

  /** Stamp tiers — gamification achievements. */
  stamp: {
    bronze: string;
    silver: string;
    gold: string;
    platinum: string;
    diamond: string;      // theme-aware: equals accent.action so it stays the brightest jewel in both themes
    ink: string;          // engraved text colour on stamps (theme-aware)
  };

  /** Selection / highlight. */
  selection: {
    bg: string;
    fg: string;
  };

  /** Overlay scrims (modals, sheets). */
  overlay: {
    scrim: string;        // backdrop behind modals
    glow: string;         // subtle accent wash under hero CTAs
  };
}

/**
 * Light theme — paper surface, deep violet ink.
 * Default theme. Editorial Dossier voice.
 */
export const lightTokens: TokenSet = {
  bg: {
    canvas: paper[100],     // #F7F6FC
    surface: paper[50],     // #FFFFFF
    elevated: paper[200],   // #F0EEF8
    muted: paper[300],      // #EEEAF7
  },
  ink: {
    primary: paper[900],    // #1A1830
    secondary: paper[700],  // #7B7699
    tertiary: paper[600],   // #A8A4C0
    inverse: paper[50],     // #FFFFFF
    onAccent: paper[50],    // white on violet
  },
  border: {
    default: 'rgba(80, 70, 200, 0.14)',
    strong: 'rgba(80, 70, 200, 0.32)',
    subtle: 'rgba(80, 70, 200, 0.06)',
  },
  accent: {
    base: violet[500],      // #6B5CE7
    action: violet[600],    // #5046C8
    hover: violet[700],     // #3D2D9E
    deep: violet[700],      // #3D2D9E
    soft: violet[50],       // #EDE9FF
    onSurface: violet[600], // #5046C8
  },
  warm: {
    base: amber[400],       // #F2B84C
    soft: amber[50],        // #FBE9C0
    ink: paper[900],        // dark navy text on amber chip
  },
  nature: {
    base: moss[400],        // #4A8B6F
    soft: moss[50],         // #D7E8DD
    ink: paper[900],
  },
  info: {
    base: blue[400],        // #8B9EFF
    soft: blue[50],         // #E8ECFF
  },
  status: {
    success: status.successLight,
    warning: status.warningLight,
    danger: status.dangerLight,
    info: status.infoLight,
  },
  stamp: {
    bronze: metal.bronze,
    silver: metal.silver,
    gold: amber[400],       // gold tier reuses amber for warm cohesion
    platinum: metal.platinum,
    diamond: violet[600],   // theme-aware (deep violet on paper)
    ink: violet[600],       // engraved text on stamps
  },
  selection: {
    bg: violet[50],
    fg: violet[700],
  },
  overlay: {
    scrim: 'rgba(11, 10, 30, 0.55)',
    glow: 'rgba(80, 70, 200, 0.08)',
  },
};

/**
 * Dark theme — navy surface, luminous violet ink.
 * Toggle target. Same brand soul, inverted intensity.
 */
export const darkTokens: TokenSet = {
  bg: {
    canvas: ink[800],       // #0A0918
    surface: ink[600],      // #141322
    elevated: ink[500],     // #1A1930
    muted: ink[700],        // #0F0E1A
  },
  ink: {
    primary: paper[200],    // #F0EEF8 (essentially light-on-dark)
    secondary: paper[600],  // #A8A4C0 — same neutral grey works on dark
    tertiary: paper[700],   // #7B7699
    inverse: paper[900],    // #1A1830 — for inverted callouts (signature page)
    onAccent: paper[50],    // white on violet
  },
  border: {
    default: 'rgba(139, 158, 255, 0.14)',
    strong: 'rgba(139, 158, 255, 0.34)',
    subtle: 'rgba(139, 158, 255, 0.06)',
  },
  accent: {
    base: violet[400],      // brighter at small contrast
    action: violet[500],    // #6B5CE7 (still saturated)
    hover: violet[300],     // lighter on hover
    deep: violet[700],      // dark band still references the deep
    soft: 'rgba(107, 92, 231, 0.18)',
    onSurface: blue[300],   // luminous lilac for inline accents on dark
  },
  warm: {
    base: amber[400],
    soft: 'rgba(242, 184, 76, 0.18)',
    ink: paper[900],
  },
  nature: {
    base: moss[300],        // brighter on dark
    soft: 'rgba(74, 139, 111, 0.20)',
    ink: paper[50],
  },
  info: {
    base: blue[400],
    soft: 'rgba(139, 158, 255, 0.10)',
  },
  status: {
    success: status.successDark,
    warning: status.warningDark,
    danger: status.dangerDark,
    info: status.infoDark,
  },
  stamp: {
    bronze: metal.bronze,
    silver: metal.silver,
    gold: amber[400],
    platinum: metal.platinum,
    diamond: '#C5CCFF',     // luminous lilac on dark surfaces
    ink: '#C5CCFF',         // theme-aware ink for stamps
  },
  selection: {
    bg: 'rgba(139, 158, 255, 0.35)',
    fg: pure.white,
  },
  overlay: {
    scrim: 'rgba(0, 0, 0, 0.65)',
    glow: 'rgba(139, 158, 255, 0.10)',
  },
};

/**
 * Token registry — both themes packaged for codegen and runtime.
 * Consumers pick a theme at the boundary (provider, codegen entry).
 */
export const tokens = {
  light: lightTokens,
  dark: darkTokens,
} as const;

export type Theme = keyof typeof tokens;
export type Tokens = TokenSet;

/**
 * Convenience: re-export the raw palette so codegen can also emit a
 * "raw colour" reference layer if useful.
 */
export { palette } from './palette';
