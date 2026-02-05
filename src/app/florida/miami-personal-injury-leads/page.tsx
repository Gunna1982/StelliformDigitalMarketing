import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Miami PI Leads & Intake Optimization — Stelliform Digital',
  description:
    'We help Miami personal injury law firms turn more calls into signed cases with conversion-first landing pages, tracking, and intake follow-up systems.',
};

export default function MiamiPILandingPage() {
  return (
    <div className="min-h-screen bg-[#070A10] text-white">
      <Navigation />
      <main className="px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-semibold">
            FLORIDA • MIAMI
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          More qualified PI leads in <span className="text-red-300">Miami</span> —
          <br className="hidden md:block" />
          and a cleaner intake path to signed cases.
        </h1>

        <p className="mt-6 text-lg text-white/70 leading-relaxed">
          Stelliform Digital helps personal injury firms in Miami improve lead quality and conversion rate using
          a simple system: a practice-area landing page, correct tracking, and fast follow-up.
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
            View Proof
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Lead Quality Filters',
              desc: 'Reduce wrong-practice and wrong-jurisdiction inquiries with better page structure + form gating.',
            },
            {
              title: 'Speed-to-Lead',
              desc: 'A fast, simple follow-up flow (call/text/email) so leads don\'t leak to competitors.',
            },
            {
              title: 'Tracking That\'s Real',
              desc: 'Know which campaigns and pages produce consults and signed cases (not vanity metrics).',
            },
          ].map((b) => (
            <div
              key={b.title}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="text-sm font-semibold text-red-300">{b.title}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">{b.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]">
          <h2 className="text-2xl font-bold">What we build for Miami PI firms</h2>
          <ul className="mt-4 space-y-2 text-white/75">
            <li>• One conversion-first PI landing page (copy + design + build)</li>
            <li>• Call + form tracking (GA4 + events) so you can see what works</li>
            <li>• Intake capture + routing (fast follow-up recommendations)</li>
            <li>• Ongoing weekly optimization loop (small changes that compound)</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/#pricing"
              className="text-sm text-red-300 hover:text-red-200 underline underline-offset-4"
            >
              See pricing →
            </Link>
          </div>
        </div>

        <div className="mt-14 text-xs text-white/50 leading-relaxed">
          Note: We provide marketing and intake optimization services. We are not a law firm and do not provide
          legal advice.
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
