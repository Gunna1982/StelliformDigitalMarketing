import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Stelliform Digital',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#070A10] text-white">
      <Navigation />
      <main className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white underline underline-offset-4"
            >
              ← Back to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/70 mb-10">Effective date: Feb 4, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <p>
                Welcome to Stelliform Digital. By accessing or using our website located at
                {' '}
                <a
                  className="text-red-300 hover:text-red-200 underline underline-offset-4"
                  href="https://www.stelliformdigital.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.stelliformdigital.com
                </a>
                , you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to all of
                these terms, please do not use this website or our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">1. Services Provided</h2>
              <p>
                Stelliform Digital provides digital marketing, web development, and consulting services. All
                services provided are subject to specific project agreements or statements of work which will
                supersede these general terms in the event of a conflict.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise stated, Stelliform Digital and/or its licensors own the intellectual property
                rights for all material on this website. This includes, but is not limited to, the design,
                layout, graphics, and text.
              </p>
              <p className="mt-3">You may view and print pages for your own personal use.</p>
              <p className="mt-3">
                You must not republish, sell, or duplicate material from this site without express written
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. User Responsibilities</h2>
              <p className="mb-3">When using this website, you agree:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Not to use the site in any way that causes damage or impairment of the site&apos;s availability.</li>
                <li>Not to use the site for any fraudulent or harmful activity.</li>
                <li>To provide accurate and current information when contacting us or requesting a quote.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">4. Limitation of Liability</h2>
              <p>
                In no event shall Stelliform Digital, nor any of its officers, directors, and employees, be held
                liable for anything arising out of or in any way connected with your use of this website.
                Stelliform Digital shall not be held liable for any indirect, consequential, or special
                liability arising out of or in any way related to your use of our services or website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">5. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services (such as tracking tools or
                social media platforms) that are not owned or controlled by Stelliform Digital. We have no
                control over, and assume no responsibility for, the content, privacy policies, or practices of
                any third-party websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">6. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our service immediately, without prior
                notice or liability, for any reason whatsoever, including without limitation if you breach the
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">7. Governing Law</h2>
              <p>
                These Terms shall be governed by and defined following the laws of the jurisdiction in which
                Stelliform Digital operates. You hereby consent to the exclusive jurisdiction of the local
                courts in all disputes arising out of or relating to the use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">8. Changes to Terms</h2>
              <p>
                Stelliform Digital reserves the right to revise these Terms at any time. By using this website,
                you are expected to review these Terms on a regular basis to ensure you understand all terms and
                conditions governing the use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">9. Contact Information</h2>
              <p className="mb-3">For any questions regarding these Terms, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Email:{' '}
                  <a
                    className="text-red-300 hover:text-red-200 underline underline-offset-4"
                    href="mailto:info@stelliformdigital.com"
                  >
                    info@stelliformdigital.com
                  </a>
                </li>
                <li>
                  Contact Form:{' '}
                  <a
                    className="text-red-300 hover:text-red-200 underline underline-offset-4"
                    href="https://www.stelliformdigital.com/contact"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.stelliformdigital.com/contact
                  </a>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 bg-white/[0.02]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
