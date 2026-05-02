'use client';

import { motion } from 'motion/react';
import { type ReactNode, useId, useState } from 'react';

export type AuroraTier = 'tinta' | 'cobalto' | 'lapislazuli' | 'amatista' | 'aurora';

interface AuroraStampProps {
  title: string;
  place: string;
  date?: string;
  tier?: AuroraTier;
  glyph?: ReactNode;
  earned?: boolean;
}

const TIER: Record<AuroraTier, { color: string; label: string; roman: string }> = {
  tinta:       { color: 'var(--color-aurora-blue)', label: 'Tinta',       roman: 'I' },
  cobalto:     { color: 'var(--color-aurora)',      label: 'Cobalto',     roman: 'II' },
  lapislazuli: { color: 'var(--color-aurora-deep)', label: 'Lapislázuli', roman: 'III' },
  amatista:    { color: 'var(--color-aurora-dark)', label: 'Amatista',    roman: 'IV' },
  aurora:      { color: 'var(--color-aurora-deep)', label: 'Aurora',      roman: 'V' },
};

const buildInscription = (label: string) =>
  `ODASY · ${label.toUpperCase()} · MMXXVI · `.repeat(4);

/**
 * Sigilo Cartográfico — a hand-stamped, embossed seal.
 *
 *   ✦  · perforated postage edge ·  ✦
 *      ╭──────────────────╮
 *      │   solid violet   │
 *      │  ◐  GLYPH (★)    │ ← embossed medallion with engraved
 *      │   ringed text    │   inscription circling the perimeter
 *      ╰──────────────────╯
 *      ╲   T I N T A   ╱     ← banderole ribbon with tier name
 *       ╲─────────────╱
 *
 * Every layer is a real graphic primitive: no diagrammatic ticks or
 * astrolabe abstractions. Reads as a wax seal pressed onto vellum.
 */
