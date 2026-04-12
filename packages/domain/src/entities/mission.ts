import { z } from 'zod';
import { CategoryId } from './category.js';
import { Difficulty } from './place.js';
import { PlaceId } from './place.js';
import { RegionId } from './region.js';

export const MissionId = z.string().uuid().brand<'MissionId'>();
export type MissionId = z.infer<typeof MissionId>;

export const MissionType = z.enum([
  'exploration',
  'coffee',
  'nature',
  'towns',
  'gastronomy',
]);
export type MissionType = z.infer<typeof MissionType>;

export const MissionStatus = z.enum(['available', 'in_progress', 'completed']);
export type MissionStatus = z.infer<typeof MissionStatus>;

export const Mission = z.object({
  id: MissionId,
  title: z.string().min(1).max(120),
  description: z.string().nullable(),
  categoryId: CategoryId.nullable(),
  regionId: RegionId,
  type: MissionType,
  difficulty: Difficulty,
  xpReward: z.number().int().positive(),
  badgeId: z.string().uuid().nullable(),
  imageUrl: z.string().url().nullable(),
  estimatedTime: z.string().nullable(),
  active: z.boolean(),
  featured: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  tags: z.array(z.string()),
  placeIds: z.array(PlaceId).min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Mission = z.infer<typeof Mission>;

export const UserMissionProgress = z.object({
  userId: z.string(),
  missionId: MissionId,
  status: MissionStatus,
  placesCompleted: z.number().int().nonnegative(),
  placesTotal: z.number().int().positive(),
  progressPercent: z.number().min(0).max(100),
  startedAt: z.date().nullable(),
  completedAt: z.date().nullable(),
});
export type UserMissionProgress = z.infer<typeof UserMissionProgress>;
