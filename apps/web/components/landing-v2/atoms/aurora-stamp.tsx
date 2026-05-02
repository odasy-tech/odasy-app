'use client';

import { motion } from 'motion/react';
import { type ReactNode, useId, useState } from 'react';

export type AuroraTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface AuroraStampProps {
  title: string;
  place: string;
  date?: string;
  tier?: AuroraTier;
  glyph?: ReactNode;
  earned?: boolean;
  /** Index used for deterministic per-stamp tilt + ink-bleed seed. */
  index?: number;
}

const TIER: Record<AuroraTier, { color: string; label: string; roman: string }> = {
  bronze:   { color: 'var(--color-aurora-bronze)',  label: 'Bronze',   roman: 'I'   },
  silver:   { color: 'var(--color-aurora-silver)',  label: 'Silver',   roman: 'II'  },
  gold:     { color: 'var(--color-aurora-amber)',   label: 'Gold',     roman: 'III' },
  platinum: { color: 'var(--color-aurora-blue)',    label: 'Platinum', roman: 'IV'  },
  /* Diamond rides the theme-aware stamp ink so it's the brightest jewel
   * in both light and dark surfaces. */
  diamond:  { color: 'var(--color-stamp-ink)',      label: 'Diamond',  roman: 'V'   },
};

/** Hand-pressed feel: each stamp lands at a slightly different angle. */
const TILTS = [-1.6, 1.4, -0.8, 1.9, -1.2, 0.9, -1.6, 1.4, -1.0];

const ROMAN_MONTHS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'] as const;

/** ISO `2026-07-14` → `14·VII·26`. Returns empty string when no date. */
function stampDate(iso?: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  const monthIdx = parseInt(m ?? '0', 10) - 1;
  const month = ROMAN_MONTHS[monthIdx] ?? '?';
  return `${d}·${month}·${(y ?? '').slice(2)}`;
}

/** "Salento, Quindío" → "SALENTO". Just the principal place name. */
function principalPlace(place: string): string {
  const head = place.split(',')[0]?.split(' ')[0] ?? place;
  return head.toUpperCase();
}

/**
 * Editorial Ink Stamp — a real passport-style impression on the page.
 *
 * No ribbons. No perforations. No emboss gradients. Just two ink rings
 * with curved typography running along the perimeter, the place name set
 * in the centre, and a deterministic tilt that says "pressed by hand".
 *
 * The ink-bleed filter (feTurbulence + feDisplacementMap) wobbles the
 * ring strokes by ~0.4px so they read as analogue impressions, not
 * vector-perfect circles. Text stays outside the filter so it remains
 * crisp at small sizes.
 */
