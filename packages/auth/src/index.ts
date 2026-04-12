/**
 * Shared authentication helpers. Platform-specific wrappers live in
 * `./clerk-expo.ts` (mobile) and `./clerk-nextjs.ts` (web). Import from
 * the subpath exports to avoid pulling the wrong SDK into the wrong
 * platform's bundle.
 */

export interface AuthUser {
  id: string;
  email: string | null;
}

export const CLERK_ENV = {
  PUBLISHABLE_KEY_EXPO: 'EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY',
  PUBLISHABLE_KEY_NEXT: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  SECRET_KEY: 'CLERK_SECRET_KEY',
} as const;
