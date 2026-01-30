'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useMemo, useRef } from 'react';
import { ArrowRight, TrendingUp, Rocket } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

type EnergyParticleAnim = {
  x: [string, string];
  duration: number;
};

function makeEnergyParticleAnims(count: number): EnergyParticleAnim[] {
  return Array.from({ length: count }, () => {
    const x1 = (Math.random() - 0.5) * 40;
    const x2 = (Math.random() - 0.5) * 60;

    return {
      x: [`${x1}px`, `${x2}px`],
      duration: 2 + Math.random(),
    };
  });
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // ✅ Move Math.random OUT of render by generating once in a memoized value.
  // Your lint rule flags Math.random inside render objects; this keeps it stable.
  const energyParticleAnims = useMemo(() => makeEnergyParticleAnims(8), []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950"
    >
      {/* Restored Particles Background */}
      <ParticlesBackground />

      {/* POWERFUL UPWARD LIGHT BEAM - Positioned at bottom center */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-64 pointer-events-none z-0">
        {/* Core Beam - Main upward light */}
        <motion.div
          ref={beamRef}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-64"
          style={{
            background:
              'linear-gradient(to top, transparent, rgba(255, 193, 7, 0.8), rgba(255, 152, 0, 0.9))',
            filter: 'blur(8px)',
          }}
          animate={{
            height: ['64px', '96px', '64px'],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Outer Glow Effect */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-48"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 193, 7, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Base Star/Beacon */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 235, 59, 1) 0%, rgba(255, 193, 7, 0.9) 30%, rgba(255, 152, 0, 0) 70%)',
            boxShadow:
              '0 0 60px 20px rgba(255, 193, 7, 0.6), 0 0 100px 40px rgba(255, 152, 0, 0.3)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 60px 20px rgba(255, 193, 7, 0.6)',
              '0 0 80px 30px rgba(255, 193, 7, 0.8)',
              '0 0 60px 20px rgba(255, 193, 7, 0.6)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Energy Particles Rising */}
        {energyParticleAnims.map((cfg, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-400"
            style={{
              left: '50%',
              bottom: '20px',
            }}
            animate={{
              y: [0, -300],
              x: cfg.x,
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 0.5],
            }}
            transition={{
              duration: cfg.duration,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Beam Ripples */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full bg-amber-300/50"
          animate={{
            width: ['16px', '48px', '16px'],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-gradient-to-tr from-orange-500/8 via-amber-500/3 to-transparent rounded-full blur-3xl" />

      {/* Main content container */}
      <motion.div
        style={{ opacity, scale }}
        className="max-w-6xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8"
      >
        {/* Badge/Pill with Rocket icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/5 backdrop-blur-sm"
        >
          <Rocket className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
            AI-POWERED GROWTH AUTOMATION
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
        >
          <span className="block text-gray-200">AUTOMATED WITH</span>
          <span className="relative">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent bg-size-200 animate-gradient-shift">
              VIRAL RESULTS
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </span>
        </motion.h1>

        {/* Subheading with metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-sm mb-6">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-lg font-semibold text-gray-300">Growth Velocity</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                +842% ↑
              </span>
              <span className="text-sm text-gray-400">vs last week</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-amber-300">Luminous AI</span> analyzes trends and automates
            <span className="font-semibold text-orange-300"> viral content</span> for maximum engagement across every
            platform.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <motion.a
            href="#demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-size-200 animate-gradient-shift" />
            <span className="relative flex items-center justify-center gap-3">
              View Features
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.a>

          <motion.a
            href="#growth"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-xl font-medium overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-colors duration-300"
          >
            <span className="relative flex items-center justify-center gap-2 text-gray-300 group-hover:text-white">
              <span>Live Growth Demo</span>
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-500" />
              </div>
            </span>
          </motion.a>
        </motion.div>

        {/* Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700/30 mb-4"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-400">Analyzing Search Trends...</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
