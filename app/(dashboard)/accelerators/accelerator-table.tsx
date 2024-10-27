'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Accelerator } from './accelerator';
import { SelectAccelerator } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AcceleratorsTable({
  accelerators,
  offset,
  totalAccelerators,
  acceleratorNames
}: {
  accelerators: SelectAccelerator[];
  offset: number;
  totalAccelerators: number;
  acceleratorNames?: { name: string }[];
}) {
  let router = useRouter();
  let acceleratorsPerPage = 5;

  function prevPage() {
    router.push(`/accelerators?offset=${offset - acceleratorsPerPage}`, { scroll: false });
  }

  function nextPage() {
    router.push(`/accelerators?offset=${offset + acceleratorsPerPage}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accelerators</CardTitle>
        <CardDescription>
          Manage and create accelerators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Hours Required</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Times Used
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accelerators.map((accelerators) => (
              <Accelerator key={accelerators.id} accelerators={accelerators} acceleratorNames={acceleratorNames} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {totalAccelerators === 0 ? 0 : offset + 1}-{Math.min(offset + acceleratorsPerPage, totalAccelerators)}
            </strong>{' '}
            of <strong>{totalAccelerators}</strong> accelerators
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset < acceleratorsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + acceleratorsPerPage >= totalAccelerators}
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
