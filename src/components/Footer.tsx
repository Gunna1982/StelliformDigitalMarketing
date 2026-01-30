'use client';

import { motion } from 'framer-motion';

const footerLinks = {
  map: [
    { label: 'FEATURES', href: '#services' },
    { label: 'SERVICES', href: '#services' },
    { label: 'REVIEWS', href: '#' },
    { label: 'FAQS', href: '#' }
  ],
  company: [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PRICING', href: '#' },
    { label: 'CONTACT', href: '#contact' }
  ],
  legal: [
    { label: 'PRIVACY POLICY', href: '#' },
    { label: 'TERMS & CONDITIONS', href: '#' }
  ]
};

const socialLinks = [
  { icon: 'instagram', href: '#' },
  { icon: 'twitter', href: '#' },
  { icon: 'pinterest', href: '#' }
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-32 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-xl font-bold mb-4 gradient-text">
              Stelliformdigital
            </div>
            <p className="text-sm text-gray-500 mb-6">
              We offer clarity and collaboration tools to help teams effectively plan, track, and launch digital products.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, borderColor: 'rgb(239, 68, 68)' }}
                  className="w-10 h-10 border border-gray-800 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-sm">{social.icon[0].toUpperCase()}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-red-400 text-xs font-bold mb-4 tracking-wider">MAP</div>
            <div className="space-y-2 text-sm text-gray-400">
              {footerLinks.map.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5, color: 'rgb(248, 113, 113)' }}
                  className="block transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-red-400 text-xs font-bold mb-4 tracking-wider">COMPANY</div>
            <div className="space-y-2 text-sm text-gray-400">
              {footerLinks.company.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5, color: 'rgb(248, 113, 113)' }}
                  className="block transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-red-400 text-xs font-bold mb-4 tracking-wider">LEGAL</div>
            <div className="space-y-2 text-sm text-gray-400">
              {footerLinks.legal.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5, color: 'rgb(248, 113, 113)' }}
                  className="block transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Large Creative Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-7xl md:text-9xl font-bold text-gray-900 mt-16 select-none"
          style={{ lineHeight: 0.9 }}
        >
          STELLIFORM
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-right mt-8"
        >
          <a href="#contact" className="text-sm hover:text-red-400 transition inline-flex items-center gap-2">
            Start Conversation →
          </a>
        </motion.div>
      </div>
    </footer>
  );
}