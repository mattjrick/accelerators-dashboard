import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Kainos Catalogue',
  description:
    'Manage and view the services and accelerators within Kainos'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
