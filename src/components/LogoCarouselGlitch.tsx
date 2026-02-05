'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type Client = {
  name: string;
  shortName: string;
  subtitle?: string;
};

const clients: Client[] = [
  { name: 'ACH Management', shortName: 'ACH Management' },
  { name: 'The McPhillip Firm', shortName: 'The McPhillip Firm' }
];

export default function LogoCarouselGlitch() {
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);

  return (
    <div className="py-16 border-t border-b border-gray-800 overflow-hidden bg-black relative">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-gray-500 text-center tracking-widest font-mono"
        >
          [// TRUSTED_CLIENTS]
        </motion.p>
      </div>

      <div className="flex items-center gap-16 logo-scroll-slow">
        {[...clients, ...clients, ...clients, ...clients, ...clients, ...clients].map((client, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setGlitchIndex(index)}
            onMouseLeave={() => setGlitchIndex(null)}
            className="flex-shrink-0 text-center min-w-[300px] relative"
          >
            {/* Main text */}
            <div className="relative">
              <motion.div
                animate={glitchIndex === index ? {
                  x: [0, -3, 3, -2, 2, 0],
                  opacity: [1, 0.8, 1, 0.7, 1]
                } : {}}
                transition={{ duration: 0.3, repeat: glitchIndex === index ? Infinity : 0 }}
                className="text-3xl font-bold text-gray-600 hover:text-orange-400 transition-colors relative z-10"
              >
                {client.shortName || client.name}
              </motion.div>

              {/* Glitch layers */}
              {glitchIndex === index && (
                <>
                  <motion.div
                    animate={{
                      x: [0, -2, 2, 0],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="absolute inset-0 text-3xl font-bold text-cyan-400 mix-blend-screen"
                    style={{ clipPath: 'inset(0 0 50% 0)' }}
                  >
                    {client.shortName || client.name}
                  </motion.div>
                  
                  <motion.div
                    animate={{
                      x: [0, 2, -2, 0],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className="absolute inset-0 text-3xl font-bold text-red-400 mix-blend-screen"
                    style={{ clipPath: 'inset(50% 0 0 0)' }}
                  >
                    {client.shortName || client.name}
                  </motion.div>
                </>
              )}
            </div>

            {client.subtitle && (
              <div className="text-sm text-gray-700 mt-1 font-mono">{client.subtitle}</div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Scan line effect */}
      <motion.div
        animate={{ y: [0, 200, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
      />
    </div>
  );
}