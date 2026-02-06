import { notFound } from 'next/navigation';
import CaseStudyContent from '@/components/CaseStudyContent';

// This would come from a database or CMS in production
const caseStudies = {
  'mcphillip-firm': {
    title: 'The McPhillip Firm',
    subtitle: 'Complete Digital Transformation for Personal Injury Law Firm',
    client: 'The McPhillip Firm',
    year: '2024',
    services: ['Web Development', 'Google Ads', 'Lead Generation', 'CRM Integration'],
    challenge: 'The McPhillip Firm needed a modern web presence that would effectively generate and manage leads for their personal injury practice while integrating seamlessly with their existing case management system.',
    solution: 'Developed a custom Next.js website with advanced animations, integrated Google Ads campaigns, and built a sophisticated lead scoring system connected to MyCase CRM.',
    results: [
      { metric: '300%', label: 'Increase in qualified leads' },
      { metric: '45%', label: 'Reduction in cost per lead' },
      { metric: '85%', label: 'Lead capture rate improvement' }
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Google Ads API', 'MyCase API', 'Zapier'],
    images: [
      // Hero / “after” (new site)
      '/case-studies/mcphillip/after/home-page-new.png',
      // “Before” screenshots (old site)
      '/case-studies/mcphillip/before/old-site-part-1.png',
      '/case-studies/mcphillip/before/old-site-part-2.png'
    ],
    testimonial: {
      text: "The new website and lead generation system has transformed our practice. We're seeing higher quality leads and our team can manage them more efficiently.",
      author: "Managing Partner",
      company: "The McPhillip Firm"
    }
  },
  'ach-tax-services': {
    title: 'ACH Tax Services',
    subtitle: 'Automated Client Intake & PDF Generation System',
    client: 'ACH Tax Services',
    year: '2024',
    services: ['Custom Development', 'PDF Automation', 'Workflow Design', 'System Integration'],
    challenge: 'ACH Tax Services was spending hours manually processing client intake forms and generating tax documents, leading to bottlenecks during tax season.',
    solution: 'Built a comprehensive intake system with intelligent form validation, automated PDF generation, and workflow automation to streamline their entire onboarding process.',
    results: [
      { metric: '80%', label: 'Time saved on intake processing' },
      { metric: '95%', label: 'Reduction in data entry errors' },
      { metric: '500+', label: 'Forms processed automatically' }
    ],
    technologies: ['Next.js', 'TypeScript', 'PDF-lib', 'React Hook Form', 'Tailwind CSS'],
    images: [
      '/case-studies/ach-1.jpg',
      '/case-studies/ach-2.jpg',
      '/case-studies/ach-3.jpg'
    ],
    testimonial: {
      text: "This system has been a game-changer for our tax season. What used to take hours now happens automatically.",
      author: "Lead CPA",
      company: "ACH Tax Services"
    }
  },
  'stelliform-digital': {
    title: 'Stelliformdigital',
    subtitle: 'Modern Agency Showcase with Advanced 3D Interactions',
    client: 'Stelliformdigital',
    year: '2025',
    services: ['Web Design', 'Animation', '3D Development', 'Brand Identity'],
    challenge: 'Create a portfolio website that stands out from typical agency sites and demonstrates technical expertise while maintaining excellent performance.',
    solution: 'Designed and developed a cutting-edge website featuring Three.js 3D elements, Framer Motion animations, GSAP scroll effects, and buttery-smooth Lenis scrolling.',
    results: [
      { metric: '98', label: 'Lighthouse performance score' },
      { metric: '60fps', label: 'Consistent frame rate' },
      { metric: '100%', label: 'Unique & memorable design' }
    ],
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'GSAP', 'Lenis', 'Tailwind CSS'],
    images: [
      '/case-studies/stelliform-1.jpg',
      '/case-studies/stelliform-2.jpg',
      '/case-studies/stelliform-3.jpg'
    ],
    testimonial: {
      text: "This website perfectly represents our brand and technical capabilities. It's a powerful tool for client presentations.",
      author: "Founder",
      company: "Stelliformdigital"
    }
  }
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug as keyof typeof caseStudies];

  if (!study) {
    notFound();
  }

  return <CaseStudyContent study={study} />;
}