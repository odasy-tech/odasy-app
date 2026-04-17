'use client';

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
import { MetaLabel } from '../atoms/meta-label';
import { Stamp } from '../atoms/stamp';
import { useLocale } from '@/lib/i18n/locale-context';

type Tier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

const stampMeta: Record<string, { tier: Tier; glyph: ReactNode; earned: boolean }> = {
  coffee: { tier: 'gold', glyph: <Coffee size={24} strokeWidth={1.5} />, earned: true },
  first: { tier: 'bronze', glyph: <CompassIcon size={24} strokeWidth={1.5} />, earned: true },
  heritage: { tier: 'silver', glyph: <Landmark size={24} strokeWidth={1.5} />, earned: true },
  summit: { tier: 'platinum', glyph: <Mountain size={24} strokeWidth={1.5} />, earned: false },
  valley: { tier: 'gold', glyph: <Leaf size={24} strokeWidth={1.5} />, earned: true },
  sunrise: { tier: 'diamond', glyph: <Sunrise size={24} strokeWidth={1.5} />, earned: false },
  flavour: { tier: 'silver', glyph: <Utensils size={24} strokeWidth={1.5} />, earned: true },
  river: { tier: 'bronze', glyph: <Waves size={24} strokeWidth={1.5} />, earned: false },
  legend: { tier: 'diamond', glyph: <CompassIcon size={24} strokeWidth={1.5} />, earned: false },
};

export function Artifact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useLocale();

  return (
    <section ref={ref} className="relative mx-auto max-w-5xl px-6 py-32 sm:px-10 sm:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <MetaLabel className="mb-6">{t.artifact.chapter}</MetaLabel>
        <h2
          className="max-w-3xl font-[family-name:var(--font-display)] leading-[1.05] tracking-[-0.03em] text-bone"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontVariationSettings: '"SOFT" 100, "opsz" 60',
          }}
        >
          <span>{t.artifact.headingPre}</span>
          <span className="italic text-volt">{t.artifact.headingAccent}</span>
          <span>{t.artifact.headingPost}</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        className="relative border border-ink-700 bg-ink-900/50 p-8 backdrop-blur sm:p-12"
      >
        <CornerTick className="left-2 top-2" />
        <CornerTick className="right-2 top-2 rotate-90" />
        <CornerTick className="bottom-2 right-2 rotate-180" />
        <CornerTick className="bottom-2 left-2 -rotate-90" />

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <MetaLabel tone="volt">{t.artifact.collection}</MetaLabel>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-bone-mute">
              {t.artifact.recovered}
            </div>
          </div>
          <MetaLabel>{t.artifact.hoverHint}</MetaLabel>
        </div>

        <div className="grid grid-cols-3 gap-8 sm:gap-12">
          {t.artifact.stamps.map((s) => {
            const meta = stampMeta[s.key];
            if (!meta) return null;
            return (
              <Stamp
                key={s.key}
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

function CornerTick({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`absolute text-volt ${className}`}
      aria-hidden
    >
      <path d="M0 6 L0 0 L6 0" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
