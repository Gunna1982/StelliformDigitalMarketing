'use client';

import { motion, useScroll, useTransform, useInView, animate, cubicBezier } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

interface CaseStudy {
  title: string;
  subtitle: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  technologies: string[];
  images: string[];
  testimonial: {
    text: string;
    author: string;
    company: string;
  };
}

/* ─── Animated Counter ─── */
function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const numericMatch = value.match(/^(\d+)/);
  const suffix = value.replace(/^\d+/, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || !numericMatch) return;
    const target = parseInt(numericMatch[1], 10);
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, numericMatch]);

  if (!numericMatch) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {isInView ? display : 0}
      {suffix}
    </span>
  );
}

/* ─── Horizontal Marquee ─── */
function TechMarquee({ technologies }: { technologies: string[] }) {
  const doubled = [...technologies, ...technologies, ...technologies];
  return (
    <div className="overflow-hidden relative py-6">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase"
            style={{
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}
            />
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Shared animation presets ─── */
const customEase = cubicBezier(0.16, 1, 0.3, 1);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: customEase, delay },
  }),
};

const revealUp = {
  hidden: { y: '110%', opacity: 0 },
  visible: (delay: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1, ease: customEase, delay },
  }),
};

const lineGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: customEase },
  },
};

/* ─── Main Component ─── */
export default function CaseStudyContent({ study }: { study: CaseStudy }) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className="min-h-screen text-white relative" style={{ background: '#050505' }}>
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ═══════ Navigation ═══════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 100%)' }}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight hover:opacity-70 transition-opacity duration-300"
          >
            <span style={{ color: '#f97316' }}>S</span>telliform
            <span style={{ color: '#f97316' }}>.</span>
          </Link>

          <Link
            href="/#work"
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity duration-300"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <span
              className="block w-8 h-px group-hover:w-12 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            />
            All Projects
          </Link>
        </div>
      </motion.nav>

      {/* ═══════ Hero ═══════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background gradient parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(249,115,22,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(245,158,11,0.05) 0%, transparent 60%)',
            }}
          />
        </motion.div>

        {/* Decorative vertical lines */}
        <div
          className="absolute top-0 left-[15%] w-px h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
          }}
        />
        <div
          className="absolute top-0 right-[25%] w-px h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.04) 60%, transparent)',
          }}
        />

        <motion.div className="relative z-10 w-full pb-16 md:pb-24" style={{ opacity: heroOpacity }}>
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            {/* Year badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8"
            >
              <span
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em]"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: '#f97316' }} />
                Case Study — {study.year}
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-bold tracking-[-0.04em]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {study.title}
              </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="text-lg md:text-2xl max-w-2xl leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {study.subtitle}
              </motion.p>
            </div>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Client
                </div>
                <div className="text-sm font-medium">{study.client}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Year
                </div>
                <div className="text-sm font-medium">{study.year}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Services
                </div>
                <div className="text-sm font-medium">{study.services.join(' · ')}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(249,115,22,0.6), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ═══════ Project Image Hero ═══════ */}
      <section className="px-6 md:px-12 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          className="max-w-[1600px] mx-auto"
        >
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(245,158,11,0.06) 50%, rgba(249,115,22,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0"
              style={{
                opacity: 0.04,
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(249,115,22,0.4)' }} />
                </div>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-px"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-px"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
              </div>
            </div>
            {/* Replace with: <Image src={study.images[0]} alt={study.title} fill className="object-cover" /> */}
          </div>
        </motion.div>
      </section>

      {/* ═══════ Challenge & Solution ═══════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 relative">
        <div className="max-w-[1600px] mx-auto">
          {/* Section indicator */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center gap-6 mb-20"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              01
            </motion.span>
            <motion.div
              variants={lineGrow}
              className="h-px flex-1 origin-left"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />
            <motion.span
              variants={fadeUp}
              custom={0.2}
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              The Brief
            </motion.span>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-8">
            {/* Challenge */}
            <div className="md:col-span-5">
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                custom={0}
                className="text-[10px] uppercase tracking-[0.3em] mb-6"
                style={{ color: '#f97316' }}
              >
                The Challenge
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={0.15}
                className="text-xl md:text-2xl leading-[1.6] font-light"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                {study.challenge}
              </motion.p>
            </div>

            {/* Center divider */}
            <div className="hidden md:flex md:col-span-2 items-center justify-center">
              <div
                className="w-px h-full min-h-[200px]"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)',
                }}
              />
            </div>

            {/* Solution */}
            <div className="md:col-span-5">
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                custom={0.1}
                className="text-[10px] uppercase tracking-[0.3em] mb-6"
                style={{ color: '#f97316' }}
              >
                The Solution
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={0.25}
                className="text-xl md:text-2xl leading-[1.6] font-light"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                {study.solution}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Results ═══════ */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          {/* Section indicator */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center gap-6 mb-20"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              02
            </motion.span>
            <motion.div
              variants={lineGrow}
              className="h-px flex-1 origin-left"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />
            <motion.span
              variants={fadeUp}
              custom={0.2}
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Impact
            </motion.span>
          </motion.div>

          {/* Heading */}
          <div className="text-center mb-16 overflow-hidden">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={revealUp}
              custom={0}
              className="text-4xl md:text-6xl font-bold tracking-[-0.03em]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Measurable Results
            </motion.h2>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-0">
            {study.results.map((result, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={index * 0.15}
                className="relative text-center py-16 md:py-24 group"
              >
                {/* Vertical divider between items */}
                {index > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-[20%] h-[60%] w-px"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                )}

                {/* Metric number */}
                <div
                  className="text-6xl md:text-[7rem] lg:text-[8rem] font-bold leading-none tracking-[-0.04em] mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #f59e0b, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Instrument Serif', Georgia, serif",
                  }}
                >
                  <AnimatedMetric value={result.metric} />
                </div>

                {/* Label */}
                <div
                  className="text-sm uppercase tracking-[0.2em] max-w-[200px] mx-auto"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {result.label}
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Technology Stack — Marquee ═══════ */}
      <section
        className="py-16 relative"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-4">
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Built With
          </span>
        </div>
        <TechMarquee technologies={study.technologies} />
      </section>

      {/* ═══════ Testimonial ═══════ */}
      <section className="py-32 md:py-48 px-6 md:px-12 relative">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249,115,22,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1000px] mx-auto text-center relative">
          {/* Large decorative quote — using solid color instead of text-stroke for reliability */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="text-[10rem] md:text-[14rem] leading-none absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none font-serif"
            style={{ color: 'rgba(249,115,22,0.08)' }}
            aria-hidden="true"
          >
            &ldquo;
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0.1}
            className="text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.4] font-light relative z-10 mb-12"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
            }}
          >
            {study.testimonial.text}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            custom={0.2}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-10 h-px" style={{ background: 'rgba(249,115,22,0.4)' }} />
            <div>
              <div className="text-sm font-medium">{study.testimonial.author}</div>
              <div
                className="text-xs uppercase tracking-[0.2em] mt-1"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {study.testimonial.company}
              </div>
            </div>
            <div className="w-10 h-px" style={{ background: 'rgba(249,115,22,0.4)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════ Gallery Grid ═══════ */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Section indicator */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center gap-6 mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              03
            </motion.span>
            <motion.div
              variants={lineGrow}
              className="h-px flex-1 origin-left"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />
            <motion.span
              variants={fadeUp}
              custom={0.2}
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Gallery
            </motion.span>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0}
              className="md:col-span-7"
            >
              <div
                className="aspect-[4/3] rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(245,158,11,0.04) 100%)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {/* Replace with: <Image src={study.images[1]} alt="" fill className="object-cover" /> */}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0.15}
              className="md:col-span-5"
            >
              <div
                className="aspect-[4/3] rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(249,115,22,0.04) 100%)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {/* Replace with: <Image src={study.images[2]} alt="" fill className="object-cover" /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-32 md:py-48 px-6 md:px-12 relative">
        <div
          className="absolute inset-0"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            background: 'linear-gradient(to bottom, rgba(249,115,22,0.02) 0%, transparent 40%)',
          }}
        />

        <div className="max-w-[1000px] mx-auto text-center relative">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            custom={0}
            className="text-[10px] uppercase tracking-[0.3em] block mb-8"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Next Project?
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={revealUp}
              custom={0}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] mb-2"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Let&apos;s build
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={revealUp}
              custom={0.1}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em]"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              something great.
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            custom={0.3}
            className="mt-12"
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-4 px-10 py-5 rounded-full text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 hover:gap-6 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                color: '#050505',
              }}
            >
              Start a Conversation
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ Footer ═══════ */}
      <div className="px-6 md:px-12 pb-8">
        <div
          className="max-w-[1600px] mx-auto flex items-center justify-between pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.15)' }}>
            © {new Date().getFullYear()} Stelliform Digital
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.15)' }}>
            {study.title}
          </span>
        </div>
      </div>
    </main>
  );
}