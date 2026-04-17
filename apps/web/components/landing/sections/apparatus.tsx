'use client';

import { motion, useInView } from 'motion/react';
import { type ReactNode, useRef } from 'react';
import { MetaLabel } from '../atoms/meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

const graphics: ReactNode[] = [
  // Passport
  <svg key="passport" viewBox="0 0 200 120" className="h-40 w-full" aria-hidden>
    <defs>
      <linearGradient id="passportGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="var(--color-ink-800)" />
        <stop offset="100%" stopColor="var(--color-ink-900)" />
      </linearGradient>
    </defs>
    <rect x="24" y="16" width="152" height="90" rx="6" fill="url(#passportGrad)" stroke="var(--color-ink-700)" strokeWidth="0.6" />
    <rect x="32" y="24" width="136" height="74" rx="3" fill="none" stroke="var(--color-bone)" strokeOpacity="0.15" strokeDasharray="2 3" />
    <circle cx="100" cy="56" r="16" stroke="var(--color-volt)" strokeOpacity="0.8" fill="none" />
    <circle cx="100" cy="56" r="6" fill="var(--color-volt)" fillOpacity="0.3" />
    <line x1="60" y1="88" x2="140" y2="88" stroke="var(--color-bone-mute)" strokeOpacity="0.4" strokeWidth="0.4" />
    <line x1="60" y1="92" x2="120" y2="92" stroke="var(--color-bone-mute)" strokeOpacity="0.25" strokeWidth="0.4" />
  </svg>,
  // Map
  <svg key="map" viewBox="0 0 200 120" className="h-40 w-full" aria-hidden>
    <g stroke="var(--color-bone)" fill="none" strokeWidth="0.6">
      <path d="M30 60 Q 80 20, 170 50" strokeOpacity="0.08" />
      <path d="M30 70 Q 80 30, 170 60" strokeOpacity="0.12" />
      <path d="M30 80 Q 80 40, 170 70" strokeOpacity="0.16" />
      <path d="M30 90 Q 80 50, 170 80" strokeOpacity="0.2" />
      <path d="M30 100 Q 80 60, 170 90" strokeOpacity="0.24" />
    </g>
    <g>
      <circle cx="58" cy="66" r="3" fill="var(--color-volt)" />
      <circle cx="58" cy="66" r="8" stroke="var(--color-volt)" strokeOpacity="0.4" fill="none" />
      <circle cx="112" cy="40" r="3" fill="var(--color-bone-mute)" />
      <circle cx="148" cy="72" r="3" fill="var(--color-bone-mute)" />
      <circle cx="86" cy="92" r="3" fill="var(--color-bone-mute)" />
    </g>
    <path d="M58 66 Q 100 50, 148 72" fill="none" stroke="var(--color-volt)" strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2 3" />
  </svg>,
  // Missions
  <svg key="missions" viewBox="0 0 200 120" className="h-40 w-full" aria-hidden>
    <rect x="24" y="16" width="152" height="90" rx="6" fill="var(--color-ink-800)" stroke="var(--color-ink-700)" strokeWidth="0.6" />
    <line x1="36" y1="32" x2="92" y2="32" stroke="var(--color-bone)" strokeOpacity="0.6" strokeWidth="1" />
    <line x1="36" y1="44" x2="164" y2="44" stroke="var(--color-bone-mute)" strokeOpacity="0.35" strokeWidth="0.5" />
    <line x1="36" y1="52" x2="148" y2="52" stroke="var(--color-bone-mute)" strokeOpacity="0.35" strokeWidth="0.5" />
    <line x1="36" y1="60" x2="130" y2="60" stroke="var(--color-bone-mute)" strokeOpacity="0.35" strokeWidth="0.5" />
    <rect x="36" y="80" width="128" height="4" rx="2" fill="var(--color-ink-700)" />
    <rect x="36" y="80" width="78" height="4" rx="2" fill="var(--color-volt)" />
    <text x="36" y="98" fontSize="6" fill="var(--color-volt)" fontFamily="var(--font-mono)" letterSpacing="0.5">
      3 / 5
    </text>
  </svg>,
];

export function Apparatus() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useLocale();

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-32 sm:px-10 sm:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-20 flex flex-col items-center text-center"
      >
        <MetaLabel className="mb-6">{t.apparatus.chapter}</MetaLabel>
        <h2
          className="max-w-3xl font-[family-name:var(--font-display)] leading-[1.05] tracking-[-0.03em] text-bone"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            fontVariationSettings: '"SOFT" 100, "opsz" 60',
          }}
        >
          {t.apparatus.heading}
        </h2>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
        {t.apparatus.pillars.map((p, i) => (
          <motion.article
            key={p.ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
            className="group relative flex flex-col border border-ink-700 bg-ink-900/50 p-6 backdrop-blur transition hover:border-volt/40"
          >
            <div className="mb-5 flex items-center justify-between">
              <MetaLabel tone="volt">{p.ref}</MetaLabel>
              <div className="h-1 w-1 rounded-full bg-volt transition group-hover:scale-150" />
            </div>
            <div className="mb-6 overflow-hidden">{graphics[i]}</div>
            <h3
              className="mb-4 font-[family-name:var(--font-display)] text-3xl text-bone"
              style={{ fontVariationSettings: '"SOFT" 100, "opsz" 32' }}
            >
              {p.title}
            </h3>
            <p className="text-base leading-relaxed text-bone-mute">{p.copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
