'use client';

import { MetaLabel, useTheme } from '@odasy/ui/web';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { useLocale } from '@/lib/i18n/locale-context';

/**
 * Expedition CTA — the page's only saturated moment.
 *
 * In LIGHT theme: a deep violet band slammed into the paper. The contrast
 * makes the call-to-action unmistakable.
 *
 * In DARK theme: the band INVERTS to light paper — a "signature page"
 * sewn into a dark dossier. This preserves the contrast principle
 * (always the inverse of the surrounding surface) and creates a
 * cinematic moment of light when the rest of the page is dark.
 */
export function Expedition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocale();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  // Light theme: dark band, white type. Dark theme: light band, ink type.
  const isLightSignature = theme === 'dark';
  const sectionBg = isLightSignature ? '#F7F6FC' : 'var(--color-accent-deep)';
  const headlineColor = isLightSignature ? '#1A1830' : '#FFFFFF';
  const accentColor = isLightSignature ? 'var(--color-accent-action)' : 'var(--color-info-base)';
  const bodyColor = isLightSignature ? '#7B7699' : 'rgba(255,255,255,0.75)';
  const inputBorder = isLightSignature ? 'rgba(80,70,200,0.18)' : 'rgba(255,255,255,0.15)';
  const inputBg = isLightSignature ? '#FFFFFF' : 'rgba(255,255,255,0.05)';
  const inputText = isLightSignature ? '#1A1830' : '#FFFFFF';
  const inputPlaceholder = isLightSignature ? '#A8A4C0' : 'rgba(255,255,255,0.4)';
  const submitBg = isLightSignature ? 'var(--color-accent-action)' : '#FFFFFF';
  const submitText = isLightSignature ? '#FFFFFF' : 'var(--color-accent-deep)';
  const metaTone = isLightSignature ? 'mute' : 'inverse';

  return (
    <section id="chapter-expedition" ref={ref} className="relative overflow-hidden">
      <div
        className="relative px-6 py-32 sm:px-12 sm:py-44"
        style={{ backgroundColor: sectionBg }}
      >
        {/* Atmospheric overlays — same vocabulary in both themes, different alpha */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: isLightSignature
              ? 'radial-gradient(ellipse at 70% 30%, rgba(80, 70, 200, 0.06), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(139, 158, 255, 0.10), transparent 55%)'
              : 'radial-gradient(ellipse at 70% 30%, rgba(168, 178, 255, 0.18), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(107, 92, 231, 0.4), transparent 55%)',
          }}
        />

        {/* Stitched-in border (only in dark "signature page" mode) */}
        {isLightSignature && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 inset-y-12 border border-dashed sm:inset-x-12 sm:inset-y-16"
            style={{ borderColor: 'rgba(80,70,200,0.25)' }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <MetaLabel tone={metaTone} className="mb-8">
            {t.expedition.chapter}
          </MetaLabel>

          <h2
            className="max-w-3xl leading-[1.02] tracking-[-0.03em]"
            style={{
              fontSize: 'var(--text-display)',
              fontFamily: 'var(--font-display)',
              color: headlineColor,
            }}
          >
            <span>{t.expedition.headingPre}</span>
            <span style={{ fontStyle: 'italic', color: accentColor }}>
              {t.expedition.headingAccent}
            </span>
            <span>{t.expedition.headingPost}</span>
          </h2>

          <p
            className="mt-8 max-w-xl text-base leading-[1.7] sm:text-lg"
            style={{ fontFamily: 'var(--font-sans)', color: bodyColor }}
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
              className="flex-1 border px-5 py-4 text-sm tracking-wider focus:outline-none disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-sans)',
                borderColor: inputBorder,
                backgroundColor: inputBg,
                color: inputText,
                ['--placeholder-color' as string]: inputPlaceholder,
              }}
            />
            <button
              type="submit"
              disabled={submitted}
              className="group flex items-center justify-center gap-3 border px-7 py-4 text-xs uppercase tracking-[0.32em] transition disabled:cursor-default disabled:opacity-60"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                borderColor: submitBg,
                backgroundColor: submitBg,
                color: submitText,
              }}
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

          <MetaLabel tone={metaTone} className="mt-8">
            {t.expedition.meta}
          </MetaLabel>
        </motion.div>
      </div>
    </section>
  );
}
