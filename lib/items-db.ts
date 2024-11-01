import 'server-only';

import {
  pgTable,
  text,
  integer,
  timestamp,
  json,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { db, statusEnum, typeEnum } from './db';

// Table declaration for the items
export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: typeEnum('type').notNull(),
  description: text('description').notNull(),
  createdDate: timestamp('created_date').notNull(),
  createdBy: text('created_by').notNull(),
  lastUpdatedBy: text('last_updated_by'),
  lastUpdatedDate: timestamp('last_updated_date'),
  linkedService: text('linked_service'),
  linkedAccelerators: text('linked_accelerators').array(),
  status: statusEnum('status').notNull(),
  effort: integer('effort'),
  timesUsed: integer('times_used'),
  storyBranding: json('story_branding').notNull(),
  links: json('links').notNull()
});

export type SelectItem = typeof items.$inferSelect;

type NewItem = typeof items.$inferInsert;

export async function addItem(accelerator: NewItem) {
  try {
    console.log("accelerator data in db: " + JSON.stringify(accelerator, null, 2));
    let newItem = await db.insert(items).values(accelerator);
    return newItem;
  } catch (error) {
    console.error("Error inserting accelerator:", error);
    throw error; // Re-throw the error after logging it
  }
}

// Get an accelerator by id
export async function getItemById(id: number) {
  let accelerator = await db.select().from(items).where(eq(items.id, id));
  return accelerator[0];
}

// Update an existing accelerator
export async function updateItem(accelerator: SelectItem) {
  let updatedItem = await db.update(items).set(accelerator).where(eq(items.id, accelerator.id));
  return updatedItem;
}

export async function deleteItemById(id: number) {
  await db.delete(items).where(eq(items.id, id));
}