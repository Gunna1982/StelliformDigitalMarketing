import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stelliformdigital.com'; // Update with your actual domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add individual blog posts
    {
      url: `${baseUrl}/blog/marketing-roi`,
      lastModified: new Date('2026-01-31'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/data-driven-marketing`,
      lastModified: new Date('2026-01-31'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/growth-marketing-strategies`,
      lastModified: new Date('2026-01-31'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}