import { z } from 'zod';
import { Coordinates } from './place';
import { MissionId } from './mission';
import { PlaceId } from './place';

export const CheckinId = z.string().uuid().brand<'CheckinId'>();
export type CheckinId = z.infer<typeof CheckinId>;

export const Checkin = z.object({
  id: CheckinId,
  userId: z.string(),
  placeId: PlaceId,
  missionId: MissionId.nullable(),
  userCoordinates: Coordinates,
  distanceMeters: z.number().nonnegative().nullable(),
  photoUrl: z.string().url().nullable(),
  note: z.string().max(500).nullable(),
  validated: z.boolean(),
  validationMethod: z.enum(['gps', 'manual', 'qr']),
  xpEarned: z.number().int().nonnegative(),
  createdAt: z.date(),
});

export type Checkin = z.infer<typeof Checkin>;

export const CheckinInput = z.object({
  placeId: PlaceId,
  missionId: MissionId.nullable().optional(),
  coordinates: Coordinates,
  photoUrl: z.string().url().optional(),
  note: z.string().max(500).optional(),
});
export type CheckinInput = z.infer<typeof CheckinInput>;
