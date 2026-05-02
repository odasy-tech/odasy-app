'use client';

import { MetaLabel } from '@odasy/ui/web';
import { motion, useInView } from 'motion/react';
import { type ReactNode, useRef } from 'react';
import { useLocale } from '@/lib/i18n/locale-context';

const graphics: ReactNode[] = [
  // Passport — open spread with mini-stamps grid (showing 4 of 9 earned)
  <svg key="passport" viewBox="0 0 200 120" className="h-44 w-full" aria-hidden>
    <defs>
      <linearGradient id="auroraPassportL" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="var(--color-bg-elevated)" />
        <stop offset="100%" stopColor="var(--color-bg-surface)" />
      </linearGradient>
      <linearGradient id="auroraPassportR" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="var(--color-bg-surface)" />
        <stop offset="100%" stopColor="var(--color-bg-elevated)" />
      </linearGradient>
    </defs>

    {/* Open passport spread — two pages joined by a fold */}
    <rect x="22" y="14" width="78" height="92" rx="2" fill="url(#auroraPassportL)" stroke="var(--color-border-default)" strokeWidth="0.7" />
    <rect x="100" y="14" width="78" height="92" rx="2" fill="url(#auroraPassportR)" stroke="var(--color-border-default)" strokeWidth="0.7" />
    {/* Center binding fold */}
    <line x1="100" y1="14" x2="100" y2="106" stroke="var(--color-border-default)" strokeWidth="0.4" strokeDasharray="1 1" />

    {/* Left page — header + 2 lines */}
    <line x1="30" y1="22" x2="68" y2="22" stroke="var(--color-accent-action)" strokeWidth="0.9" strokeOpacity="0.85" />
    <line x1="30" y1="28" x2="92" y2="28" stroke="var(--color-ink-secondary)" strokeWidth="0.4" strokeOpacity="0.5" />
    <line x1="30" y1="33" x2="78" y2="33" stroke="var(--color-ink-secondary)" strokeWidth="0.4" strokeOpacity="0.5" />

    {/* Left page — mini stamps grid 3x2 (showing earned + locked) */}
    {[
      { cx: 38, cy: 50, c: 'var(--color-warm-base)', earned: true },
      { cx: 56, cy: 50, c: 'var(--color-stamp-bronze)', earned: true },
      { cx: 74, cy: 50, c: 'var(--color-stamp-silver)', earned: true },
      { cx: 38, cy: 70, c: 'var(--color-info-base)', earned: false },
      { cx: 56, cy: 70, c: 'var(--color-warm-base)', earned: true },
      { cx: 74, cy: 70, c: 'var(--color-accent-action)', earned: false },
    ].map((s, i) => (
      <g key={i}>
        <circle cx={s.cx} cy={s.cy} r="6.2" fill={s.earned ? s.c : 'transparent'} fillOpacity={s.earned ? 1 : 0} stroke={s.c} strokeWidth="0.5" strokeOpacity={s.earned ? 0.85 : 0.35} strokeDasharray={s.earned ? 'none' : '1 1.4'} />
        {s.earned && <circle cx={s.cx} cy={s.cy} r="2.8" fill="var(--color-bg-surface)" fillOpacity="0.8" />}
      </g>
    ))}

    {/* Left page — meta row */}
    <text x="30" y="92" fontSize="3.8" fill="var(--color-ink-secondary)" fontFamily="var(--font-family-sans)" fontWeight="600" letterSpacing="0.6">SELLOS</text>
    <text x="92" y="92" fontSize="3.8" fill="var(--color-accent-action)" fontFamily="var(--font-family-sans)" fontWeight="700" letterSpacing="0.6" textAnchor="end">04 / 09</text>
    <line x1="30" y1="96" x2="92" y2="96" stroke="var(--color-border-default)" strokeWidth="0.35" />

    {/* Right page — explorer identity glimpse */}
    <text x="108" y="24" fontSize="4.2" fill="var(--color-ink-primary)" fontFamily="var(--font-family-display)" letterSpacing="0.2">Valentina Ríos</text>
    <text x="108" y="30" fontSize="3.3" fill="var(--color-accent-action)" fontFamily="var(--font-family-sans)" fontWeight="600" letterSpacing="0.6">CONTEMPLADOR · NIVEL 3</text>

    {/* Right page — XP bar */}
    <rect x="108" y="42" width="62" height="3" rx="1.5" fill="var(--color-border-default)" />
    <rect x="108" y="42" width="38" height="3" rx="1.5" fill="var(--color-accent-action)" />
    <text x="108" y="51" fontSize="3.2" fill="var(--color-ink-secondary)" fontFamily="var(--font-family-sans)" letterSpacing="0.5">620 / 1000 XP</text>

    {/* Right page — stats row */}
    {[
      { x: 108, label: 'LUGARES', value: '07' },
      { x: 130, label: 'MISIONES', value: '02' },
      { x: 152, label: 'INSIGNIAS', value: '03' },
    ].map((s, i) => (
      <g key={i}>
        <text x={s.x} y={70} fontSize="6" fill="var(--color-ink-primary)" fontFamily="var(--font-family-display)">{s.value}</text>
        <text x={s.x} y={76} fontSize="2.6" fill="var(--color-ink-secondary)" fontFamily="var(--font-family-sans)" fontWeight="600" letterSpacing="0.5">{s.label}</text>
      </g>
    ))}

    {/* Right page — bottom hairline */}
    <line x1="108" y1="92" x2="170" y2="92" stroke="var(--color-border-default)" strokeWidth="0.35" />
    <text x="108" y="98" fontSize="3" fill="var(--color-ink-tertiary)" fontFamily="var(--font-family-sans)" letterSpacing="0.6">CAPÍTULO · QUINDÍO</text>
  </svg>,

  // Map — fog of war with revealed route
  <svg key="map" viewBox="0 0 200 120" className="h-44 w-full" aria-hidden>
    <defs>
      <radialGradient id="mapFog" cx="35%" cy="55%" r="55%">
        <stop offset="0%" stopColor="var(--color-bg-surface)" stopOpacity="0" />
        <stop offset="60%" stopColor="var(--color-bg-surface)" stopOpacity="0" />
        <stop offset="100%" stopColor="var(--color-accent-action)" stopOpacity="0.15" />
      </radialGradient>
      <radialGradient id="mapReveal" cx="35%" cy="55%" r="40%">
        <stop offset="0%" stopColor="var(--color-warm-base)" stopOpacity="0.12" />
        <stop offset="100%" stopColor="var(--color-warm-base)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Base contour lines (faint topo) */}
    <g stroke="var(--color-info-base)" fill="none" strokeWidth="0.55">
      <path d="M14 76 Q 60 30, 188 56" strokeOpacity="0.18" />
      <path d="M14 84 Q 60 40, 188 64" strokeOpacity="0.24" />
      <path d="M14 92 Q 60 50, 188 72" strokeOpacity="0.32" />
      <path d="M14 100 Q 60 60, 188 80" strokeOpacity="0.4" />
    </g>

    {/* Revealed warm wash around the explored area */}
    <rect x="0" y="0" width="200" height="120" fill="url(#mapReveal)" />

    {/* Fog of war overlay (everywhere except revealed centre) */}
    <rect x="0" y="0" width="200" height="120" fill="url(#mapFog)" />

    {/* Discovered route */}
    <path d="M 38 78 L 58 60 L 78 70 L 102 56" fill="none" stroke="var(--color-accent-action)" strokeWidth="1" strokeDasharray="3 2.5" strokeOpacity="0.82" />

    {/* Discovered pins (active glow) */}
    {[
      { cx: 38, cy: 78, active: true },
      { cx: 58, cy: 60, active: true },
      { cx: 78, cy: 70, active: true },
      { cx: 102, cy: 56, active: true },
    ].map((p, i) => (
      <g key={i}>
        <circle cx={p.cx} cy={p.cy} r="3.6" fill="var(--color-accent-action)" />
        <circle cx={p.cx} cy={p.cy} r="8" stroke="var(--color-accent-action)" strokeOpacity="0.4" fill="none" />
      </g>
    ))}

    {/* Foggy / undiscovered pins */}
    {[
      { cx: 132, cy: 36 },
      { cx: 158, cy: 70 },
      { cx: 174, cy: 52 },
      { cx: 144, cy: 92 },
    ].map((p, i) => (
      <circle key={i} cx={p.cx} cy={p.cy} r="2" fill="var(--color-ink-secondary)" fillOpacity="0.42" />
    ))}

    {/* You-are-here pin (last on the route) */}
    <g>
      <circle cx="102" cy="56" r="11" fill="var(--color-warm-base)" fillOpacity="0.18" />
      <circle cx="102" cy="56" r="3.8" fill="var(--color-warm-base)" />
    </g>

    {/* Top corner classification */}
    <text x="14" y="14" fontSize="4" fill="var(--color-ink-secondary)" fontFamily="var(--font-family-sans)" fontWeight="600" letterSpacing="0.7">REGIÓN · NIEBLA · 64%</text>
    <text x="186" y="14" fontSize="4" fill="var(--color-accent-action)" fontFamily="var(--font-family-sans)" fontWeight="700" letterSpacing="0.7" textAnchor="end">REVELADO · 36%</text>
  </svg>,

  // Missions — narrative card with checklist + reward stamp
  <svg key="missions" viewBox="0 0 200 120" className="h-44 w-full" aria-hidden>
    <rect x="20" y="14" width="160" height="92" rx="3" fill="var(--color-bg-elevated)" stroke="var(--color-border-default)" strokeWidth="0.7" />

    {/* Mission title row */}
    <text x="28" y="26" fontSize="5.6" fill="var(--color-ink-primary)" fontFamily="var(--font-family-display)" fontStyle="italic" letterSpacing="0.2">
      Ruta del Sabor
    </text>
    <text x="172" y="26" fontSize="3.4" fill="var(--color-warm-base)" fontFamily="var(--font-family-sans)" fontWeight="700" letterSpacing="0.7" textAnchor="end">
      ★★★★☆
    </text>

    {/* Subtitle */}
    <text x="28" y="33" fontSize="3" fill="var(--color-ink-secondary)" fontFamily="var(--font-family-sans)" fontWeight="600" letterSpacing="0.7">
      GASTRONÓMICA · ARMENIA · QUINDÍO
    </text>

    {/* Hairline */}
    <line x1="28" y1="38" x2="172" y2="38" stroke="var(--color-border-default)" strokeWidth="0.4" />

    {/* Checklist — 3 of 5 done */}
    {[
      { y: 47, label: 'Mercado de la 21', done: true },
      { y: 56, label: 'Trapiche tradicional', done: true },
      { y: 65, label: 'Almuerzo en finca', done: true },
      { y: 74, label: 'Café de origen', done: false },
      { y: 83, label: 'Postre criollo', done: false },
    ].map((item, i) => (
      <g key={i}>
        <circle cx="34" cy={item.y - 1.2} r="2.4" fill={item.done ? 'var(--color-accent-action)' : 'transparent'} stroke={item.done ? 'var(--color-accent-action)' : 'var(--color-border-default)'} strokeWidth="0.5" />
        {item.done && <path d={`M ${32.6} ${item.y - 1.2} L ${33.8} ${item.y - 0.2} L ${35.6} ${item.y - 2.2}`} stroke="var(--color-bg-surface)" strokeWidth="0.7" fill="none" strokeLinecap="round" />}
        <text x="40" y={item.y} fontSize="3.4" fill={item.done ? 'var(--color-ink-secondary)' : 'var(--color-ink-primary)'} fontFamily="var(--font-family-sans)" letterSpacing="0.3" style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
          {item.label}
        </text>
      </g>
    ))}

    {/* Progress bar */}
    <rect x="28" y="92" width="100" height="2.5" rx="1.25" fill="var(--color-border-default)" />
    <rect x="28" y="92" width="60" height="2.5" rx="1.25" fill="var(--color-accent-action)" />
    <text x="28" y="100" fontSize="3" fill="var(--color-accent-action)" fontFamily="var(--font-family-sans)" fontWeight="700" letterSpacing="0.6">3 / 5 · 60%</text>

    {/* Reward chip — gold seal */}
    <g>
      <rect x="138" y="89" width="34" height="11" rx="5.5" fill="var(--color-warm-base)" fillOpacity="0.18" stroke="var(--color-warm-base)" strokeOpacity="0.55" strokeWidth="0.4" />
      <circle cx="144" cy="94.5" r="2" fill="var(--color-warm-base)" />
      <text x="149" y="97" fontSize="3" fill="var(--color-warm-base)" fontFamily="var(--font-family-sans)" fontWeight="700" letterSpacing="0.5">+150 XP · GOLD</text>
    </g>
  </svg>,
];

