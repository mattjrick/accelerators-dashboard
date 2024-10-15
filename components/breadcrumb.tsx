"use client"

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

function DashboardBreadcrumb() {
  const searchParams = useSearchParams();
  const path = searchParams.get('path') || '';
  const pathSegments = path.split('/').filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment: string, index: number) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;

    return (
      <BreadcrumbItem key={href}>
        {isLast ? (
          <BreadcrumbPage>{segment}</BreadcrumbPage>
        ) : (
          <>
            <BreadcrumbLink asChild>
              <Link href={href}>{segment}</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DashboardBreadcrumb;