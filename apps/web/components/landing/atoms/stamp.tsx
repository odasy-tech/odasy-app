'use client';

import { motion } from 'motion/react';
import { type ReactNode, useState } from 'react';

type Tier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface StampProps {
  title: string;
  place: string;
  date?: string;
  tier?: Tier;
  glyph?: ReactNode;
  earned?: boolean;
}

const tierToken: Record<Tier, string> = {
  bronze: 'var(--color-stamp-bronze)',
  silver: 'var(--color-stamp-silver)',
  gold: 'var(--color-stamp-gold)',
  platinum: 'var(--color-stamp-platinum)',
  diamond: 'var(--color-stamp-diamond)',
};

/**
 * Collectible stamp — the central fetish object of the product. Hover
 * reveals metadata, lifts, and glows in its tier colour. Unearned stamps
 * render as ghost outlines.
 */
export function Stamp({
  title,
  place,
  date,
  tier = 'bronze',
  glyph,
  earned = true,
}: StampProps) {
  const [hover, setHover] = useState(false);
  const color = earned ? tierToken[tier] : 'var(--color-ink-700)';

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...(earned ? { whileHover: { y: -6, rotate: -1.5 } } : {})}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative flex aspect-square items-center justify-center"
    >
      {/* Perforated disc */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id={`g-${title}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity={earned ? 0.22 : 0.05} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {earned && <circle cx="50" cy="50" r="48" fill={`url(#g-${title})`} />}
        {/* Scalloped perimeter */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i * 360) / 48;
          return (
            <line
              key={i}
              x1="50"
              y1="2"
              x2="50"
              y2="6"
              stroke={color}
              strokeOpacity={earned ? 0.8 : 0.3}
              strokeWidth="0.8"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={color}
          strokeOpacity={earned ? 0.6 : 0.25}
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke={color}
          strokeOpacity={earned ? 0.3 : 0.15}
          strokeWidth="0.3"
          strokeDasharray="1 2"
        />
      </svg>

      {/* Glyph + label */}
      <div
        className="relative flex flex-col items-center justify-center gap-1.5 text-center"
        style={{ color: earned ? color : 'var(--color-ink-700)' }}
      >
        <div className="h-7 w-7" aria-hidden>
          {earned ? glyph : null}
        </div>
        <div
          className="font-mono text-[9px] uppercase tracking-[0.24em]"
          style={{ color: earned ? 'var(--color-bone)' : 'var(--color-bone-dim)' }}
        >
          {title}
        </div>
      </div>

      {/* Hover metadata pill */}
      {earned && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap border border-ink-700 bg-ink-900 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-mute"
        >
          {place}
          {date ? ` · ${date}` : ''}
        </motion.div>
      )}
    </motion.div>
  );
}
