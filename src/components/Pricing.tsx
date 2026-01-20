'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type BillingCycle = 'monthly' | 'quarterly';

type Contact = {
  name: string;
  role: string;
  message: string;
  availability: string;
};

type Plan = {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
  badge?: string;
  custom?: boolean;
  features?: string[];
  contact?: Contact;
};

const plans: Plan[] = [
  {
    name: 'Growth',
    price: '7,500',
    description: 'Perfect for growing businesses with steady design needs.',
    features: [
      '45 hours of dedicated design time',
      'Two active projects at a time',
      'Twice-weekly syncs',
      '24-hour response time',
    ],
  },
  {
    name: 'Scale',
    price: '15,000',
    description: 'For teams that need to move fast and ship often.',
    popular: true,
    features: [
      '100 hours of dedicated design time',
      'Unlimited active projects',
      'Daily syncs available',
      'Same-day response time',
    ],
    badge: 'MOST POPULAR',
  },
  {
    name: 'Custom',
    price: '10k',
    description: 'Clear scope, fixed timeline, no surprises.',
    custom: true,
    contact: {
      name: 'Sarah Park',
      role: 'PROJECT MANAGER',
      message: "We'll help you choose the right plan and get you started within 3-5 days.",
      availability: '2 spots left for July',
    },
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
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
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-4">
          Simple, transparent <span className="gradient-text">pricing</span>
        </h2>
        <p className="text-xl text-gray-400">
          Choose the perfect plan for your business needs. Pause or cancel anytime.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
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

            {!plan.custom && (
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                    billingCycle === 'monthly' ? 'bg-gray-800' : 'text-gray-500'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('quarterly')}
                  className={`px-4 py-2 rounded text-sm transition-colors ${
                    billingCycle === 'quarterly' ? 'bg-gray-800' : 'text-gray-500'
                  }`}
                >
                  Quarterly
                </button>
              </div>
            )}

            <div className="mb-6">
              {plan.custom && <div className="text-sm text-gray-500 mb-2">STARTS AT</div>}
              <span className="text-gray-500 text-xl">$</span>
              <motion.span
                key={billingCycle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold"
              >
                {plan.price}
              </motion.span>
              {!plan.custom && <span className="text-gray-500">/ mo</span>}
            </div>

            {!plan.custom && (
              <>
                <p className="text-sm text-gray-500 mb-8">Pause or cancel anytime.</p>

                <div className="space-y-3 mb-8">
                  <div className="text-sm font-semibold mb-4">
                    {index === 0 ? "WHAT'S INCLUDED" : 'EVERYTHING IN GROWTH, PLUS:'}
                  </div>

                  {(plan.features ?? []).map((feature, i) => (
                    <motion.div
                      key={`${feature}-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
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

            {plan.custom && plan.contact && (
              <>
                <div className="bg-gray-900 rounded-lg p-6 mb-8 mt-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
                    <div>
                      <div className="font-semibold text-sm">{plan.contact.name}</div>
                      <div className="text-xs text-gray-500">{plan.contact.role}</div>
                    </div>
                  </div>

                  {/* Fixes react/no-unescaped-entities by generating quotes via JS */}
                  <p className="text-sm text-gray-400 mb-4">
                    {`"${plan.contact.message}"`}
                  </p>

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
        ))}
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
