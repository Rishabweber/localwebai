import React, { useEffect } from 'react';
import { Shield, Lock, CreditCard, Eye, Server, RefreshCw, Mail, CheckCircle } from 'lucide-react';
import { LegalPageLayout } from './LegalPageLayout';
import { updatePageSeo } from '../lib/seo';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
}

const TOC_ITEMS = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'info-we-collect', label: '2. Information We Collect' },
  { id: 'account-info', label: '3. Account Information' },
  { id: 'business-info', label: '4. Business Information' },
  { id: 'contact-inquiry-info', label: '5. Contact & Inquiries' },
  { id: 'usage-technical-info', label: '6. Website Usage & Technical' },
  { id: 'how-we-use-info', label: '7. How We Use Information' },
  { id: 'payment-info', label: '8. Payment Information' },
  { id: 'razorpay-processing', label: '9. Razorpay Processing' },
  { id: 'cookies-technologies', label: '10. Cookies & Storage' },
  { id: 'data-security', label: '11. Data Security' },
  { id: 'data-retention', label: '12. Data Retention' },
  { id: 'third-party-services', label: '13. Third-Party Services' },
  { id: 'user-rights-choices', label: '14. User Rights & Choices' },
  { id: 'childrens-privacy', label: '15. Children’s Privacy' },
  { id: 'policy-updates', label: '16. Policy Updates' },
  { id: 'contact-us', label: '17. Contact Us' },
];

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigateHome,
  onNavigatePath,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'LocalWeb AI Privacy Policy',
      description:
        'Read how LocalWeb AI collects, handles, and protects account, business, and inquiry data. Learn about our Razorpay payment processing and privacy standards.',
      canonical: 'https://localwebai.website/privacy-policy',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How LocalWeb AI collects, uses, and safeguards information when you create websites, manage inquiries, or subscribe to our services."
      lastUpdated="September 2026"
      onNavigateHome={onNavigateHome}
      onNavigatePath={onNavigatePath}
      toc={TOC_ITEMS}
    >
      {/* 1. Introduction */}
      <section id="introduction" className="scroll-mt-24 space-y-3">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">1</span>
          Introduction
        </h2>
        <p>
          Welcome to <strong>LocalWeb AI</strong> (accessible at{' '}
          <a href="https://localwebai.website/" className="text-indigo-600 hover:underline">
            https://localwebai.website/
          </a>
          ). LocalWeb AI is an AI-powered platform created to assist local shops, healthcare clinics, beauty salons, restaurants, and neighborhood service businesses in generating and maintaining modern, mobile-friendly websites.
        </p>
        <p>
          This Privacy Policy explains what information we collect from you, how that data is used and stored, and the precautions we implement to protect your privacy when you use our website, tools, editor, or paid subscription services. By accessing or using LocalWeb AI, you acknowledge the collection and handling of your information as outlined in this policy.
        </p>
      </section>

      {/* 2. Information We Collect */}
      <section id="info-we-collect" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">2</span>
          Information We Collect
        </h2>
        <p>
          LocalWeb AI may collect information users voluntarily provide, such as your name, email address, phone/WhatsApp number, business name, business details, and information submitted through forms or during account setup and website generation.
        </p>
        <p>
          We do not require you to provide sensitive personal identification documents, government numbers, or personal biometrics. We only gather data reasonably necessary to provide, support, and improve our website generation platform.
        </p>
      </section>

      {/* 3. Account Information */}
      <section id="account-info" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">3</span>
          Account Information
        </h2>
        <p>
          When you register for an account or sign in to LocalWeb AI, we collect:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Your full name and preferred display name.</li>
          <li>Your email address (used for account access, notifications, and security).</li>
          <li>Cryptographically salted password hashes (we never store plain text passwords).</li>
          <li>Account plan tier (Starter Free, Business Pro, or Multi-Outlet custom plan) and current subscription status.</li>
        </ul>
      </section>

      {/* 4. Business Information */}
      <section id="business-info" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">4</span>
          Business Information
        </h2>
        <p>
          To generate customized, localized websites, our AI wizard gathers basic public commercial information you submit, including:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Business name, category (e.g., salon, clinic, bakery, cafe), and neighborhood/city location.</li>
          <li>Public contact details such as business phone numbers and WhatsApp booking numbers.</li>
          <li>Operating hours, service catalog items, descriptions, and indicative pricing.</li>
          <li>Physical store address for Google Maps navigation integration.</li>
        </ul>
        <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
          Note: The business information you configure for publication is intended to be displayed publicly on your generated website so that your customers can find and contact you.
        </p>
      </section>

      {/* 5. Contact/Inquiry Information */}
      <section id="contact-inquiry-info" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">5</span>
          Contact/Inquiry Information
        </h2>
        <p>
          When visitors submit booking inquiries, service requests, or contact messages through forms on your published website or on LocalWeb AI’s direct support form, we store:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>The inquirer’s name, phone number, and email address.</li>
          <li>Selected service or subject line and message content.</li>
          <li>Submission timestamp and associated website project reference.</li>
        </ul>
        <p>
          This data is stored on our secure servers so that business owners can review customer leads directly within their authenticated dashboard.
        </p>
      </section>

      {/* 6. Website Usage and Technical Information */}
      <section id="usage-technical-info" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">6</span>
          Website Usage and Technical Information
        </h2>
        <p>
          When you browse LocalWeb AI, our web servers and performance monitoring systems automatically collect standard, non-identifying telemetry data, including:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Browser type, operating system, device screen resolution, and language settings.</li>
          <li>Aggregated page view counts, visitor clicks on WhatsApp/Call CTA buttons, and website interaction counts.</li>
          <li>IP addresses collected strictly for DDoS prevention, rate-limiting, and error diagnostics.</li>
        </ul>
      </section>

      {/* 7. How We Use Information */}
      <section id="how-we-use-info" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">7</span>
          How We Use Information
        </h2>
        <p>We process your information for the following legitimate purposes:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>To generate, host, render, and update your business website using AI algorithms.</li>
          <li>To authenticate user sessions, protect against unauthorized access, and manage subscription access tiers.</li>
          <li>To deliver incoming customer inquiries and leads to your private dashboard.</li>
          <li>To process subscription payments and generate billing records in coordination with Razorpay.</li>
          <li>To provide customer support, review custom Multi-Outlet inquiries, and resolve technical issues.</li>
        </ul>
        <p className="font-semibold text-slate-900">
          We do NOT sell, rent, or trade your personal data, customer inquiries, or contact lists to third-party data brokers or advertising networks.
        </p>
      </section>

      {/* 8. Payment Information */}
      <section id="payment-info" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">8</span>
          Payment Information
        </h2>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <CreditCard className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-1">Strict Payment Data Isolation:</strong>
            LocalWeb AI does NOT collect, store, or have access to your sensitive payment card numbers, CVVs, expiration dates, UPI PINs, or net banking passwords. All payment transactions are executed securely through our certified payment processor.
          </div>
        </div>
        <p>
          LocalWeb AI only retains non-sensitive transaction metadata necessary for audit, plan provisioning, and support:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Payment order identifier (e.g., Razorpay Order ID and Payment ID).</li>
          <li>Transaction amount and currency (e.g., ₹499 INR).</li>
          <li>Transaction timestamp and payment verification status (created, verified, or failed).</li>
        </ul>
      </section>

      {/* 9. Razorpay and Payment Processing */}
      <section id="razorpay-processing" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">9</span>
          Razorpay and Payment Processing
        </h2>
        <p>
          Subscription billing for the Business Pro plan (₹499/month) and custom invoice payments are processed through <strong>Razorpay</strong> (Razorpay Software Private Limited). When you initiate checkout, payment details are transmitted directly to Razorpay over TLS/HTTPS encrypted connections adhering to PCI-DSS compliant standards.
        </p>
        <p>
          Razorpay’s use and storage of your payment data is governed by the Razorpay Privacy Policy and Terms of Service. LocalWeb AI receives cryptographic confirmation signatures from Razorpay via secured server-to-server webhooks to verify successful activation.
        </p>
      </section>

      {/* 10. Cookies and Similar Technologies */}
      <section id="cookies-technologies" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">10</span>
          Cookies and Similar Technologies
        </h2>
        <p>
          LocalWeb AI uses client-side Web Storage (such as browser LocalStorage and essential session tokens) solely to maintain your signed-in state across browser sessions and preserve active website editor drafts.
        </p>
        <p>
          We do not deploy intrusive third-party cross-site behavioral tracking cookies. You may clear your browser cookies and LocalStorage at any time through your browser settings, which will sign you out of your current session.
        </p>
      </section>

      {/* 11. Data Security */}
      <section id="data-security" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">11</span>
          Data Security
        </h2>
        <p>
          We implement industry-standard administrative, physical, and technical safeguards to protect stored data from unauthorized access, loss, or alteration. These measures include:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Mandatory HTTPS encryption for all browser traffic and API interactions.</li>
          <li>Secure server-side storage of all API keys, Razorpay secrets, and webhook credentials.</li>
          <li>Password hashing using cryptographically strong salt algorithms.</li>
          <li>Role-based access control restricting administrative review tools strictly to verified staff.</li>
        </ul>
        <p className="text-xs text-slate-500">
          While we follow rigorous security standards, no electronic transmission over the internet or digital storage system can be guaranteed 100% immune from security threats. We encourage users to maintain unique, robust passwords.
        </p>
      </section>

      {/* 12. Data Retention */}
      <section id="data-retention" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">12</span>
          Data Retention
        </h2>
        <p>
          We retain your account information, generated websites, and received inquiries for as long as your account remains active or as required to provide ongoing services. If you delete a website or request account deletion, associated draft content and inquiry records will be removed or anonymized in accordance with our standard backup cycle, unless retention is required for legal, tax, or fraud prevention obligations.
        </p>
      </section>

      {/* 13. Third-Party Services */}
      <section id="third-party-services" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">13</span>
          Third-Party Services
        </h2>
        <p>
          LocalWeb AI integrates with selected third-party service providers to deliver specialized functionality:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li><strong>Razorpay:</strong> Payment processing and subscription management.</li>
          <li><strong>Google Gemini AI:</strong> Processing business inputs to draft localized website copywriting and headlines.</li>
          <li><strong>Google Maps &amp; WhatsApp:</strong> Enabling one-tap directions and direct customer messaging on published sites.</li>
          <li><strong>Cloud Run &amp; DNS Infrastructure:</strong> Scalable cloud hosting and SSL certificate termination.</li>
        </ul>
        <p>
          Each third-party service operates under its own terms and privacy practices. We encourage you to review their independent policies when using their integrated capabilities.
        </p>
      </section>

      {/* 14. User Rights and Choices */}
      <section id="user-rights-choices" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">14</span>
          User Rights and Choices
        </h2>
        <p>
          Depending on your location and applicable data protection regulations, you may have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Access the personal and business details associated with your account.</li>
          <li>Modify or update your business profile, contact numbers, and website content through your dashboard.</li>
          <li>Unpublish or delete your generated websites at any time.</li>
          <li>Request deletion of your account and customer inquiry logs by contacting our support team.</li>
        </ul>
        <p>
          To submit a privacy or data request, please contact us through our official{' '}
          <button
            onClick={() => onNavigatePath('/contact')}
            className="text-indigo-600 font-semibold underline hover:text-indigo-700"
          >
            Contact Page
          </button>
          .
        </p>
      </section>

      {/* 15. Children's Privacy */}
      <section id="childrens-privacy" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">15</span>
          Children’s Privacy
        </h2>
        <p>
          LocalWeb AI is designed exclusively for business owners, operators, and professionals capable of entering into binding commercial agreements. We do not knowingly solicit or collect personal information from individuals under the age of 18. If we become aware that personal information of a minor has been gathered without verified parental consent, we will take prompt steps to delete that data.
        </p>
      </section>

      {/* 16. Policy Updates */}
      <section id="policy-updates" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">16</span>
          Policy Updates
        </h2>
        <p>
          We may revise this Privacy Policy periodically to reflect technological changes, new platform features, or operational requirements. When updates occur, the "Last Updated" date at the top of this document will be updated. Your continued use of LocalWeb AI following the publication of changes signifies your acknowledgment of the revised terms.
        </p>
      </section>

      {/* 17. Contact Us */}
      <section id="contact-us" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">17</span>
          Contact Us
        </h2>
        <p>
          If you have questions, comments, or data privacy requests regarding this Privacy Policy, please reach out through our official platform contact form:
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:text-sm space-y-2">
          <p>
            <strong>LocalWeb AI Support:</strong> Contact us directly via{' '}
            <button
              onClick={() => onNavigatePath('/contact')}
              className="text-indigo-600 font-semibold underline hover:text-indigo-700"
            >
              https://localwebai.website/contact
            </button>
          </p>
          <p className="text-slate-500">
            Official website: <a href="https://localwebai.website/" className="hover:underline">https://localwebai.website/</a>
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
};
