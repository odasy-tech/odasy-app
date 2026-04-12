import { z } from 'zod';

export const RegionId = z.string().uuid().brand<'RegionId'>();
export type RegionId = z.infer<typeof RegionId>;

export const Region = z.object({
  id: RegionId,
  name: z.string().min(1),
  code: z.string().min(1),
  country: z.string().length(2),
  active: z.boolean(),
  createdAt: z.date(),
});

export type Region = z.infer<typeof Region>;
