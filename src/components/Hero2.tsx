'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function Hero2() {
  return (
    <>
      {/* Load Iconify for icons */}
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="lazyOnload"
      />

      <div className="relative min-h-screen bg-transparent text-white overflow-hidden font-sans selection:bg-red-500/30 selection:text-red-100">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
          
          body { font-family: 'Inter', sans-serif; }

          /* Animation: Embers rising */
          @keyframes rise {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(var(--drift)); opacity: 0; }
          }

          /* Animation: The Volcano Flare */
          @keyframes shoot-flare {
            0% { transform: translate(-50%, 100%) scale(0.2); opacity: 0; }
            5% { opacity: 1; transform: translate(-50%, 50%) scale(1); }
            30% { transform: translate(-50%, -40vh) scale(1.4); opacity: 1; }
            100% { transform: translate(-50%, -120vh) scale(2); opacity: 0; }
          }

          /* Animation: Pulse for the standing beam */
          @keyframes flare-pulse {
            0%, 100% { opacity: 0.8; transform: translateX(-50%) scaleX(1); }
            50% { opacity: 1; transform: translateX(-50%) scaleX(1.15); }
          }

          /* Animation: Content Reveal */
          @keyframes blur-fade-in {
            0% { opacity: 0; filter: blur(12px); transform: translateY(20px); }
            100% { opacity: 1; filter: blur(0); transform: translateY(0); }
          }
          
          .bg-grid {
            background-size: 50px 50px;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          }
          
          .sun-surface {
            background: radial-gradient(circle at 50% 0%, 
              #ffffff 2%, 
              #fca5a5 8%, 
              #ef4444 20%, 
              #dc2626 40%, 
              #991b1b 60%, 
              #450a0a 80%, 
              transparent 100%
            );
            box-shadow: 0 -20px 100px rgba(220, 38, 38, 0.5);
          }
          
          .mega-flare {
            position: absolute;
            bottom: -100px;
            left: 50%;
            width: 105px;
            height: 525px;
            background: linear-gradient(to top, #fff, #f87171, #dc2626, #7f1d1d, transparent);
            border-radius: 50%;
            filter: blur(24px);
            mix-blend-mode: screen;
            pointer-events: none;
            opacity: 0;
            animation: shoot-flare 3.5s cubic-bezier(0.05, 0.9, 0.1, 1) forwards;
            animation-delay: 0.5s;
          }

          .solar-flare-container {
            mask-image: linear-gradient(to top, black 50%, transparent 100%);
            -webkit-mask-image: linear-gradient(to top, black 50%, transparent 100%);
          }

          .solar-flare-beam {
            background: linear-gradient(to top, 
              rgba(255, 255, 255, 0.9) 0%, 
              rgba(248, 113, 113, 0.5) 20%, 
              rgba(153, 27, 27, 0.2) 60%, 
              transparent 100%
            );
            filter: blur(16px);
            mix-blend-mode: screen;
            animation: flare-pulse 4s ease-in-out infinite;
          }

          .glass-panel {
            background: rgba(10, 10, 10, 0.6);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 
              0 0 0 1px rgba(0,0,0,1), 
              0 20px 40px -10px rgba(0,0,0,0.8),
              inset 0 1px 0 rgba(255,255,255,0.05);
          }
          
          .text-gradient {
            background: linear-gradient(to right, #ffffff, #fca5a5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .reveal-content {
            opacity: 0;
            animation: blur-fade-in 1.2s ease-out forwards;
            animation-delay: 2.1s; 
          }

          /* Iconify handling for React */
          iconify-icon {
            display: inline-block;
            vertical-align: middle;
          }
        `}</style>


        {/* MAIN SOLAR SYSTEM */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
          {/* Sun Surface - Reduced by 25% */}
          <div className="sun-surface absolute -bottom-[350px] left-1/2 -translate-x-1/2 w-[187.5vw] h-[450px] rounded-[50%_50%_0_0] blur-[10px] z-0 opacity-90"></div>
          
          {/* Glow Overlay - Reduced by 25% */}
          <div className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[90vw] h-[300px] rounded-[50%_50%_0_0] blur-[50px] mix-blend-screen z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.7)_0%,rgba(239,68,68,0.5)_20%,rgba(127,29,29,0)_70%)]"></div>
          
          <div className="solar-flare-container absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[120vh] z-20 overflow-hidden pointer-events-none">
            {/* Main vertical plasma beam - Reduced by 25% */}
            <div className="solar-flare-beam absolute bottom-0 left-1/2 -translate-x-1/2 w-21 h-full z-10"></div>
            
            {/* THE EXPLOSION (Mega Flare) */}
            <div className="mega-flare z-30"></div>

            {/* Floating Embers: Adjusted to be redder and slower */}
            
            {/* Left (Slower, ~5s - 6s) */}
            <div className="ember absolute bottom-0 w-0.5 h-0.5 bg-red-800 rounded-full animate-[rise_6s_linear_infinite]" style={{ left: '42%', '--drift': '-20px', animationDelay: '0s', opacity: 0.6 } as React.CSSProperties}></div>
            <div className="ember absolute bottom-0 w-1 h-1 bg-red-600 rounded-full animate-[rise_5.5s_linear_infinite]" style={{ left: '45%', '--drift': '-10px', animationDelay: '1.5s', opacity: 0.7 } as React.CSSProperties}></div>
            
            {/* Middle (Medium, ~4.5s - 5s) */}
            <div className="ember absolute bottom-0 w-[12px] h-[12px] bg-red-500/80 rounded-full animate-[rise_5s_linear_infinite]" style={{ left: '48%', '--drift': '5px', animationDelay: '2.3s', opacity: 0.5 } as React.CSSProperties}></div>
            <div className="ember absolute bottom-0 w-2 h-2 bg-red-200 rounded-full animate-[rise_4.8s_linear_infinite] shadow-[0_0_8px_rgba(239,68,68,0.4)]" style={{ left: '50%', '--drift': '0px', animationDelay: '0.5s', opacity: 0.6 } as React.CSSProperties}></div> 
            
            {/* Middle-Right (~4s - 4.5s) */}
            <div className="ember absolute bottom-0 w-[4px] h-[4px] bg-red-400 rounded-full animate-[rise_4.5s_linear_infinite]" style={{ left: '52%', '--drift': '15px', animationDelay: '3.1s', opacity: 0.8 } as React.CSSProperties}></div>
            <div className="ember absolute bottom-0 w-1 h-1 bg-red-300 rounded-full animate-[rise_4.2s_linear_infinite]" style={{ left: '54%', '--drift': '20px', animationDelay: '1s', opacity: 0.9 } as React.CSSProperties}></div>

            {/* Far Right (Was fastest, now slowed to ~3.5s - 4s) */}
            <div className="ember absolute bottom-0 w-[6px] h-[6px] bg-red-500 rounded-full animate-[rise_3.8s_linear_infinite]" style={{ left: '56%', '--drift': '30px', animationDelay: '0.2s', opacity: 0.7 } as React.CSSProperties}></div>
            <div className="ember absolute bottom-0 w-1.5 h-1.5 bg-red-100 rounded-full animate-[rise_3.5s_linear_infinite]" style={{ left: '58%', '--drift': '40px', animationDelay: '1.8s', opacity: 0.8 } as React.CSSProperties}></div> 
            <div className="ember absolute bottom-0 w-1 h-1 bg-red-400 rounded-full animate-[rise_4s_linear_infinite]" style={{ left: '60%', '--drift': '25px', animationDelay: '2.8s', opacity: 0.6 } as React.CSSProperties}></div>

          </div>
        </div>

        {/* Hero Content */}
        <main className="relative z-10 flex-grow flex flex-col justify-center min-h-screen pt-10">
          <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column */}
            <div className="flex flex-col items-start pt-10 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                {/* @ts-expect-error iconify-icon custom element */}
                <iconify-icon icon="solar:bolt-linear" class="text-red-400 text-sm"></iconify-icon>
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-100">Local Law Firm Lead Gen</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.95] mb-6">
                MORE CONSULTS <br />
                FOR <span className="text-neutral-500">LOCAL</span> <br />
                LAW FIRMS—<br />
                <span className="text-gradient">FAST.</span>
              </h1>

              <p className="text-neutral-400 text-base leading-relaxed max-w-md mb-8">
                We build the landing page + tracking + intake follow‑up system that turns clicks into booked consults. Perfect for local firms (PI, family, immigration) that want measurable leads.
              </p>

              {/* Updated CTAs */}
              <div className="flex flex-col items-start gap-3 reveal-content">
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href="/#contact"
                    className="h-12 px-8 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white text-sm font-semibold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105 transition-all border border-red-400/50 flex items-center justify-center"
                  >
                    Get a Free 10‑Min Firm Teardown
                  </Link>
                  <Link
                    href="/#work"
                    className="hidden sm:flex h-12 px-8 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all items-center justify-center gap-2"
                  >
                    View Case Studies
                    <span>→</span>
                  </Link>
                </div>
                <p className="text-xs text-neutral-500 ml-1">
                  Quick video teardown • Find what’s leaking consults • No obligation
                </p>
              </div>
            </div>

            {/* Right Column: Card */}
            <div className="relative flex justify-center lg:justify-end reveal-content">
              <div className="absolute inset-0 bg-red-600/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="glass-panel w-full max-w-[400px] rounded-[32px] p-1 shadow-2xl relative z-20">
                <div className="bg-[#0a0a0a] rounded-[28px] p-6 h-full relative overflow-hidden group">
                  
                  {/* Top Label */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">Viral Results</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-medium text-white mb-1">Growth Velocity</h3>
                  <p className="text-xs text-neutral-500 mb-6">Real client results, real impact.</p>

                  {/* Big Stat */}
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-5xl font-light text-white tracking-tighter">+240%</span>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-900/30 border border-red-500/20 text-[10px] font-medium text-red-400 mb-2">
                      {/* @ts-expect-error iconify-icon custom element */}
                      <iconify-icon icon="solar:arrow-right-up-linear" class="text-xs"></iconify-icon>
                      organic traffic
                    </div>
                  </div>

                  {/* Graph Visualization */}
                  <div className="relative h-24 w-full mb-6">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradientGraph" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(239, 68, 68, 0.2)" />
                          <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                        </linearGradient>
                      </defs>
                      <path d="M0 35 Q 20 35, 30 30 T 60 20 T 100 5" fill="url(#gradientGraph)" stroke="none" />
                      <path d="M0 35 Q 20 35, 30 30 T 60 20 T 100 5" fill="none" stroke="#ef4444" strokeWidth="0.8" />
                      <circle cx="100" cy="5" r="1.5" fill="#fff" stroke="#ef4444" strokeWidth="0.5" />
                    </svg>
                  </div>

                  <Link
                    href="/#work"
                    className="w-full h-10 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-semibold shadow-lg shadow-red-900/20 hover:shadow-red-900/40 transition-all border-t border-white/20 flex items-center justify-center"
                  >
                    View Full Case Study
                  </Link>

                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
                    <div className="flex items-center gap-2">
                      {/* @ts-expect-error iconify-icon custom element */}
                      <iconify-icon icon="solar:users-group-rounded-linear" class="text-sm"></iconify-icon>
                      Qualified Leads
                    </div>
                    <span className="text-white font-mono">+180%</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-600">
                    {/* @ts-expect-error iconify-icon custom element */}
                    <iconify-icon icon="solar:dollar-linear" class="text-sm"></iconify-icon>
                    Average 5:1 Marketing ROI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom System Bar (hide on mobile) */}
        <div className="fixed bottom-6 left-6 right-6 z-50 hidden sm:block">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel rounded-xl px-4 py-3 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-white">
                  {/* @ts-expect-error iconify-icon custom element */}
                  <iconify-icon icon="solar:bolt-linear" class="text-red-500 text-sm"></iconify-icon>
                  Stelliform Digital
                </div>
                <span className="text-neutral-600 text-xs">/</span>
                <span className="text-xs text-neutral-400">Growth Marketing</span>
                
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 ml-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] text-red-400 font-mono uppercase">Accepting Clients</span>
                </div>
              </div>

              <div className="hidden md:flex flex-1 max-w-md mx-auto relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-neutral-500 group-focus-within:text-white transition-colors">
                  {/* @ts-expect-error iconify-icon custom element */}
                  <iconify-icon icon="solar:magnifer-linear" class="text-sm"></iconify-icon>
                </div>
                <input type="text" placeholder="Search services..." className="w-full bg-black/20 border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all" />
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/#contact"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium shadow-md shadow-red-900/30 hover:bg-red-500 transition-all"
                >
                  Book Strategy Call
                  {/* @ts-expect-error iconify-icon custom element */}
                  <iconify-icon icon="solar:arrow-right-linear" class="text-sm"></iconify-icon>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}