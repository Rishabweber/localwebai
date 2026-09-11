import React, { useEffect } from 'react';
import { RefreshCcw, HelpCircle, CheckCircle2, AlertCircle, Clock, ShieldCheck, Mail } from 'lucide-react';
import { LegalPageLayout } from './LegalPageLayout';
import { updatePageSeo } from '../lib/seo';

interface RefundPolicyPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
}

const TOC_ITEMS = [
  { id: 'overview', label: '1. Policy Overview' },
  { id: 'subscription-cancellation', label: '2. Subscription Cancellation' },
  { id: 'business-pro-cancellation', label: '3. Business Pro Cancellation' },
  { id: 'refund-requests', label: '4. Refund Requests' },
  { id: 'failed-payments', label: '5. Failed Payments' },
  { id: 'duplicate-payments', label: '6. Duplicate Payments' },
  { id: 'unauthorized-payments', label: '7. Unauthorized Payments' },
  { id: 'multi-outlet-plans', label: '8. Multi-Outlet Custom Plans' },
  { id: 'processing-refunds', label: '9. Processing of Refunds' },
  { id: 'contact-info', label: '10. Contact Information' },
];

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({
  onNavigateHome,
  onNavigatePath,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'LocalWeb AI Refund & Cancellation Policy',
      description:
        'Official Refund & Cancellation Policy for LocalWeb AI. Learn how to cancel your Business Pro subscription, handle duplicate payments, and request billing assistance.',
      canonical: 'https://localwebai.website/refund-policy',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      subtitle="Guidelines on cancelling subscriptions, handling billing errors, and submitting refund inquiries for LocalWeb AI plans."
      lastUpdated="September 2026"
      onNavigateHome={onNavigateHome}
      onNavigatePath={onNavigatePath}
      toc={TOC_ITEMS}
    >
      {/* 1. Policy Overview */}
      <section id="overview" className="scroll-mt-24 space-y-3">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">1</span>
          Policy Overview
        </h2>
        <p>
          At <strong>LocalWeb AI</strong> (accessible at{' '}
          <a href="https://localwebai.website/" className="text-indigo-600 hover:underline">
            https://localwebai.website/
          </a>
          ), we are committed to transparent pricing and fair billing practices. This Refund &amp; Cancellation Policy sets forth the terms and procedures for cancelling subscriptions, addressing duplicate charges, and requesting refunds for our digital website generation and hosting services.
        </p>
        <p>
          Please review this policy before purchasing a Business Pro subscription (₹499/month) or custom Multi-Outlet plan.
        </p>
      </section>

      {/* 2. Subscription Cancellation */}
      <section id="subscription-cancellation" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">2</span>
          Subscription Cancellation
        </h2>
        <p>
          You may choose to cancel your recurring paid subscription at any time. When you request cancellation, your subscription will not renew at the conclusion of your current billing period.
        </p>
        <p>
          Following cancellation, your account will remain active with full paid privileges until the end of the prepaid billing cycle, after which your account will revert to the <strong>Starter Free</strong> plan tier.
        </p>
      </section>

      {/* 3. Business Pro Cancellation */}
      <section id="business-pro-cancellation" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">3</span>
          Business Pro Cancellation
        </h2>
        <p>
          To cancel a <strong>Business Pro (₹499/month)</strong> subscription, you can submit a cancellation request through the available account/support process:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-slate-600">
          <li>
            Visit our official{' '}
            <button
              onClick={() => onNavigatePath('/contact')}
              className="text-indigo-600 font-semibold underline hover:text-indigo-700"
            >
              Contact Page
            </button>
            .
          </li>
          <li>Select <strong>"Billing or Refund Inquiries"</strong> or <strong>"Business Pro Support"</strong> from the subject dropdown.</li>
          <li>Provide your registered account email and request subscription cancellation.</li>
        </ol>
        <p>
          Our support team will process your cancellation promptly and verify that no further renewal charges will be debited through Razorpay.
        </p>
      </section>

      {/* 4. Refund Requests */}
      <section id="refund-requests" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">4</span>
          Refund Requests
        </h2>
        <p>
          Because LocalWeb AI provides instantaneous digital access to AI generation resources, cloud hosting, and website publishing immediately upon payment confirmation, refund eligibility depends on the applicable purchase/subscription terms and applicable statutory law.
        </p>
        <p>
          Refunds are not granted for change of mind or under-utilization of features after the service has been provisioned. However, we assess each legitimate refund request on a case-by-case basis where unexpected technical failures prevented service delivery.
        </p>
        <p className="font-medium text-slate-800">
          For any refund request, please direct your inquiry to the official LocalWeb AI contact/support form with your Razorpay Payment ID.
        </p>
      </section>

      {/* 5. Failed Payments */}
      <section id="failed-payments" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">5</span>
          Failed Payments
        </h2>
        <p>
          If a transaction fails during checkout due to bank declines, network dropouts, or timeout errors, no charge is captured by LocalWeb AI. If your bank account or card shows a temporary debit for a failed transaction, the banking system typically reverses the hold automatically within 3 to 7 business days in accordance with standard interbank clearance times.
        </p>
      </section>

      {/* 6. Duplicate Payments */}
      <section id="duplicate-payments" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">6</span>
          Duplicate Payments
        </h2>
        <p>
          In the event that you are charged multiple times for the same subscription period due to an accidental double-submission or gateway latency:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Submit a billing notice through our contact page with the duplicate payment reference IDs.</li>
          <li>Upon verification of duplicate charges on Razorpay, we will promptly refund the duplicate transaction back to the original payment source.</li>
        </ul>
      </section>

      {/* 7. Unauthorized or Incorrect Payments */}
      <section id="unauthorized-payments" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">7</span>
          Unauthorized or Incorrect Payments
        </h2>
        <p>
          If you observe a charge from LocalWeb AI on your statement that you believe was unauthorized or made in error, notify our billing team immediately. We will investigate the transaction logs, verify the account activity, and assist in rectifying erroneous charges in coordination with Razorpay.
        </p>
      </section>

      {/* 8. Multi-Outlet Custom Plans */}
      <section id="multi-outlet-plans" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">8</span>
          Multi-Outlet Custom Plans
        </h2>
        <p>
          Multi-Outlet arrangements involve custom pricing, bespoke onboarding, and manual account configuration for multi-location businesses. Cancellation terms, onboarding deliverables, and refund parameters for Multi-Outlet agreements are governed by the specific commercial invoice or written terms agreed upon prior to service activation.
        </p>
        <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
          Submitting a custom plan request is completely free and creates no financial obligation until terms are finalized.
        </p>
      </section>

      {/* 9. Processing of Refunds */}
      <section id="processing-refunds" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">9</span>
          Processing of Refunds
        </h2>
        <p>
          Once an eligible refund is approved by LocalWeb AI, it is initiated via Razorpay to the original payment method used during checkout (such as UPI, credit card, debit card, or net banking).
        </p>
        <p>
          Please note that bank processing and reconciliation timelines vary. Depending on your financial institution and card network, credited amounts typically reflect in your statement within 5 to 10 working days after initiation. LocalWeb AI cannot accelerate interbank clearing schedules.
        </p>
      </section>

      {/* 10. Contact Information */}
      <section id="contact-info" className="scroll-mt-24 space-y-3 pt-6 border-t border-slate-100">
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">10</span>
          Contact Information
        </h2>
        <p>
          To request subscription cancellation, submit a billing inquiry, or inquire about a refund, please contact us directly through our official support portal:
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:text-sm space-y-2">
          <p>
            <strong>Billing &amp; Support Contact Form:</strong>{' '}
            <button
              onClick={() => onNavigatePath('/contact')}
              className="text-indigo-600 font-semibold underline hover:text-indigo-700"
            >
              https://localwebai.website/contact
            </button>
          </p>
          <p className="text-slate-500">
            Please include your registered account email and any relevant Razorpay payment order numbers to help us process your request swiftly.
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
};