export function AuroraStamp({
  title,
  place,
  date,
  tier = 'tinta',
  glyph,
  earned = true,
}: AuroraStampProps) {
  const [hover, setHover] = useState(false);
  const id = useId().replace(/:/g, '');
  const meta = TIER[tier];
  const c = meta.color;
  const ribbonColor = earned ? c : 'var(--color-rule)';

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...(earned ? { whileHover: { y: -8, rotate: -1.6 } } : {})}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className="relative flex w-full flex-col items-center"
    >
      <svg viewBox="0 0 100 116" className="w-full" aria-hidden>
        <defs>
          {/* Halo behind everything */}
          <radialGradient id={`halo-${id}`} cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor={c} stopOpacity={earned ? 0.24 : 0.04} />
            <stop offset="55%" stopColor={c} stopOpacity={earned ? 0.06 : 0.02} />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>

          {/* Embossing — top highlight + bottom shadow gives 3D pressed-wax feel */}
          <linearGradient id={`emboss-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.28" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.28" />
          </linearGradient>

          {/* Same gradient rotated for ribbon embossing */}
          <linearGradient id={`emboss-rib-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.32" />
            <stop offset="100%" stopColor="black" stopOpacity="0.22" />
          </linearGradient>

          {/* Tier-V "Aurora" gets a multi-stop radial that simulates iridescence */}
          {tier === 'aurora' && (
            <radialGradient id={`aurora-${id}`} cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="var(--color-aurora-blue)" />
              <stop offset="40%" stopColor="var(--color-aurora)" />
              <stop offset="80%" stopColor="var(--color-aurora-deep)" />
              <stop offset="100%" stopColor="var(--color-aurora-dark)" />
            </radialGradient>
          )}

          {/* Inscription circle (text path) */}
          <path
            id={`inscr-${id}`}
            d="M 50 42 m -28 0 a 28 28 0 1 1 56 0 a 28 28 0 1 1 -56 0"
            fill="none"
          />

          {/* Soft drop-shadow filter for the medallion */}
          <filter id={`drop-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" />
            <feOffset dx="0" dy="1.5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={earned ? '0.4' : '0.15'} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Halo */}
        <circle cx="50" cy="42" r="50" fill={`url(#halo-${id})`} />

        {/* Star burst at the top — ornamental flourish, only when earned */}
        {earned && (
          <g transform="translate(50 4)" opacity="0.95">
            <path
              d="M 0 -3.4 L 0.9 -0.9 L 3.4 0 L 0.9 0.9 L 0 3.4 L -0.9 0.9 L -3.4 0 L -0.9 -0.9 Z"
              fill={c}
            />
            <line x1="-9" y1="0" x2="-4" y2="0" stroke={c} strokeWidth="0.4" strokeOpacity="0.7" />
            <line x1="4" y1="0" x2="9" y2="0" stroke={c} strokeWidth="0.4" strokeOpacity="0.7" />
          </g>
        )}

        {/* === Medallion group (with drop shadow filter) === */}
        <g filter={`url(#drop-${id})`}>
          {/* Outer thin frame */}
          <circle
            cx="50"
            cy="42"
            r="38"
            fill="none"
            stroke={c}
            strokeWidth="0.5"
            strokeOpacity={earned ? 0.85 : 0.5}
          />

          {/* Postage-style perforations — vellum-coloured punches around the rim */}
          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i * 360) / 32;
            return (
              <circle
                key={i}
                cx="50"
                cy="3.2"
                r={earned ? 1.5 : 1.1}
                fill="var(--color-vellum)"
                stroke={c}
                strokeOpacity={earned ? 0.55 : 0.3}
                strokeWidth="0.25"
                transform={`rotate(${angle} 50 42)`}
              />
            );
          })}

          {/* The seal — solid filled medallion */}
          <circle
            cx="50"
            cy="42"
            r="33"
            fill={
              earned
                ? tier === 'aurora'
                  ? `url(#aurora-${id})`
                  : c
                : 'transparent'
            }
            stroke={earned ? 'none' : c}
            strokeWidth={earned ? 0 : 0.4}
            strokeDasharray={earned ? 'none' : '1.6 1.8'}
            strokeOpacity={earned ? 0 : 0.55}
          />

          {/* Embossing overlay — only when earned */}
          {earned && (
            <circle cx="50" cy="42" r="33" fill={`url(#emboss-${id})`} />
          )}

          {/* Engraved inscription circle (where the text sits) */}
          {earned && (
            <circle
              cx="50"
              cy="42"
              r="28"
              fill="none"
              stroke="var(--color-vellum)"
              strokeOpacity="0.16"
              strokeWidth="0.35"
            />
          )}

          {/* Engraved text running clockwise around the medallion */}
          {earned && (
            <text
              fontSize="3.6"
              fill="var(--color-vellum)"
              fillOpacity="0.78"
              fontFamily="var(--font-family-aurora-sans)"
              fontWeight="600"
              letterSpacing="2.2"
            >
              <textPath href={`#inscr-${id}`} startOffset="0">
                {buildInscription(meta.label)}
              </textPath>
            </text>
          )}

          {/* Inner field — where the glyph lives */}
          {earned && (
            <circle
              cx="50"
              cy="42"
              r="21"
              fill="none"
              stroke="var(--color-vellum)"
              strokeOpacity="0.28"
              strokeWidth="0.4"
            />
          )}

          {/* Roman numeral, engraved beneath the glyph (paper colour, italic serif) */}
          {earned && (
            <text
              x="50"
              y="58.5"
              fontSize="4.6"
              textAnchor="middle"
              fill="var(--color-vellum)"
              fillOpacity="0.85"
              fontFamily="var(--font-family-aurora-display)"
              fontStyle="italic"
              letterSpacing="0.4"
            >
              {meta.roman}
            </text>
          )}
        </g>

        {/* === Banderole ribbon === */}
        <g>
          {/* Drop shadow */}
          <path
            d="M 12 80 L 88 80 L 82 90 L 88 100 L 12 100 L 18 90 Z"
            fill="black"
            opacity={earned ? 0.18 : 0.06}
            transform="translate(0.5 1.5)"
          />
          {/* Banner background */}
          <path
            d="M 12 80 L 88 80 L 82 90 L 88 100 L 12 100 L 18 90 Z"
            fill={ribbonColor}
            fillOpacity={earned ? 1 : 0.12}
          />
          {/* Banner emboss */}
          {earned && (
            <path
              d="M 12 80 L 88 80 L 82 90 L 88 100 L 12 100 L 18 90 Z"
              fill={`url(#emboss-rib-${id})`}
            />
          )}
          {/* Banner inner edge stroke */}
          <path
            d="M 16 82.5 L 84 82.5 L 79.5 90 L 84 97.5 L 16 97.5 L 20.5 90 Z"
            fill="none"
            stroke="var(--color-vellum)"
            strokeOpacity={earned ? 0.38 : 0.25}
            strokeWidth="0.35"
          />
          {/* Tier name engraved on the banner */}
          <text
            x="50"
            y="93"
            fontSize="7"
            textAnchor="middle"
            fill="var(--color-vellum)"
            fillOpacity={earned ? 1 : 0.45}
            fontFamily="var(--font-family-aurora-display)"
            fontStyle="italic"
            letterSpacing="0.5"
          >
            {meta.label}
          </text>
        </g>

        {/* Title arc beneath the ribbon (place's nickname) */}
        <text
          x="50"
          y="111"
          fontSize="4.4"
          textAnchor="middle"
          fill={earned ? 'var(--color-aurora-ink)' : 'var(--color-aurora-ink-dim)'}
          fillOpacity={earned ? 0.85 : 0.55}
          fontFamily="var(--font-family-aurora-sans)"
          fontWeight="600"
          letterSpacing="1.6"
          style={{ textTransform: 'uppercase' }}
        >
          {title}
        </text>
      </svg>

      {/* Glyph centred on the medallion — HTML overlay so Lucide icons stay crisp */}
      <div
        className="pointer-events-none absolute flex items-center justify-center"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          color: earned ? 'var(--color-vellum)' : 'var(--color-aurora-ink-dim)',
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ transform: 'translateY(-15%)' }}
        >
          {earned ? glyph : <LockGlyph />}
        </div>
      </div>

      {/* Hover metadata — shows place + date below the badge on hover */}
      {earned && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute -bottom-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border border-[var(--color-rule)] bg-[var(--color-vellum)] px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-[var(--color-aurora-ink-mute)] shadow-[0_8px_24px_-12px_rgba(80,70,200,0.32)]"
          style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
        >
          {place}
          {date ? ` · ${date}` : ''}
        </motion.div>
      )}
    </motion.div>
  );
}

function LockGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect
        x="5"
        y="10"
        width="12"
        height="8.5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7.6 10V7a3.4 3.4 0 0 1 6.8 0v3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
