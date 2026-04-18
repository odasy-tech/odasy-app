import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const badges = pgTable('badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  iconUrl: text('icon_url'),
  category: text('category', {
    enum: ['milestone', 'mission', 'regional', 'special'],
  }).notNull(),
  ruleType: text('rule_type').notNull(),
  ruleConfig: jsonb('rule_config').notNull(),
  active: boolean('active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const userBadges = pgTable(
  'user_badges',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    badgeId: uuid('badge_id')
      .notNull()
      .references(() => badges.id, { onDelete: 'cascade' }),
    earnedAt: timestamp('earned_at', { withTimezone: true }).notNull().defaultNow(),
    context: jsonb('context'),
  },
  (table) => ({
    userIdx: index('idx_user_badges_user').on(table.userId),
    uniquePerUser: unique('uq_user_badges').on(table.userId, table.badgeId),
  }),
);

export type BadgeRow = typeof badges.$inferSelect;
export type UserBadgeRow = typeof userBadges.$inferSelect;
