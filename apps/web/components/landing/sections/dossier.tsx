'use client';

import { MetaLabel } from '@odasy/ui/web';
import { useLocale } from '@/lib/i18n/locale-context';

/**
 * Footer rendered as the dossier back-cover. Classification grid, wordmark,
 * link list, copyright — all on hairline rules.
 */
export function Dossier() {
  const { t } = useLocale();

  return (
    <footer className="mx-auto max-w-6xl px-6 py-16 sm:px-12 sm:py-24">
      <div className="border-t border-[var(--color-border-default)] pt-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {t.dossier.blocks.map((b) => (
            <div key={b.label} className="flex flex-col gap-2">
              <MetaLabel>{b.label}</MetaLabel>
              <div
                className="text-[12px] tracking-[0.06em] text-[var(--color-ink-primary)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {b.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div
            className="leading-none tracking-[-0.02em] text-[var(--color-ink-primary)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.6rem',
            }}
          >
            Odasy.
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {t.dossier.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] transition hover:text-[var(--color-accent-action)]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <MetaLabel>{t.dossier.copyright}</MetaLabel>
          </div>
        </div>

        {/* Community guiño — pillar 5 hint */}
        <div className="mt-10 flex items-center justify-between border-t border-[var(--color-border-default)] pt-6">
          <span
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-nature-base)]"
            />
            {t.dossier.communityHint}
          </span>
          <span
            className="text-[10px] tracking-[0.32em] text-[var(--color-ink-tertiary)]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            04°32′ N · 75°40′ W
          </span>
        </div>
      </div>
    </footer>
  );
}
