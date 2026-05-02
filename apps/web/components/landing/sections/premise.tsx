'use client';

import { Divider, MetaLabel } from '@odasy/ui/web';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useLocale } from '@/lib/i18n/locale-context';

export function Premise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { t } = useLocale();

  return (
    <section
      id="chapter-premise"
      ref={ref}
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-12 sm:py-48"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex flex-col items-center text-center"
      >
        <MetaLabel tone="accent" className="mb-12">
          {t.premise.chapter}
        </MetaLabel>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="max-w-4xl leading-[1.04] tracking-[-0.025em] text-[var(--color-ink-primary)] sm:leading-[0.98]"
          style={{
            fontSize: 'var(--text-display)',
            fontFamily: 'var(--font-display)',
          }}
        >
          <span>{t.premise.h1Part1}</span>
          <span style={{ fontStyle: 'italic' }} className="text-[var(--color-ink-secondary)]">
            {t.premise.h1Part2}
          </span>
          <span>{t.premise.h1Part3}</span>
          <span
            style={{ fontStyle: 'italic' }}
            className="text-[var(--color-accent-action)]"
          >
            {t.premise.h1Accent}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-16 max-w-2xl text-lg leading-[1.7] text-[var(--color-ink-secondary)] sm:text-xl"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {t.premise.paragraph}
        </motion.p>
      </motion.div>

      <Divider />
    </section>
  );
}
