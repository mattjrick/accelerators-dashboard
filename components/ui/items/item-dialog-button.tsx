'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/common/button';
import { PlusCircle } from 'lucide-react';
import { ItemDialog } from './item-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/common/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/common/dropdown-menu";

interface ItemDialogButtonProps {
  itemNames: { name: string }[];
}

const ItemDialogButton: React.FC<ItemDialogButtonProps> = ({ itemNames }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'service' | 'accelerator' | null>(null);

  const openDialog = (type: 'service' | 'accelerator') => {
    setSelectedType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedType(null);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Item
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => openDialog('service')}>
            Service
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => openDialog('accelerator')}>
            Accelerator
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>
            Add a {selectedType === 'service' ? 'service' : 'accelerator'} that will be visible in the catalogue.
          </DialogDescription>
        </DialogHeader>
        {selectedType && (
          <ItemDialog
            itemNames={itemNames}
            onClose={closeDialog}
            initialType={selectedType}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialogButton;