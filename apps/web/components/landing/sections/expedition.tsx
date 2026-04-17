'use client';

import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { MetaLabel } from '../atoms/meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

export function Expedition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative mx-auto max-w-4xl px-6 py-32 sm:px-10 sm:py-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center"
      >
        <MetaLabel className="mb-6">{t.expedition.chapter}</MetaLabel>

        <h2
          className="max-w-3xl font-[family-name:var(--font-display)] leading-[1.02] tracking-[-0.035em] text-bone"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            fontVariationSettings: '"SOFT" 100, "opsz" 80',
          }}
        >
          <span>{t.expedition.headingPre}</span>
          <span className="text-volt">{t.expedition.headingAccent}</span>
          <span>{t.expedition.headingPost}</span>
        </h2>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-bone-mute sm:text-lg">
          {t.expedition.paragraph}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-14 flex w-full max-w-xl flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.expedition.emailPlaceholder}
            className="flex-1 border border-ink-700 bg-ink-900/50 px-5 py-4 font-mono text-sm tracking-wider text-bone placeholder:text-bone-dim focus:border-volt focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitted}
            className="group flex items-center justify-center gap-3 border border-volt bg-volt px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-ink-950 transition hover:bg-volt-deep disabled:cursor-default disabled:opacity-60"
          >
            <span>{submitted ? t.expedition.submitted : t.expedition.submit}</span>
            {!submitted && (
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition group-hover:translate-x-0.5"
              />
            )}
          </button>
        </form>

        <MetaLabel className="mt-6">{t.expedition.meta}</MetaLabel>
      </motion.div>
    </section>
  );
}