export function AuroraStamp({
  title,
  place,
  date,
  tier = 'bronze',
  glyph,
  earned = true,
  index = 0,
}: AuroraStampProps) {
  const [hover, setHover] = useState(false);
  const id = useId().replace(/:/g, '');
  const meta = TIER[tier];
  const tilt = TILTS[index % TILTS.length] ?? 0;

  const ink = earned ? 'var(--color-stamp-ink)' : 'var(--color-aurora-ink-dim)';
  const tierColor = earned ? meta.color : 'var(--color-aurora-ink-dim)';
  const formattedDate = stampDate(date);
  const placeMain = earned ? principalPlace(place) : '?????';

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{
        rotate: tilt + (hover && earned ? 1.2 : 0),
        y: hover && earned ? -4 : 0,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="relative flex w-full flex-col items-center"
    >
      <svg viewBox="0 0 100 100" className="w-full" aria-hidden>
        <defs>
          {/* Ink bleed — tiny stroke wobble */}
          <filter
            id={`ink-${id}`}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06"
              numOctaves="2"
              seed={index + 1}
            />
            <feDisplacementMap in="SourceGraphic" scale="0.5" />
          </filter>

          {/* Top arc path — left-to-right above centre, text reads upright */}
          <path
            id={`top-${id}`}
            d="M 14 50 A 36 36 0 0 1 86 50"
            fill="none"
          />
          {/* Bottom arc path — right-to-left below centre, text reads upright */}
          <path
            id={`bottom-${id}`}
            d="M 86 50 A 36 36 0 0 1 14 50"
            fill="none"
          />
        </defs>

        {/* Inked rings — wobbly, hand-pressed */}
        <g filter={`url(#ink-${id})`}>
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={ink}
            strokeWidth={earned ? 0.85 : 0.55}
            strokeOpacity={earned ? 0.9 : 0.42}
            strokeDasharray={earned ? 'none' : '1.6 1.8'}
          />
          {/* Inner ring (tier accent) */}
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke={tierColor}
            strokeWidth={earned ? 1.1 : 0.5}
            strokeOpacity={earned ? 0.95 : 0.32}
            strokeDasharray={earned ? 'none' : '1 1.6'}
          />
          {/* Discreet ink dots at the four cardinal points — between rings */}
          {earned && (
            <g fill={ink} fillOpacity="0.6">
              <circle cx="50" cy="16" r="0.7" />
              <circle cx="84" cy="50" r="0.7" />
              <circle cx="50" cy="84" r="0.7" />
              <circle cx="16" cy="50" r="0.7" />
            </g>
          )}
        </g>

        {/* Top arc text — ODASY · YEAR */}
        {earned && (
          <text
            fontSize="3.4"
            fill={ink}
            fillOpacity="0.85"
            fontFamily="var(--font-family-aurora-sans)"
            fontWeight="600"
            letterSpacing="2.4"
          >
            <textPath
              href={`#top-${id}`}
              startOffset="50%"
              textAnchor="middle"
            >
              ODASY · MMXXVI
            </textPath>
          </text>
        )}

        {/* Bottom arc text — tier name in tier colour */}
        {earned && (
          <text
            fontSize="3.4"
            fill={tierColor}
            fillOpacity="0.95"
            fontFamily="var(--font-family-aurora-sans)"
            fontWeight="700"
            letterSpacing="2.6"
          >
            <textPath
              href={`#bottom-${id}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {meta.label.toUpperCase()} · {meta.roman}
            </textPath>
          </text>
        )}

        {/* Hairline separator above place name */}
        {earned && (
          <line
            x1="32"
            y1="48"
            x2="68"
            y2="48"
            stroke={tierColor}
            strokeOpacity="0.45"
            strokeWidth="0.3"
          />
        )}

        {/* Place name — the centre weight of the impression */}
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="5.2"
          fill={ink}
          fillOpacity={earned ? 0.92 : 0.42}
          fontFamily="var(--font-family-aurora-display)"
          fontStyle="italic"
          letterSpacing="0.4"
        >
          {placeMain}
        </text>

        {/* Date */}
        {earned && formattedDate && (
          <text
            x="50"
            y="64.5"
            textAnchor="middle"
            fontSize="3"
            fill={ink}
            fillOpacity="0.65"
            fontFamily="var(--font-family-aurora-sans)"
            fontWeight="500"
            letterSpacing="1.6"
          >
            {formattedDate}
          </text>
        )}

        {/* Locked state: dashed inner cross-bar where date would go */}
        {!earned && (
          <line
            x1="42"
            y1="64"
            x2="58"
            y2="64"
            stroke={ink}
            strokeOpacity="0.4"
            strokeWidth="0.4"
            strokeDasharray="1 1.4"
          />
        )}
      </svg>

      {/* Glyph — HTML overlay so Lucide icons stay sharp at any size.
       * Positioned at top of inner ring (~y=33 in viewBox = 33% from top). */}
      <div
        className="pointer-events-none absolute flex items-center justify-center"
        style={{
          top: '33%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          color: earned ? 'var(--color-stamp-ink)' : 'var(--color-aurora-ink-dim)',
          opacity: earned ? 0.9 : 0.55,
        }}
      >
        {earned ? glyph : <LockGlyph />}
      </div>

      {/* Hover metadata pill (desktop) — shows the editorial title */}
      {earned && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute -bottom-7 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.18em] text-[var(--color-aurora-ink-mute)] sm:block"
            style={{
              fontFamily: 'var(--font-family-aurora-display)',
              fontStyle: 'italic',
            }}
          >
            {title}{place ? ` — ${place}` : ''}
          </motion.div>

          {/* Mobile: editorial title visible always (no hover state on touch) */}
          <div
            className="pointer-events-none mt-3 px-1 text-center text-[10px] tracking-[0.18em] text-[var(--color-aurora-ink-mute)] sm:hidden"
            style={{
              fontFamily: 'var(--font-family-aurora-display)',
              fontStyle: 'italic',
            }}
          >
            {title}
          </div>
        </>
      )}
    </motion.div>
  );
}

function LockGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect
        x="5.5"
        y="10"
        width="11"
        height="8"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M7.8 10V7.4a3.2 3.2 0 0 1 6.4 0V10"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
