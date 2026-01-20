'use client';

import { motion } from 'framer-motion';

const logos = [
  'slack', 'servicenow', 'paysafe', 'git', 'npm', 
  'Lucidchart', 'wrike', 'jQuery'
];

export default function LogoCarousel() {
  return (
    <div className="py-12 border-t border-b border-gray-800 overflow-hidden">
      <div className="flex items-center gap-12 logo-scroll whitespace-nowrap">
        {/* Duplicate logos for seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-2xl font-semibold text-gray-600"
          >
            {logo}
          </motion.span>
        ))}
      </div>
    </div>
  );
}