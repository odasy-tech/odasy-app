'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { AuroraMetaLabel } from '../atoms/aurora-meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

export function FieldV2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLocale();

  return (
    <section
      ref={ref}
      className="relative mx-auto grid max-w-6xl gap-16 px-6 py-32 sm:px-12 sm:py-44 md:grid-cols-[1.1fr_1fr] md:gap-20"
    >
      {/* Left: schematic region */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative"
      >
        <div className="aurora-card relative aspect-square w-full overflow-hidden p-7">
          <div className="aurora-corners absolute inset-0">
            <span className="aurora-corner tl" />
            <span className="aurora-corner tr" />
            <span className="aurora-corner bl" />
            <span className="aurora-corner br" />
          </div>

          <div className="absolute left-7 top-7 z-10 flex flex-col gap-1">
            <AuroraMetaLabel tone="accent">{t.field.mapTitle}</AuroraMetaLabel>
            <span
              className="text-[9px] uppercase tracking-[0.32em] text-[var(--color-aurora-ink-dim)]"
              style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
            >
              Q · R · C
            </span>
          </div>

          <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden>
            {/* Concentric range rings — light density */}
            <g fill="none" strokeWidth="0.7">
              {[200, 170, 140, 110, 80, 55].map((r, i) => (
                <circle
                  key={r}
                  cx="200"
                  cy="210"
                  r={r}
                  stroke={i === 3 ? 'var(--color-aurora-deep)' : 'var(--color-aurora-blue)'}
                  strokeOpacity={i === 3 ? 0.55 : 0.18 + i * 0.04}
                />
              ))}
            </g>

            {/* Trail */}
            <path
              d="M140 230 L160 160 L200 210 L230 260 L280 230"
              stroke="var(--color-aurora-deep)"
              strokeOpacity="0.55"
              strokeWidth="0.9"
              fill="none"
              strokeDasharray="3 4"
            />

            {[
              { x: 200, y: 210, main: true, label: 'Salento' },
              { x: 260, y: 180, label: 'Filandia' },
              { x: 160, y: 160, label: 'Manizales' },
              { x: 230, y: 260, label: 'Armenia' },
              { x: 140, y: 230, label: 'Pereira' },
              { x: 280, y: 230, label: 'Circasia' },
              { x: 190, y: 130, label: 'Cocora' },
            ].map((p) => (
              <g key={p.label}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.main ? 5.5 : 3}
                  fill={p.main ? 'var(--color-aurora-deep)' : 'var(--color-aurora-ink-mute)'}
                />
                {p.main && (
                  <>
                    <circle cx={p.x} cy={p.y} r="14" stroke="var(--color-aurora-deep)" strokeOpacity="0.45" fill="none" />
                    <circle cx={p.x} cy={p.y} r="24" stroke="var(--color-aurora-deep)" strokeOpacity="0.2" fill="none" />
                  </>
                )}
                <text
                  x={p.x + 9}
                  y={p.y + 3}
                  fontSize="7"
                  fontFamily="var(--font-family-aurora-sans)"
                  fontWeight={p.main ? 600 : 500}
                  letterSpacing="0.5"
                  fill={p.main ? 'var(--color-aurora-deep)' : 'var(--color-aurora-ink-mute)'}
                  opacity={p.main ? 1 : 0.78}
                >
                  {p.label.toUpperCase()}
                </text>
              </g>
            ))}

            {/* Coordinate ticks */}
            <text x="14" y="18" fontSize="6" fontFamily="var(--font-family-aurora-sans)" fill="var(--color-aurora-ink-dim)" letterSpacing="0.6" fontWeight={500}>
              N 04°32&apos;
            </text>
            <text x="386" y="18" fontSize="6" fontFamily="var(--font-family-aurora-sans)" fill="var(--color-aurora-ink-dim)" letterSpacing="0.6" fontWeight={500} textAnchor="end">
              W 075°40&apos;
            </text>
            <text x="14" y="394" fontSize="6" fontFamily="var(--font-family-aurora-sans)" fill="var(--color-aurora-ink-dim)" letterSpacing="0.6" fontWeight={500}>
              N 04°28&apos;
            </text>
            <text x="386" y="394" fontSize="6" fontFamily="var(--font-family-aurora-sans)" fill="var(--color-aurora-ink-dim)" letterSpacing="0.6" fontWeight={500} textAnchor="end">
              W 075°33&apos;
            </text>
          </svg>

          <div className="absolute bottom-7 left-7 z-10 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-aurora-deep)]" />
            <AuroraMetaLabel>{t.field.mapSubregions}</AuroraMetaLabel>
          </div>
          <div className="absolute bottom-7 right-7 z-10">
            <AuroraMetaLabel tone="accent">SCALE 1:60K</AuroraMetaLabel>
          </div>
        </div>
      </motion.div>

      {/* Right: manifesto */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        className="flex flex-col justify-center"
      >
        <AuroraMetaLabel className="mb-8">{t.field.chapter}</AuroraMetaLabel>
        <h2
          className="leading-[1.04] tracking-[-0.025em] text-[var(--color-aurora-ink)]"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
            fontFamily: 'var(--font-family-aurora-display)',
          }}
        >
          {t.field.heading}
        </h2>
        <p
          className="mt-7 text-base leading-[1.7] text-[var(--color-aurora-ink-mute)] sm:text-lg"
          style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
        >
          {t.field.paragraph}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--color-rule)] pt-10">
          {t.field.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div
                className="text-5xl leading-none tracking-[-0.02em] text-[var(--color-aurora-deep)]"
                style={{ fontFamily: 'var(--font-family-aurora-display)' }}
              >
                {s.value}
              </div>
              <AuroraMetaLabel>{s.label}</AuroraMetaLabel>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-aurora-soft)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[var(--color-aurora-deep)]"
            style={{ fontFamily: 'var(--font-family-aurora-sans)', fontWeight: 600 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-aurora-deep)]" />
            {t.field.now}
          </span>
          {t.field.roadmap.map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[var(--color-aurora-ink-mute)]"
              style={{ fontFamily: 'var(--font-family-aurora-sans)', fontWeight: 500 }}
            >
              <span aria-hidden>→</span>
              {r}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
