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

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

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
  effort: numeric('effort', { precision: 10, scale: 2 }).notNull(),
  timesUsed: integer('times_used').notNull(),
  storyBranding: json('story_branding'),
  marketing: json('marketing'),
  links: json('links')
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

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

// Create a search function for the accelerators and 
export async function searchAccelerators(
  search: string,
  offset: number
): Promise<{
  accelerators: SelectAccelerator[];
  newOffset: number | null;
  totalAccelerators: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      accelerators: await db
        .select()
        .from(accelerators)
        .where(ilike(accelerators.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalAccelerators: 0
    };
  }

  if (offset === null) {
    return { accelerators: [], newOffset: null, totalAccelerators: 0 };
  }

  let totalAccelerators = await db.select({ count: count() }).from(accelerators);
  let moreAccelerators = await db.select().from(accelerators).limit(5).offset(offset);
  let newOffset = moreAccelerators.length >= 5 ? offset + 5 : null;

  return {
    accelerators: moreAccelerators,
    newOffset,
    totalAccelerators: totalAccelerators[0].count
  };
}


export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}
