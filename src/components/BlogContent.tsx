'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  gradient: string;
  stats: string;
  image: string;
  content: {
    intro: string;
    keyPoints: Array<{
      title: string;
      description: string;
    }>;
    actionable: string[];
    conclusion: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Marketing ROI: Why Every Dollar Needs to Work Harder",
    excerpt: "In today's economy, 83% of marketing leaders say proving ROI is their top priority. Learn why the 5:1 ROI benchmark matters and how data-driven businesses achieve 5-8x higher returns on their marketing spend.",
    category: "ROI & Analytics",
    readTime: "7 min read",
    date: "Jan 2026",
    gradient: "from-red-600 to-red-500",
    stats: "5:1 ROI",
    image: "/blog/marketing-roi.jpg", // Add this image to public/blog/
    content: {
      intro: "Marketing budgets are under more scrutiny than ever. With 83% of marketing leaders now considering ROI demonstration as their top priority (up from 68% five years ago), the pressure is on to prove that every marketing dollar generates measurable returns.",
      keyPoints: [
        {
          title: "The 5:1 Rule of Thumb",
          description: "Industry standards suggest a marketing ROI of 5:1 is solid, while 10:1 is considered exceptional. This means for every dollar spent, you should generate five dollars in return. Email marketing leads the pack with an average ROI of $42 for every $1 spent, while Google Ads typically delivers $2 for every dollar invested."
        },
        {
          title: "Why Data-Driven Businesses Win",
          description: "Businesses using data-driven personalization deliver 5-8x higher ROI on marketing spend compared to those relying on traditional approaches. The difference? They make decisions based on concrete evidence rather than assumptions, allowing them to optimize campaigns in real-time and allocate budgets to high-performing channels."
        },
        {
          title: "Beyond Vanity Metrics",
          description: "True ROI measurement goes beyond likes and impressions. Focus on metrics that matter: Customer Acquisition Cost (CAC), Customer Lifetime Value (CLV), conversion rates, and attribution across channels. 64% of companies now base their future marketing budgets on past ROI performance - making accurate measurement critical for securing future funding."
        },
        {
          title: "The Attribution Challenge",
          description: "Only 36% of marketers say they can accurately measure ROI, and 47% struggle with multi-channel attribution. The solution lies in implementing comprehensive tracking systems that follow the customer journey across all touchpoints, from first awareness through final conversion and beyond."
        }
      ],
      actionable: [
        "Calculate your current marketing ROI using: (Sales Growth - Marketing Cost) / Marketing Cost × 100",
        "Identify your highest-performing channels and reallocate budget accordingly",
        "Implement tracking systems that capture the full customer journey",
        "Set up A/B testing to continuously optimize campaign performance",
        "Focus on Customer Lifetime Value, not just immediate conversions"
      ],
      conclusion: "In an era of tightening budgets and increased accountability, understanding and improving your marketing ROI isn't optional—it's essential. Businesses that master ROI measurement gain the competitive advantage of knowing exactly which strategies drive real revenue growth, allowing them to scale confidently while competitors waste budget on guesswork."
    }
  },
  {
    id: 2,
    title: "Data-Driven Marketing: The Competitive Advantage You Can't Ignore",
    excerpt: "While only 53% of marketing decisions are based on data, businesses that embrace data-driven strategies are 6x more likely to be profitable year-over-year. Discover why the shift from guesswork to strategic insights is revolutionizing marketing.",
    category: "Strategy",
    readTime: "8 min read",
    date: "Jan 2026",
    gradient: "from-red-500 to-red-700",
    stats: "6x Profit",
    image: "/blog/data-driven-marketing.jpg", // Add this image to public/blog/
    content: {
      intro: "The marketing landscape has fundamentally shifted. While traditional marketing relied on assumptions and trial-and-error, data-driven marketing uses concrete customer insights to predict needs, personalize experiences, and optimize every dollar spent. The results speak for themselves: businesses adopting data-driven strategies are 6x more likely to be profitable year-over-year.",
      keyPoints: [
        {
          title: "The Data Advantage",
          description: "Only 53% of marketing decisions are currently based on data, creating a massive opportunity for early adopters. Companies using data-driven personalization see 5-8x higher ROI and can boost sales by 10% or more. Meanwhile, data-driven marketing can reduce costs by up to 30% through improved targeting and optimization."
        },
        {
          title: "From Mass Marketing to Precision Targeting",
          description: "Data enables hyper-personalized customer experiences that were impossible before. By analyzing browsing behavior, purchase history, and engagement patterns, marketers can segment audiences with surgical precision and deliver messages that resonate. The result? Higher conversion rates and dramatically improved customer experiences."
        },
        {
          title: "Real-Time Optimization",
          description: "The power of data-driven marketing lies in its ability to provide real-time insights. Instead of waiting months to see if a campaign worked, marketers can track performance metrics instantly, identify what's working, and make data-backed adjustments on the fly. This agility is especially crucial in fast-changing markets."
        },
        {
          title: "The Quality Challenge",
          description: "Nearly half of new data records have at least one critical error, and only 3% of data quality scores are rated acceptable by HBR. Success requires investing in data infrastructure, establishing quality standards, and ensuring compliance with privacy regulations like GDPR and CCPA. The businesses that get this right build a sustainable competitive moat."
        }
      ],
      actionable: [
        "Audit your current data sources and identify gaps in customer insights",
        "Implement a Customer Data Platform (CDP) to unify data across channels",
        "Create detailed buyer personas based on actual customer data, not assumptions",
        "Set up conversion tracking across all marketing channels",
        "Establish data quality standards and regular cleansing processes",
        "Use A/B testing to validate hypotheses and continuously improve"
      ],
      conclusion: "The shift to data-driven marketing isn't just a trend—it's the new competitive baseline. As customer expectations for personalization grow and marketing budgets face increasing scrutiny, businesses that master data-driven strategies will outpace competitors still relying on guesswork. The question isn't whether to adopt data-driven marketing, but how quickly you can implement it before your competition does."
    }
  },
  {
    id: 3,
    title: "Growth Marketing Strategies That Scale: Beyond Traditional Marketing",
    excerpt: "Growth marketing focuses on the entire customer lifecycle through experimentation and data. With email marketing delivering 3,800% ROI and businesses blogging seeing 13x more positive returns, learn the strategies driving sustainable growth in 2026.",
    category: "Growth Tactics",
    readTime: "9 min read",
    date: "Jan 2026",
    gradient: "from-red-400 to-red-600",
    stats: "13x Returns",
    image: "/blog/growth-marketing.jpg", // Add this image to public/blog/
    content: {
      intro: "Traditional marketing focuses on acquisition. Growth marketing focuses on the entire customer lifecycle—from awareness through advocacy. By combining experimentation, data analytics, and rapid iteration, growth marketing creates scalable systems that compound over time. The results? Sustainable business growth without burning through cash on expensive ads.",
      keyPoints: [
        {
          title: "Email Marketing: The Underrated Powerhouse",
          description: "Despite being one of the oldest digital channels, email marketing delivers an astounding 3,800% ROI on average—that's $38 returned for every $1 spent. Modern email marketing goes beyond newsletters, using segmentation, automation, and personalization to nurture leads and drive conversions. The key is treating your email list as a high-value asset and delivering genuine value to subscribers."
        },
        {
          title: "Content Marketing & SEO for Long-Term Growth",
          description: "Businesses that blog consistently see 13x more positive ROI than those that don't. Meanwhile, SEO delivers an average ROI of $22.24 for every dollar spent, with impact that grows over time. Unlike paid ads that stop working when you stop paying, quality content and SEO create compounding returns—your best-performing content from six months ago is still driving traffic and conversions today."
        },
        {
          title: "The Power of Referrals & Retention",
          description: "Acquiring a new customer costs 5x more than retaining an existing one. Repeat customers are significantly more valuable than one-time buyers, yet most businesses focus all their energy on new acquisition. Smart growth marketers build referral programs and loyalty initiatives that turn satisfied customers into vocal advocates, creating a self-sustaining growth engine."
        },
        {
          title: "Experimentation Over Assumptions",
          description: "Growth marketing embraces a culture of testing. Rather than launching major campaigns based on assumptions, growth marketers run rapid experiments, measure results, double down on winners, and kill losers quickly. This approach requires 77% less budget to achieve the same results as traditional marketing, because you're only scaling what's already proven to work."
        }
      ],
      actionable: [
        "Build and segment your email list—offer valuable lead magnets in exchange for signups",
        "Start a consistent blog publishing schedule (weekly minimum) focusing on topics your customers search for",
        "Implement a referral program with clear incentives for existing customers",
        "Set up conversion rate optimization (CRO) processes to test and improve your website",
        "Create automated email sequences for different customer journey stages",
        "Use retargeting ads to re-engage visitors who didn't convert initially",
        "Focus on Customer Lifetime Value (CLV) metrics, not just initial acquisition cost"
      ],
      conclusion: "Growth marketing isn't about finding a single 'growth hack' that solves everything. It's about building systems that work together: email nurturing leads, content attracting organic traffic, referrals amplifying reach, and continuous optimization improving every touchpoint. While big companies can absorb the costs of failed campaigns, small businesses need the efficiency and sustainability that growth marketing provides. The businesses that master these fundamentals will thrive while competitors burn through budgets chasing the next shiny tactic."
    }
  }
];

