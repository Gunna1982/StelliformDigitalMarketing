export const metadata = {
  title: 'Privacy Policy — Stelliform Digital',
};

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070A10] text-white">
      <Navigation />
      <main className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-white/70 mb-10">Effective date: Feb 4, 2026</p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <p>
              At Stelliform Digital, accessible from stelliformdigital.com, one of our main priorities is the
              privacy of our visitors. This Privacy Policy document contains types of information that is
              collected and recorded by Stelliform Digital and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              We collect several different types of information for various purposes to provide and improve our
              service to you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-white font-medium">Personal Data:</span> While using our site, we may ask you
                to provide us with certain personally identifiable information that can be used to contact or
                identify you (e.g., Name, Email address, Phone number).
              </li>
              <li>
                <span className="text-white font-medium">Usage Data:</span> We may collect information on how the
                Service is accessed and used, such as your IP address, browser type, and the pages you visit.
              </li>
              <li>
                <span className="text-white font-medium">Cookies and Tracking:</span> We use cookies to track
                activity on our service and hold certain information to enhance your user experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">Stelliform Digital uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service.</li>
              <li>To notify you about changes to our services.</li>
              <li>To provide customer support.</li>
              <li>To gather analysis or valuable information so that we can improve our website.</li>
              <li>To monitor the usage of our service and detect/prevent technical issues.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Data Transfer and Disclosure</h2>
            <p>
              Your information, including Personal Data, may be transferred to—and maintained on—computers
              located outside of your state or country where data protection laws may differ. Your consent to
              this Privacy Policy followed by your submission of such information represents your agreement to
              that transfer.
            </p>
            <p className="mt-3">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside
              parties except to provide the services you requested or when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>
              We may employ third-party companies (such as Google Analytics or CRM tools) to facilitate our
              service. These third parties have access to your Personal Data only to perform these tasks on our
              behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access, update, or delete the information we have on you.</li>
              <li>The right of rectification.</li>
              <li>The right to object to processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the &ldquo;effective date&rdquo; at the top.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Contact Us</h2>
            <p className="mb-3">If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Email:{' '}
                <a className="text-red-300 hover:text-red-200 underline underline-offset-4" href="mailto:info@stelliformdigital.com">
                  info@stelliformdigital.com
                </a>
              </li>
              <li>
                Website:{' '}
                <a className="text-red-300 hover:text-red-200 underline underline-offset-4" href="https://www.stelliformdigital.com/contact" target="_blank" rel="noreferrer">
                  www.stelliformdigital.com/contact
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
