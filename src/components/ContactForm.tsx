'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

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
      setFormData({ name: '', email: '', project: '', message: '' });
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
            Ready to launch
            <br />
            your <span className="gradient-text">vision?</span>
          </h2>
          <p className="text-gray-400 mb-8">
            I work with brands that believe in quality design. Let&rsquo;s build something amazing together.
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
              animate={{
                scale: focused === 'name' ? 1.02 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="NAME"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
              />
            </motion.div>
            
            <motion.div
              animate={{
                scale: focused === 'email' ? 1.02 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="email"
                placeholder="EMAIL"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
              />
            </motion.div>
          </div>

          <motion.div
            animate={{
              scale: focused === 'project' ? 1.02 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              placeholder="PROJECT TYPE / BUDGET"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              onFocus={() => setFocused('project')}
              onBlur={() => setFocused(null)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-red-500 focus:bg-red-500/5 transition-all"
            />
          </motion.div>

          <motion.div
            animate={{
              scale: focused === 'message' ? 1.02 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <textarea
              rows={4}
              placeholder="ANYTHING WE SHOULD KNOW?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocused('message')}
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
                {submitStatus === 'submitting' ? 'Sending...' : 'Start Conversation →'}
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}