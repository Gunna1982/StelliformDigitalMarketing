'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Logo/Brand */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-20 h-20 mx-auto mb-4"
              >
                {/* Star Icon */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.path
                    d="M50 10 L61 39 L92 39 L67 58 L78 87 L50 68 L22 87 L33 58 L8 39 L39 39 Z"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="50%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold gradient-text"
              >
                Stelliformdigital
              </motion.h1>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-red-600 to-red-500"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm text-gray-500"
            >
              Crafting excellence...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}