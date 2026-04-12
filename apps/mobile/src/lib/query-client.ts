import { QueryClient } from '@tanstack/react-query';

/**
 * Singleton React Query client. Defaults are tuned for a mobile app where
 * network calls are expensive and users frequently background the app.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
