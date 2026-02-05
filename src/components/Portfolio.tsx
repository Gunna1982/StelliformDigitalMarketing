'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Brand-accented projects with varied colors to add visual pop
const projects = [
  {
    id: 1,
    title: 'The McPhillip Firm',
    slug: 'mcphillip-firm',
    category: 'Personal Injury Lead Funnel',
    description:
      'High-converting PI funnel built to turn visitors into consult requests (clear positioning, strong CTAs, and intake-first UX).',
    image: '/projects/tmfwins-home.jpg',
    // Accent: emerald (match LOKA vibe)
    accents: {
      card: 'from-emerald-700 to-emerald-600',
      tag: 'bg-emerald-500/10 border-emerald-400/40 text-emerald-200 hover:border-emerald-300/70',
      metric: 'from-emerald-500 to-emerald-400',
      outline: 'hover:border-emerald-500/60',
      glow: 'bg-gradient-to-br from-emerald-700 to-emerald-500',
    },
    tags: ['Next.js', 'Conversion UX', 'Intake Funnel', 'Tracking-ready'],
    link: '/case-study/mcphillip-firm',
    metrics: {
      increase: 'TMFWINS.COM',
      metric: 'Live funnel',
    },
  },
];

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work" className="max-w-7xl mx-auto py-20 px-6">
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block mb-4 px-4 py-2 border border-red-500/30 rounded-full text-sm text-red-300 bg-red-500/5"
        >
          Selected Work
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Featured{' '}
          <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A showcase of outcomes across web development, automation, and growth.
        </p>
      </motion.div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group"
          >
            {/* Internal link to case study only (do not leave website) */}
            <Link href={project.link} className="block">
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1220] to-[#070A10] border border-white/10 ${project.accents.outline} transition-all duration-500`}>
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  {/* Left: Content */}
                  <div className="flex flex-col justify-center">
                    <motion.div
                      animate={{ x: hoveredId === project.id ? 10 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-sm text-gray-400 mb-2 tracking-wider">
                        {String(project.id).padStart(2, '0')} / {project.category}
                      </div>

                      <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {project.title}
                      </h3>

                      <p className="text-gray-300/90 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Outcome Metric */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 p-4 rounded-lg border border-white/10"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))',
                        }}
                      >
                        <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${project.accents.metric} bg-clip-text text-transparent`}>
                          {project.metrics.increase}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {project.metrics.metric}
                        </div>
                      </motion.div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors ${project.accents.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.div
                        animate={{ x: hoveredId === project.id ? 5 : 0 }}
                        className="inline-flex items-center gap-2 text-red-300 font-semibold hover:text-red-200 transition-colors"
                      >
                        View Case Study →
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Right: Visual */}
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <motion.div
                      animate={{ scale: hoveredId === project.id ? 1.03 : 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-xl overflow-hidden"
                    >
                      {/* Accent glow underneath */}
                      <motion.div
                        animate={{
                          opacity: hoveredId === project.id ? 0.2 : 0.1,
                        }}
                        className={`absolute inset-0 ${project.accents.glow} blur-3xl -z-10`}
                      />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index === 0}
                        className="object-cover"
                      />
                      {/* Dark overlay to keep text readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === project.id ? 1 : 0.75 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      </div>

      {/* CTA at bottom (no hash link; smooth scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 mb-4">Interested in working together?</p>
        <motion.button
          onClick={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(220,38,38,0.4)' }}
          whileTap={{ scale: 0.96 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-lg font-semibold text-white transition-all cursor-pointer"
        >
          Let’s Build Something Amazing
        </motion.button>
      </motion.div>
    </section>
  );
}
