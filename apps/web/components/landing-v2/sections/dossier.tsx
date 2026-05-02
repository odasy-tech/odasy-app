'use client';

import { AuroraMetaLabel } from '../atoms/aurora-meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

/**
 * Footer rendered as the dossier back-cover. Classification grid, wordmark,
 * link list, copyright — all on hairline rules.
 */
export function DossierV2() {
  const { t } = useLocale();

  return (
    <footer className="mx-auto max-w-6xl px-6 py-16 sm:px-12 sm:py-24">
      <div className="border-t border-[var(--color-rule)] pt-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {t.dossier.blocks.map((b) => (
            <div key={b.label} className="flex flex-col gap-2">
              <AuroraMetaLabel>{b.label}</AuroraMetaLabel>
              <div
                className="text-[12px] tracking-[0.06em] text-[var(--color-aurora-ink)]"
                style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
              >
                {b.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div
            className="leading-none tracking-[-0.02em] text-[var(--color-aurora-ink)]"
            style={{
              fontFamily: 'var(--font-family-aurora-display)',
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
                  className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-aurora-ink-mute)] transition hover:text-[var(--color-aurora-deep)]"
                  style={{ fontFamily: 'var(--font-family-aurora-sans)' }}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <AuroraMetaLabel>{t.dossier.copyright}</AuroraMetaLabel>
          </div>
        </div>
      </div>
    </footer>
  );
}
