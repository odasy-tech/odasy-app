import { z } from 'zod';
import { MissionType } from '@odasy/domain';
import { publicProcedure, protectedProcedure, router } from '../trpc';

export const missionsRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          type: MissionType.optional(),
          regionId: z.string().uuid().optional(),
        })
        .optional(),
    )
    .query(async ({ input: _input }) => {
      // TODO: query packages/db
      return [];
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input: _input }) => {
      // TODO: query packages/db
      return null;
    }),

  start: protectedProcedure
    .input(z.object({ missionId: z.string().uuid() }))
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: insert into user_missions
      return { ok: true };
    }),
});
