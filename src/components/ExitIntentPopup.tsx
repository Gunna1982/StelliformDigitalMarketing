'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'stelliform_exit_popup_dismissed_v2';
const DISMISS_DURATION_DAYS = 7; // Don't show again for 7 days after dismissal

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Store dismissal with timestamp
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ dismissed: true, timestamp: Date.now() })
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with your actual form handler
    // e.g., send to your CRM, email service, or API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Store submission so popup doesn't show again
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ submitted: true, timestamp: Date.now() })
    );

    // Close after showing success message
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    // Check if popup was previously dismissed or submitted
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const daysSince = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);

      // If submitted, never show again. If dismissed, wait DISMISS_DURATION_DAYS
      if (data.submitted || daysSince < DISMISS_DURATION_DAYS) {
        return;
      }
    }

    // Exit intent detection for desktop
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves toward the top of the viewport
      if (e.clientY <= 5 && e.relatedTarget === null) {
        setIsVisible(true);
        // Remove listener after triggering once
        document.removeEventListener('mouseout', handleMouseLeave);
      }
    };

    // Mobile fallback: Show after 25 seconds on page
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setIsVisible(true);
      }
    }, 25000);

    // Scroll-based trigger for mobile: 55% scroll depth
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const scrollPercentage =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage > 55) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    // Add listeners after a short delay to avoid immediate triggers
    const initTimer = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseLeave);
      window.addEventListener('scroll', handleScroll);
    }, 5000);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(mobileTimer);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isVisible, handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
              {/* Close button */}
              <button
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition-colors"
                aria-label="Close popup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Decorative glow */}
              <div className="pointer-events-none absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />

              {!isSubmitted ? (
                <>
                  {/* Badge */}
                  <div className="inline-block mb-4 px-3 py-1 border border-red-500/30 rounded-full text-xs text-red-400 bg-red-500/10">
                    100% Free • No Obligation
                  </div>

                  {/* Heading */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">
                    Wait! Get Your{' '}
                    <span className="gradient-text">FREE TEARDOWN</span>
                  </h3>

                  {/* Subheading */}
                  <p className="text-gray-400 mb-6">
                    Before you go, we’ll record a quick teardown and show you exactly
                    what to fix to get more qualified leads.
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {[
                      'Lead quality fixes (filter wrong-case inquiries)',
                      'Conversion improvements (above-the-fold + CTA)',
                      'Tracking checklist (no lost leads)',
                      '3 quick wins you can implement today',
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-gray-300">
                        <svg
                          className="w-5 h-5 text-red-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Your website URL"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-lg font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'GET MY FREE TEARDOWN'
                      )}
                    </motion.button>
                  </form>

                  {/* Trust note */}
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">You&apos;re All Set!</h3>
                  <p className="text-gray-400">
                    We&apos;ll send your free teardown within 24-48 hours.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
