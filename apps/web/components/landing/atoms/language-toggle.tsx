'use client';

import { useLocale } from '@/lib/i18n/locale-context';
import { LOCALES } from '@/lib/i18n/dictionaries';

/**
 * ES / EN toggle. Sits in the opener bar and follows the same mono caps
 * treatment as the other metadata — it reads as "language control" rather
 * than a generic dropdown.
 */
export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.toggle.aria}
      className="inline-flex items-center gap-px border border-ink-700 bg-ink-900/60 p-0.5 backdrop-blur"
    >
      {LOCALES.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            aria-pressed={active}
            className={`min-w-[32px] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.28em] transition ${
              active
                ? 'bg-volt text-ink-950'
                : 'text-bone-mute hover:text-bone'
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
