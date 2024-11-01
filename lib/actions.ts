'use server';

import { deleteItemById, getItemById, addItem, updateItem } from '@/lib/items-db';
import { revalidatePath } from 'next/cache';

export async function deleteItem(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteItemById(id);
  revalidatePath('/accelerators');
}

// Get accelerator by id
export async function getItem(id: number) {
  let accelerator = await getItemById(id);
  return accelerator;
}

// Add accelerator and add createdBy and createdDate
export async function addItemFromForm(data: any) {
  console.log("Data in actions:" + JSON.stringify(data, null, 2));
  const extendedData = {
    ...data,
    createdBy: 'user',
    createdDate: new Date(),
  }
  await addItem(extendedData);
}

// Update accelerator and add updatedBy and updatedDate
export async function updateItemFromForm(data: any) {
  const extendedData = {
    ...data,
    updatedBy: 'user',
    updatedDate: new Date(),
  }
  await updateItem(extendedData);
}