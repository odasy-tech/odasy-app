import { z } from 'zod';

/**
 * Runtime-validated environment variables. Fails fast at app startup if
 * anything required is missing, rather than blowing up in a random screen.
 *
 * All public env vars in Expo must be prefixed `EXPO_PUBLIC_`.
 */
const envSchema = z.object({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  EXPO_PUBLIC_MAPBOX_TOKEN: z.string().min(1),
  EXPO_PUBLIC_POSTHOG_KEY: z.string().optional(),
  EXPO_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  EXPO_PUBLIC_TRPC_URL: z.string().url(),
});

export const env = envSchema.parse({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  EXPO_PUBLIC_MAPBOX_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_TOKEN,
  EXPO_PUBLIC_POSTHOG_KEY: process.env.EXPO_PUBLIC_POSTHOG_KEY,
  EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  EXPO_PUBLIC_TRPC_URL: process.env.EXPO_PUBLIC_TRPC_URL,
});
