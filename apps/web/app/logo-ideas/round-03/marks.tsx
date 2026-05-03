/**
 * Round 03 — Letterform marks.
 *
 * Reaction to the team proposal: "use the actual O of the font instead
 * of a drawn approximation." All seven variants below render the
 * letterform with `<text>` so the wordmark and the logomark stay in
 * exact typographic sync — they're the same Fraunces axis at the same
 * weight at the same opsz, just sized to the viewBox.
 *
 * Two families:
 *   PURE — the O on its own, no container, exploring axis settings.
 *   FRAMED — the same O inside a ring or square, exploring containment.
 *
 * Both use `currentColor` and viewBox 256×256, so they slot into the
 * parent's plate primitives without modification.
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

/**
 * The O letterform itself, parameterised over axis settings. All
 * variants sit centred on the 256 grid at fontSize 220 — large enough
 * that the italic descender and the upper bowl breathe.
 */
function FrauncesO({
  opsz,
  soft,
  wonk = 0,
  weight = 500,
  fontSize = 220,
}: {
  opsz: number;
  soft: number;
  wonk?: 0 | 1;
  weight?: number;
  fontSize?: number;
}) {
  return (
    <text
      x="128"
      y="128"
      fontFamily="var(--font-display)"
      fontStyle="italic"
      fontWeight={weight}
      fontSize={fontSize}
      style={{
        fontVariationSettings: `"opsz" ${opsz}, "SOFT" ${soft}, "WONK" ${wonk}`,
      }}
      fill="currentColor"
      textAnchor="middle"
      dominantBaseline="central"
    >
      O
    </text>
  );
}

/* ── PURE — letterform alone ───────────────────────────────────── */

export function Pure_TextScale({ size = 120, ...rest }: MarkProps) {
  // opsz 9 — designed for body text. Tighter, more economical.
  return (
    <svg {...sizing(size)} {...rest}>
      <FrauncesO opsz={9} soft={0} fontSize={210} />
    </svg>
  );
}

export function Pure_DisplayScale({ size = 120, ...rest }: MarkProps) {
  // opsz 144 — designed for display. More open, softer terminals.
  return (
    <svg {...sizing(size)} {...rest}>
      <FrauncesO opsz={144} soft={0} />
    </svg>
  );
}

export function Pure_Soft({ size = 120, ...rest }: MarkProps) {
  // opsz 144 + SOFT 100 — maximum roundness, friendliest reading.
  return (
    <svg {...sizing(size)} {...rest}>
      <FrauncesO opsz={144} soft={100} />
    </svg>
  );
}

export function Pure_Wonk({ size = 120, ...rest }: MarkProps) {
  // opsz 144 + WONK on — the eccentric, unmistakably-Fraunces variant.
  return (
    <svg {...sizing(size)} {...rest}>
      <FrauncesO opsz={144} soft={50} wonk={1} weight={500} />
    </svg>
  );
}

/* ── FRAMED — letterform inside a container ────────────────────── */

export function Framed_MinimalRing({ size = 120, ...rest }: MarkProps) {
  // Single thin ring + Fraunces O. Revised Stamp_C with the real font.
  return (
    <svg {...sizing(size)} {...rest}>
      <circle cx="128" cy="128" r="112" stroke="currentColor" strokeWidth="3" fill="none" />
      <FrauncesO opsz={144} soft={50} fontSize={170} />
    </svg>
  );
}

export function Framed_BoldRing({ size = 120, ...rest }: MarkProps) {
  // Thick outer ring + thin inner band + Fraunces O. Revised Stamp_A
  // with the real font instead of an SVG-path approximation.
  return (
    <svg {...sizing(size)} {...rest}>
      <circle cx="128" cy="128" r="112" stroke="currentColor" strokeWidth="9" fill="none" />
      <circle cx="128" cy="128" r="95" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none" />
      <FrauncesO opsz={144} soft={50} fontSize={150} />
    </svg>
  );
}

