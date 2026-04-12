/**
 * Next.js Clerk wrappers for `apps/admin` and `apps/web`.
 *
 * Re-exports the most common symbols so app code can import from
 * `@odasy/auth/nextjs` instead of reaching into Clerk's SDK directly.
 */

export { ClerkProvider, SignIn, SignUp, UserButton } from '@clerk/nextjs';
export { auth, currentUser, clerkMiddleware } from '@clerk/nextjs/server';
