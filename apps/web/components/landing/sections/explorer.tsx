'use client';

import { MetaLabel } from '@odasy/ui/web';
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
import { type ReactNode, useRef } from 'react';
import { useLocale } from '@/lib/i18n/locale-context';

/** Roman numerals as ledger marginalia. */
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const;

/**
 * Per-archetype glyph + accent flag. Five wear the brand violet; the two
 * nature-leaning archetypes (Contemplador, Consciente) wear moss to
 * communicate the palette's secondary axis.
 */
const ARCHETYPE_VISUALS: Record<
  string,
  { glyph: ReactNode; natural?: boolean }
> = {
  navigator:    { glyph: <CompassIcon size={14} strokeWidth={1.6} /> },
  contemplator: { glyph: <Leaf size={14} strokeWidth={1.6} />, natural: true },
  adventurer:   { glyph: <Mountain size={14} strokeWidth={1.6} /> },
  sibarite:     { glyph: <Utensils size={14} strokeWidth={1.6} /> },
  cultural:     { glyph: <Theater size={14} strokeWidth={1.6} /> },
  chronicler:   { glyph: <Aperture size={14} strokeWidth={1.6} /> },
  conscious:    { glyph: <Sprout size={14} strokeWidth={1.6} />, natural: true },
};

export function Explorer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const { t } = useLocale();

  // Map archetype name -> percentage so the canonical typology order
  // can carry the user's affinity inline. Missing entries render as em-dash.
  const pctByName = new Map<string, number>(
    t.explorer.profileMix.map((s) => [s.archetype, s.pct]),
  );
  const primaryName = t.explorer.profileMix[0]?.archetype;

  return (
    <section
      id="chapter-explorer"
      ref={ref}
      className="relative mx-auto max-w-4xl px-6 py-32 sm:px-12 sm:py-44"
    >
      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85 }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <MetaLabel tone="accent" className="mb-7">
          {t.explorer.meta}
        </MetaLabel>
        <h2
          className="max-w-3xl leading-[1.05] tracking-[-0.025em] text-[var(--color-ink-primary)] sm:leading-[1.04]"
          style={{
            fontSize: 'var(--text-display)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {t.explorer.heading}
        </h2>
        <p
          className="mt-6 max-w-2xl text-base leading-[1.7] text-[var(--color-ink-secondary)] sm:text-lg"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {t.explorer.paragraph}
        </p>
      </motion.div>

      {/* Ledger header — caps eyebrow + hairline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-end justify-between border-t border-[var(--color-border-default)] pt-4 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-tertiary)]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <span>Arquetipo</span>
        <span>Afinidad</span>
      </motion.div>

      {/* Ledger — 7 rows */}
      <ol className="flex flex-col">
        {t.explorer.archetypes.map((a, idx) => {
          const visual = ARCHETYPE_VISUALS[a.id];
          if (!visual) return null;
          const pct = pctByName.get(a.name) ?? 0;
          const isPrimary = a.name === primaryName;
          const accent = visual.natural
            ? 'var(--color-nature-base)'
            : 'var(--color-accent-action)';

          return (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.28 + idx * 0.06,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="group relative flex flex-col gap-3 border-b border-[var(--color-border-subtle)] py-5 sm:grid sm:grid-cols-[32px_20px_minmax(150px,1.2fr)_minmax(180px,1.6fr)_140px] sm:items-center sm:gap-x-5 sm:py-6"
            >
              {/* Primary indicator — left-edge accent rule */}
              {isPrimary && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-3 top-1/2 hidden h-8 w-px -translate-y-1/2 sm:block sm:-left-4 lg:-left-6"
                  style={{ backgroundColor: accent }}
                />
              )}

              {/* Mobile cluster: roman + glyph + name on a single row */}
              <div className="flex items-center gap-3 sm:hidden">
                <span
                  className="w-[28px] text-[13px] tabular-nums tracking-[0.04em] text-[var(--color-ink-tertiary)]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                  }}
                >
                  {ROMAN[idx]}
                </span>
                <span
                  className="flex h-4 w-4 items-center justify-center"
                  style={{
                    color: isPrimary ? accent : 'var(--color-ink-secondary)',
                  }}
                >
                  {visual.glyph}
                </span>
                <span
                  className="flex items-baseline gap-2 text-[24px] leading-none tracking-[-0.01em]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    color: isPrimary ? accent : 'var(--color-ink-primary)',
                    fontWeight: isPrimary ? 600 : 400,
                  }}
                >
                  {a.name}
                  {isPrimary && (
                    <span
                      aria-hidden
                      className="text-[12px] not-italic"
                      style={{ color: accent }}
                    >
                      ✦
                    </span>
                  )}
                </span>
              </div>

              {/* Desktop: roman numeral */}
              <span
                className="hidden text-[14px] tabular-nums tracking-[0.04em] text-[var(--color-ink-tertiary)] sm:inline"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                }}
              >
                {ROMAN[idx]}
              </span>

              {/* Desktop: glyph */}
              <span
                className="hidden h-4 w-4 items-center justify-center sm:flex"
                style={{
                  color: isPrimary ? accent : 'var(--color-ink-secondary)',
                }}
              >
                {visual.glyph}
              </span>

              {/* Desktop: name */}
              <span
                className="hidden items-baseline gap-2 leading-none sm:flex"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span
                  className="text-[26px] tracking-[-0.01em] sm:text-[28px] lg:text-[32px]"
                  style={{
                    fontStyle: 'italic',
                    color: isPrimary ? accent : 'var(--color-ink-primary)',
                    fontWeight: isPrimary ? 600 : 400,
                  }}
                >
                  {a.name}
                </span>
                {isPrimary && (
                  <span
                    aria-hidden
                    className="text-[12px]"
                    style={{ color: accent }}
                  >
                    ✦
                  </span>
                )}
              </span>

              {/* Description */}
              <p
                className="text-[13px] leading-[1.55] text-[var(--color-ink-secondary)] sm:pr-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {a.copy}
              </p>

              {/* Affinity — bar + percentage */}
              <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                <span
                  aria-hidden
                  className="block h-[2px] flex-1 overflow-hidden bg-[var(--color-border-default)] sm:h-[3px] sm:w-full sm:flex-initial"
                >
                  {pct > 0 && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{
                        duration: 0.95,
                        delay: 0.55 + idx * 0.06,
                        ease: [0.22, 0.61, 0.36, 1],
                      }}
                      className="block h-full"
                      style={{ backgroundColor: accent }}
                    />
                  )}
                </span>
                <span
                  className="min-w-[42px] text-right text-[11px] uppercase tracking-[0.18em] tabular-nums"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color:
                      pct > 0
                        ? isPrimary
                          ? accent
                          : 'var(--color-ink-primary)'
                        : 'var(--color-ink-tertiary)',
                    fontWeight: isPrimary ? 700 : 500,
                  }}
                >
                  {pct > 0 ? `${pct}%` : '—'}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* Profile signature — name + dominant blend as a sentence */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="mt-10 flex flex-col gap-3 pt-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex flex-col gap-1.5">
          <MetaLabel tone="accent">{t.explorer.profileLabel}</MetaLabel>
          <span
            className="text-[18px] leading-tight tracking-[-0.005em] text-[var(--color-ink-primary)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
            }}
          >
            Valentina Ríos
          </span>
        </div>

        <p
          className="text-[12px] uppercase leading-[1.6] tracking-[0.22em] text-[var(--color-ink-secondary)] sm:max-w-[420px] sm:text-right"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {t.explorer.profileMix
            .map((m, i) => (i === 0 ? `✦ ${m.archetype} ${m.pct}%` : `${m.archetype} ${m.pct}%`))
            .join(' · ')}
        </p>
      </motion.div>
    </section>
  );
}
