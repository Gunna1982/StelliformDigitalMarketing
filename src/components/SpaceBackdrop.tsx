'use client';

import React from 'react';

/**
 * SpaceBackdrop
 * Lightweight "space" background used across multiple sections.
 * (Keeps the vibe without making content hard to read.)
 */
export default function SpaceBackdrop({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 pointer-events-none ${className}`}>
      {/* Base */}
      <div className="absolute inset-0 bg-[#050812]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />

      {/* Star specks (kept subtle on desktop, boosted on mobile) */}
      <div
        className="absolute inset-0 opacity-40 sm:opacity-28"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.95), transparent), radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.85), transparent), radial-gradient(2px 2px at 80% 20%, rgba(255,255,255,0.9), transparent)',
          backgroundSize: '420px 420px',
        }}
      />

      {/* Red glow (boosted on mobile) */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[110vw] h-[420px] rounded-[50%_50%_0_0] blur-[70px] opacity-[0.66] sm:opacity-40 mix-blend-screen bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.35)_0%,rgba(239,68,68,0.35)_22%,rgba(127,29,29,0)_70%)]" />

      {/* Readability scrim: keeps content readable while letting space show through */}
      {/* Mobile: lighter scrim so space is visible under Trusted Partners. Desktop: stronger scrim for readability. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050812]/15 to-[#070A10]/45 sm:via-[#050812]/30 sm:to-[#070A10]/70" />
    </div>
  );
}
