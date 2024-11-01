'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/common/tabs'; // Replace with your actual tabs library
import { Button } from '@/components/ui/common/button';
import { File } from 'lucide-react';
import { ItemsTable } from './item-table';
import AcceleratorDialogButton from './item-dialog-button';

interface TabsComponentProps {
  type: 'accelerator' | 'service' | undefined;
  items: any[];
  newOffset: number;
  itemNames: { name: string }[];
  totalItems: number;
}

const TabsComponent: React.FC<TabsComponentProps> = ({ type, items, newOffset, itemNames, totalItems }) => {
  return (
    <Tabs defaultValue={type || "all"}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" onClick={() => window.location.href = '/catalogue'}>All</TabsTrigger>
          <TabsTrigger value="service" onClick={() => window.location.href = '/catalogue?type=service'}>Services</TabsTrigger>
          <TabsTrigger value="accelerator" onClick={() => window.location.href = '/catalogue?type=accelerator'}>Accelerators</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <AcceleratorDialogButton itemNames={itemNames}/>
        </div>
      </div>
      <TabsContent value="all">
        <ItemsTable items={items} type={type} offset={newOffset} totalItems={totalItems} itemNames={itemNames} />
      </TabsContent>
      <TabsContent value="service">
        <ItemsTable items={items.filter(item => item.type === 'service')} type={type} offset={newOffset} totalItems={totalItems} itemNames={itemNames} />
      </TabsContent>
      <TabsContent value="accelerator">
        <ItemsTable items={items.filter(item => item.type === 'accelerator')} type={type} offset={newOffset} totalItems={totalItems} itemNames={itemNames} />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;