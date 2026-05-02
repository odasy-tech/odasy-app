import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Appearance } from 'react-native';

import { darkTokens, lightTokens, type Tokens } from '../../theme/tokens';

export type DSTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: DSTheme;
  tokens: Tokens;
  setTheme: (next: DSTheme) => void;
  toggle: () => void;
}

const Context = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme. Default: follows the system appearance. */
  defaultTheme?: DSTheme | 'system';
}

/**
 * React Native theme provider. Reads the current OS appearance and
 * mirrors it onto the DS theme. Components consume tokens via
 * `useTheme()` instead of hard-coding palette references.
 */
export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const initial: DSTheme =
    defaultTheme === 'system'
      ? Appearance.getColorScheme() === 'dark'
        ? 'dark'
        : 'light'
      : defaultTheme;

  const [theme, setThemeState] = useState<DSTheme>(initial);

  useEffect(() => {
    if (defaultTheme !== 'system') return;
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme === 'dark' ? 'dark' : 'light');
    });
    return () => sub.remove();
  }, [defaultTheme]);

  const setTheme = useCallback((next: DSTheme) => setThemeState(next), []);
  const toggle = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      tokens: theme === 'dark' ? darkTokens : lightTokens,
      setTheme,
      toggle,
    }),
    [theme, setTheme, toggle],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useTheme (native) must be used inside <ThemeProvider>');
  }
  return ctx;
}
