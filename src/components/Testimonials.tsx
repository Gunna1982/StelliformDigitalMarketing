'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    stars: 5,
    text: "Stelliform transformed our local business into a regional powerhouse. Our organic traffic increased by 240% in 6 months, and we're now ranking on page one for 15+ competitive keywords. Their team operates like an extension of our own, delivering both strategic insight and flawless execution.",
    author: 'John G.',
    role: 'Business Owner, South Florida Retail Chain',
    avatar: 'JG',
    result: '240% organic traffic growth in 6 months'
  },
  {
    stars: 5,
    text: "Before Stelliform, our lead generation was inconsistent. They implemented automated systems that now generate 40-60 qualified leads monthly with zero manual effort. Most impressive: our cost per lead dropped by 65% while lead quality improved dramatically.",
    author: 'Krista B.',
    role: 'Owner, Professional Services Firm',
    avatar: 'KB',
    result: '40-60 monthly qualified leads, 65% lower cost'
  },
  {
    stars: 5,
    text: "Stelliform identified and launched a completely new revenue stream we hadn't considered. This single insight now generates $45K+ in monthly recurring revenue. Their technical implementation was flawless - we experienced zero downtime during migration.",
    author: 'William B.',
    role: 'CEO, B2B Software Company',
    avatar: 'WB',
    result: '$45K+ new monthly recurring revenue'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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
          Trusted by Businesses <span className="gradient-text">Achieving Results</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Don&rdquo;t just take our word for it - hear from clients who&rdquo;ve experienced measurable growth and transformation.
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
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 transition-all duration-300 flex flex-col"
          >
            {/* Star Rating */}
            <div className="flex mb-4">
              {[...Array(testimonial.stars)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-orange-400 text-xl"
                >
                  ★
                </motion.span>
              ))}
            </div>
            
            {/* Testimonial Text */}
            <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
              &rdquo;{testimonial.text}&rdquo;
            </p>
            
            {/* Result Highlight */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-orange-400 rounded-r">
              <div className="text-sm text-gray-400 mb-1">Key Result:</div>
              <div className="font-semibold text-orange-300">{testimonial.result}</div>
            </div>
            
            {/* Author Info */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="inline-flex flex-col md:flex-row items-center gap-4 px-8 py-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="text-orange-400 font-bold text-2xl">5.0</span>
            <span className="text-orange-400 font-semibold">★★★★★</span>
          </div>
          <span className="text-gray-300">Average client rating across all projects</span>
        </div>
        <p className="text-gray-500 text-sm mt-4">Verified results from real clients</p>
      </motion.div>
    </section>
  );
}