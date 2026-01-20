'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    stars: 5,
    text: "This platform completely changed how we approach design systems. The speed and consistency we've achieved is mind-blowing. It's the standard we've been looking for.",
    author: 'Sarah Jenkins',
    role: 'Product Designer at Stripe',
    avatar: 'SJ'
  },
  {
    quote: true,
    text: "I've used every UI kit out there. Nothing comes close to the polish and flexibility of this one. It's not just a library, it's a design education.",
    author: 'Michael Chen',
    role: 'CTO at Vercel',
    avatar: 'MC'
  },
  {
    stars: 5,
    text: "We redesigned our entire SaaS dashboard in a weekend. The components are not just beautiful, they're robust and accessible.",
    author: 'David Kim',
    role: 'Founder at Slack',
    avatar: 'DK'
  },
  {
    tweet: true,
    author: 'James Doe',
    text: "Just shipped my portfolio using the new components. The attention to detail is insane. 🚀",
    avatar: 'JD'
  },
  {
    text: "Finally, a tool that bridges the gap between design and code perfectly. Our developer handoff time has been cut in half.",
    author: 'Anna K.',
    role: 'Director of Product',
    avatar: 'AK'
  },
  {
    text: "Best investment we made for our design team this year. The ROI was immediate and the support is fantastic.",
    author: 'Anna K.',
    role: 'Director of Product',
    avatar: 'AK'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-4">
          Loved by <span className="text-gray-500">passionate</span> builders
        </h2>
        <p className="text-xl text-gray-400">
          Join thousands of developers and designers who rely on our tools to ship better products, faster.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5, borderColor: 'rgba(255, 165, 0, 0.3)' }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all duration-300"
          >
            {testimonial.stars && (
              <div className="flex mb-3">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-orange-400"
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            )}
            
            {testimonial.quote && (
              <div className="text-6xl text-gray-700 mb-4"></div>
            )}
            
            {testimonial.tweet && (
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-orange-400 text-xs">✦</div>
                </div>
                <p className="text-sm text-gray-400">{testimonial.text}</p>
              </div>
            )}
            
            {!testimonial.tweet && (
              <>
                <p className="text-gray-300 mb-6">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    testimonial.avatar === 'AK' ? 'from-green-400 to-green-600' : 'from-orange-400 to-orange-600'
                  } rounded-full flex items-center justify-center text-sm font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    {testimonial.role && (
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}