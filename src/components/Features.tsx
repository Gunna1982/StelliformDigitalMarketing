'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CornerPeel from './CornerPeel';

const features = [
  {
    title: 'Brand Identity',
    description: 'Visual systems that tell your story. Logos, color palettes, and typography.',
    hasButton: true
  },
  {
    title: 'Web Design',
    description: 'Immersive web experiences designed to convert visitors into loyal customers.',
    concept: {
      label: 'CONCEPT A',
      title: 'Visual Impact',
      description: 'Strategic layout designed for maximum user retention.'
    },
    hasCornerPeel: true // Add this flag
  },
  {
    title: 'Art Direction',
    description: 'Defining the visual language, photography, and tone for your brand.',
    styles: ['Cinematic', 'Minimalist']
  },
  {
    title: 'Strategy',
    description: 'Data-driven insights to position your brand for market leadership.',
    team: true
  },
  {
    title: 'Content Production',
    description: 'High-quality asset creation, from photography to 3D motion design.',
    passion: true
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="services" ref={containerRef} className="max-w-7xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-4">Powerful Features</h2>
        <p className="text-xl text-gray-400">
          Everything you need to create, collaborate, and convert. Built for modern teams.
        </p>
      </motion.div>

      {/* First Row - 3 Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.slice(0, 3).map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="feature-card relative overflow-hidden"
          >
            {/* Add corner peels to Web Design card */}
            {feature.hasCornerPeel && (
              <>
                <CornerPeel position="top-right" color="#FFA500" size={60} />
                <CornerPeel position="bottom-left" color="#FF8C00" size={50} />
              </>
            )}

            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400 mb-8">{feature.description}</p>
            
            {feature.hasButton && (
              <>
                <div className="aspect-video bg-gradient-to-br from-orange-900/20 to-transparent rounded-lg mb-4" />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-semibold"
                >
                  ✦ Start Project
                </motion.button>
              </>
            )}
            
            {feature.concept && (
              <div className="bg-gray-900 rounded-lg p-6 relative z-10">
                <div className="text-orange-500 text-xs mb-2">{feature.concept.label}</div>
                <div className="text-white font-semibold mb-2">{feature.concept.title}</div>
                <div className="text-gray-500 text-sm">{feature.concept.description}</div>
              </div>
            )}
            
            {feature.styles && (
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="text-orange-500 text-xs mb-2">STYLE SETTINGS</div>
                <div className="border-l-4 border-orange-500 pl-4">
                  {feature.styles.map((style, i) => (
                    <div key={i} className={i === 0 ? 'text-white font-semibold mb-2' : 'text-gray-500 text-sm'}>
                      {style}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Second Row - 2 Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {features.slice(3).map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="feature-card"
          >
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400 mb-8">{feature.description}</p>
            
            {feature.team && (
              <div className="bg-gray-900 rounded-lg p-6">
                <p className="text-gray-400 mb-4">
                  Our launch strategy focuses on aggressive growth — <span className="text-orange-400">market penetration</span> and brand equity.
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">ST</div>
                    <div>
                      <div className="font-semibold text-sm">Strategy Team</div>
                      <div className="text-xs text-gray-500">Target audience analysis complete.</div>
                    </div>
                  </div>
                  <button className="w-full mt-2 py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-sm font-semibold">
                    ✓ Approve
                  </button>
                </div>
              </div>
            )}
            
            {feature.passion && (
              <div className="aspect-video bg-gradient-to-br from-orange-900/10 to-transparent rounded-lg flex items-center justify-center">
                <p className="text-4xl">
                  Create with <span className="gradient-text font-bold">passion.</span>
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};