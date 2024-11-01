'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/common/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/common/card';
import { Item } from './item';
import { SelectItem } from '@/lib/items-db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/common/button';

export function ItemsTable({
  items,
  type,
  offset,
  totalItems,
  itemNames
}: {
  items: SelectItem[];
  type: string | undefined;
  offset: number;
  totalItems: number;
  itemNames: { name: string }[];
}) {
  let router = useRouter();
  let itemsPerPage = 5;

  function prevPage() {
    router.push(`/catalogue?offset=${offset - itemsPerPage}&type=${type}`, { scroll: false });
  }

  function nextPage() {
    router.push(`/catalogue?offset=${offset + itemsPerPage}&type=${type}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Items</CardTitle>
        <CardDescription>
          Manage and create items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((items) => (
              <Item key={items.id} items={items} itemNames={itemNames} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {totalItems === 0 ? 0 : offset + 1}-{Math.min(offset + itemsPerPage, totalItems)}
            </strong>{' '}
            of <strong>{totalItems}</strong> items
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset < itemsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + itemsPerPage >= totalItems}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
