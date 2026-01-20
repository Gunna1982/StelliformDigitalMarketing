'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-orange-500 focus:bg-orange-500/5 transition-all"
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-orange-500 focus:bg-orange-500/5 transition-all"
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
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-orange-500 focus:bg-orange-500/5 transition-all"
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
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-orange-500 focus:bg-orange-500/5 transition-all resize-none"
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(255, 165, 0, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            Start Conversation →
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}