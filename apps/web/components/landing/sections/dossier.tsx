'use client';

import { MetaLabel } from '../atoms/meta-label';
import { useLocale } from '@/lib/i18n/locale-context';

/**
 * Footer — rendered as the dossier back-cover, not a generic link farm.
 */
export function Dossier() {
  const { t } = useLocale();

  return (
    <footer className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
      <div className="border-t border-ink-700 pt-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {t.dossier.blocks.map((b) => (
            <div key={b.label} className="flex flex-col gap-2">
              <MetaLabel>{b.label}</MetaLabel>
              <div className="font-mono text-xs tracking-wider text-bone">{b.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div
            className="font-[family-name:var(--font-display)] text-4xl text-bone"
            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 48' }}
          >
            odasy
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
              {t.dossier.links.map((l) => (
                <a key={l.label} href={l.href} className="transition hover:text-volt">
                  {l.label}
                </a>
              ))}
            </div>
            <MetaLabel>{t.dossier.copyright}</MetaLabel>
          </div>
        </div>
      </div>
    </footer>
  );
}
