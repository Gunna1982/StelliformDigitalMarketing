import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stelliformdigital - Digital Marketing Excellence',
  description: 'Crafting digital experiences that take your business to the stars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html  className="overflow-x-hidden" lang="en">
      <body className={`overflow-x-hidden ${inter.className}`}>
        <SmoothScrolling />
        {children}
      </body>
    </html>
  );
}