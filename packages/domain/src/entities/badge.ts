import { z } from 'zod';

export const BadgeId = z.string().uuid().brand<'BadgeId'>();
export type BadgeId = z.infer<typeof BadgeId>;

export const BadgeCategory = z.enum([
  'milestone',
  'mission',
  'regional',
  'special',
]);
export type BadgeCategory = z.infer<typeof BadgeCategory>;

export const BadgeRule = z.discriminatedUnion('type', [
  z.object({ type: z.literal('checkin_count'), count: z.number().int().positive() }),
  z.object({ type: z.literal('mission_count'), count: z.number().int().positive() }),
  z.object({
    type: z.literal('mission_type_completed'),
    missionType: z.string(),
    count: z.number().int().positive(),
  }),
  z.object({ type: z.literal('specific_mission'), missionId: z.string().uuid() }),
]);
export type BadgeRule = z.infer<typeof BadgeRule>;

export const Badge = z.object({
  id: BadgeId,
  name: z.string().min(1),
  description: z.string().nullable(),
  iconUrl: z.string().url().nullable(),
  category: BadgeCategory,
  rule: BadgeRule,
  active: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  createdAt: z.date(),
});

export type Badge = z.infer<typeof Badge>;
