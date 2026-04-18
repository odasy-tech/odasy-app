import { TRPCError } from '@trpc/server';
import { CheckinInput } from '@odasy/domain';
import { protectedProcedure, router } from '../trpc';

export const checkinRouter = router({
  create: protectedProcedure
    .input(CheckinInput)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO:
      // 1. Load the place from packages/db.
      // 2. Call PostGIS ST_DWithin to validate the user is within the check-in radius.
      // 3. Insert a checkin row.
      // 4. Grant stamp, award XP, evaluate badges (packages/domain/rules).
      // 5. Optionally trigger packages/ai for next-action suggestion.
      // 6. Return the typed result.
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'checkin.create not implemented yet',
      });
    }),

  history: protectedProcedure.query(async ({ ctx: _ctx }) => {
    // TODO: return recent check-ins for the user
    return [];
  }),
});