export function Apparatus() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useLocale();

  return (
    <section
      id="chapter-apparatus"
      ref={ref}
      className="mx-auto max-w-6xl px-6 py-32 sm:px-12 sm:py-44"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-20 flex flex-col items-center text-center"
      >
        <MetaLabel className="mb-8">{t.apparatus.chapter}</MetaLabel>
        <h2
          className="max-w-3xl leading-[1.05] tracking-[-0.025em] text-[var(--color-ink-primary)]"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            fontFamily: 'var(--font-family-display)',
          }}
        >
          {t.apparatus.heading}
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
        {t.apparatus.pillars.map((p, i) => (
          <motion.article
            key={p.ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
            className="group ds-card relative flex flex-col p-7 transition hover:border-[var(--color-accent-action)]/40"
          >
            <div className="mb-6 flex items-center justify-between">
              <MetaLabel tone="accent">{p.ref}</MetaLabel>
              <div className="flex items-center gap-2">
                <span className="h-1 w-6 bg-[var(--color-border-default)] transition-all duration-500 group-hover:w-10 group-hover:bg-[var(--color-accent-action)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-action)]" />
              </div>
            </div>

            <div className="mb-7 overflow-hidden rounded-sm">{graphics[i]}</div>

            <h3
              className="mb-3 text-2xl leading-[1.18] tracking-[-0.01em] text-[var(--color-ink-primary)] sm:text-3xl"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              {p.title}
            </h3>
            <p
              className="text-[15px] leading-[1.7] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-family-sans)' }}
            >
              {p.copy}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
