'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: 'ACH Tax Management', shortName: 'ACH Tax' },
  { name: 'The McPhillip Law Firm', shortName: 'McPhillip Law' },
  { name: 'LOKA', subtitle: 'League of Korean Americans' },
];

type ParticleData = {
  id: number;
  x: number;
  y: number;
  dx: number; // random x drift
  dy: number; // random y drift
};

function Particle({ x, y, dx, dy }: { x: number; y: number; dx: number; dy: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x, y }}
      animate={{
        opacity: 0,
        scale: 0,
        x: x + dx,
        y: y + dy,
      }}
      transition={{ duration: 1.5 }}
      className="absolute w-1 h-1 bg-orange-400 rounded-full pointer-events-none"
    />
  );
}

export default function LogoCarouselParticles() {
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // ✅ Randomness happens here (event handler), not during render
    const dx = (Math.random() - 0.5) * 100;
    const dy = (Math.random() - 0.5) * 100;

    const newParticle: ParticleData = { id: Date.now(), x, y, dx, dy };

    setParticles((prev) => [...prev, newParticle]);

    // Remove after animation finishes
    window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1500);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-16 border-t border-b border-gray-800 overflow-hidden relative"
    >
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

      <div className="flex items-center gap-16 logo-scroll-slow">
        {[...clients, ...clients, ...clients, ...clients, ...clients, ...clients].map(
          (client, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0 text-center min-w-[300px] cursor-pointer"
            >
              {client.subtitle ? (
                <div>
                  <div className="text-3xl font-bold text-gray-600 hover:text-orange-400 transition-colors duration-300">
                    {client.name}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{client.subtitle}</div>
                </div>
              ) : (
                <div className="text-3xl font-bold text-gray-600 hover:text-orange-400 transition-colors duration-300">
                  {client.shortName}
                </div>
              )}
            </motion.div>
          )
        )}
      </div>

      {/* Render particles */}
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} dx={p.dx} dy={p.dy} />
      ))}

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}
