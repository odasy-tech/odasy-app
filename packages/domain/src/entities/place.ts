import { z } from 'zod';
import { CategoryId } from './category';
import { RegionId } from './region';

export const PlaceId = z.string().uuid().brand<'PlaceId'>();
export type PlaceId = z.infer<typeof PlaceId>;

export const Coordinates = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
export type Coordinates = z.infer<typeof Coordinates>;

export const Difficulty = z.enum(['easy', 'medium', 'hard']);
export type Difficulty = z.infer<typeof Difficulty>;

export const Place = z.object({
  id: PlaceId,
  name: z.string().min(1).max(120),
  description: z.string().nullable(),
  categoryId: CategoryId.nullable(),
  regionId: RegionId,
  subregion: z.string().nullable(),
  coordinates: Coordinates,
  checkinRadiusMeters: z.number().int().positive(),
  imageUrl: z.string().url().nullable(),
  images: z.array(z.string().url()),
  active: z.boolean(),
  featured: z.boolean(),
  difficulty: Difficulty.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Place = z.infer<typeof Place>;
