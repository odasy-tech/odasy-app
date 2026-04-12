import { index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const xpEvents = pgTable(
  'xp_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    eventType: text('event_type', {
      enum: ['checkin', 'mission_completed', 'badge_earned'],
    }).notNull(),
    xpAmount: integer('xp_amount').notNull(),
    checkinId: uuid('checkin_id'),
    missionId: uuid('mission_id'),
    badgeId: uuid('badge_id'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('idx_xp_events_user').on(table.userId),
    createdIdx: index('idx_xp_events_created').on(table.createdAt),
  }),
);

export type XpEventRow = typeof xpEvents.$inferSelect;
