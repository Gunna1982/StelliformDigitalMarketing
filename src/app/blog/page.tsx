import BlogContent from '@/components/BlogContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Stelliform Digital | Growth Marketing Insights',
  description: 'Data-driven strategies, proven tactics, and actionable insights to accelerate your business growth. Learn about marketing ROI, data-driven marketing, and growth strategies.',
  keywords: ['growth marketing', 'marketing ROI', 'data-driven marketing', 'digital marketing', 'business growth', 'lead generation'],
  authors: [{ name: 'Stelliform Digital' }],
  openGraph: {
    title: 'Blog - Stelliform Digital | Growth Marketing Insights',
    description: 'Data-driven strategies, proven tactics, and actionable insights to accelerate your business growth.',
    url: 'https://stelliformdigital.com/blog',
    siteName: 'Stelliform Digital',
    images: [
      {
        url: 'https://stelliformdigital.com/og-blog.jpg', // Add this image to public/
        width: 1200,
        height: 630,
        alt: 'Stelliform Digital Blog - Growth Marketing Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Stelliform Digital | Growth Marketing Insights',
    description: 'Data-driven strategies, proven tactics, and actionable insights to accelerate your business growth.',
    images: ['https://stelliformdigital.com/og-blog.jpg'], // Add this image to public/
    creator: '@stelliformdigital', // Update with your actual Twitter handle
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