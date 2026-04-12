import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@odasy/api';
import { env } from './env.js';

/** Typed tRPC React hooks for the Odasy API. */
export const trpc = createTRPCReact<AppRouter>();

export function createTrpcClient(getAuthToken: () => Promise<string | null>) {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: env.EXPO_PUBLIC_TRPC_URL,
        transformer: superjson,
        async headers() {
          const token = await getAuthToken();
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
      }),
    ],
  });
}
