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
import { AuroraMetaLabel } from '../atoms/aurora-meta-label';
import { type AuroraTier, AuroraStamp } from '../atoms/aurora-stamp';
import { useLocale } from '@/lib/i18n/locale-context';

const stampMeta: Record<string, { tier: AuroraTier; glyph: ReactNode; earned: boolean }> = {
  coffee:   { tier: 'lapislazuli', glyph: <Coffee size={22} strokeWidth={1.3} />,      earned: true },
  first:    { tier: 'tinta',       glyph: <CompassIcon size={22} strokeWidth={1.3} />, earned: true },
  heritage: { tier: 'cobalto',     glyph: <Landmark size={22} strokeWidth={1.3} />,    earned: true },
  summit:   { tier: 'amatista',    glyph: <Mountain size={22} strokeWidth={1.3} />,    earned: false },
  valley:   { tier: 'lapislazuli', glyph: <Leaf size={22} strokeWidth={1.3} />,        earned: true },
  sunrise:  { tier: 'aurora',      glyph: <Sunrise size={22} strokeWidth={1.3} />,     earned: false },
  flavour:  { tier: 'cobalto',     glyph: <Utensils size={22} strokeWidth={1.3} />,    earned: true },
  river:    { tier: 'tinta',       glyph: <Waves size={22} strokeWidth={1.3} />,       earned: false },
  legend:   { tier: 'aurora',      glyph: <CompassIcon size={22} strokeWidth={1.3} />, earned: false },
};

export function ArtifactV2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useLocale();

  return (
    <section ref={ref} className="relative mx-auto max-w-5xl px-6 py-32 sm:px-12 sm:py-44">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <AuroraMetaLabel className="mb-8">{t.artifact.chapter}</AuroraMetaLabel>
        <h2
          className="max-w-3xl leading-[1.04] tracking-[-0.025em] text-[var(--color-aurora-ink)]"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontFamily: 'var(--font-family-aurora-display)',
          }}
        >
          <span>{t.artifact.headingPre}</span>
          <span style={{ fontStyle: 'italic' }} className="text-[var(--color-aurora-deep)]">
            {t.artifact.headingAccent}
          </span>
          <span>{t.artifact.headingPost}</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, delay: 0.25, ease: 'easeOut' }}
        className="aurora-card relative aurora-hatch p-8 sm:p-12"
      >
        <div className="aurora-corners absolute inset-0">
          <span className="aurora-corner tl" />
          <span className="aurora-corner tr" />
          <span className="aurora-corner bl" />
          <span className="aurora-corner br" />
        </div>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <AuroraMetaLabel tone="accent">{t.artifact.collection}</AuroraMetaLabel>
            <div
              className="text-[12px] uppercase tracking-[0.28em] text-[var(--color-aurora-ink-mute)]"
              style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
            >
              {t.artifact.recovered}
            </div>
          </div>
          <AuroraMetaLabel>{t.artifact.hoverHint}</AuroraMetaLabel>
        </div>

        <div className="grid grid-cols-3 gap-10 sm:gap-14">
          {t.artifact.stamps.map((s) => {
            const meta = stampMeta[s.key];
            if (!meta) return null;
            return (
              <AuroraStamp
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
