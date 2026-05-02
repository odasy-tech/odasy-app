'use client';

import { MetaLabel, Stamp, type StampTier } from '@odasy/ui/web';
import { motion, useInView } from 'motion/react';
import {
  Coffee,
  Compass as CompassIcon,
  Landmark,
  Leaf,
  Mountain,
  Sunrise,
  Utensils,
  Waves,
} from 'lucide-react';
import { type ReactNode, useRef } from 'react';
import { useLocale } from '@/lib/i18n/locale-context';

const stampMeta: Record<string, { tier: StampTier; glyph: ReactNode; earned: boolean }> = {
  coffee:   { tier: 'gold',     glyph: <Coffee size={22} strokeWidth={1.3} />,      earned: true },
  first:    { tier: 'bronze',   glyph: <CompassIcon size={22} strokeWidth={1.3} />, earned: true },
  heritage: { tier: 'silver',   glyph: <Landmark size={22} strokeWidth={1.3} />,    earned: true },
  summit:   { tier: 'platinum', glyph: <Mountain size={22} strokeWidth={1.3} />,    earned: false },
  valley:   { tier: 'gold',     glyph: <Leaf size={22} strokeWidth={1.3} />,        earned: true },
  sunrise:  { tier: 'diamond',  glyph: <Sunrise size={22} strokeWidth={1.3} />,     earned: false },
  flavour:  { tier: 'silver',   glyph: <Utensils size={22} strokeWidth={1.3} />,    earned: true },
  river:    { tier: 'bronze',   glyph: <Waves size={22} strokeWidth={1.3} />,       earned: false },
  legend:   { tier: 'diamond',  glyph: <CompassIcon size={22} strokeWidth={1.3} />, earned: false },
};

export function Artifact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useLocale();

  return (
    <section
      id="chapter-artifact"
      ref={ref}
      className="relative mx-auto max-w-5xl px-6 py-32 sm:px-12 sm:py-44"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <MetaLabel className="mb-8">{t.artifact.chapter}</MetaLabel>
        <h2
          className="max-w-3xl leading-[1.04] tracking-[-0.025em] text-[var(--color-ink-primary)]"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontFamily: 'var(--font-family-display)',
          }}
        >
          <span>{t.artifact.headingPre}</span>
          <span style={{ fontStyle: 'italic' }} className="text-[var(--color-accent-action)]">
            {t.artifact.headingAccent}
          </span>
          <span>{t.artifact.headingPost}</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, delay: 0.25, ease: 'easeOut' }}
        className="ds-card relative ds-hatch p-6 sm:p-12"
      >
        <div className="ds-corners absolute inset-0">
          <span className="ds-corner tl" />
          <span className="ds-corner tr" />
          <span className="ds-corner bl" />
          <span className="ds-corner br" />
        </div>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <MetaLabel tone="accent">{t.artifact.collection}</MetaLabel>
            <div
              className="text-[12px] uppercase tracking-[0.28em] text-[var(--color-ink-secondary)]"
              style={{ fontFamily: 'var(--font-family-sans)' }}
            >
              {t.artifact.recovered}
            </div>
          </div>
          <MetaLabel>{t.artifact.hoverHint}</MetaLabel>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-14">
          {t.artifact.stamps.map((s, idx) => {
            const meta = stampMeta[s.key];
            if (!meta) return null;
            return (
              <Stamp
                key={s.key}
                index={idx}
                title={s.title}
                place={s.place}
                tier={meta.tier}
                glyph={meta.glyph}
                earned={meta.earned}
                {...('date' in s && s.date ? { date: s.date } : {})}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
