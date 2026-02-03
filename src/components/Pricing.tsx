'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Link from 'next/link';

type BillingCycle = 'monthly' | 'quarterly';

type Plan = {
  name: string;
  description: string;
  popular?: boolean;
  badge?: string;
  
  monthlyPrice?: number;
  features?: string[];
  
  // New: Value props
  valueProps?: string[];
  compareTo?: string;
  
  custom?: boolean;
  startsAt?: string;
  typical?: string[];
};

const QUARTERLY_DISCOUNT = 0.1; // 10% off quarterly

const plans: Plan[] = [
  {
    name: 'Growth',
    monthlyPrice: 7500,
    description: 'Perfect for businesses ready to scale one channel profitably before expanding.',
    compareTo: 'Replaces: $90K/year marketing hire + $15K in tools',
    valueProps: [
      '~50 hours of expert work per month',
      'Avg. 3-5x ROI within first 90 days',
      'Week-to-week flexibility',
    ],
    features: [
      'Google Ads OR SEO (your choice): Full campaign setup, ongoing optimization, and monthly performance analysis',
      '2-3 high-converting landing pages: Design, build, and A/B test until we hit 30%+ conversion improvement',
      'Analytics & tracking: Complete setup (GA4, conversion tracking, phone call tracking) with weekly "what worked" reports',
      'Lead qualification system: Forms, routing, and follow-up recommendations to close more deals',
      'Weekly 30-min strategy calls + Slack/email access (replies within 24 hours)',
    ],
  },
  {
    name: 'Scale',
    monthlyPrice: 15000,
    description: 'For businesses ready to dominate multiple channels and move faster.',
    popular: true,
    badge: 'MOST POPULAR',
    compareTo: 'Replaces: $180K/year in salaries + $25K in tools/software',
    valueProps: [
      '~100 hours of expert work per month',
      'Multi-channel strategy = 2-3x more leads',
      'Same-day turnaround on requests',
    ],
    features: [
      'Everything in Growth, PLUS:',
      'Multi-channel execution: Google Ads + Facebook/Instagram + SEO + Email (we manage all simultaneously)',
      '5-8 landing pages + ongoing iteration: New pages monthly, constant testing, conversion rate optimization',
      'CRM setup & automation: Lead routing, follow-up sequences, pipeline tracking (MyCase, Go High Level, or similar)',
      'Advanced reporting: Custom dashboards showing cost-per-lead by channel, lead quality scores, and revenue attribution',
      'Bi-weekly strategy sessions + same-day Slack/email response',
      'Priority access: Your requests go to the front of the queue',
    ],
  },
  {
    name: 'Custom',
    custom: true,
    startsAt: '10k',
    description: 'For complex projects, full website builds, or aggressive multi-location growth.',
    compareTo: 'Replaces: Full in-house marketing team ($250K+/year)',
    typical: [
      'Complete website redesign + conversion-focused architecture (Next.js, mobile-first, sub-2s load times)',
      'Multi-location SEO: Optimize for 3-10+ locations with local landing pages and Google Business Profile management',
      'Full-funnel paid ads: Google + Meta + retargeting across 5+ campaigns with advanced audience segmentation',
      'Enterprise CRM implementation: Full pipeline setup, automation, integrations, and team training',
      'Custom reporting suite: Real-time dashboards tracking every lead source, conversion point, and revenue driver',
      'Dedicated account team: Direct access to strategist, designer, and developer',
    ],
  },
];

function formatMoney(n: number) {
  return n.toLocaleString('en-US');
}

