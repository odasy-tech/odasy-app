'use client';

import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Compass } from '../atoms/compass';
import { LanguageToggle } from '../atoms/language-toggle';
import { LiveCoordinates } from '../atoms/live-coordinates';
import { MetaLabel } from '../atoms/meta-label';
import { TopographicBg } from '../atoms/topographic-bg';
import { useLocale } from '@/lib/i18n/locale-context';

export function Opener() {
  const { t } = useLocale();

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <TopographicBg />

      {/* Top bar: classification + coordinates + compass + lang toggle */}
      <header className="relative z-10 flex items-start justify-between gap-4 px-6 pt-6 sm:px-10 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-1"
        >
          <MetaLabel>{t.opener.classification}</MetaLabel>
          <LiveCoordinates />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <LanguageToggle />
          <Compass size={52} />
        </motion.div>
      </header>

      {/* Centre: oversized title */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.6 } },
          }}
          className="flex w-full max-w-6xl flex-col items-center text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <MetaLabel tone="volt">{t.opener.subhead}</MetaLabel>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-[family-name:var(--font-display)] font-black leading-[0.82] tracking-[-0.05em] text-bone"
            style={{
              fontSize: 'clamp(4.5rem, 18vw, 15rem)',
              fontVariationSettings: '"SOFT" 100, "WONK" 0, "opsz" 144',
            }}
          >
            ODASY
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-10 max-w-2xl font-[family-name:var(--font-display)] text-xl italic text-bone-mute sm:text-2xl"
            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}
          >
            {t.opener.subtitlePre}
            <span className="text-volt not-italic font-medium">
              {t.opener.subtitleAccent}
            </span>
            {t.opener.subtitlePost}
          </motion.p>

          <motion.a
            href="#premise"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="group mt-16 inline-flex items-center gap-3 border border-ink-700 bg-ink-900/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute backdrop-blur transition hover:border-volt hover:text-volt"
          >
            <span>{t.opener.cta}</span>
            <ArrowDown
              size={14}
              strokeWidth={1.5}
              className="transition group-hover:translate-y-0.5"
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between px-6 pb-6 sm:px-10 sm:pb-8"
      >
        <MetaLabel>{t.opener.footerLeft}</MetaLabel>
        <MetaLabel>{t.opener.footerRight}</MetaLabel>
      </motion.footer>
    </section>
  );
}
