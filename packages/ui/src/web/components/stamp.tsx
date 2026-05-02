'use client';

import { motion } from 'motion/react';
import { type ReactNode, useId, useState } from 'react';

export type StampTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface StampProps {
  /** Editorial title (badge name). Shown in the hover pill. */
  title: string;
  /** Place name. Used inside the medallion (first word) + hover pill. */
  place: string;
  /** ISO date YYYY-MM-DD; rendered as `14·VII·26`. */
  date?: string;
  tier?: StampTier;
  glyph?: ReactNode;
  earned?: boolean;
  /** Index used for deterministic per-stamp tilt + ink-bleed seed. */
  index?: number;
}

const TIER: Record<
  StampTier,
  { color: string; label: string; roman: string }
> = {
  bronze: { color: 'var(--color-stamp-bronze)', label: 'Bronze', roman: 'I' },
  silver: { color: 'var(--color-stamp-silver)', label: 'Silver', roman: 'II' },
  gold: { color: 'var(--color-stamp-gold)', label: 'Gold', roman: 'III' },
  platinum: {
    color: 'var(--color-stamp-platinum)',
    label: 'Platinum',
    roman: 'IV',
  },
  diamond: {
    color: 'var(--color-stamp-diamond)',
    label: 'Diamond',
    roman: 'V',
  },
};

const TILTS = [-1.6, 1.4, -0.8, 1.9, -1.2, 0.9, -1.6, 1.4, -1.0];

const ROMAN_MONTHS = [
  'I', 'II', 'III', 'IV', 'V', 'VI',
  'VII', 'VIII', 'IX', 'X', 'XI', 'XII',
] as const;

function stampDate(iso?: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  const monthIdx = parseInt(m ?? '0', 10) - 1;
  const month = ROMAN_MONTHS[monthIdx] ?? '?';
  return `${d}·${month}·${(y ?? '').slice(2)}`;
}

function principalPlace(place: string): string {
  const head = place.split(',')[0]?.split(' ')[0] ?? place;
  return head.toUpperCase();
}

/**
 * Editorial Ink Stamp — a real passport-style impression on the page.
 *
 *  • Two ink rings (outer monochrome, inner tier-coloured)
 *  • Curved typography along the top arc ("ODASY · MMXXVI")
 *  • Curved typography along the bottom arc ("BRONZE · I")
 *  • Place name + date in the centre
 *  • feTurbulence wobble on the rings only, deterministic per `index`
 *  • Per-stamp tilt for hand-pressed feel
 */
export function Stamp({
  title,
  place,
  date,
  tier = 'bronze',
  glyph,
  earned = true,
  index = 0,
}: StampProps) {
  const [hover, setHover] = useState(false);
  const id = useId().replace(/:/g, '');
  const meta = TIER[tier];
  const tilt = TILTS[index % TILTS.length] ?? 0;

  const ink = earned ? 'var(--color-stamp-ink)' : 'var(--color-ink-tertiary)';
  const tierColor = earned ? meta.color : 'var(--color-ink-tertiary)';
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
          <filter id={`ink-${id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06"
              numOctaves="2"
              seed={index + 1}
            />
            <feDisplacementMap in="SourceGraphic" scale="0.5" />
          </filter>
          <path
            id={`top-${id}`}
            d="M 14 50 A 36 36 0 0 1 86 50"
            fill="none"
          />
          <path
            id={`bottom-${id}`}
            d="M 86 50 A 36 36 0 0 1 14 50"
            fill="none"
          />
        </defs>

        <g filter={`url(#ink-${id})`}>
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
          {earned && (
            <g fill={ink} fillOpacity="0.6">
              <circle cx="50" cy="16" r="0.7" />
              <circle cx="84" cy="50" r="0.7" />
              <circle cx="50" cy="84" r="0.7" />
              <circle cx="16" cy="50" r="0.7" />
            </g>
          )}
        </g>

        {earned && (
          <text
            fontSize="3.4"
            fill={ink}
            fillOpacity="0.85"
            fontFamily="var(--font-family-sans)"
            fontWeight="600"
            letterSpacing="2.4"
          >
            <textPath href={`#top-${id}`} startOffset="50%" textAnchor="middle">
              ODASY · MMXXVI
            </textPath>
          </text>
        )}

        {earned && (
          <text
            fontSize="3.4"
            fill={tierColor}
            fillOpacity="0.95"
            fontFamily="var(--font-family-sans)"
            fontWeight="700"
            letterSpacing="2.6"
          >
            <textPath href={`#bottom-${id}`} startOffset="50%" textAnchor="middle">
              {meta.label.toUpperCase()} · {meta.roman}
            </textPath>
          </text>
        )}

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

        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="5.2"
          fill={ink}
          fillOpacity={earned ? 0.92 : 0.42}
          fontFamily="var(--font-family-display)"
          fontStyle="italic"
          letterSpacing="0.4"
        >
          {placeMain}
        </text>

        {earned && formattedDate && (
          <text
            x="50"
            y="64.5"
            textAnchor="middle"
            fontSize="3"
            fill={ink}
            fillOpacity="0.65"
            fontFamily="var(--font-family-sans)"
            fontWeight="500"
            letterSpacing="1.6"
          >
            {formattedDate}
          </text>
        )}

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

      <div
        className="pointer-events-none absolute flex items-center justify-center"
        style={{
          top: '33%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          color: earned ? 'var(--color-stamp-ink)' : 'var(--color-ink-tertiary)',
          opacity: earned ? 0.9 : 0.55,
        }}
      >
        {earned ? glyph : <LockGlyph />}
      </div>

      {earned && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute -bottom-7 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.18em] text-[var(--color-ink-secondary)] sm:block"
            style={{
              fontFamily: 'var(--font-family-display)',
              fontStyle: 'italic',
            }}
          >
            {title}
            {place ? ` — ${place}` : ''}
          </motion.div>

          <div
            className="pointer-events-none mt-3 px-1 text-center text-[10px] tracking-[0.18em] text-[var(--color-ink-secondary)] sm:hidden"
            style={{
              fontFamily: 'var(--font-family-display)',
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
