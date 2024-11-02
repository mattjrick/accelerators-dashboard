import { items, SelectItem } from '@/lib/items-db'
import { ilike, count, and, eq, SQL } from 'drizzle-orm'
import { db } from '@/lib/db'

export async function searchItems(
  search: string,
  offset: number,
  type?: 'accelerator' | 'service'
): Promise<{
  items: SelectItem[];
  itemNames: { name: string, type: string }[];
  newOffset: number;
  totalItems: number;
}> {
  let whereClause: SQL[] = [];

  if (search) {
    whereClause.push(ilike(items.name, `%${search}%`));
  }

  if (type) {
    whereClause.push(eq(items.type, type));
  }

  const totalItems = await db
    .select({ count: count() })
    .from(items)
    .where(and(...whereClause));

  const moreItems = await db
    .select()
    .from(items)
    .where(and(...whereClause))
    .limit(5)
    .offset(offset);

  // Return all the names of the items in the database as a list
  const allItemNames = await db
    .select({ name: items.name, type: items.type })
    .from(items);

  return {
    items: moreItems,
    itemNames: allItemNames,
    newOffset: offset,
    totalItems: totalItems[0].count
  };
}

export async function itemGraphView() {
  // Get the fields required for accelerator items
  let acceleratorItems = await db.select({
    id: items.id,
    name: items.name,
    linkedService: items.linkedService,
    linkedAccelerators: items.linkedAccelerators,
  }).from(items).where(eq(items.type, 'accelerator'));

  // Return both acceleratorItems and serviceItems
  return {
    acceleratorItems
  };
}

// Get a list of available service names
export async function getServiceNames() {
  let serviceNames = await db.select({ name: items.name }).from(items).where(eq(items.type, 'service'));
  return serviceNames;
}