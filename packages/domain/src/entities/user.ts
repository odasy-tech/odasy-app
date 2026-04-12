import { z } from 'zod';

export const UserId = z.string().min(1).brand<'UserId'>();
export type UserId = z.infer<typeof UserId>;

export const User = z.object({
  id: UserId,
  email: z.string().email(),
  displayName: z.string().min(1).max(100),
  alias: z.string().max(50).nullable(),
  avatarUrl: z.string().url().nullable(),
  homeRegionId: z.string().uuid().nullable(),
  xp: z.number().int().nonnegative(),
  level: z.number().int().positive(),
  onboardingCompleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof User>;
