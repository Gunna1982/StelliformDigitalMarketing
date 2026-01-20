'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  useEffect(() => {
    // Only run on the client (extra safety for Next.js)
    if (typeof window === 'undefined') return;

    // Tell GSAP these are HTMLElements (no `any`)
    const sections = gsap.utils.toArray<HTMLElement>('section');

    sections.forEach((section) => {
      const cards = section.querySelectorAll<HTMLElement>(
        '.feature-card, .testimonial-card, .pricing-card'
      );

      if (cards.length === 0) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