export default function BlogContent() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (!post) return null;

    return (
      <div className="min-h-screen bg-[#020101] text-gray-100 font-sans">
        <Navigation />
        
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 -left-4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/50">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </button>
          </div>
        </nav>

        {/* Article Content */}
        <article className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${post.gradient} text-white`}>
                {post.category}
              </span>
              <span className="text-gray-400">{post.readTime}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{post.date}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Social Sharing */}
          <div className="mb-12 flex items-center gap-4 pb-8 border-b border-white/10">
            <span className="text-sm text-gray-400">Share this article:</span>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all flex items-center justify-center group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all flex items-center justify-center group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-white hover:bg-white/10 transition-all flex items-center justify-center group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/stelliformdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-[#E4405F] hover:bg-[#E4405F]/10 transition-all flex items-center justify-center group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#E4405F] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Copy Link */}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all flex items-center justify-center group"
                title="Copy link"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              {post.content.intro}
            </p>
          </div>

          {/* Key Points */}
          <div className="space-y-8 mb-12">
            {post.content.keyPoints.map((point, index) => (
              <div key={index} className="group">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all">
                        {point.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actionable Steps */}
          <div className="mb-12 p-10 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/20 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Action Steps
            </h2>
            <ul className="space-y-4">
              {post.content.actionable.map((action, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <div className="prose prose-invert prose-lg max-w-none mb-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-white">The Bottom Line</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {post.content.conclusion}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 p-10 rounded-2xl bg-gradient-to-r from-red-950/50 to-red-900/50 border border-red-500/30 backdrop-blur-md text-center">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
              Ready to Transform Your Marketing?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Let&rsquo;s discuss how data-driven growth strategies can accelerate your business results.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50">
              Schedule a Strategy Call
            </button>
          </div>
        </article>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020101] text-gray-100 font-sans">
      <Navigation />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Stelliform Digital
              </span>
            </div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="max-w-4xl">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 text-red-300">
              Growth Marketing Insights
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Marketing That
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Drives Results
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
            Data-driven strategies, proven tactics, and actionable insights to accelerate your business growth.
          </p>
        </div>
      </div>

      {/* Featured Stats */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              <div className={`text-4xl font-black bg-gradient-to-r ${post.gradient} bg-clip-text text-transparent mb-2`}>
                {post.stats}
              </div>
              <div className="text-gray-400 text-sm">{post.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedPost(post.id)}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Image */}
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[0.02]">
                      {/* Placeholder gradient - replace with actual image */}
                      <div className={`w-full h-full bg-gradient-to-br ${post.gradient} opacity-30`}></div>
                      {/* Uncomment when you have images:
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      */}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r"></div>
                  </div>

                  {/* Right: Content */}
                  <div className="relative z-10 p-8 md:py-12 md:pr-12">
                    {/* Category and Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${post.gradient} text-white`}>
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.readTime}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{post.date}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {post.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                      <span className="font-semibold">Read Article</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${post.gradient} rounded-full filter blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 translate-x-32 -translate-y-32`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-r from-red-950/50 to-red-900/50 border border-red-500/30 backdrop-blur-md overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.2),transparent_50%)]"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent">
              Ready to Scale Your Growth?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let&rsquo;s build a data-driven marketing strategy that delivers measurable ROI and sustainable growth for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50">
                Book a Strategy Call
              </button>
              <button className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5">
                View Our Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Stelliform Digital</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2026 Stelliform Digital. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}