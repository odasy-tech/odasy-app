import { z } from 'zod';
import { CategoryId } from './category';
import { CheckinId } from './checkin';
import { PlaceId } from './place';

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
