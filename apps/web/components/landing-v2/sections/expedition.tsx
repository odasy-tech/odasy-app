'use client';

import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { AuroraMetaLabel } from '../atoms/aurora-meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

export function ExpeditionV2() {
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
    <section
      id="beta"
      ref={ref}
      className="relative overflow-hidden"
    >
      {/* Inverted dark band — the only saturated moment in the page */}
      <div className="relative bg-[var(--color-aurora-dark)] px-6 py-32 sm:px-12 sm:py-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(168, 178, 255, 0.18), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(107, 92, 231, 0.4), transparent 55%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <AuroraMetaLabel tone="inverse" className="mb-8">
            {t.expedition.chapter}
          </AuroraMetaLabel>

          <h2
            className="max-w-3xl leading-[1.02] tracking-[-0.03em] text-white"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontFamily: 'var(--font-family-aurora-display)',
            }}
          >
            <span>{t.expedition.headingPre}</span>
            <span
              style={{ fontStyle: 'italic' }}
              className="text-[var(--color-aurora-blue)]"
            >
              {t.expedition.headingAccent}
            </span>
            <span>{t.expedition.headingPost}</span>
          </h2>

          <p
            className="mt-8 max-w-xl text-base leading-[1.7] text-white/75 sm:text-lg"
            style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
          >
            {t.expedition.paragraph}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-12 flex w-full max-w-xl flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.expedition.emailPlaceholder}
              disabled={submitted}
              className="flex-1 border border-white/15 bg-white/5 px-5 py-4 text-sm tracking-wider text-white placeholder:text-white/40 focus:border-[var(--color-aurora-blue)] focus:bg-white/10 focus:outline-none disabled:opacity-50"
              style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
            />
            <button
              type="submit"
              disabled={submitted}
              className="group flex items-center justify-center gap-3 border border-white bg-white px-7 py-4 text-xs uppercase tracking-[0.32em] text-[var(--color-aurora-dark)] transition hover:border-[var(--color-aurora-blue)] hover:bg-[var(--color-aurora-blue)] disabled:cursor-default disabled:opacity-60"
              style={{ fontFamily: 'var(--font-family-aurora-sans)', fontWeight: 600 }}
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

          <AuroraMetaLabel tone="inverse" className="mt-8">
            {t.expedition.meta}
          </AuroraMetaLabel>
        </motion.div>
      </div>
    </section>
  );
}
