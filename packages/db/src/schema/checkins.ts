import {
  boolean,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { missions } from './missions';
import { places } from './places';
import { users } from './users';

export const checkins = pgTable(
  'checkins',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    placeId: uuid('place_id')
      .notNull()
      .references(() => places.id, { onDelete: 'cascade' }),
    missionId: uuid('mission_id').references(() => missions.id),
    userLatitude: numeric('user_latitude', { precision: 10, scale: 8 }).notNull(),
    userLongitude: numeric('user_longitude', { precision: 11, scale: 8 }).notNull(),
    distanceMeters: integer('distance_meters'),
    photoUrl: text('photo_url'),
    note: text('note'),
    validated: boolean('validated').notNull().default(true),
    validationMethod: text('validation_method').notNull().default('gps'),
    xpEarned: integer('xp_earned').notNull().default(10),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('idx_checkins_user').on(table.userId),
    placeIdx: index('idx_checkins_place').on(table.placeId),
    createdIdx: index('idx_checkins_created').on(table.createdAt),
  }),
);

export type CheckinRow = typeof checkins.$inferSelect;
export type NewCheckinRow = typeof checkins.$inferInsert;
