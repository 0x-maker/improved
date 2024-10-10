/* eslint-disable react/react-in-jsx-scope */
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verity OS',
  description: 'A Mac OS-like desktop interface built with Next.js and shadcn/ui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}