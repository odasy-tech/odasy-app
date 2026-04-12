import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema/index.js';

export function createDb(connectionString: string) {
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

/**
 * Default singleton client. Reads DATABASE_URL from the environment.
 * Throws at first use if the env var is missing, not at import time,
 * so tests and tools that stub the DB don't need the env var set.
 */
let cached: ReturnType<typeof createDb> | null = null;
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop) {
    if (!cached) {
      const url = process.env.DATABASE_URL;
      if (!url) throw new Error('DATABASE_URL is not set');
      cached = createDb(url);
    }
    return Reflect.get(cached, prop);
  },
});
