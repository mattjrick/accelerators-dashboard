'use server';

import { deleteAcceleratorById, getAcceleratorById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteAccelerator(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteAcceleratorById(id);
  revalidatePath('/accelerators');
}

// Get accelerator by id
export async function getAccelerator(formData: FormData) {
  let id = Number(formData.get('id'));
  await getAcceleratorById(id);
}