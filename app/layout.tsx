import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Accelerators Dashboard',
  description:
    'Manage and view the accelerators within Kainos'
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
