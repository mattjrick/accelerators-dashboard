'use server';

import { deleteAcceleratorById, getAcceleratorById, addAccelerator, updateAccelerator } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteAccelerator(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteAcceleratorById(id);
  revalidatePath('/accelerators');
}

// Get accelerator by id
export async function getAccelerator(id: number) {
  console.log('getAccelerator', id);
  let accelerator = await getAcceleratorById(id);
  console.log('accelerator', accelerator);
  return accelerator;
}

// Add accelerator and add createdBy and createdDate
export async function addAcceleratorFromForm(data: any) {
  const extendedData = {
    ...data,
    createdBy: 'user',
    createdDate: new Date(),
  }
  await addAccelerator(extendedData);
}

// Update accelerator and add updatedBy and updatedDate
export async function updateAcceleratorFromForm(data: any) {
  const extendedData = {
    ...data,
    updatedBy: 'user',
    updatedDate: new Date(),
  }
  await updateAccelerator(extendedData);
}