'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type BillingCycle = 'monthly' | 'quarterly';

type Plan = {
  name: string;
  description: string;
  popular?: boolean;
  badge?: string;

  // Growth/Scale
  monthlyPrice?: number;
  features?: string[];

  // Custom
  custom?: boolean;
  startsAt?: string;
  typical?: string[];
};

const QUARTERLY_DISCOUNT = 0.1; // 10% off quarterly

const plans: Plan[] = [
  {
    name: 'Growth',
    monthlyPrice: 7500,
    description: 'For businesses that want consistent growth execution and clean, fast shipping.',
    features: [
      '1 primary growth channel (SEO or Ads)',
      'Landing page + conversion improvements',
      'Tracking + simple reporting (what worked, what to do next)',
      'Weekly syncs + 24-hour response time',
    ],
  },
  {
    name: 'Scale',
    monthlyPrice: 15000,
    description: 'For teams that want to move fast across multiple growth channels.',
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      'Everything in Growth, plus:',
      '2–3 growth channels (Ads + SEO + Email/Social)',
      'More landing pages + ongoing iteration',
      'Automation + CRM improvements',
      'Faster turnaround + same-day response time',
    ],
  },
  {
    name: 'Custom',
    custom: true,
    startsAt: '10k',
    description: 'For complex builds, aggressive growth targets, or multi-channel execution.',
    typical: [
      'Full website build + landing page system',
      'Paid ads (Google/Meta) + conversion tracking',
      'CRM setup + automation (pipelines, follow-ups, routing)',
      'Local SEO or multi-location SEO',
      'Custom dashboards + reporting (what drove calls/leads)',
      'Integrations (forms → CRM → email/SMS → analytics)',
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
          Choose a tier based on how fast you want to move and how much you want handled.
        </p>
      </motion.div>

      {/* Global toggle (click-safe) */}
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
              className={`rounded-2xl p-10 transition-all duration-300 ${
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
              <p className="text-gray-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                {isCustom && <div className="text-sm text-gray-500 mb-2">STARTS AT</div>}

                <span className="text-gray-500 text-xl">$</span>

                <motion.span
                  key={`${plan.name}-${billingCycle}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-bold"
                >
                  {isCustom ? plan.startsAt : formatMoney(monthly)}
                </motion.span>

                {!isCustom && <span className="text-gray-500">/ mo</span>}
              </div>

              {!isCustom && (
                <div className="text-sm text-gray-500 mb-8">
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

              {/* Growth/Scale features */}
              {!isCustom && (
                <>
                  <div className="space-y-3 mb-8">
                    <div className="text-sm font-semibold mb-4">
                      {plan.name === 'Growth' ? "WHAT'S INCLUDED" : 'SCALE INCLUDES'}
                    </div>

                    {(plan.features ?? []).map((feature, i) => (
                      <motion.div
                        key={`${plan.name}-${feature}-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-red-400 mt-0.5">✓</span>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block text-center w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-red-600 to-red-500'
                        : 'border border-gray-700 hover:border-red-400'
                    }`}
                  >
                    Get Started
                  </motion.a>
                </>
              )}

              {/* Custom content (no Sarah Park card) */}
              {isCustom && (
                <>
                  <div className="text-sm font-semibold mb-4">TYPICAL CUSTOM WORK</div>

                  <div className="space-y-3 mb-8">
                    {(plan.typical ?? []).map((item, i) => (
                      <motion.div
                        key={`${plan.name}-${item}-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-red-400 mt-0.5">✓</span>
                        <span className="text-sm text-gray-200/90">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02, borderColor: 'rgb(239, 68, 68)' }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center w-full py-3 border border-gray-700 rounded-lg transition-all"
                  >
                    Book a Call
                  </motion.a>

                  <div className="mt-4 text-xs text-gray-500">
                    We’ll scope it fast and share exact deliverables + timeline.
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

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
      </motion.div>
    </section>
  );
}
