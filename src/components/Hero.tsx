'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starFieldRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Create star field
  useEffect(() => {
    if (!starFieldRef.current) return;
    
    const starField = starFieldRef.current;
    const numStars = 50;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star absolute rounded-full bg-orange-500';
      
      // Random position
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      // Random size (1-3px)
      const size = Math.random() * 2 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      // Random animation delay
      star.style.animationDelay = Math.random() * 3 + 's';
      
      starField.appendChild(star);
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Star Field Background */}
      <div 
        ref={starFieldRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-6xl mx-auto text-center relative z-10 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-8 px-4 py-2 border border-orange-500/30 rounded-full text-sm text-orange-400 bg-orange-500/5"
        >
          Available for new projects
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          Design your <span className="gradient-text">vision</span> with
          <br />
          creative excellence
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          Crafting digital experiences that merge art and technology. From branding to web development, I build it all.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 165, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-semibold"
          >
            View Portfolio →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 165, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-orange-500/50 rounded-lg font-semibold transition-colors"
          >
            Contact Me
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-32"
        >
          <p className="text-sm text-gray-500 mb-4 tracking-widest">TRUSTED BY FORWARD-THINKING BRANDS</p>
          <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition">
            Read the story →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}