'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CaseStudy {
  title: string;
  subtitle: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  technologies: string[];
  images: string[];
  testimonial: {
    text: string;
    author: string;
    company: string;
  };
}

export default function CaseStudyContent({ study }: { study: CaseStudy }) {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            Stelliformdigital
          </Link>
          <Link href="/#work" className="text-sm hover:text-orange-400 transition">
            ← Back to Work
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-sm text-orange-400 mb-4 tracking-wider">CASE STUDY</div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">{study.title}</h1>
            <p className="text-2xl text-gray-400 mb-8">{study.subtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-8 py-8 border-t border-b border-gray-800">
              <div>
                <div className="text-sm text-gray-500 mb-2">CLIENT</div>
                <div className="font-semibold">{study.client}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">YEAR</div>
                <div className="font-semibold">{study.year}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">SERVICES</div>
                <div className="font-semibold">{study.services.join(', ')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Image Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="px-6 mb-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl" />
          {/* Replace with actual image: <Image src={study.images[0]} alt={study.title} /> */}
        </div>
      </motion.section>

      {/* Challenge & Solution */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm text-orange-400 mb-4 tracking-wider">THE CHALLENGE</h3>
            <p className="text-xl text-gray-300 leading-relaxed">{study.challenge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm text-orange-400 mb-4 tracking-wider">THE SOLUTION</h3>
            <p className="text-xl text-gray-300 leading-relaxed">{study.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-orange-400 mb-12 tracking-wider text-center"
          >
            RESULTS
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {study.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white/[0.03] border border-white/10 rounded-2xl"
              >
                <div className="text-5xl font-bold gradient-text mb-3">{result.metric}</div>
                <div className="text-gray-400">{result.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm text-orange-400 mb-6 tracking-wider">TECHNOLOGIES</h3>
            <div className="flex flex-wrap gap-3">
              {study.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-12"
          >
            <div className="text-6xl text-orange-400/30 mb-4">&rsquo;</div>
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed italic">
              {study.testimonial.text}
            </p>
            <div>
              <div className="font-semibold">{study.testimonial.author}</div>
              <div className="text-sm text-gray-500">{study.testimonial.company}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to start your project?</h2>
            <p className="text-xl text-gray-400 mb-8">Let&rsquo;s create something amazing together.</p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Get in Touch →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}