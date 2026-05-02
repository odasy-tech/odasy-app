import { useMemo, useState, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '@odasy/ui';
import { ThemeProvider as DSThemeProvider } from '@odasy/ui/native';
import { queryClient } from '@/lib/query-client';
import { createTrpcClient, trpc } from '@/lib/trpc';

// Clerk is intentionally disabled for Expo Go dev. `@clerk/clerk-expo` pulls in
// `expo-auth-session` → `expo-crypto` (AES), which is a native module NOT
// included in Expo Go on SDK 54. Re-enable when we switch to an EAS dev build.

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const tamaguiTheme = useMemo(() => tamaguiConfig, []);
  const [client] = useState(() => createTrpcClient(async () => null));

  return (
    <DSThemeProvider defaultTheme="dark">
      <TamaguiProvider config={tamaguiTheme} defaultTheme="dark_odasy">
        <trpc.Provider client={client} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
      </TamaguiProvider>
    </DSThemeProvider>
  );
}
