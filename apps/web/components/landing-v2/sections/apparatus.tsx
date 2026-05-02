'use client';

import { motion, useInView } from 'motion/react';
import { type ReactNode, useRef } from 'react';
import { AuroraMetaLabel } from '../atoms/aurora-meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

const graphics: ReactNode[] = [
  // Passport
  <svg key="passport" viewBox="0 0 200 120" className="h-44 w-full" aria-hidden>
    <defs>
      <linearGradient id="auroraPassport" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="var(--color-vellum-mute)" />
        <stop offset="100%" stopColor="var(--color-vellum)" />
      </linearGradient>
    </defs>
    <rect x="24" y="16" width="152" height="90" rx="4" fill="url(#auroraPassport)" stroke="var(--color-rule)" strokeWidth="0.7" />
    <rect x="32" y="24" width="136" height="74" rx="2" fill="none" stroke="var(--color-aurora-ink)" strokeOpacity="0.18" strokeDasharray="2 3" />
    <circle cx="100" cy="56" r="18" stroke="var(--color-aurora-deep)" strokeOpacity="0.85" fill="none" strokeWidth="0.8" />
    <circle cx="100" cy="56" r="6" fill="var(--color-aurora-deep)" fillOpacity="0.36" />
    <line x1="60" y1="88" x2="140" y2="88" stroke="var(--color-aurora-ink-mute)" strokeOpacity="0.5" strokeWidth="0.5" />
    <line x1="60" y1="92" x2="120" y2="92" stroke="var(--color-aurora-ink-mute)" strokeOpacity="0.32" strokeWidth="0.5" />
    {/* corner ticks */}
    <path d="M 28 20 L 28 16 L 32 16" stroke="var(--color-aurora-deep)" strokeWidth="0.7" fill="none" />
    <path d="M 168 16 L 172 16 L 172 20" stroke="var(--color-aurora-deep)" strokeWidth="0.7" fill="none" />
    <path d="M 172 102 L 172 106 L 168 106" stroke="var(--color-aurora-deep)" strokeWidth="0.7" fill="none" />
    <path d="M 32 106 L 28 106 L 28 102" stroke="var(--color-aurora-deep)" strokeWidth="0.7" fill="none" />
  </svg>,
  // Map
  <svg key="map" viewBox="0 0 200 120" className="h-44 w-full" aria-hidden>
    <g stroke="var(--color-aurora-blue)" fill="none" strokeWidth="0.7">
      <path d="M30 60 Q 80 20, 170 50" strokeOpacity="0.22" />
      <path d="M30 70 Q 80 30, 170 60" strokeOpacity="0.3" />
      <path d="M30 80 Q 80 40, 170 70" strokeOpacity="0.4" />
      <path d="M30 90 Q 80 50, 170 80" strokeOpacity="0.52" />
    </g>
    <path d="M58 66 Q 100 50, 148 72" fill="none" stroke="var(--color-aurora-deep)" strokeOpacity="0.7" strokeWidth="0.9" strokeDasharray="3 3" />
    <g>
      <circle cx="58" cy="66" r="3.4" fill="var(--color-aurora-deep)" />
      <circle cx="58" cy="66" r="9" stroke="var(--color-aurora-deep)" strokeOpacity="0.4" fill="none" />
      <circle cx="112" cy="40" r="2.6" fill="var(--color-aurora-ink-mute)" />
      <circle cx="148" cy="72" r="2.6" fill="var(--color-aurora-ink-mute)" />
      <circle cx="86" cy="92" r="2.6" fill="var(--color-aurora-ink-mute)" />
    </g>
  </svg>,
  // Missions
  <svg key="missions" viewBox="0 0 200 120" className="h-44 w-full" aria-hidden>
    <rect x="24" y="16" width="152" height="90" rx="4" fill="var(--color-vellum-mute)" stroke="var(--color-rule)" strokeWidth="0.7" />
    <line x1="36" y1="32" x2="92" y2="32" stroke="var(--color-aurora-ink)" strokeOpacity="0.85" strokeWidth="1.1" />
    <line x1="36" y1="44" x2="164" y2="44" stroke="var(--color-aurora-ink-mute)" strokeOpacity="0.5" strokeWidth="0.55" />
    <line x1="36" y1="52" x2="148" y2="52" stroke="var(--color-aurora-ink-mute)" strokeOpacity="0.5" strokeWidth="0.55" />
    <line x1="36" y1="60" x2="130" y2="60" stroke="var(--color-aurora-ink-mute)" strokeOpacity="0.5" strokeWidth="0.55" />
    <rect x="36" y="80" width="128" height="4" rx="2" fill="var(--color-rule)" />
    <rect x="36" y="80" width="78" height="4" rx="2" fill="var(--color-aurora-deep)" />
    <text x="36" y="98" fontSize="6" fill="var(--color-aurora-deep)" fontFamily="var(--font-family-aurora-sans)" fontWeight="600" letterSpacing="0.5">
      03 / 05
    </text>
    <text x="160" y="98" fontSize="6" fill="var(--color-aurora-ink-mute)" fontFamily="var(--font-family-aurora-sans)" letterSpacing="0.5" textAnchor="end">
      62%
    </text>
  </svg>,
];

export function ApparatusV2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useLocale();

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-32 sm:px-12 sm:py-44">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-20 flex flex-col items-center text-center"
      >
        <AuroraMetaLabel className="mb-8">{t.apparatus.chapter}</AuroraMetaLabel>
        <h2
          className="max-w-3xl leading-[1.05] tracking-[-0.025em] text-[var(--color-aurora-ink)]"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            fontFamily: 'var(--font-family-aurora-display)',
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
            className="group aurora-card relative flex flex-col p-7 transition hover:border-[var(--color-aurora-deep)]/40"
          >
            <div className="mb-6 flex items-center justify-between">
              <AuroraMetaLabel tone="accent">{p.ref}</AuroraMetaLabel>
              <div className="flex items-center gap-2">
                <span className="h-1 w-6 bg-[var(--color-rule)] transition-all duration-500 group-hover:w-10 group-hover:bg-[var(--color-aurora-deep)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-aurora-deep)]" />
              </div>
            </div>

            <div className="mb-7 overflow-hidden rounded-sm">{graphics[i]}</div>

            <h3
              className="mb-3 text-2xl leading-[1.18] tracking-[-0.01em] text-[var(--color-aurora-ink)] sm:text-3xl"
              style={{ fontFamily: 'var(--font-family-aurora-display)' }}
            >
              {p.title}
            </h3>
            <p
              className="text-[15px] leading-[1.7] text-[var(--color-aurora-ink-mute)]"
              style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
            >
              {p.copy}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
