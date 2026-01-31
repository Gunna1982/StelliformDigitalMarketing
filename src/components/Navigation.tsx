'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold gradient-text cursor-pointer"
          >
            Stelliformdigital
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {['Portfolio', 'Services', 'About', 'Blog', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="hover:text-red-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="group relative px-6 py-2 rounded-lg font-semibold text-sm overflow-hidden"
          >
            {/* Animated gradient background */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500" />

            {/* Shine effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

            {/* Glow effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500 to-red-400 blur-lg -z-10" />

            {/* Button text */}
            <span className="relative z-10 flex items-center gap-2 text-white">
              BOOK CALL
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}