import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const regions = pgTable('regions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  code: text('code').notNull().unique(),
  country: text('country').notNull().default('CO'),
  active: boolean('active').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type RegionRow = typeof regions.$inferSelect;
export type NewRegionRow = typeof regions.$inferInsert;
