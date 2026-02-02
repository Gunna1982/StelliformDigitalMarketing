'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import CornerPeel from './CornerPeel';

type ServiceBilling = 'one-time' | 'ongoing';

const features: Array<{
  title: string;
  description: string;
  pricing: string;
  icon: string;
  highlights: string[];
  billing: ServiceBilling;
  hasCornerPeel?: boolean;
}> = [
  {
    title: 'Website Design',
    description:
      'Custom-built websites that captivate visitors and drive conversions. From landing pages to full-scale web applications.',
    pricing: 'Starting at $2,500',
    icon: '🌐',
    highlights: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    billing: 'one-time',
    hasCornerPeel: true,
  },
  {
    title: 'Lead Generation',
    description:
      'Strategic campaigns that attract qualified prospects and fill your sales pipeline with high-intent leads.',
    pricing: 'Starting at $1,500/mo',
    icon: '🎯',
    highlights: ['Qualified Leads', 'CRM Integration', 'Analytics Dashboard'],
    billing: 'ongoing',
  },
  {
    title: 'Email & Social Media',
    description:
      'Engaging content and automated sequences that nurture relationships and drive repeat business.',
    pricing: 'Starting at $1,000/mo',
    icon: '📧',
    highlights: ['Email Automation', 'Social Strategy', 'Content Calendar'],
    billing: 'ongoing',
  },
  {
    title: 'Custom Development',
    description:
      'Bespoke software solutions, APIs, and integrations tailored to your unique business requirements.',
    pricing: 'Starting at $5,000',
    icon: '⚡',
    highlights: ['Custom APIs', 'Integrations', 'Automation'],
    billing: 'one-time',
  },
  {
    title: 'Brand Strategy',
    description:
      'Comprehensive brand positioning, visual identity, and messaging that sets you apart from competitors.',
    pricing: 'Starting at $3,000',
    icon: '✦',
    highlights: ['Brand Identity', 'Messaging', 'Guidelines'],
    billing: 'one-time',
  },
  {
    title: 'SEO & Digital Marketing',
    description:
      'Data-driven strategies to improve your search rankings and maximize your digital presence.',
    pricing: 'Starting at $1,200/mo',
    icon: '📈',
    highlights: ['Keyword Research', 'On-Page SEO', 'Performance Tracking'],
    billing: 'ongoing',
  },
];

function BillingBadge({ billing }: { billing: ServiceBilling }) {
  const label = billing === 'one-time' ? 'ONE-TIME' : 'ONGOING';

  return (
    <span
      className={`text-[11px] tracking-wider font-semibold px-2.5 py-1 rounded-full border ${
        billing === 'one-time'
          ? 'border-white/10 bg-white/[0.04] text-gray-300'
          : 'border-red-500/25 bg-red-500/10 text-red-300'
      }`}
    >
      {label}
    </span>
  );
}

function ServiceCard({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  const ctaLabel = feature.billing === 'one-time' ? 'Start a Project' : 'Start Monthly Growth';
  const ctaHint = feature.billing === 'one-time' ? 'One-time project' : 'Ongoing monthly support';

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="feature-card relative overflow-hidden group"
    >
      {feature.hasCornerPeel && (
        <>
          <CornerPeel position="top-right" color="#ef4444" size={60} />
          <CornerPeel position="bottom-left" color="#dc2626" size={50} />
        </>
      )}

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{feature.icon}</span>
          <h3 className="text-2xl font-bold">{feature.title}</h3>
        </div>
        <BillingBadge billing={feature.billing} />
      </div>

      <p className="text-gray-400 mb-6">{feature.description}</p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2 mb-6">
        {feature.highlights.map((highlight, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400"
          >
            {highlight}
          </span>
        ))}
      </div>

      {/* Pricing + CTA */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-red-400 font-semibold">{feature.pricing}</span>
            <span className="text-xs text-gray-500">{ctaHint}</span>
          </div>

          <Link href="/#contact">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-sm font-semibold whitespace-nowrap"
            >
              {ctaLabel}
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" ref={containerRef} className="max-w-7xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-xl text-gray-400">
          Pick what you need. Choose one-time builds or ongoing growth support.
        </p>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            One-time = a build you own
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400/70" />
            Ongoing = monthly growth execution
          </span>
        </div>
      </motion.div>

      {/* Row 1 */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {features.slice(0, 3).map((feature, index) => (
          <ServiceCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.slice(3).map((feature, index) => (
          <ServiceCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
