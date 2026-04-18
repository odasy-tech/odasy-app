import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
  /** Returns `null` if not signed in, or the current user if authenticated. */
  me: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  /** Marks the onboarding flow as completed for the current user. */
  completeOnboarding: protectedProcedure.mutation(async ({ ctx: _ctx }) => {
    // TODO: update users.onboarding_completed = true
    return { ok: true };
  }),
});
