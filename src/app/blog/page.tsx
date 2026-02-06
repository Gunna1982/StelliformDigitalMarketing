import BlogContent from '@/components/BlogContent';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Blog - Stelliform Digital | Personal Injury Lead Gen & Marketing',
  description: 'Actionable, no-fluff marketing and intake insights for personal injury law firms: lead quality, conversion fixes, and what actually drives signed cases.',
  keywords: [
    'personal injury marketing',
    'law firm lead generation',
    'personal injury leads',
    'intake optimization',
    'PPC for lawyers',
    'SEO for personal injury lawyers',
  ],
  authors: [{ name: 'Stelliform Digital' }],
  openGraph: {
    title: 'Stelliform Digital Blog | Personal Injury Lead Gen',
    description: 'Marketing + intake insights built for PI law firms. Improve lead quality, conversion rate, and signed cases.',
    url: 'https://stelliformdigital.com/blog',
    siteName: 'Stelliform Digital',
    images: [
      {
        url: 'https://stelliformdigital.com/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Stelliform Digital Blog - Personal Injury Lead Gen',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stelliform Digital Blog | Personal Injury Lead Gen',
    description: 'Marketing + intake insights built for PI law firms.',
    images: ['https://stelliformdigital.com/og-blog.jpg'],
    creator: '@stelliformdigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  return <BlogContent />;
}