function calcQuarterlyBill(monthly: number) {
  const raw = monthly * 3;
  const discounted = raw * (1 - QUARTERLY_DISCOUNT);
  return Math.round(discounted);
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const helperText = useMemo(() => {
    if (billingCycle === 'monthly') return 'Billed monthly. Pause or cancel anytime.';
    return `Billed quarterly. Save ${Math.round(QUARTERLY_DISCOUNT * 100)}% vs monthly.`;
  }, [billingCycle]);

  return (
    <section id="pricing" className="max-w-7xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <div className="inline-flex items-center gap-2 text-red-400 text-sm mb-4">
          <span className="text-xl">💲</span> PRICING
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-5xl font-bold mb-4">
          Growth plans that <span className="gradient-text">scale</span>
        </h2>
        <p className="text-xl text-gray-400">
          Transparent pricing. Clear deliverables. Real results.
        </p>
      </motion.div>

      {/* Billing toggle */}
      <div className="relative z-20 pointer-events-auto flex flex-col items-center justify-center gap-3 mb-12">
        <div className="inline-flex items-center gap-2 p-1 rounded-xl border border-white/10 bg-white/[0.03]">
          <button
            type="button"
            aria-pressed={billingCycle === 'monthly'}
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-gray-800 text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Monthly
          </button>

          <button
            type="button"
            aria-pressed={billingCycle === 'quarterly'}
            onClick={() => setBillingCycle('quarterly')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              billingCycle === 'quarterly'
                ? 'bg-gray-800 text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Quarterly <span className="ml-2 text-red-300 text-xs">Save 10%</span>
          </button>
        </div>

        <div className="text-sm text-gray-500">{helperText}</div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const isCustom = !!plan.custom;
          const monthly = plan.monthlyPrice ?? 0;
          const quarterlyBill = calcQuarterlyBill(monthly);

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-red-500/5 border-2 border-red-500'
                  : 'bg-white/[0.03] border border-white/10'
              }`}
            >
              {plan.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4"
                >
                  {plan.badge}
                </motion.div>
              )}

              <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">{plan.description}</p>

              {/* Price */}
              <div className="mb-4">
                {isCustom && <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Starts At</div>}

                <div className="flex items-baseline">
                  <span className="text-gray-500 text-xl">$</span>
                  <motion.span
                    key={`${plan.name}-${billingCycle}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold"
                  >
                    {isCustom ? plan.startsAt : formatMoney(monthly)}
                  </motion.span>
                  {!isCustom && <span className="text-gray-500 text-lg ml-1">/ mo</span>}
                </div>
              </div>

              {!isCustom && (
                <div className="text-xs text-gray-500 mb-6">
                  {billingCycle === 'monthly' ? (
                    <span>Paid monthly.</span>
                  ) : (
                    <span>
                      Paid quarterly:{' '}
                      <span className="text-gray-300 font-semibold">${formatMoney(quarterlyBill)}</span> every 3 months
                    </span>
                  )}
                </div>
              )}

              {/* Value props - NEW */}
              {plan.valueProps && (
                <div className="mb-6 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wide">The Value</div>
                  <div className="space-y-2">
                    {plan.valueProps.map((prop, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-red-400 mt-0.5">→</span>
                        <span>{prop}</span>
                      </div>
                    ))}
                  </div>
                  {plan.compareTo && (
                    <div className="mt-3 pt-3 border-t border-white/5 text-xs text-gray-500">
                      {plan.compareTo}
                    </div>
                  )}
                </div>
              )}

              {/* Features */}
              {!isCustom && (
                <>
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-semibold mb-4 text-gray-400 uppercase tracking-wide">
                      What&apos;s Included
                    </div>

                    {(plan.features ?? []).map((feature, i) => (
                      <motion.div
                        key={`${plan.name}-${feature}-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-red-400 mt-1 text-sm flex-shrink-0">✓</span>
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Link href="/#contact">
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block text-center w-full py-3 rounded-lg font-semibold transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                          : 'border border-gray-700 hover:border-red-400 text-white'
                      }`}
                    >
                      Get Started
                    </motion.span>
                  </Link>
                </>
              )}

              {/* Custom content */}
              {isCustom && (
                <>
                  {plan.compareTo && (
                    <div className="mb-6 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                      <div className="text-xs text-gray-500">{plan.compareTo}</div>
                    </div>
                  )}

                  <div className="text-xs font-semibold mb-4 text-gray-400 uppercase tracking-wide">
                    Typical Custom Work
                  </div>

                  <div className="space-y-3 mb-8">
                    {(plan.typical ?? []).map((item, i) => (
                      <motion.div
                        key={`${plan.name}-${item}-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-red-400 mt-1 text-sm flex-shrink-0">✓</span>
                        <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Link href="/#contact">
                    <motion.span
                      whileHover={{ scale: 1.02, borderColor: 'rgb(239, 68, 68)' }}
                      whileTap={{ scale: 0.98 }}
                      className="block text-center w-full py-3 border border-gray-700 rounded-lg transition-all text-white hover:border-red-400"
                    >
                      Book a Call
                    </motion.span>
                  </Link>

                  <div className="mt-4 text-xs text-gray-500 text-center">
                    We&rsquo;ll scope it, quote it, and deliver on time.
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom trust signals */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500 flex-wrap"
      >
        <div className="flex items-center gap-2">
          <span>🛡️</span>
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <span>✖️</span>
          <span>Cancel anytime</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📊</span>
          <span>Transparent reporting</span>
        </div>
      </motion.div>

      {/* FAQ Section - NEW */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-20 max-w-3xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-center mb-8">Common Questions</h3>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="font-semibold mb-2 text-white">What if I need to pause or cancel?</div>
            <div className="text-sm text-gray-400">
              No problem. Monthly plans can be paused or canceled with 7 days notice. We&rsquo;ll wrap up any in-progress work and hand everything over cleanly.
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="font-semibold mb-2 text-white">How fast will I see results?</div>
            <div className="text-sm text-gray-400">
              Most clients see measurable improvements within 30-60 days. Paid ads show results faster (days to weeks), while SEO builds momentum over 90-120 days. We track everything and show you what&rsquo;s working.
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="font-semibold mb-2 text-white">Do you require long-term contracts?</div>
            <div className="text-sm text-gray-400">
              No. Monthly plans are month-to-month. Quarterly plans lock in for 3 months but give you a 10% discount. That&rsquo;s it.
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="font-semibold mb-2 text-white">What makes this different from hiring someone?</div>
            <div className="text-sm text-gray-400">
              You get an entire team (strategist, designer, analyst) for less than one full-time hire. No benefits, no training, no turnover risk. Just consistent execution and results.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}