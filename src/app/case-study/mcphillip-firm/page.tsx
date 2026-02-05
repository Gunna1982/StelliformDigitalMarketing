import CaseStudyContent from '@/components/CaseStudyContent';

const study = {
  title: 'The McPhillip Firm',
  subtitle: 'Wix → conversion-first redesign + qualified-lead funnel',
  client: 'The McPhillip Firm (Atlanta, GA)',
  year: '2025',
  services: [
    'CRO Redesign',
    'Funnel Strategy',
    'Smart Qualification Forms',
    'Tracking & Attribution',
    'Ads Optimization (Google + Meta)',
  ],
  liveUrl: 'https://www.tmfwins.com',
  challenge:
    'The previous Wix site generated a high volume of unqualified inquiries. The firm was spending time fielding calls and forms for the wrong practice areas (criminal/DUI, real estate trust issues, etc.) instead of personal injury cases.',
  solution:
    'Redesigned the website specifically for personal injury conversion: clarified positioning, tightened practice-area messaging, and built an intake flow that qualifies leads. We connected Google Ads + Meta traffic to the right pages, optimized campaigns, and implemented tracking so every lead is captured and attributable.',
  results: [
    { metric: 'Fewer', label: 'unqualified leads' },
    { metric: 'Higher', label: 'PI lead quality' },
    { metric: 'Lower', label: 'strain on staff' },
  ],
  technologies: ['Next.js', 'Tailwind CSS', 'GA4', 'GTM', 'Meta Ads', 'Google Ads'],
  images: ['/projects/mcphillip.jpg'],
  beforeImages: [
    '/case-studies/mcphillip/before/Old Site Part 1.png',
    '/case-studies/mcphillip/before/Old Site Part 2.png',
    '/case-studies/mcphillip/before/Old Sit Part 3.png',
    '/case-studies/mcphillip/before/Old Site part 4.png',
    '/case-studies/mcphillip/before/Old site part 5.png',
    '/case-studies/mcphillip/before/Old Site Part 6.png',
    '/case-studies/mcphillip/before/Old Site Part 7.png',
  ],
  testimonial: {
    text: 'We went from overwhelming, off-target inquiries to a cleaner intake flow that attracts the right personal injury cases.',
    author: 'Firm Owner',
    company: 'The McPhillip Firm',
  },
};

export default function McPhillipFirmCaseStudyPage() {
  return <CaseStudyContent study={study} />;
}
