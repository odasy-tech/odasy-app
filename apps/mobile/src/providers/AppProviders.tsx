import { useMemo, useState, type ReactNode } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '@odasy/ui';
import { env } from '@/lib/env';
import { queryClient } from '@/lib/query-client';
import { clerkTokenCache } from '@/lib/secure-store';
import { createTrpcClient, trpc } from '@/lib/trpc';

interface AppProvidersProps {
  children: ReactNode;
}

function TrpcProvider({ children }: { children: ReactNode }) {
  const { getToken } = useAuth();

  const [client] = useState(() => createTrpcClient(() => getToken()));

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  const tamaguiTheme = useMemo(() => tamaguiConfig, []);

  return (
    <ClerkProvider
      publishableKey={env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={clerkTokenCache}
    >
      <TamaguiProvider config={tamaguiTheme} defaultTheme="light">
        <TrpcProvider>{children}</TrpcProvider>
      </TamaguiProvider>
    </ClerkProvider>
  );
}
