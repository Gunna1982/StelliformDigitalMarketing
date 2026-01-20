'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScrolling() {
  useEffect(() => {
    const lenis = new Lenis({
      // ⬇️ MAIN SPEED CONTROL (higher = slower)
      duration: 6.1, // was 1.2 → now ~75% slower

      // Smooth, cinematic easing (good for animations)
      easing: (t: number) => 1 - Math.pow(1 - t, 4),

      smoothWheel: true,
      //smoothTouch: false, // keep touch responsive
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
