'use client';

import { motion } from 'framer-motion';

interface CornerPeelProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
  size?: number;
}

export default function CornerPeel({ 
  position = 'top-right', 
  color = '#FF8C00',
  size = 80 
}: CornerPeelProps) {
  
  const positions = {
    'top-right': 'top-0 right-0 rotate-0',
    'top-left': 'top-0 left-0 -scale-x-100',
    'bottom-right': 'bottom-0 right-0 -scale-y-100',
    'bottom-left': 'bottom-0 left-0 -scale-x-100 -scale-y-100'
  };

  return (
    <div className={`absolute ${positions[position]} pointer-events-none`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Page curl effect */}
        <defs>
          <linearGradient id={`peelGradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.9" />
          </linearGradient>
          
          <filter id={`peelShadow-${position}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main curl shape */}
        <motion.path
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          d="M100,0 L100,100 C100,45 55,0 0,0 Z"
          fill={`url(#peelGradient-${position})`}
          filter={`url(#peelShadow-${position})`}
        />

        {/* Highlight edge */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          d="M100,0 C100,45 55,0 0,0"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        {/* Inner shadow for depth */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          d="M100,0 L90,10 C90,50 50,10 10,10 L0,0 Z"
          fill="rgba(0,0,0,0.2)"
        />
      </svg>

      {/* Animated glow */}
      <motion.div
        className="absolute top-0 right-0"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at top right, ${color}40, transparent)`,
          filter: 'blur(20px)',
        }}
      />
    </div> 
  );
}