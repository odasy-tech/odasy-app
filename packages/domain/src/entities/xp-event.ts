import { z } from 'zod';

export const XpEventType = z.enum([
  'checkin',
  'mission_completed',
  'badge_earned',
]);
export type XpEventType = z.infer<typeof XpEventType>;

export const XpEvent = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  eventType: XpEventType,
  xpAmount: z.number().int().positive(),
  checkinId: z.string().uuid().nullable(),
  missionId: z.string().uuid().nullable(),
  badgeId: z.string().uuid().nullable(),
  createdAt: z.date(),
});

export type XpEvent = z.infer<typeof XpEvent>;
