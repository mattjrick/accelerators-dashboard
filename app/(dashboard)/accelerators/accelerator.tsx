'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectAccelerator } from '@/lib/db';
import { deleteAccelerator } from './actions';
import { AcceleratorDialog } from './accelerator-form';
import { AcceleratorViewComponent } from './accelerator-view';

interface AcceleratorProps {
  accelerators: SelectAccelerator;
  acceleratorNames: { name: string }[];
}
export function Accelerator({ accelerators, acceleratorNames }: AcceleratorProps) {
  
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
      <TableCell className="font-medium">{accelerators.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {accelerators.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`${accelerators.effort}`}</TableCell>
      <TableCell className="hidden md:table-cell">{accelerators.timesUsed}</TableCell>
      <TableCell className="hidden md:table-cell">
        {accelerators.createdDate.toLocaleDateString("en-US")}
      </TableCell>
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
              <form action={deleteAccelerator}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Accelerator</DialogTitle>
            <DialogDescription>Update your accelerator</DialogDescription>
          </DialogHeader>
          <AcceleratorDialog
            selectedItemId={accelerators.id}
            isEditMode={true}
            onClose={handleEditCloseDialog}
            acceleratorNames={acceleratorNames}
          />
        </DialogContent>
      </Dialog>
      
      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <AcceleratorViewComponent
        selectedItemId={accelerators.id}
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
      />
      </Dialog>
    </TableRow>
  );
}