export function Framed_Square({ size = 120, ...rest }: MarkProps) {
  // Square frame with corner ticks (DS register) + Fraunces O. The
  // editorial-instrument hybrid.
  return (
    <svg {...sizing(size)} {...rest}>
      <rect x="34" y="34" width="188" height="188" stroke="currentColor" strokeWidth="2" fill="none" />
      <g stroke="currentColor" strokeWidth="2">
        <path d="M14 34 H34 M34 14 V34" />
        <path d="M222 14 V34 M222 34 H242" />
        <path d="M14 222 H34 M34 222 V242" />
        <path d="M222 222 H242 M222 222 V242" />
      </g>
      <FrauncesO opsz={144} soft={50} fontSize={170} />
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

export interface Family {
  id: 'pure' | 'framed';
  name: string;
  tagline: string;
  rationale: string;
  variants: Variant[];
}

export const FAMILIES: Family[] = [
  {
    id: 'pure',
    name: 'Pure letterform',
    tagline: 'The O of the font, on its own.',
    rationale:
      "If Fraunces is the brand's typographic identity, the O of Fraunces is the brand's most distilled possible mark. No frame, no ornament — just the letter, rendered live by the font so the logomark and the wordmark are exactly the same opsz, the same axis, the same ink. The risk: at small sizes, an italic letterform without containment can read as cropped wordmark text rather than as an intentional mark.",
    variants: [
      {
        id: 'pure-text',
        name: 'Pure · Text axis',
        sub: 'opsz 9 · soft 0',
        description:
          'Fraunces drawn at its text-grade optical size. Tighter, more economical, sturdier in small contexts.',
        component: Pure_TextScale,
      },
      {
        id: 'pure-display',
        name: 'Pure · Display axis',
        sub: 'opsz 144 · soft 0',
        description:
          "Fraunces at display optical size — the intended setting for the wordmark hero. Softer terminals, more open bowl.",
        component: Pure_DisplayScale,
        recommended: true,
      },
      {
        id: 'pure-soft',
        name: 'Pure · Soft maxed',
        sub: 'opsz 144 · soft 100',
        description:
          'SOFT axis at 100 rounds the terminals all the way. The friendliest, warmest reading — closer to a calligraphic mark than an editorial one.',
        component: Pure_Soft,
      },
      {
        id: 'pure-wonk',
        name: 'Pure · Wonk on',
        sub: 'opsz 144 · WONK 1',
        description:
          "Wonk axis on. Fraunces' most eccentric mode — slightly off-grid terminals, a quiet signature.",
        component: Pure_Wonk,
      },
    ],
  },
  {
    id: 'framed',
    name: 'Letterform + container',
    tagline: 'The O of the font, inside a seal.',
    rationale:
      "Same letterform, but contained — gives the mark a *signature* read at small sizes (the frame survives where bare type fails) without giving up the typographic coherence with the wordmark. Effectively this is Round 02's Stamp direction, refined: the O is no longer an SVG approximation, it is the live Fraunces axis. Any change to the wordmark propagates to the logomark for free.",
    variants: [
      {
        id: 'framed-minimal',
        name: 'Framed · Minimal ring',
        sub: 'thin ring + display O',
        description:
          'Single thin ring, generous breathing room, Fraunces O at display optical size. The most editorial of the three — closest to Aesop / Penguin Classics.',
        component: Framed_MinimalRing,
        recommended: true,
      },
      {
        id: 'framed-bold',
        name: 'Framed · Bold ring',
        sub: 'thick ring + inner band',
        description:
          'Thick outer ring with a thin inner band. The notarial / passport-stamp register, but the O inside is now the real font, not a drawn approximation.',
        component: Framed_BoldRing,
      },
      {
        id: 'framed-square',
        name: 'Framed · Square seal',
        sub: 'square + corner ticks',
        description:
          "Square frame with the DS's corner-tick signature. Carries Aurora's instrument register into the brand mark — the most coherent with the surrounding product.",
        component: Framed_Square,
      },
    ],
  },
];
