'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

// You'll replace these with your actual project data
const projects = [
  {
    id: 1,
    title: 'The McPhillip Firm',
    category: 'Legal Website',
    description: 'Complete web development and digital marketing solution for a premier personal injury law firm.',
    image: '/projects/mcphillip.jpg', // You'll add actual images
    tags: ['Next.js', 'Google Ads', 'Lead Generation', 'CRM Integration'],
    link: '/case-study/mcphillip-firm',
    color: 'from-red-600 to-red-500'
  },
  {
    id: 2,
    title: 'ACH Tax Services',
    category: 'Tax Services Platform',
    description: 'Comprehensive client intake system with PDF generation and automated workflows.',
    image: '/projects/ach-tax.jpg',
    tags: ['PDF Generation', 'Automation', 'Custom Forms', 'Next.js'],
    link: '/case-study/ach-tax-services',
    color: 'from-red-500 to-red-400'
  },
  {
    id: 3,
    title: 'Stelliform Digital',
    category: 'Agency Website',
    description: 'Modern, animated showcase website with 3D elements and advanced interactions.',
    image: '/projects/stelliform.jpg',
    tags: ['Three.js', 'Framer Motion', 'GSAP', 'React'],
    link: '/case-study/stelliform-digital',
    color: 'from-red-400 to-red-600'
  }
];

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work" className="max-w-7xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block mb-4 px-4 py-2 border border-red-500/30 rounded-full text-sm text-red-400 bg-red-500/5"
        >
          Selected Work
        </motion.div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A showcase of recent client work across web development, digital marketing, and automation.
        </p>
      </motion.div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group"
          >
            <a href={project.link} className="block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-red-500/50 transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  {/* Left: Content */}
                  <div className="flex flex-col justify-center">
                    <motion.div
                      animate={{ x: hoveredId === project.id ? 10 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-sm text-red-400 mb-2 tracking-wider">
                        {String(project.id).padStart(2, '0')} / {project.category}
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-bold mb-4 group-hover:gradient-text transition-all">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <motion.div
                        animate={{ x: hoveredId === project.id ? 5 : 0 }}
                        className="inline-flex items-center gap-2 text-red-400 font-semibold"
                      >
                        View Case Study →
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Right: Image/Visual */}
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <motion.div
                      animate={{ scale: hoveredId === project.id ? 1.05 : 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-xl overflow-hidden"
                    >
                      {/* Placeholder gradient - replace with actual images */}
                      <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-20`} />
                      
                      {/* Add actual project image here */}
                      {/* <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover"
                      /> */}
                      
                      {/* Overlay effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Animated background glow */}
                <motion.div
                  animate={{
                    opacity: hoveredId === project.id ? 0.3 : 0,
                    scale: hoveredId === project.id ? 1 : 0.8
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} blur-3xl -z-10`}
                />
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* CTA at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 mb-4">Interested in working together?</p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(220, 38, 38, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold"
        >
          Let&rsquo;s Build Something Amazing
        </motion.a>
      </motion.div>
    </section>
  );
}