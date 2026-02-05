import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stelliform Digital — Local Law Firm Lead Generation',
  description: 'Conversion-focused landing pages + tracking + intake flow to generate more consultation requests for local law firms.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html  className="overflow-x-hidden" lang="en">
      <body className={`overflow-x-hidden ${inter.className} bg-[#070A10] text-white`}>
        <SmoothScrolling />
        {children}
      </body>
    </html>
  );
}