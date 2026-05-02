'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type AuroraTheme = 'light' | 'dark';

interface AuroraThemeValue {
  theme: AuroraTheme;
  setTheme: (next: AuroraTheme) => void;
  toggle: () => void;
}

const STORAGE_KEY = 'odasy.v2.theme';
const Context = createContext<AuroraThemeValue | null>(null);

/**
 * Theme provider scoped to the V2 landing only. Persists user choice in
 * localStorage. Defaults to `light`; first paint is always light to avoid
 * SSR/CSR hydration mismatches — the stored preference applies after mount.
 */
export function AuroraThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AuroraTheme>('light');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const setTheme = (next: AuroraTheme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Context.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </Context.Provider>
  );
}

export function useAuroraTheme(): AuroraThemeValue {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useAuroraTheme must be used inside <AuroraThemeProvider>');
  }
  return ctx;
}
