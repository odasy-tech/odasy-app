import { sql } from 'drizzle-orm';
import {
  boolean,
  customType,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { categories } from './categories.js';
import { regions } from './regions.js';

/**
 * PostGIS geography(Point, 4326) column. Drizzle does not ship a geography
 * type so we declare it with `customType`. The value is populated by a
 * database trigger (see migrations) from the lat/lng columns.
 */
const geography = customType<{ data: string; driverData: string }>({
  dataType() {
    return 'geography(Point, 4326)';
  },
});

export const places = pgTable(
  'places',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    categoryId: uuid('category_id').references(() => categories.id),
    regionId: uuid('region_id')
      .notNull()
      .references(() => regions.id),
    subregion: text('subregion'),
    latitude: numeric('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: numeric('longitude', { precision: 11, scale: 8 }).notNull(),
    location: geography('location'),
    checkinRadiusMeters: integer('checkin_radius_meters').notNull().default(500),
    imageUrl: text('image_url'),
    images: text('images').array(),
    active: boolean('active').notNull().default(true),
    featured: boolean('featured').notNull().default(false),
    difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard'] }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    regionIdx: index('idx_places_region').on(table.regionId),
    categoryIdx: index('idx_places_category').on(table.categoryId),
    locationIdx: index('idx_places_location').using('gist', sql`location`),
  }),
);

export type PlaceRow = typeof places.$inferSelect;
export type NewPlaceRow = typeof places.$inferInsert;
