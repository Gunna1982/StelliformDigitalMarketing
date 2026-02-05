'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScrolling() {
  useEffect(() => {
    // Disable smooth scrolling for accessibility + mobile/touch devices.
    // It can interfere with normal scroll/gesture behavior, especially behind proxies.
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const isTouch = window.matchMedia?.('(pointer: coarse)')?.matches;

    if (prefersReduced || isTouch) return;

    const lenis = new Lenis({
      // Keep this snappy; very large duration can feel like scrolling is “stuck”.
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

