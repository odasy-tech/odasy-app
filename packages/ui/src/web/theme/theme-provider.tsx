'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type DSTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: DSTheme;
  setTheme: (next: DSTheme) => void;
  toggle: () => void;
}

const STORAGE_KEY = 'odasy.ds.theme';
const DARK_CLASS = 'ds-dark';

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme on first paint (before localStorage hydrates). */
  defaultTheme?: DSTheme;
  /**
   * Selector for the element that receives the `ds-dark` class.
   * Defaults to `document.documentElement` (the `<html>` tag) so the
   * dark scope covers everything including `<body>`.
   */
  rootSelector?: string;
}

/**
 * Wraps the app and exposes `useTheme()` to children. Persists the
 * user's choice in localStorage and writes a `ds-dark` class to the
 * configured root element so token overrides cascade everywhere.
 *
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 *
 *   const { theme, toggle } = useTheme();
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  rootSelector,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<DSTheme>(defaultTheme);
  const [hydrated, setHydrated] = useState(false);

  // First-mount hydration: load stored preference if any.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
      }
    } catch {
      /* localStorage may be unavailable (private browsing) */
    }
    setHydrated(true);
  }, []);

  // Reflect the theme as a class on the root element.
  useEffect(() => {
    if (!hydrated) return;
    const root = rootSelector
      ? document.querySelector<HTMLElement>(rootSelector)
      : document.documentElement;
    if (!root) return;
    root.classList.toggle(DARK_CLASS, theme === 'dark');
  }, [theme, hydrated, rootSelector]);

  const setTheme = useCallback((next: DSTheme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}
