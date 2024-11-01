'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription
} from "@/components/ui/common/dialog";
import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/common/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/common/table';
import { SelectItem } from '@/lib/items-db';
import { deleteItem } from '../../../lib/actions';
import { ItemDialog } from './item-dialog';
import { ItemViewComponent } from './item-view';

interface ItemProps {
  items: SelectItem;
  itemNames: { name: string }[];
}

export function Item({ items, itemNames }: ItemProps) {
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleViewClick = () => {
    console.log('view click');
    setIsViewDialogOpen(true);
  };

  const handleEditClick = () => {
    console.log('edit click');
    setIsEditDialogOpen(true);
  };

  const handleEditCloseDialog = () => {
    console.log('close edit dialog');
    setIsEditDialogOpen(false);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{items.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {items.type}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {items.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{items.description}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleViewClick}>
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEditClick}>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteItem}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Update your item</DialogDescription>
          </DialogHeader>
          <ItemDialog
            selectedItemId={items.id}
            isEditMode={true}
            onClose={handleEditCloseDialog}
            itemNames={itemNames}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <ItemViewComponent
          selectedItemId={items.id}
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
        />
      </Dialog>
    </TableRow>
  );
}