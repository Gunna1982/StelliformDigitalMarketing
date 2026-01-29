'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import CornerPeel from './CornerPeel';

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
      
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      const size = Math.random() * 2 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      star.style.animationDelay = Math.random() * 3 + 's';
      
      starField.appendChild(star);
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Corner Peels - Clean effect without orb */}
      <CornerPeel position="top-right" color="#FF8C00" size={120} />
      <CornerPeel position="bottom-left" color="#FFA500" size={100} />
      
      {/* Star Field Background */}
      <div 
        ref={starFieldRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Main Content - No orb interference */}
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
          Crafting digital experiences that merge art and technology. From branding to web development, we build it all.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          {/* View Portfolio Button - Magnetic Glow Effect */}
          <motion.a
            href="#work"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 rounded-xl font-semibold overflow-hidden cursor-pointer"
          >
            {/* Base gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-[length:200%_100%] group-hover:animate-gradient-shift" />

            {/* Animated border glow */}
            <span className="absolute -inset-[2px] bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 rounded-xl opacity-0 group-hover:opacity-75 blur-sm transition-opacity duration-300 -z-10" />

            {/* Sweep shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3 text-white">
              <span>View Portfolio</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </motion.a>

          {/* Contact Us Button - Outline with Fill Animation */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 rounded-xl font-semibold overflow-hidden cursor-pointer"
          >
            {/* Animated border */}
            <span className="absolute inset-0 rounded-xl border-2 border-orange-500/50 group-hover:border-orange-400 transition-colors duration-300" />

            {/* Fill animation from bottom */}
            <span className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-orange-500/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-orange-500 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-500 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-orange-500 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-orange-500 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Glow effect */}
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,165,0,0.3)] -z-10" />

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3 text-white group-hover:text-orange-100 transition-colors duration-300">
              <span>Contact Us</span>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-32"
        >
          <p className="text-sm text-gray-500 mb-4 tracking-widest">TRUSTED BY FORWARD-THINKING BRANDS</p>
          <a href="#work" className="text-sm text-gray-400 hover:text-orange-400 transition">
            Read the story →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}