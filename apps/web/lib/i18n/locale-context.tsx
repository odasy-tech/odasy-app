'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_LOCALE, dictionaries, type Dictionary, type Locale } from './dictionaries';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dictionary;
}

const STORAGE_KEY = 'odasy.locale';

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Provides the selected locale and the matching dictionary to the whole
 * tree. Default is Spanish; English is the only alternative (for now).
 * Preference is persisted in `localStorage` so it survives reloads.
 *
 * We intentionally render with `DEFAULT_LOCALE` on first paint to avoid
 * SSR/CSR hydration mismatches. The stored preference is applied after
 * mount — a one-frame flash that only affects users who switched to EN
 * previously; acceptable for a landing page.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && stored in dictionaries) {
        setLocaleState(stored as Locale);
      }
    } catch {
      /* localStorage unavailable (private browsing) — use default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return ctx;
}
