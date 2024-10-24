'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AcceleratorDialog } from './accelerator-form';
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

interface AcceleratorDialogButtonProps {
  acceleratorNames: string[];
}

const AcceleratorDialogButton: React.FC<AcceleratorDialogButtonProps> = ({ acceleratorNames }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);

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
        <AcceleratorDialog acceleratorNames={acceleratorNames} />
      </DialogContent>
    </Dialog>
  </>
  );
};

export default AcceleratorDialogButton;