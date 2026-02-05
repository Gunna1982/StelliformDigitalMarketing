import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Orlando PI Leads & Intake Optimization — Stelliform Digital',
  description:
    'We help Orlando personal injury law firms improve lead quality and conversions with conversion-first landing pages, tracking, and fast follow-up systems.',
};

export default function OrlandoPILandingPage() {
  return (
    <div className="min-h-screen bg-[#070A10] text-white">
      <Navigation />
      <main className="px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-semibold">
            FLORIDA • ORLANDO
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Orlando PI lead gen that focuses on <span className="text-red-300">signed cases</span> —
          <br className="hidden md:block" />
          not just cheap leads.
        </h1>

        <p className="mt-6 text-lg text-white/70 leading-relaxed">
          We build a conversion-focused intake funnel for personal injury firms in Orlando: landing page +
          tracking + follow-up, tuned weekly.
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
              title: 'Practice-Area Clarity',
              desc: 'Page structure that instantly communicates what cases you take (and filters the rest).',
            },
            {
              title: 'Conversion Fixes',
              desc: 'Above-the-fold CTA, phone clarity, and a form that doesn\'t kill intent.',
            },
            {
              title: 'Attribution',
              desc: 'Know which source produced the consult so you can scale winners and cut waste.',
            },
          ].map((b) => (
            <div key={b.title} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="text-sm font-semibold text-red-300">{b.title}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">{b.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]">
          <h2 className="text-2xl font-bold">What you get</h2>
          <ul className="mt-4 space-y-2 text-white/75">
            <li>• Conversion-first PI landing page (copy + design + build)</li>
            <li>• GA4 + conversion tracking (forms/calls)</li>
            <li>• Intake capture + follow-up workflow recommendations</li>
            <li>• Weekly performance notes (async Loom or quick check-in)</li>
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
