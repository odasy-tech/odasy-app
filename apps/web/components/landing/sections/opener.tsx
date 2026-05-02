'use client';

import { Compass, CompassBackdrop, Coordinates, MetaLabel, ThemeToggle, TopoBg } from '@odasy/ui/web';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useLocale } from '@/lib/i18n/locale-context';

export function Opener() {
  const { t } = useLocale();

  return (
    <section
      id="chapter-opener"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <CompassBackdrop />
      <TopoBg />

      <header className="relative z-10 flex items-start justify-between gap-4 px-6 pt-7 sm:px-12 sm:pt-9">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col gap-1.5"
        >
          <MetaLabel tone="ink">{t.opener.classification}</MetaLabel>
          <Coordinates />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex items-center gap-5"
        >
          <ThemeToggle />
          <Compass size={52} />
        </motion.div>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 sm:px-12">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.16, delayChildren: 0.6 } },
          }}
          className="flex w-full max-w-6xl flex-col items-center text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            <MetaLabel tone="accent">{t.opener.subhead}</MetaLabel>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 leading-[0.86] tracking-[-0.045em] text-[var(--color-ink-primary)]"
            style={{
              fontSize: 'clamp(4.5rem, 18vw, 15rem)',
              fontFamily: 'var(--font-family-display)',
            }}
          >
            <span className="relative inline-block">
              Odasy
              <span
                aria-hidden
                className="absolute -right-3 top-3 text-[0.18em] tracking-[0.4em] text-[var(--color-accent-action)]"
                style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
              >
                01
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-12 max-w-2xl text-lg leading-[1.55] text-[var(--color-ink-secondary)] sm:text-2xl"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            {t.opener.subtitlePre}
            <span
              className="text-[var(--color-accent-action)]"
              style={{ fontStyle: 'italic' }}
            >
              {t.opener.subtitleAccent}
            </span>
            {t.opener.subtitlePost}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:gap-3"
          >
            <a
              href="#beta"
              className="group inline-flex items-center gap-3 bg-[var(--color-accent-action)] px-7 py-3.5 text-[11px] uppercase tracking-[0.32em] text-white transition hover:bg-[var(--color-accent-deep)]"
              style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
            >
              <span>{t.opener.cta}</span>
              <span aria-hidden className="block h-[1px] w-6 bg-white/70 transition-all group-hover:w-10" />
            </a>
            <a
              href="#premise"
              className="group inline-flex items-center gap-3 border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-6 py-3.5 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] transition hover:border-[var(--color-accent-action)] hover:text-[var(--color-accent-action)]"
              style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
            >
              <ArrowDown size={14} strokeWidth={1.5} className="transition group-hover:translate-y-0.5" />
              <span>{t.premise.chapter}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between px-6 pb-7 sm:px-12 sm:pb-9"
      >
        <MetaLabel>{t.opener.footerLeft}</MetaLabel>
        <MetaLabel tone="accent">{t.opener.footerRight}</MetaLabel>
      </motion.footer>
    </section>
  );
}
