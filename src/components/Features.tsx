'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import CornerPeel from './CornerPeel';

const features = [
  {
    title: 'Website Design',
    description: 'Custom-built websites that captivate visitors and drive conversions. From landing pages to full-scale web applications.',
    pricing: 'Starting at $2,500',
    icon: '🌐',
    highlights: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    hasCornerPeel: true
  },
  {
    title: 'Lead Generation',
    description: 'Strategic campaigns that attract qualified prospects and fill your sales pipeline with high-intent leads.',
    pricing: 'Starting at $1,500/mo',
    icon: '🎯',
    highlights: ['Qualified Leads', 'CRM Integration', 'Analytics Dashboard'],
    hasButton: true
  },
  {
    title: 'Email & Social Media',
    description: 'Engaging content and automated sequences that nurture relationships and drive repeat business.',
    pricing: 'Starting at $1,000/mo',
    icon: '📧',
    highlights: ['Email Automation', 'Social Strategy', 'Content Calendar'],
    styles: ['Email Campaigns', 'Social Management']
  },
  {
    title: 'Custom Development',
    description: 'Bespoke software solutions, APIs, and integrations tailored to your unique business requirements.',
    pricing: 'Starting at $5,000',
    icon: '⚡',
    highlights: ['Custom APIs', 'Integrations', 'Automation'],
    team: true
  },
  {
    title: 'Brand Strategy',
    description: 'Comprehensive brand positioning, visual identity, and messaging that sets you apart from competitors.',
    pricing: 'Starting at $3,000',
    icon: '✦',
    highlights: ['Brand Identity', 'Messaging', 'Guidelines'],
    passion: true
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Data-driven strategies to improve your search rankings and maximize your digital presence.',
    pricing: 'Starting at $1,200/mo',
    icon: '📈',
    highlights: ['Keyword Research', 'On-Page SEO', 'Performance Tracking'],
    seo: true
  }
];

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
          Full-service digital solutions to grow your business. From design to development to marketing.
        </p>
      </motion.div>

      {/* First Row - 3 Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {features.slice(0, 3).map((feature, index) => (
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
                <CornerPeel position="top-right" color="#FFA500" size={60} />
                <CornerPeel position="bottom-left" color="#FF8C00" size={50} />
              </>
            )}

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
            </div>

            <p className="text-gray-400 mb-6">{feature.description}</p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-6">
              {feature.highlights.map((highlight, i) => (
                <span key={i} className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400">
                  {highlight}
                </span>
              ))}
            </div>

            {/* Pricing */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-orange-400 font-semibold">{feature.pricing}</span>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-sm font-semibold"
                >
                  Get Started
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Second Row - 3 Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.slice(3).map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="feature-card relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
            </div>

            <p className="text-gray-400 mb-6">{feature.description}</p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-6">
              {feature.highlights.map((highlight, i) => (
                <span key={i} className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400">
                  {highlight}
                </span>
              ))}
            </div>

            {/* Pricing */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-orange-400 font-semibold">{feature.pricing}</span>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-sm font-semibold"
                >
                  Get Started
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}