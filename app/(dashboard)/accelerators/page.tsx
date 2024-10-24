import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  File,
  PlusCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AcceleratorsTable } from './accelerator-table';
import { searchAccelerators } from '@/lib/db';
import AcceleratorDialogButton from './accelerator-dialog-button';

export default async function AcceleratorsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { accelerators, newOffset, totalAccelerators, acceleratorNames } = await searchAccelerators(
    search,
    Number(offset)
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <AcceleratorDialogButton acceleratorNames={acceleratorNames}/>
        </div>
      </div>
      <TabsContent value="all">
        <AcceleratorsTable
          accelerators={accelerators}
          offset={newOffset ?? 0}
          totalAccelerators={totalAccelerators}
          acceleratorNames={acceleratorNames}
        />
      </TabsContent>
    </Tabs>
  );
}