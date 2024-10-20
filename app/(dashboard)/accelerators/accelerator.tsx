import Image from 'next/image';
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

export function Accelerator({ accelerators }: { accelerators: SelectAccelerator }) {
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteAccelerator}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
