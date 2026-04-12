import { z } from 'zod';
import { publicProcedure, router } from '../trpc.js';

export const placesRouter = router({
  list: publicProcedure
    .input(z.object({ regionId: z.string().uuid().optional() }).optional())
    .query(async ({ input: _input }) => {
      // TODO: query packages/db
      return [];
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input: _input }) => {
      return null;
    }),

  nearby: publicProcedure
    .input(
      z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
        radiusMeters: z.number().int().positive().default(5000),
      }),
    )
    .query(async ({ input: _input }) => {
      // TODO: PostGIS ST_DWithin query
      return [];
    }),
});
