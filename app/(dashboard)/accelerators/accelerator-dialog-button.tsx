'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AcceleratorDialog } from './accelerator-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";

interface AcceleratorDialogButtonProps {
  acceleratorNames: { name: string }[];
}

const AcceleratorDialogButton: React.FC<AcceleratorDialogButtonProps> = ({ acceleratorNames }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
    <Button size="sm" className="h-8 gap-1" onClick={openDialog}>
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add Accelerator
      </span>
    </Button>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Accelerator</DialogTitle>
          <DialogDescription>Create your accelerator</DialogDescription>
        </DialogHeader>
        <AcceleratorDialog acceleratorNames={acceleratorNames} onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  </>
  );
};

export default AcceleratorDialogButton;