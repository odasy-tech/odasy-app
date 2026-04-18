import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { badges } from './badges';
import { categories } from './categories';
import { places } from './places';
import { regions } from './regions';
import { users } from './users';

export const missions = pgTable(
  'missions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description'),
    categoryId: uuid('category_id').references(() => categories.id),
    regionId: uuid('region_id')
      .notNull()
      .references(() => regions.id),
    type: text('type', {
      enum: ['exploration', 'coffee', 'nature', 'towns', 'gastronomy'],
    }).notNull(),
    difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard'] })
      .notNull()
      .default('easy'),
    xpReward: integer('xp_reward').notNull().default(50),
    badgeId: uuid('badge_id').references(() => badges.id),
    imageUrl: text('image_url'),
    estimatedTime: text('estimated_time'),
    active: boolean('active').notNull().default(true),
    featured: boolean('featured').notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    tags: text('tags').array(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    regionIdx: index('idx_missions_region').on(table.regionId),
    typeIdx: index('idx_missions_type').on(table.type),
  }),
);

export const missionPlaces = pgTable(
  'mission_places',
  {
    missionId: uuid('mission_id')
      .notNull()
      .references(() => missions.id, { onDelete: 'cascade' }),
    placeId: uuid('place_id')
      .notNull()
      .references(() => places.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0),
    required: boolean('required').notNull().default(true),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.missionId, table.placeId] }),
  }),
);

export const userMissions = pgTable(
  'user_missions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    missionId: uuid('mission_id')
      .notNull()
      .references(() => missions.id, { onDelete: 'cascade' }),
    status: text('status', { enum: ['available', 'in_progress', 'completed'] })
      .notNull()
      .default('available'),
    placesCompleted: integer('places_completed').notNull().default(0),
    placesTotal: integer('places_total').notNull(),
    startedAt: timestamp('started_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('idx_user_missions_user').on(table.userId),
    statusIdx: index('idx_user_missions_status').on(table.status),
  }),
);

export type MissionRow = typeof missions.$inferSelect;
export type NewMissionRow = typeof missions.$inferInsert;
