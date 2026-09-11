import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, Sparkles, Building2, HelpCircle, RefreshCcw, Lock } from 'lucide-react';
import { Footer } from './Footer';
import { updatePageSeo } from '../lib/seo';
import { submitContactMessage } from '../lib/api';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
}

const INQUIRY_CATEGORIES = [
  {
    id: 'general',
    label: 'General Questions',
    description: 'Ask about platform capabilities, setup guide, or features.',
    icon: HelpCircle,
  },
  {
    id: 'business-pro',
    label: 'Business Pro Support',
    description: 'Assistance with custom domains, AI generation, or Pro features.',
    icon: Sparkles,
  },
  {
    id: 'multi-outlet',
    label: 'Multi-Outlet Custom Plan Requests',
    description: 'Custom pricing & centralized management for 5+ branch locations.',
    icon: Building2,
  },
  {
    id: 'billing-refund',
    label: 'Billing & Refund Questions',
    description: 'Inquire about Razorpay charges, cancellations, or duplicates.',
    icon: RefreshCcw,
  },
  {
    id: 'privacy',
    label: 'Privacy-Related Requests',
    description: 'Inquire about personal data, deletion requests, or data rights.',
    icon: Lock,
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigatePath,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [subject, setSubject] = useState('General Questions');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    updatePageSeo({
      title: 'Contact LocalWeb AI',
      description:
        'Get in touch with LocalWeb AI for platform support, Business Pro inquiries, Multi-Outlet custom plan requests, and billing assistance.',
      canonical: 'https://localwebai.website/contact',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email address, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        businessName: businessName.trim(),
        subject,
        message: message.trim(),
      });

      setSubmittedInquiryId(res.inquiryId || 'INQ-' + Date.now().toString().slice(-6));
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setName('');
    setEmail('');
    setBusinessName('');
    setSubject('General Questions');
    setMessage('');
    setSubmittedInquiryId(null);
    setErrorMessage(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">Contact Us</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 mb-3 border border-indigo-100">
              <Mail className="h-3.5 w-3.5" />
              <span>Direct Team Support</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact LocalWeb AI
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Have questions about building your business website, upgrading to Business Pro, requesting a Multi-Outlet custom plan, or billing? Our dedicated team is here to assist you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Support Categories & Direct Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-heading text-lg font-bold text-slate-900 mb-1">
                  How can we help you?
                </h2>
                <p className="text-xs text-slate-500">
                  Select an inquiry category to route your message to the appropriate specialist.
                </p>
              </div>

              <div className="space-y-3">
                {INQUIRY_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = subject === cat.label;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSubject(cat.label)}
                      className={`w-full text-left rounded-2xl border p-4 transition text-xs sm:text-sm flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center justify-between">
                          <span>{cat.label}</span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-normal">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Official Information Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs space-y-3 shadow-xs">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
                  Official Channels
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">Platform:</span>
                    <span>LocalWeb AI</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">Website:</span>
                    <a
                      href="https://localwebai.website/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      https://localwebai.website/
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">Response Time:</span>
                    <span>Typically within 24 business hours</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                {submittedInquiryId ? (
                  /* Success State */
                  <div className="py-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-slate-900">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto">
                        Thank you for contacting LocalWeb AI. Your message has been routed to our team under inquiry reference ID:
                      </p>
                      <div className="mt-3 inline-block rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs font-mono font-bold text-slate-800 border border-slate-200">
                        {submittedInquiryId}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      We will review your submission and get back to you at <strong>{email}</strong> shortly.
                    </p>
                    <div className="pt-4 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        Send Another Message
                      </button>
                      <button
                        type="button"
                        onClick={onNavigateHome}
                        className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
                      >
                        Return to Home
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Contact Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-slate-900">
                        Send a Message
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Fill out the details below and our team will get back to you promptly.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>{errorMessage}</div>
                      </div>
                    )}

                    {subject === 'Multi-Outlet Custom Plan Requests' && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                        <Building2 className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>Multi-Outlet Note:</strong> Multi-Outlet is a tailored plan for multi-branch organizations. Inquiries are reviewed individually by our team before activation.
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Your Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. ramesh@example.com"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Business Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Business Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Kumar Dental Clinic"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Subject Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {INQUIRY_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.label}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe your question, support request, or Multi-Outlet branch requirements in detail..."
                        className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Submit Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Your information is protected by our Privacy Policy. No spam.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigatePath} />
    </div>
  );
};
