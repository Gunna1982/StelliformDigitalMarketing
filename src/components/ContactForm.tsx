'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContactMethod: '',
    bestTimeToContact: '',
    details: ''
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isValidEmail = (email: string) => {
    // Simple, pragmatic email check (catches most obvious typos)
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  };

  const isValidPhone = (phone: string) => {
    // Accepts US-style numbers with optional punctuation.
    // Requires at least 10 digits.
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isValidEmail(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid phone number (10+ digits).');
      return;
    }

    setSubmitStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredContactMethod: '',
        bestTimeToContact: '',
        details: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto py-20 px-6">
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">
            Get a free
            <br />
            firm <span className="gradient-text">teardown</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Share your info and we&rsquo;ll send a quick Loom video showing what to fix to get more consult requests.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              animate={{ scale: focused === 'firstName' ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="FIRST NAME"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                onFocus={() => setFocused('firstName')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
              />
            </motion.div>

            <motion.div
              animate={{ scale: focused === 'lastName' ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="LAST NAME"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                onFocus={() => setFocused('lastName')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              animate={{ scale: focused === 'email' ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="email"
                placeholder="EMAIL"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
              />
            </motion.div>

            <motion.div
              animate={{ scale: focused === 'phone' ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="tel"
                inputMode="tel"
                placeholder="PHONE"
                required
                autoComplete="tel"
                pattern="[0-9\s\-\(\)\+\.]{10,}"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
              />
            </motion.div>
          </div>

          {/* Step 2: preferred contact method (appears after phone entered) */}
          {formData.phone.trim().length >= 7 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <label className="block text-xs text-gray-400 mb-2">PREFERRED CONTACT METHOD</label>
              <div className="grid grid-cols-3 gap-3">
                {['Call', 'Text', 'Email'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContactMethod: m })}
                    className={`py-3 rounded-lg border text-sm transition-all bg-white/5 hover:bg-white/10 ${
                      formData.preferredContactMethod === m
                        ? 'border-red-500 text-white'
                        : 'border-white/10 text-gray-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: best time (appears after method selected) */}
          {formData.preferredContactMethod && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <label className="block text-xs text-gray-400 mb-2">BEST TIME TO CONTACT YOU</label>
              <select
                required
                value={formData.bestTimeToContact}
                onChange={(e) => setFormData({ ...formData, bestTimeToContact: e.target.value })}
                onFocus={() => setFocused('bestTimeToContact')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
              >
                <option value="" disabled>
                  Select…
                </option>
                <option value="Morning (9am–12pm)">Morning (9am–12pm)</option>
                <option value="Afternoon (12pm–5pm)">Afternoon (12pm–5pm)</option>
                <option value="Evening (5pm–8pm)">Evening (5pm–8pm)</option>
                <option value="Anytime">Anytime</option>
              </select>
            </motion.div>
          )}

          <motion.div
            animate={{ scale: focused === 'details' ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <textarea
              rows={4}
              placeholder="BRIEFLY TELL US ABOUT YOUR CASE"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              onFocus={() => setFocused('details')}
              onBlur={() => setFocused(null)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all resize-none"
            />
          </motion.div>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-center"
            >
              Thanks! We&rsquo;ll be in touch soon.
            </motion.div>
          ) : (
            <>
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  {errorMessage}
                </motion.div>
              )}
              <motion.button
                type="submit"
                disabled={submitStatus === 'submitting'}
                whileHover={submitStatus !== 'submitting' ? { scale: 1.02, boxShadow: "0 10px 30px rgba(220, 38, 38, 0.4)" } : {}}
                whileTap={submitStatus !== 'submitting' ? { scale: 0.98 } : {}}
                className={`w-full py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  submitStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Request Free Teardown →'}
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}