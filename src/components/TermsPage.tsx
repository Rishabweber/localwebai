import React, { useEffect } from 'react';
import { FileText, CheckCircle2, AlertTriangle, Shield, CreditCard, Sparkles } from 'lucide-react';
import { LegalPageLayout } from './LegalPageLayout';
import { updatePageSeo } from '../lib/seo';

interface TermsPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
}

const TOC_ITEMS = [
  { id: 'acceptance', label: '1. Acceptance of Terms' },
  { id: 'description', label: '2. Description of LocalWeb AI' },
  { id: 'account-responsibilities', label: '3. Account Responsibilities' },
  { id: 'starter-plan', label: '4. Starter Free Plan' },
  { id: 'business-pro-plan', label: '5. Business Pro (₹499/mo)' },
  { id: 'multi-outlet-plan', label: '6. Multi-Outlet Custom Plan' },
  { id: 'payments-billing', label: '7. Payments & Billing' },
  { id: 'subscription-renewal', label: '8. Subscription Renewal' },
  { id: 'user-content', label: '9. User Content' },
  { id: 'ai-generated-content', label: '10. AI-Generated Content' },
  { id: 'website-publishing', label: '11. Website Publishing' },
  { id: 'prohibited-uses', label: '12. Prohibited Uses' },
  { id: 'intellectual-property', label: '13. Intellectual Property' },
  { id: 'third-party-services', label: '14. Third-Party Services' },
  { id: 'service-availability', label: '15. Service Availability' },
  { id: 'suspension-termination', label: '16. Suspension & Termination' },
  { id: 'limitation-liability', label: '17. Limitation of Liability' },
  { id: 'changes-to-service', label: '18. Changes to Service' },
  { id: 'changes-to-terms', label: '19. Changes to Terms' },
  { id: 'governing-law', label: '20. Governing Law' },
  { id: 'contact-us', label: '21. Contact Us' },
];

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigateHome,
  onNavigatePath,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'LocalWeb AI Terms & Conditions',
      description:
        'Official Terms of Service for LocalWeb AI. Learn about our Starter, Business Pro (₹499/month), and Multi-Outlet plans, account usage, and legal terms.',
      canonical: 'https://localwebai.website/terms',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="The contractual agreement governing your use of the LocalWeb AI website builder, content generation, and hosting services."
      lastUpdated="September 2026"
      onNavigateHome={onNavigateHome}
      onNavigatePath={onNavigatePath}
      toc={TOC_ITEMS}
    >
      {/* 1. Acceptance of Terms */}
      <section id="acceptance" className="scroll-mt-24 space-y-3">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">1</span>
          Acceptance of Terms
        </h2>
        <p>
          By creating an account, generating a website, accessing our services, or subscribing to paid tiers on <strong>LocalWeb AI</strong> (accessible at{' '}
          <a href="https://localwebai.website/" className="text-indigo-600 hover:underline">
            https://localwebai.website/
          </a>
          ), you agree to be bound by these Terms &amp; Conditions ("Terms"). If you do not agree to these Terms, you may not access or use the platform.
        </p>
        <p>
          If you are using LocalWeb AI on behalf of a business, shop, clinic, or corporate entity, you represent and warrant that you possess the full legal authority to bind that entity to these Terms.
        </p>
      </section>

      {/* 2. Description of LocalWeb AI */}
      <section id="description" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">2</span>
          Description of LocalWeb AI
        </h2>
        <p>
          LocalWeb AI provides an AI-assisted web publishing suite enabling local business operators to quickly generate, customize, preview, publish, and host websites. Core features include AI copywriting generation, responsive mobile-optimized layouts, WhatsApp booking action buttons, Google Maps location integration, counter QR codes, and lead inquiry management.
        </p>
      </section>

      {/* 3. Account Responsibilities */}
      <section id="account-responsibilities" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">3</span>
          Account Responsibilities
        </h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials (email and password) and for all activities that occur under your account. You agree to notify LocalWeb AI immediately of any unauthorized use or security breach. LocalWeb AI is not liable for any losses or damages arising from your failure to protect your login credentials.
        </p>
      </section>

      {/* 4. Starter Free Plan */}
      <section id="starter-plan" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">4</span>
          Starter Free Plan
        </h2>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:text-sm space-y-1.5">
          <div className="font-bold text-slate-900">PLAN 1: Starter — Free Forever (₹0)</div>
          <p className="text-slate-600">
            The Starter Plan is provided at no monetary charge. It enables single local businesses to create 1 website, utilize up to 3 AI generations, access one-tap WhatsApp and Call buttons, Google Maps integration, operating hours display, a shareable link, and a basic printable counter QR code.
          </p>
        </div>
        <p>
          The Starter plan does not include custom domain connectivity, centralized multi-outlet lead rollups, or white-label branding removal. LocalWeb AI reserves the right to manage server capacity and adjust free tier limits with reasonable notice.
        </p>
      </section>

      {/* 5. Business Pro ₹499/month */}
      <section id="business-pro-plan" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">5</span>
          Business Pro ₹499/month
        </h2>
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 text-xs sm:text-sm space-y-1.5">
          <div className="font-bold text-indigo-950">PLAN 2: Business Pro — ₹499 / month</div>
          <p className="text-indigo-900">
            Business Pro is a paid subscription service. It unlocks up to 3 websites, unlimited AI regeneration, custom domain connection (e.g. www.yourbusiness.com), full customer inquiry capture, download of counter QR flyers, and priority platform support.
          </p>
        </div>
        <p>
          <strong>Payment Verification Requirement:</strong> Access to Business Pro features is strictly contingent upon successful, verified payment processing through Razorpay. LocalWeb AI does not unlock Pro entitlements based merely on user claims or client-side interactions; the server must confirm payment capture before entitlements are activated.
        </p>
      </section>

      {/* 6. Multi-Outlet Custom Plan */}
      <section id="multi-outlet-plan" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">6</span>
          Multi-Outlet Custom Plan
        </h2>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm space-y-1.5">
          <div className="font-bold text-amber-950">PLAN 3: Multi-Outlet — Custom Pricing</div>
          <p className="text-amber-900">
            Multi-Outlet is an enterprise-grade plan designed for franchise chains, multi-location clinics, and retail groups with 5+ branches requiring centralized headquarters lead routing, custom domain support for each branch, and dedicated onboarding.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs sm:text-sm space-y-2">
          <p className="font-semibold text-slate-900">
            Important Access Control Notice:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Multi-Outlet is NOT a free plan.</li>
            <li>Multi-Outlet does NOT activate automatically upon submitting an inquiry form or clicking "Request Custom Plan".</li>
            <li>Activation requires administrative review, approval by LocalWeb AI staff, and/or completion of the applicable custom invoice or payment process agreed upon with the user.</li>
          </ul>
        </div>
      </section>

      {/* 7. Payments and Billing */}
      <section id="payments-billing" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">7</span>
          Payments and Billing
        </h2>
        <p>
          All subscription and invoice payments are processed in Indian Rupees (₹ INR) or agreed international currencies through our payment partner, Razorpay. By initiating checkout, you authorize Razorpay and LocalWeb AI to charge your designated payment method for the applicable plan fees plus any applicable statutory taxes.
        </p>
        <p>
          LocalWeb AI does not store payment card credentials on its servers. All payment transactions comply with standard payment security protocols.
        </p>
      </section>

      {/* 8. Subscription Renewal */}
      <section id="subscription-renewal" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">8</span>
          Subscription Renewal
        </h2>
        <p>
          Business Pro is billed on a monthly recurring basis (₹499/month) unless cancelled prior to the end of the current billing cycle. You may request cancellation of your subscription at any time through your account management settings or by contacting support as detailed in our Refund &amp; Cancellation Policy.
        </p>
      </section>

      {/* 9. User Content */}
      <section id="user-content" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">9</span>
          User Content
        </h2>
        <p>
          You retain all ownership rights to the business names, logos, photos, menu items, price lists, and text descriptions you submit to LocalWeb AI ("User Content"). You grant LocalWeb AI a non-exclusive, worldwide, royalty-free license to host, store, cache, and display your User Content strictly for the purpose of operating, rendering, and delivering your website.
        </p>
        <p>
          You represent that your User Content does not infringe upon any third-party intellectual property, privacy, or publicity rights, and does not violate any applicable law.
        </p>
      </section>

      {/* 10. AI-Generated Content */}
      <section id="ai-generated-content" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">10</span>
          AI-Generated Content
        </h2>
        <p>
          LocalWeb AI utilizes advanced artificial intelligence models to assist with generating headlines, service descriptions, and localized marketing copy. While we strive for contextual relevance, AI-generated outputs are provided as drafts for your review.
        </p>
        <p className="font-medium text-slate-800">
          You are solely responsible for reviewing, verifying the factual accuracy of, editing, and approving all AI-generated content before publishing your website to customers.
        </p>
      </section>

      {/* 11. Website Publishing */}
      <section id="website-publishing" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">11</span>
          Website Publishing
        </h2>
        <p>
          When you publish a website, it becomes publicly accessible on the web via a unique subdomain/slug (e.g. <code>https://localwebai.website/site/your-business</code>) or via your custom connected domain. You may unpublish or edit your website at any time from your dashboard.
        </p>
      </section>

      {/* 12. Prohibited Uses */}
      <section id="prohibited-uses" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">12</span>
          Prohibited Uses
        </h2>
        <p>You agree not to use LocalWeb AI to:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Create websites promoting illegal activities, fraudulent schemes, counterfeit goods, or deceptive practices.</li>
          <li>Distribute malware, phishing landing pages, or unsolicited spam messages.</li>
          <li>Harass, defame, abuse, threaten, or violate the legal rights of any individual or business.</li>
          <li>Reverse-engineer, decompile, scrape, or attempt to extract the source code or proprietary AI prompts of LocalWeb AI without written consent.</li>
          <li>Circumvent or tamper with subscription gating, plan access controls, or rate limits.</li>
        </ul>
      </section>

      {/* 13. Intellectual Property */}
      <section id="intellectual-property" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">13</span>
          Intellectual Property
        </h2>
        <p>
          The LocalWeb AI brand, logo, application design, software architecture, user interface elements, templates, and algorithms are the proprietary property of LocalWeb AI. Except for your own User Content, nothing in these Terms transfers any intellectual property rights to you.
        </p>
      </section>

      {/* 14. Third-Party Services */}
      <section id="third-party-services" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">14</span>
          Third-Party Services
        </h2>
        <p>
          LocalWeb AI links to and integrates with third-party tools such as WhatsApp, Google Maps, domain registrars, and Razorpay. LocalWeb AI has no control over and assumes no liability for the performance, availability, or policies of third-party platforms.
        </p>
      </section>

      {/* 15. Service Availability */}
      <section id="service-availability" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">15</span>
          Service Availability
        </h2>
        <p>
          We strive to maintain continuous platform availability and fast website hosting. However, we do not promise or guarantee 100% uninterrupted uptime or defect-free operation. Services may occasionally be interrupted for scheduled infrastructure maintenance, software upgrades, or network events beyond our reasonable control.
        </p>
        <p className="font-semibold text-slate-900">
          No Guarantee of Commercial Results: LocalWeb AI does not guarantee specific visitor volumes, search engine rankings, customer lead volumes, or revenue increases from using generated websites.
        </p>
      </section>

      {/* 16. Account Suspension and Termination */}
      <section id="suspension-termination" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">16</span>
          Account Suspension and Termination
        </h2>
        <p>
          We reserve the right to suspend or terminate accounts and unpublish websites that violate these Terms, engage in fraudulent behavior, fail to satisfy payment obligations, or misuse platform resources. Users may delete their account at any time by contacting our support team.
        </p>
      </section>

      {/* 17. Limitation of Liability */}
      <section id="limitation-liability" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">17</span>
          Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, LocalWeb AI and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, goodwill, or business opportunities arising out of your access to or inability to use the platform.
        </p>
        <p>
          In no event shall LocalWeb AI’s total aggregate liability exceed the total amount paid by you to LocalWeb AI in the twelve (12) months immediately preceding the event giving rise to the claim.
        </p>
      </section>

      {/* 18. Changes to the Service */}
      <section id="changes-to-service" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">18</span>
          Changes to the Service
        </h2>
        <p>
          We continually enhance LocalWeb AI by adding features, refining AI capabilities, and improving usability. We reserve the right to modify or discontinue any part of the service with reasonable notice to active users.
        </p>
      </section>

      {/* 19. Changes to These Terms */}
      <section id="changes-to-terms" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">19</span>
          Changes to These Terms
        </h2>
        <p>
          We may update these Terms periodically. Notice of material revisions will be provided through the platform or by updating the "Last Updated" date. Continued use of LocalWeb AI following notice of changes constitutes your agreement to the modified Terms.
        </p>
      </section>

      {/* 20. Governing Law */}
      <section id="governing-law" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">20</span>
          Governing Law
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in India.
        </p>
      </section>

      {/* 21. Contact Us */}
      <section id="contact-us" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">21</span>
          Contact Us
        </h2>
        <p>
          If you have questions regarding these Terms &amp; Conditions, please submit your inquiry through our official contact page:
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:text-sm space-y-2">
          <p>
            <strong>LocalWeb AI Legal &amp; Platform Support:</strong>{' '}
            <button
              onClick={() => onNavigatePath('/contact')}
              className="text-indigo-600 font-semibold underline hover:text-indigo-700"
            >
              https://localwebai.website/contact
            </button>
          </p>
          <p className="text-slate-500">
            Website: <a href="https://localwebai.website/" className="hover:underline">https://localwebai.website/</a>
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
};
