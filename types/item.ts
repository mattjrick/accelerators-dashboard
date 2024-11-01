
import { Character } from '@/types/storybrand';

export interface ItemFormState {
    name: string;
    type: 'service' | 'accelerator';
    description: string;
    linkedService: string;
    linkedAccelerators: string[]; // Use a consistent type here
    status: 'active' | 'draft' | 'archived';
    effort: number;
    timesUsed: number;
    storyBranding: {
      characters: Character[];
    };
    links: { [key: string]: string };
    id?: number;
    createdDate?: Date;
    createdBy?: string;
    lastUpdatedBy?: string | null;
    lastUpdatedDate?: Date | null;
  }