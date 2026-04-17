'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Divider } from '../atoms/divider';
import { MetaLabel } from '../atoms/meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

export function Premise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { t } = useLocale();

  return (
    <section id="premise" ref={ref} className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10 sm:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center text-center"
      >
        <MetaLabel className="mb-10">{t.premise.chapter}</MetaLabel>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl font-[family-name:var(--font-display)] leading-[1.02] tracking-[-0.035em] text-bone"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
            fontVariationSettings: '"SOFT" 100, "opsz" 80',
          }}
        >
          <span>{t.premise.h1Part1}</span>
          <span className="italic text-bone-mute">{t.premise.h1Part2}</span>
          <span>{t.premise.h1Part3}</span>
          <span className="text-volt italic">{t.premise.h1Accent}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 max-w-2xl text-lg leading-relaxed text-bone-mute sm:text-xl"
        >
          {t.premise.paragraph}
        </motion.p>
      </motion.div>

      <Divider />
    </section>
  );
}
