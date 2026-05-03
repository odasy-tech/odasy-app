/**
 * Logo proposal marks — Round 02.
 *
 * Three directions × three sub-variants. All marks render in
 * `currentColor` so the surrounding plate (paper / navy / mono) tints
 * them via CSS. ViewBox 256×256 across the board so they composite at
 * any size without re-tuning.
 */

import type { ComponentType, SVGProps } from 'react';

export interface MarkProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox'> {
  size?: number;
}

const sizing = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 256 256',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

/* ── STAMP ─────────────────────────────────────────────────────── */

export function StampA({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="9" />
      <circle cx="128" cy="128" r="93" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <g transform="translate(128 128) rotate(-8) translate(-128 -128)">
        <path
          d="M128 78c-19.5 0-33 18.5-33 50s13.5 50 33 50 33-18.5 33-50-13.5-50-33-50zM128 88c12.8 0 22 13.5 22 40s-9.2 40-22 40-22-13.5-22-40 9.2-40 22-40z"
          fill="currentColor"
        />
      </g>
      <g stroke="currentColor" strokeWidth="1.4">
        <line x1="128" y1="6" x2="128" y2="14" />
        <line x1="128" y1="242" x2="128" y2="250" />
        <line x1="6" y1="128" x2="14" y2="128" />
        <line x1="242" y1="128" x2="250" y2="128" />
      </g>
    </svg>
  );
}

export function StampB({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <defs>
        <path id="stB-top" d="M40 128 a88 88 0 0 1 176 0" fill="none" />
        <path id="stB-bot" d="M40 128 a88 88 0 0 0 176 0" fill="none" />
      </defs>
      <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="128" cy="128" r="88" stroke="currentColor" strokeWidth="2.5" />
      <g transform="translate(128 128) rotate(-8) translate(-128 -128)">
        <path
          d="M128 92c-15 0-25 15-25 36s10 36 25 36 25-15 25-36-10-36-25-36zM128 99c9.5 0 16 11 16 29s-6.5 29-16 29-16-11-16-29 6.5-29 16-29z"
          fill="currentColor"
        />
      </g>
      <text fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="currentColor" opacity="0.85">
        <textPath href="#stB-top" startOffset="50%" textAnchor="middle">
          ODASY · ODYSSEY
        </textPath>
      </text>
      <text fontFamily="var(--font-mono)" fontSize="8" letterSpacing="3" fill="currentColor" opacity="0.65">
        <textPath href="#stB-bot" startOffset="50%" textAnchor="middle">
          EST · MMXXVI
        </textPath>
      </text>
      <circle cx="64" cy="128" r="2" fill="currentColor" />
      <circle cx="192" cy="128" r="2" fill="currentColor" />
    </svg>
  );
}

