'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LokaMdCaseStudy() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-200">Home</Link> <span className="mx-2">/</span>
        <Link href="/#work" className="hover:text-gray-200">Projects</Link> <span className="mx-2">/</span>
        <span className="text-gray-300">LOKA MD Case Study</span>
      </div>

      {/* Hero */}
      <header className="mb-10">
        <div className="inline-block mb-3 px-3 py-1 rounded-full border border-emerald-400/40 text-emerald-200 text-xs">
          Membership Organization
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
          LOKA MD — From Informational Site to Membership Engine
        </h1>
        <p className="text-gray-300 max-w-3xl">
          We reoriented LOKA’s web experience around a clear membership value for three generations: elders sharing heritage and Korean language, adults providing leadership and mentorship, and youth driving innovation and technology. The result: a compelling reason to join, and a platform that grows community.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://sono-demo-websites.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
          >
            View Live Website
          </a>
          <Link
            href="/#contact"
            className="px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 text-gray-200"
          >
            Start a Similar Project
          </Link>
        </div>
      </header>

      {/* Quick facts */}
      <section className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="rounded-lg border border-white/10 p-4">
          <div className="text-xs text-gray-400 mb-1">Primary Goal</div>
          <div className="text-gray-200">Increase Membership Sign-ups</div>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <div className="text-xs text-gray-400 mb-1">Key Moves</div>
          <div className="text-gray-200">Generational Value, Clear CTAs, Faster UX</div>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <div className="text-xs text-gray-400 mb-1">Outcome Highlight</div>
          <div className="text-emerald-300 font-semibold text-lg">+45% projected membership growth</div>
        </div>
      </section>

      {/* Before / After */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-white mb-4">Before vs After</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-white/10 bg-black/30"
          >
            <div className="px-4 py-3 text-sm text-gray-300 border-b border-white/10 bg-white/5">
              Before: Original LOKA Website
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src="/projects/OldLoka2.png"
                alt="Old LOKA website screenshot"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-white/10 bg-black/30"
          >
            <div className="px-4 py-3 text-sm text-gray-300 border-b border-white/10 bg-white/5">
              After: LOKA MD Redesign (Live)
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src="/projects/LokaMD2.jpg"
                alt="LOKA MD redesigned homepage"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="mb-14 grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-white/10 p-6 bg-white/[0.03]">
          <h3 className="text-xl font-semibold text-white mb-3">Problem</h3>
          <p className="text-gray-300">
            The original site primarily shared information and events without a compelling member journey or clear articulation of value. It did not differentiate the roles and benefits for different generations within the community.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-6 bg-white/[0.03]">
          <h3 className="text-xl font-semibold text-white mb-3">Solution</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Defined a clear membership narrative for elders, adults, and youth.</li>
            <li>Aligned brand tone and imagery with cultural pride and modern accessibility.</li>
            <li>Refined conversion paths with prominent CTAs and membership-oriented IA.</li>
            <li>Built a performant, extensible Next.js foundation primed for CRM and automation.</li>
          </ul>
        </div>
      </section>

      {/* Highlights */}
      <section className="mb-14">
        <h3 className="text-xl font-semibold text-white mb-4">Highlights</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-emerald-500/30 p-4 bg-emerald-500/5">
            <div className="text-sm text-emerald-300 mb-1">Generational Value</div>
            <div className="text-gray-200">Elders, Adults, and Youth each get a distinct, meaningful reason to join.</div>
          </div>
          <div className="rounded-lg border border-emerald-500/30 p-4 bg-emerald-500/5">
            <div className="text-sm text-emerald-300 mb-1">Conversion-first</div>
            <div className="text-gray-200">Join/Connect CTAs prioritized across the journey.</div>
          </div>
          <div className="rounded-lg border border-emerald-500/30 p-4 bg-emerald-500/5">
            <div className="text-sm text-emerald-300 mb-1">Performance Ready</div>
            <div className="text-gray-200">Next.js base with room for CRM integration and automation.</div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-16">
        <h3 className="text-xl font-semibold text-white mb-3">Phase 2 Roadmap</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>30–60s micro video walkthrough embedded above the fold.</li>
          <li>Interactive before/after slider (design, Lighthouse metrics).</li>
          <li>Membership funnel dashboard embed (join rate, CTR, completion).</li>
          <li>Quote + headshot from LOKA leadership.</li>
        </ul>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/#contact"
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold"
        >
          Plan Your Redesign
        </Link>
        <Link
          href="/#work"
          className="px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 text-gray-200"
        >
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
