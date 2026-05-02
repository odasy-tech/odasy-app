'use client';

import { Archetype, MetaLabel } from '@odasy/ui/web';
import { motion, useInView } from 'motion/react';
import {
  Aperture,
  Compass as CompassIcon,
  Leaf,
  Mountain,
  Sprout,
  Theater,
  Utensils,
} from 'lucide-react';
import { useRef } from 'react';
import { useLocale } from '@/lib/i18n/locale-context';

/**
 * Maps archetype IDs to their visual identity. Half use the violet brand
 * accent, the nature-leaning two (Contemplator, Conscious) wear moss to
 * communicate the palette's secondary axis.
 */
const ARCHETYPE_VISUALS: Record<
  string,
  { glyph: React.ReactNode; natural?: boolean }
> = {
  navigator:    { glyph: <CompassIcon size={18} strokeWidth={1.6} /> },
  contemplator: { glyph: <Leaf size={18} strokeWidth={1.6} />, natural: true },
  adventurer:   { glyph: <Mountain size={18} strokeWidth={1.6} /> },
  sibarite:     { glyph: <Utensils size={18} strokeWidth={1.6} /> },
  cultural:     { glyph: <Theater size={18} strokeWidth={1.6} /> },
  chronicler:   { glyph: <Aperture size={18} strokeWidth={1.6} /> },
  conscious:    { glyph: <Sprout size={18} strokeWidth={1.6} />, natural: true },
};

export function Explorer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const { t } = useLocale();

  // The first archetype in the user's mock profile is the primary one.
  const primaryName = t.explorer.profileMix[0]?.archetype;

  return (
    <section
      id="chapter-explorer"
      ref={ref}
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-12 sm:py-44"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85 }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <MetaLabel tone="accent" className="mb-7">
          {t.explorer.meta}
        </MetaLabel>
        <h2
          className="max-w-3xl leading-[1.05] tracking-[-0.025em] text-[var(--color-ink-primary)] sm:leading-[1.04]"
          style={{
            fontSize: 'clamp(2rem, 5.4vw, 4.5rem)',
            fontFamily: 'var(--font-family-display)',
          }}
        >
          {t.explorer.heading}
        </h2>
        <p
          className="mt-6 max-w-2xl text-base leading-[1.7] text-[var(--color-ink-secondary)] sm:text-lg"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {t.explorer.paragraph}
        </p>
      </motion.div>

      {/* Archetype grid: 2 cols mobile, 4 cols sm, 7 cols at lg. The 7-col
       * arrangement gives a rare horizontal "ladder" feel that visually
       * mirrors the spectrum of the explorer mix below. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3.5">
        {t.explorer.archetypes.map((a, idx) => {
          const visual = ARCHETYPE_VISUALS[a.id];
          if (!visual) return null;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.06 }}
            >
              <Archetype
                name={a.name}
                copy={a.copy}
                glyph={visual.glyph}
                accent={visual.natural ? 'moss' : 'violet'}
                primary={a.name === primaryName}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Profile mix mock — the "your blend" callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="ds-card mt-12 flex flex-col gap-5 p-6 sm:mt-16 sm:flex-row sm:items-center sm:gap-10 sm:p-8"
      >
        <div className="flex flex-col gap-1.5 sm:min-w-[200px]">
          <MetaLabel tone="accent">{t.explorer.profileLabel}</MetaLabel>
          <div
            className="text-[15px] leading-[1.4] text-[var(--color-ink-primary)]"
            style={{
              fontFamily: 'var(--font-family-display)',
              fontStyle: 'italic',
            }}
          >
            Valentina Ríos
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {/* Stacked horizontal bar — proportional segments */}
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-border-default)]">
            {t.explorer.profileMix.map((segment, idx) => (
              <div
                key={segment.archetype}
                style={{
                  width: `${segment.pct}%`,
                  backgroundColor:
                    idx === 0
                      ? 'var(--color-accent-action)'
                      : idx === 1
                        ? 'var(--color-accent-base)'
                        : idx === 2
                          ? 'var(--color-warm-base)'
                          : 'var(--color-info-base)',
                }}
              />
            ))}
          </div>

          {/* Legend chips */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {t.explorer.profileMix.map((segment, idx) => (
              <div
                key={segment.archetype}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-secondary)]"
                style={{ fontFamily: 'var(--font-family-sans)' }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      idx === 0
                        ? 'var(--color-accent-action)'
                        : idx === 1
                          ? 'var(--color-accent-base)'
                          : idx === 2
                            ? 'var(--color-warm-base)'
                            : 'var(--color-info-base)',
                  }}
                />
                <span>
                  {segment.archetype} · {segment.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
