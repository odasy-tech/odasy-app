'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { MetaLabel } from '../atoms/meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

export function Field() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLocale();

  return (
    <section
      ref={ref}
      className="relative mx-auto grid max-w-6xl gap-16 px-6 py-32 sm:px-10 sm:py-40 md:grid-cols-[1.1fr_1fr] md:gap-20"
    >
      {/* Left: topographic "region" SVG */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative"
      >
        <div className="relative aspect-square w-full overflow-hidden border border-ink-700 bg-ink-900/60 p-6">
          <MetaLabel className="absolute left-6 top-6" tone="volt">
            {t.field.mapTitle}
          </MetaLabel>
          <MetaLabel className="absolute right-6 top-6">Q · R · C</MetaLabel>

          <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
            <g fill="none" strokeWidth="0.8">
              {[200, 170, 140, 110, 80, 55].map((r, i) => (
                <circle
                  key={r}
                  cx="200"
                  cy="210"
                  r={r}
                  stroke={i === 3 ? 'var(--color-volt)' : 'var(--color-bone)'}
                  strokeOpacity={i === 3 ? 0.5 : 0.08 + i * 0.02}
                />
              ))}
            </g>

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
                  r={p.main ? 5 : 3}
                  fill={p.main ? 'var(--color-volt)' : 'var(--color-bone-mute)'}
                />
                {p.main && (
                  <>
                    <circle cx={p.x} cy={p.y} r="14" stroke="var(--color-volt)" strokeOpacity="0.35" fill="none" />
                    <circle cx={p.x} cy={p.y} r="24" stroke="var(--color-volt)" strokeOpacity="0.15" fill="none" />
                  </>
                )}
                <text
                  x={p.x + 8}
                  y={p.y + 3}
                  fontSize="7"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.4"
                  fill={p.main ? 'var(--color-volt)' : 'var(--color-bone-mute)'}
                  opacity={p.main ? 1 : 0.7}
                >
                  {p.label.toUpperCase()}
                </text>
              </g>
            ))}

            <path
              d="M140 230 L160 160 L200 210 L230 260 L280 230"
              stroke="var(--color-volt)"
              strokeOpacity="0.35"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="3 4"
            />

            <text x="14" y="16" fontSize="6" fontFamily="var(--font-mono)" fill="var(--color-bone-dim)" letterSpacing="0.6">
              N 04°32&apos;
            </text>
            <text x="340" y="16" fontSize="6" fontFamily="var(--font-mono)" fill="var(--color-bone-dim)" letterSpacing="0.6">
              W 075°40&apos;
            </text>
            <text x="14" y="394" fontSize="6" fontFamily="var(--font-mono)" fill="var(--color-bone-dim)" letterSpacing="0.6">
              N 04°28&apos;
            </text>
            <text x="340" y="394" fontSize="6" fontFamily="var(--font-mono)" fill="var(--color-bone-dim)" letterSpacing="0.6">
              W 075°33&apos;
            </text>
          </svg>

          <MetaLabel className="absolute bottom-6 left-6">{t.field.mapSubregions}</MetaLabel>
        </div>
      </motion.div>

      {/* Right: manifesto */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="flex flex-col justify-center"
      >
        <MetaLabel className="mb-6">{t.field.chapter}</MetaLabel>
        <h2
          className="font-[family-name:var(--font-display)] leading-[1.02] tracking-[-0.03em] text-bone"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
            fontVariationSettings: '"SOFT" 100, "opsz" 60',
          }}
        >
          {t.field.heading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-bone-mute sm:text-lg">
          {t.field.paragraph}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink-700 pt-10">
          {t.field.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <div
                className="font-[family-name:var(--font-display)] text-5xl font-medium text-volt"
                style={{ fontVariationSettings: '"SOFT" 100, "opsz" 48' }}
              >
                {s.value}
              </div>
              <MetaLabel>{s.label}</MetaLabel>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-dim">
          <span className="text-volt">{t.field.now}</span>
          {t.field.roadmap.map((r) => (
            <span key={r} className="flex items-center gap-4">
              <span>→</span>
              <span>{r}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
