import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { regions } from './regions.js';

/**
 * `users.id` is a TEXT column because it mirrors the Clerk user ID
 * (e.g. `user_2abc...`), populated by a Clerk webhook on `user.created`.
 */
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  displayName: text('display_name').notNull(),
  alias: text('alias'),
  avatarUrl: text('avatar_url'),
  homeRegionId: uuid('home_region_id').references(() => regions.id),
  xp: integer('xp').notNull().default(0),
  level: integer('level').notNull().default(1),
  onboardingCompleted: boolean('onboarding_completed').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;
