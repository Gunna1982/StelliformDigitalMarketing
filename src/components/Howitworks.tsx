'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Discover & Analyze',
      description: 'We audit your current marketing, identify gaps and hidden opportunities, and perform competitive analysis to understand where you stand and where you can win.',
      details: [
        'Complete marketing audit across all channels',
        'Data analysis and performance benchmarking',
        'Competitive landscape assessment',
        'Customer journey mapping'
      ],
      icon: 'ph:magnifying-glass',
      image: '/how-it-works/analyze.jpg',
      imageAlt: 'Data analytics dashboard showing marketing performance metrics'
    },
    {
      number: '02',
      title: 'Strategize',
      description: 'We build a custom growth blueprint tailored to your goals, budget, and market position. Every strategy is backed by data, not assumptions.',
      details: [
        'Custom marketing roadmap development',
        'Channel selection and budget allocation',
        'KPI framework and tracking setup',
        'Conversion funnel optimization plan'
      ],
      icon: 'ph:target',
      image: '/how-it-works/strategy.jpg',
      imageAlt: 'Strategic planning session with data-driven insights'
    },
    {
      number: '03',
      title: 'Execute & Optimize',
      description: 'We launch campaigns, track every metric, and continuously improve based on real data. You get transparent reporting and measurable ROI.',
      details: [
        'Campaign implementation and monitoring',
        'Real-time performance tracking',
        'A/B testing and optimization',
        'Monthly reporting and strategic adjustments'
      ],
      icon: 'ph:rocket-launch',
      image: '/how-it-works/optimize.jpg',
      imageAlt: 'Upward growth trend showing marketing success'
    }
  ];

  return (
    <section className="relative bg-[#020101] py-24 sm:py-32 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Icon icon="ph:gear-six" className="text-red-400 text-sm" />
            <span className="text-xs font-mono uppercase tracking-wider text-red-100">Our Process</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
            Our Data-Driven
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-300 bg-clip-text text-transparent">Growth System</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
            No guesswork. No cookie-cutter strategies. Just a proven process that turns data into growth.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} space-y-6`}>
                {/* Step Number */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-700/20 border border-red-500/30 backdrop-blur-md">
                    <Icon icon={step.icon} className="text-red-400 text-3xl" />
                  </div>
                  <span className="text-6xl sm:text-7xl font-bold text-white/5">{step.number}</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Details List */}
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-300">
                      <Icon 
                        icon="ph:check-circle" 
                        className="text-red-400 text-xl mt-0.5 flex-shrink-0"
                      />
                      <span className="text-base">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional CTA for first step */}
                {index === 0 && (
                  <div className="pt-4">
                    <a 
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white text-sm font-semibold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105 transition-all border border-red-400/50"
                    >
                      Get Your Free Audit
                      <Icon icon="ph:arrow-right" className="text-lg" />
                    </a>
                  </div>
                )}
              </div>

              {/* Image Side */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} relative group`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md">
                  {/* Image container - Fixed to fill properly */}
                  <div className="relative w-full h-full">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Gradient overlay - Made more subtle */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-red-800/5 to-transparent"></div>
                  
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020101]/80 via-transparent to-transparent"></div>
                  
                  {/* Icon overlay - Made less prominent */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Icon 
                      icon={step.icon} 
                      className="text-red-400/10 text-[120px] group-hover:text-red-400/15 transition-all duration-500"
                    />
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/30 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-semibold shadow-lg z-10">
                  Step {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md">
            <div className="bg-[#0a0a0a] rounded-xl px-8 py-6 sm:px-12 sm:py-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                Ready to Ignite Your Growth?
              </h3>
              <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
                Book a free 30-minute strategy session. We&rsquo;ll analyze your current marketing and show you exactly where you&rsquo;re leaving money on the table.
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white text-sm font-semibold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105 transition-all border border-red-400/50"
              >
                Book Your Strategy Call
                <Icon icon="ph:calendar-check" className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}