import { z } from 'zod';
import { CategoryId } from './category.js';
import { CheckinId } from './checkin.js';
import { PlaceId } from './place.js';

export const StampId = z.string().uuid().brand<'StampId'>();
export type StampId = z.infer<typeof StampId>;

export const Stamp = z.object({
  id: StampId,
  userId: z.string(),
  placeId: PlaceId,
  checkinId: CheckinId,
  name: z.string().min(1),
  imageUrl: z.string().url().nullable(),
  categoryId: CategoryId.nullable(),
  earnedAt: z.date(),
});

export type Stamp = z.infer<typeof Stamp>;