export function StampC({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <circle cx="128" cy="128" r="112" stroke="currentColor" strokeWidth="6" />
      <g transform="translate(128 128) rotate(-8) translate(-128 -128)">
        <path
          d="M128 70c-22 0-38 21-38 58s16 58 38 58 38-21 38-58-16-58-38-58zM128 81c14 0 25 16 25 47s-11 47-25 47-25-16-25-47 11-47 25-47z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

/* ── ORIGIN ────────────────────────────────────────────────────── */

export function OriginA({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <circle cx="128" cy="128" r="100" stroke="currentColor" strokeWidth="4" />
      <circle cx="128" cy="128" r="68" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="128" cy="128" r="36" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="128" cy="128" r="9" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1">
        <line x1="128" y1="14" x2="128" y2="46" opacity="0.55" />
        <line x1="128" y1="210" x2="128" y2="242" opacity="0.55" />
        <line x1="14" y1="128" x2="46" y2="128" opacity="0.55" />
        <line x1="210" y1="128" x2="242" y2="128" opacity="0.55" />
      </g>
      <line x1="128" y1="22" x2="128" y2="34" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function OriginB({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <circle cx="128" cy="128" r="100" stroke="currentColor" strokeWidth="8" />
      <g stroke="currentColor" strokeWidth="1.25">
        <line x1="38" y1="128" x2="218" y2="128" />
        <line x1="128" y1="38" x2="128" y2="218" />
      </g>
      <circle cx="128" cy="128" r="11" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.5">
        <line x1="128" y1="14" x2="128" y2="22" />
        <line x1="128" y1="234" x2="128" y2="242" />
        <line x1="14" y1="128" x2="22" y2="128" />
        <line x1="234" y1="128" x2="242" y2="128" />
      </g>
    </svg>
  );
}

export function OriginC({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <circle cx="128" cy="128" r="104" stroke="currentColor" strokeWidth="3" />
      <circle cx="128" cy="128" r="14" fill="currentColor" />
      <rect x="124" y="20" width="8" height="14" fill="currentColor" />
      <line x1="20" y1="128" x2="80" y2="128" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
      <line x1="176" y1="128" x2="236" y2="128" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
    </svg>
  );
}

/* ── HORIZON ───────────────────────────────────────────────────── */

export function HorizonA({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <line x1="14" y1="156" x2="242" y2="156" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="128" cy="98" r="58" stroke="currentColor" strokeWidth="8" />
      <circle cx="60" cy="156" r="2" fill="currentColor" />
      <circle cx="196" cy="156" r="2" fill="currentColor" />
      <line x1="128" y1="22" x2="128" y2="32" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function HorizonB({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <defs>
        <clipPath id="h-bot">
          <rect x="0" y="128" width="256" height="128" />
        </clipPath>
      </defs>
      <circle cx="128" cy="128" r="100" stroke="currentColor" strokeWidth="8" fill="none" />
      <circle cx="128" cy="128" r="100" fill="currentColor" clipPath="url(#h-bot)" />
      <line x1="6" y1="128" x2="250" y2="128" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function HorizonC({ size = 120, ...rest }: MarkProps) {
  return (
    <svg {...sizing(size)} {...rest}>
      <line x1="14" y1="156" x2="242" y2="156" stroke="currentColor" strokeWidth="1.25" />
      <path d="M30 156 a26 26 0 0 1 52 0" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="128" cy="116" r="40" stroke="currentColor" strokeWidth="6" fill="none" />
      <path d="M174 156 a26 26 0 0 1 52 0" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="128" cy="116" r="6" fill="currentColor" />
    </svg>
  );
}

/* ── catalogue ─────────────────────────────────────────────────── */

export interface Variant {
  id: string;
  name: string;
  sub: string;
  description: string;
  component: ComponentType<MarkProps>;
  recommended?: boolean;
}

export interface Direction {
  id: 'stamp' | 'origin' | 'horizon';
  name: string;
  tagline: string;
  rationale: string;
  variants: Variant[];
}

export const DIRECTIONS: Direction[] = [
  {
    id: 'stamp',
    name: 'Stamp',
    tagline: 'The dossier seal — agency by signature.',
    rationale:
      "The Stamp anchors the product's central metaphor: Odasy records what happened. A seal is the artefact of an event certified — exactly what a finished mission deserves. Defensible against four anchors: Penguin Classics (mark + wordmark), Field Notes (FN seal), Aesop (singular ink mark), Ordnance Survey (instrumented ring).",
    variants: [
      {
        id: 'stamp-a',
        name: 'Stamp · A',
        sub: 'Notarial double-ring',
        description:
          "Thick outer ring, thin inner band, italic O sealed inside. The 'official document' read at a glance.",
        component: StampA,
        recommended: true,
      },
      {
        id: 'stamp-b',
        name: 'Stamp · B',
        sub: 'Dated cachet',
        description:
          'Dual rings with monospace text bands — Odasy · Odyssey on top, Est. MMXXVI below. Closer to a passport stamp.',
        component: StampB,
      },
      {
        id: 'stamp-c',
        name: 'Stamp · C',
        sub: 'Minimal seal',
        description: 'Single bold ring, italic O. Fewer details — works hardest at small sizes.',
        component: StampC,
      },
    ],
  },
  {
    id: 'origin',
    name: 'Origin',
    tagline: 'The cartographic glyph — you, here, now.',
    rationale:
      'The Origin glyph borrows directly from cartography — the surveyor\'s mark for a point of origin. Specific, instrumented, and quiet. Defensible against Ordnance Survey (cartographic primitive), Carhartt WIP (workmanlike), Aesop (restraint), Field Notes (utility).',
    variants: [
      {
        id: 'origin-a',
        name: 'Origin · A',
        sub: 'Concentric rings',
        description: 'Three rings, hairline cardinals, filled centre. Reads as a precise survey glyph.',
        component: OriginA,
      },
      {
        id: 'origin-b',
        name: 'Origin · B',
        sub: 'Crosshair O',
        description: 'Bold ring with full crosshair through it — the most legible at favicon scale.',
        component: OriginB,
        recommended: true,
      },
      {
        id: 'origin-c',
        name: 'Origin · C',
        sub: 'Field point',
        description: 'Single thin ring + asymmetric horizon hairlines + index notch. The lightest, most editorial.',
        component: OriginC,
      },
    ],
  },
  {
    id: 'horizon',
    name: 'Horizon',
    tagline: 'The dawn — returned, changed by what you saw.',
    rationale:
      'The Horizon mark surfaces the literal meaning of an odyssey: a journey out and back, marked by a sunrise. It is the most narrative of the three — a small image, not a primitive. Defensible against Penguin Classics (typographic-narrative pairing), Aesop (paper restraint).',
    variants: [
      {
        id: 'horizon-a',
        name: 'Horizon · A',
        sub: 'Sun above line',
        description: 'A ring sun above a hairline horizon. Returns the metaphor to its source — the dawn.',
        component: HorizonA,
        recommended: true,
      },
      {
        id: 'horizon-b',
        name: 'Horizon · B',
        sub: 'Bisected disc',
        description: 'Half ring, half filled. The most graphic and assertive of the three.',
        component: HorizonB,
      },
      {
        id: 'horizon-c',
        name: 'Horizon · C',
        sub: 'Three suns',
        description: 'Dawn-noon-dusk sequence. A small narrative — the journey of a day.',
        component: HorizonC,
      },
    ],
  },
];
