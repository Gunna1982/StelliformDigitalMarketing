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

export default function LogoCarousel3D() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="py-16 border-t border-b border-gray-800 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-gray-500 text-center tracking-widest"
        >
          TRUSTED PARTNERS
        </motion.p>
      </div>

      <div 
        className="relative h-32"
        style={{ perspective: '1000px' }}
      >
        <div className="flex items-center justify-center gap-16">
          {[...clients, ...clients, ...clients].map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -45 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: (index % 3) * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                rotateY: hoveredIndex === index ? 10 : 0,
                scale: hoveredIndex === index ? 1.2 : 1,
                z: hoveredIndex === index ? 100 : 0
              }}
              className="flex-shrink-0 text-center min-w-[300px] transition-all duration-500"
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {client.subtitle ? (
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent hover:from-orange-400 hover:to-amber-500 transition-all duration-300">
                    {client.name}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{client.subtitle}</div>
                </div>
              ) : (
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent hover:from-orange-400 hover:to-amber-500 transition-all duration-300">
                  {client.shortName}
                </div>
              )}

              {/* 3D shadow effect */}
              <motion.div
                className="absolute inset-0 bg-orange-500/10 blur-xl -z-10"
                animate={{
                  opacity: hoveredIndex === index ? 0.5 : 0,
                  scale: hoveredIndex === index ? 1.5 : 1
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}