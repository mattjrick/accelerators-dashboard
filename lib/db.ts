import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  integer,
  timestamp,
  json,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
//import { createInsertSchema } from 'drizzle-zod';
//import { z } from 'zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'draft', 'archived']);

// Table declaration for the accelerators
export const accelerators = pgTable('accelerators', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdDate: timestamp('created_date').notNull(),
  createdBy: text('created_by').notNull(),
  lastUpdatedBy: text('last_updated_by'),
  lastUpdatedDate: timestamp('last_updated_date'),
  linkedService: text('linked_service').notNull(),
  linkedAccelerators: text('linked_accelerators').array().notNull(),
  status: statusEnum('status').notNull(),
  effort: integer('effort').notNull(),
  timesUsed: integer('times_used').notNull(),
  storyBranding: json('story_branding').notNull(),
  links: json('links').notNull()
});

export type SelectAccelerator = typeof accelerators.$inferSelect;

//export const insertAcceleratorSchema = createInsertSchema(accelerators);
//
//// Define the type for the accelerator
//type Accelerator = z.infer<typeof insertAcceleratorSchema>;
//
//// Function to add a new accelerator
//export async function addAccelerator(accelerator: Accelerator): Promise<Accelerator> {
//  // Validate the input data using the insert schema
//  const validatedAccelerator = insertAcceleratorSchema.parse(accelerator);
//
//  // Insert the new accelerator into the database
//  const [newAccelerator] = await db.insert(accelerators).values(validatedAccelerator).returning();
//
//  return newAccelerator;
//}

type NewAccelerator = typeof accelerators.$inferInsert;

export async function addAccelerator(accelerator: NewAccelerator) {
  try {
    console.log("accelerator data in db: " + JSON.stringify(accelerator, null, 2));
    let newAccelerator = await db.insert(accelerators).values(accelerator);
    return newAccelerator;
  } catch (error) {
    console.error("Error inserting accelerator:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function acceleratorGraphView() {
  // get only the fields required for graph view
  let acceleratorGraphView = await db.select({
    id: accelerators.id,
    name: accelerators.name,
    linkedService: accelerators.linkedService,
    linkedAccelerators: accelerators.linkedAccelerators,
  }).from(accelerators);

  // return the acceleratorGraphView
  return acceleratorGraphView;
}

// Get an accelerator by id
export async function getAcceleratorById(id: number) {
  let accelerator = await db.select().from(accelerators).where(eq(accelerators.id, id));
  return accelerator[0];
}

// Update an existing accelerator
export async function updateAccelerator(accelerator: SelectAccelerator) {
  let updatedAccelerator = await db.update(accelerators).set(accelerator).where(eq(accelerators.id, accelerator.id));
  return updatedAccelerator;
}

// Create a search function for the accelerators and 
export async function searchAccelerators(
  search: string,
  offset: number
): Promise<{
  accelerators: SelectAccelerator[];
  acceleratorNames: { name: string }[];
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
    // Return all the names of the accelerators in the database as a list
    let allAcceleratorNames = await db.select({ name: accelerators.name })
        .from(accelerators);

    return {
      accelerators: moreAccelerators,
      acceleratorNames: allAcceleratorNames,
      newOffset: offset,
      totalAccelerators: totalAccelerators[0].count
    };
  }

  // Return the total number of accelerators
  let totalAccelerators = await db.select({ count: count() }).from(accelerators);
  // Return all the names of the accelerators in the database as a list
  let allAcceleratorNames = await db.select({ name: accelerators.name }).from(accelerators);
  // Return the first 5 accelerators
  let moreAccelerators = await db.select().from(accelerators).limit(5).offset(offset);

  return {
    accelerators: moreAccelerators,
    acceleratorNames: allAcceleratorNames,
    newOffset: offset,
    totalAccelerators: totalAccelerators[0].count
  };
}

export async function deleteAcceleratorById(id: number) {
  await db.delete(accelerators).where(eq(accelerators.id, id));
}