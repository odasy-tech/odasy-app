import { protectedProcedure, router } from '../trpc.js';

export const passportRouter = router({
  get: protectedProcedure.query(async ({ ctx: _ctx }) => {
    // TODO: aggregate xp, level, stamps, badges, recent activity
    return {
      xp: 0,
      level: 1,
      stampsCount: 0,
      badgesCount: 0,
      recentCheckins: [],
    };
  }),
});
