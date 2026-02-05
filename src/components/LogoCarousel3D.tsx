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
    <div className="py-16 border-t border-b border-white/10 overflow-hidden relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-gray-300 text-center tracking-widest"
        >
          TRUSTED PARTNERS
        </motion.p>
      </div>

      {/* Side-scrolling marquee */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <div className="marquee-track flex items-center gap-16 w-max px-6">
          {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -25 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: (index % 4) * 0.12 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                rotateY: hoveredIndex === index ? 10 : 0,
                scale: hoveredIndex === index ? 1.08 : 1,
                z: hoveredIndex === index ? 80 : 0,
              }}
              className="flex-shrink-0 text-center min-w-[260px] transition-all duration-500 relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {client.subtitle ? (
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent hover:from-red-300 hover:to-red-500 transition-all duration-300">
                    {client.name}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{client.subtitle}</div>
                </div>
              ) : (
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent hover:from-red-300 hover:to-red-500 transition-all duration-300">
                  {client.shortName}
                </div>
              )}

              {/* subtle glow */}
              <motion.div
                className="absolute inset-0 bg-red-500/10 blur-xl -z-10"
                animate={{
                  opacity: hoveredIndex === index ? 0.35 : 0,
                  scale: hoveredIndex === index ? 1.4 : 1,
                }}
              />
            </motion.div>
          ))}
        </div>

        <style jsx>{`
          .marquee-track {
            /* Mobile: faster (felt too slow). Desktop: slower (felt too fast). */
            animation: marquee 32s linear infinite;
            will-change: transform;
          }
          @media (max-width: 640px) {
            .marquee-track {
              animation-duration: 16s;
            }
          }
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
}