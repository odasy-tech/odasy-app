/**
 * Expo / React Native Clerk wrappers.
 *
 * This file is intentionally thin — it just re-exports what `apps/mobile`
 * needs from `@clerk/clerk-expo` so we can swap providers later without
 * touching every screen. The actual provider setup (ClerkProvider with
 * the SecureStore token cache) lives in `apps/mobile/src/providers`.
 */

export { ClerkProvider, useAuth, useUser, useSignIn, useSignUp } from '@clerk/clerk-expo';
export type { UserResource } from '@clerk/types';
