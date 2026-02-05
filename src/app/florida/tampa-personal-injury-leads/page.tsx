import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Tampa PI Leads & Intake Optimization — Stelliform Digital',
  description:
    'We help Tampa personal injury law firms increase qualified consults with conversion-first landing pages, tracking, and speed-to-lead follow-up systems.',
};

export default function TampaPILandingPage() {
  return (
    <div className="min-h-screen bg-[#070A10] text-white">
      <Navigation />
      <main className="px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-semibold">
            FLORIDA • TAMPA BAY
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Tampa PI lead gen + intake systems built for <span className="text-red-300">speed-to-lead</span>.
        </h1>

        <p className="mt-6 text-lg text-white/70 leading-relaxed">
          If you miss calls, follow up late, or don’t know which source produced your signed cases — you’re
          leaking money. We fix the funnel and the tracking.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/#contact"
            className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 font-semibold"
          >
            GET A FREE TEARDOWN
          </Link>
          <Link
            href="/case-study/mcphillip-firm"
            className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 bg-white/[0.02]"
          >
            View proof (case study)
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Call + Form Conversions',
              desc: 'Make it obvious to call. Make forms short. Remove friction that kills intent.',
            },
            {
              title: 'Follow-Up System',
              desc: 'Simple workflow that responds fast and tracks outcomes (so you can improve).',
            },
            {
              title: 'Proof-First Pages',
              desc: 'Case results/testimonials positioned to build trust quickly — mobile-first.',
            },
          ].map((b) => (
            <div key={b.title} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="text-sm font-semibold text-red-300">{b.title}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">{b.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]">
          <h2 className="text-2xl font-bold">Common Tampa PI funnel leaks we fix</h2>
          <ul className="mt-4 space-y-2 text-white/75">
            <li>• Calls go to voicemail (no after-hours capture)</li>
            <li>• Forms are too long (or don’t route cleanly)</li>
            <li>• No conversion tracking (can’t scale what works)</li>
            <li>• Ads or SEO traffic lands on generic pages (low intent)</li>
          </ul>
        </div>

        <div className="mt-14 text-xs text-white/50 leading-relaxed">
          Note: Stelliform Digital provides marketing services, not legal advice.
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
