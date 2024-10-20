import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  json,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'draft', 'archived']);

// Table declaration for the accelerators
export const accelerators = pgTable('accelerators', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdDate: timestamp('created_date').notNull(),
  createdBy: text('created_by').notNull(),
  lastUpdatedBy: text('last_updated_by'),
  lastUpdatedDate: timestamp('last_updated_date'),
  offerings: json('offerings').notNull(),
  status: statusEnum('status').notNull(),
  effort: integer('effort').notNull(),
  timesUsed: integer('times_used').notNull(),
  storyBranding: json('story_branding'),
  marketing: json('marketing'),
  links: json('links')
});

export type SelectAccelerator = typeof accelerators.$inferSelect;
export const insertAcceleratorSchema = createInsertSchema(accelerators);


export async function acceleratorGraphView() {
  // get only the fields required for graph view
  let acceleratorGraphView = await db.select({
    id: accelerators.id,
    name: accelerators.name,
    offerings: accelerators.offerings
  }).from(accelerators);

  // return the acceleratorGraphView
  return acceleratorGraphView;
}

// Get an accelerator by id
export async function getAcceleratorById(id: number) {
  let accelerator = await db.select().from(accelerators).where(eq(accelerators.id, id));
  return accelerator[0];
}

// Create a search function for the accelerators and 
export async function searchAccelerators(
  search: string,
  offset: number
): Promise<{
  accelerators: SelectAccelerator[];
  newOffset: number;
  totalAccelerators: number;
}> {
  // Always search the full table, not per page
  if (search) {
    let totalAccelerators = await db
      .select({ count: count() })
      .from(accelerators)
      .where(ilike(accelerators.name, `%${search}%`))
    let moreAccelerators = await db.select()
      .from(accelerators)
      .where(ilike(accelerators.name, `%${search}%`))
      .limit(5)
      .offset(offset);

    return {
      accelerators: moreAccelerators,
      newOffset: offset,
      totalAccelerators: totalAccelerators[0].count
    };
  }

  let totalAccelerators = await db.select({ count: count() }).from(accelerators);
  let moreAccelerators = await db.select().from(accelerators).limit(5).offset(offset);

  return {
    accelerators: moreAccelerators,
    newOffset: offset,
    totalAccelerators: totalAccelerators[0].count
  };
}

export async function deleteAcceleratorById(id: number) {
  await db.delete(accelerators).where(eq(accelerators.id, id));
}