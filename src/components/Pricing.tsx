'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type BillingCycle = 'monthly' | 'quarterly';

type Contact = {
  name: string;
  role: string;
  message: string;
  availability: string;
};

type Plan = {
  name: string;
  monthlyPrice?: number; // for Growth/Scale
  description: string;
  popular?: boolean;
  badge?: string;
  custom?: boolean;
  features?: string[];
  contact?: Contact;
  startsAt?: string; // for Custom
};

const QUARTERLY_DISCOUNT = 0.1; // 10% off when billed quarterly

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
    description: 'Clear scope, fixed timeline, no surprises.',
    contact: {
      name: 'Sarah Park',
      role: 'PROJECT MANAGER',
      message: "We'll help you choose the right plan and get you started within 3-5 days.",
      availability: '2 spots left for July',
    },
  },
];

function formatMoney(n: number) {
  return n.toLocaleString('en-US');
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const helperText = useMemo(() => {
    if (billingCycle === 'monthly') return 'Billed monthly. Pause or cancel anytime.';
    return `Billed quarterly. Save ${Math.round(QUARTERLY_DISCOUNT * 100)}% vs monthly.`;
  }, [billingCycle]);

  function calcDisplayedMonthlyEquivalent(monthly: number) {
    // We still display as "/ mo" (monthly equivalent) to keep the UI consistent,
    // but the total billed quarterly will be shown below.
    return monthly;
  }

  function calcQuarterlyBill(monthly: number) {
    const raw = monthly * 3;
    const discounted = raw * (1 - QUARTERLY_DISCOUNT);
    return Math.round(discounted);
  }

  return (
    <section id="pricing" className="max-w-7xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <div className="inline-flex items-center gap-2 text-orange-400 text-sm mb-4">
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

      {/* GLOBAL billing toggle (one time, not repeated per card) */}
      <div className="flex flex-col items-center justify-center gap-3 mb-12">
        <div className="inline-flex items-center gap-2 p-1 rounded-xl border border-white/10 bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              billingCycle === 'monthly' ? 'bg-gray-800' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('quarterly')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              billingCycle === 'quarterly' ? 'bg-gray-800' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Quarterly <span className="ml-2 text-orange-300 text-xs">Save 10%</span>
          </button>
        </div>

        <div className="text-sm text-gray-500">{helperText}</div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const isCustom = !!plan.custom;

          const monthly = plan.monthlyPrice ?? 0;
          const monthlyEquivalent = calcDisplayedMonthlyEquivalent(monthly);
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
                  ? 'bg-orange-500/5 border-2 border-orange-500'
                  : 'bg-white/[0.03] border border-white/10'
              }`}
            >
              {plan.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  className="bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4"
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
                  {isCustom
                    ? plan.startsAt
                    : formatMoney(monthlyEquivalent)}
                </motion.span>

                {!isCustom && <span className="text-gray-500">/ mo</span>}
              </div>

              {!isCustom && (
                <div className="text-sm text-gray-500 mb-8">
                  {billingCycle === 'monthly' ? (
                    <span>Paid monthly.</span>
                  ) : (
                    <span>
                      Paid quarterly: <span className="text-gray-300 font-semibold">${formatMoney(quarterlyBill)}</span> every 3 months
                    </span>
                  )}
                </div>
              )}

              {/* Features list */}
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
                        <span className="text-orange-400 mt-0.5">✓</span>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                        : 'border border-gray-700 hover:border-orange-400'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </>
              )}

              {/* Custom card */}
              {isCustom && plan.contact && (
                <>
                  <div className="bg-gray-900 rounded-lg p-6 mb-8 mt-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
                      <div>
                        <div className="font-semibold text-sm">{plan.contact.name}</div>
                        <div className="text-xs text-gray-500">{plan.contact.role}</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4">{`"${plan.contact.message}"`}</p>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-gray-500">{plan.contact.availability}</span>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, borderColor: 'rgb(249, 115, 22)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border border-gray-700 rounded-lg transition-all"
                  >
                    Book a Call
                  </motion.button>
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
