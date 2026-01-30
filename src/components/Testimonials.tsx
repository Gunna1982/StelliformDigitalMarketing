'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    stars: 5,
    text: "It's rare to find a partner who truly acts like an extension of your own team, and that's precisely the experience we've had with Stelliform. Their commitment to our success felt personal, not just transactional. When we first approached them, our business was thriving locally, but our digital footprint wasn't reflecting that success. We needed someone who understood the nuances of the South Florida market and could translate our offline reputation into a powerful online presence. Stelliform delivered exactly that, and then some. They didn't just build us a website; they built a comprehensive strategy that significantly amplified our reach and engagement. Their ability to navigate complex digital landscapes and produce tangible results is genuinely impressive. It's a testament to their deep expertise and unwavering dedication. If you're a business in South Florida looking to truly cement your online authority and achieve significant growth, Stelliform is the partner you want by your side. They transform potential into undeniable success.",
    author: 'John G.',
    role: 'Business Owner, South Florida',
    avatar: 'JG'
  },
  {
    stars: 5,
    text: "Stelliform has been easy to work with and finally I feel that results are yielding. They took a deep look at how my business runs day-to-day, found the bottlenecks that were slowing me down, and then actually fixed them by putting the right systems and software in place. Everything runs smooth now, my workload feels lighter, and I can finally focus on growing instead of just keeping up. They revamped our website and really nailed the SEO and lead generation side of things. The leads coming in are no longer random traffic, I am getting calls from tailored leads. Before this, we never would have been able to handle the volume, but Stelliform had already set us up with the right infrastructure, so when the leads started flowing, it was seamless. We've seen real growth since working with them. Honestly, I can't recommend Stelliform enough. If you're looking for a team that knows how to untangle the messy parts of your business and set you up for success, they're the ones to call.",
    author: 'Krista B.',
    role: 'Business Owner',
    avatar: 'KB'
  },
  {
    stars: 5,
    text: "If you want a company that is truly dedicated, highly skilled, and capable of taking your business from a 2x to a 10x operation, this is the team to work with. The founder, Young Sono, truly embodies this philosophy—he takes his work to new heights, almost 'literally' to the stars. He conducted in-depth research on my entire company, market, and business model, and uncovered a market I hadn't even considered. This insight opened up a completely new revenue stream for us. I HIGHLY recommend Stelliform to any business—you won't regret it. I rarely leave reviews, if ever, but Stelliform absolutely deserved my recommendation.",
    author: 'Will B.',
    role: 'CEO',
    avatar: 'WB'
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
          What Our <span className="gradient-text">Clients</span> Say
        </h2>
        <p className="text-xl text-gray-400">
          Real results from businesses we&rsquo;ve helped transform and grow.
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
              &rsquo;{testimonial.text}&rsquo;
            </p>
            
            {/* Author Info */}
            <div className="flex items-center gap-3 mt-auto">
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
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-full">
          <span className="text-orange-400 font-semibold">★★★★★</span>
          <span className="text-gray-400">Rated 5.0 by our clients</span>
        </div>
      </motion.div>
    </section>
  );
}