'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6 px-4 py-2 border border-orange-500/30 rounded-full text-sm text-orange-400"
        >
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          Design your <span className="gradient-text">vision</span> with
          <br />
          creative excellence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          Crafting digital experiences that merge art and technology. From
          branding to web development, I build it all.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-semibold hover:scale-105 transition-transform">
            View Portfolio →
          </button>
          <button className="px-8 py-4 border border-orange-500/50 rounded-lg font-semibold hover:bg-orange-500/10 transition-colors">
            Contact Me
          </button>
        </motion.div>
      </div>
    </section>
  );
}