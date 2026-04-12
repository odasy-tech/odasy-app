import { index, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { categories } from './categories.js';
import { checkins } from './checkins.js';
import { places } from './places.js';
import { users } from './users.js';

export const stamps = pgTable(
  'stamps',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    placeId: uuid('place_id')
      .notNull()
      .references(() => places.id, { onDelete: 'cascade' }),
    checkinId: uuid('checkin_id')
      .notNull()
      .references(() => checkins.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    categoryId: uuid('category_id').references(() => categories.id),
    earnedAt: timestamp('earned_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('idx_stamps_user').on(table.userId),
    uniquePerPlace: unique('uq_stamps_user_place').on(table.userId, table.placeId),
  }),
);

export type StampRow = typeof stamps.$inferSelect;
