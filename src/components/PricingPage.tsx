import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  ArrowLeft,
  X,
} from 'lucide-react';
import { Footer } from './Footer';
import { updatePageSeo } from '../lib/seo';

interface PricingPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
  onStartWizard: () => void;
  onSelectPlan?: (plan: 'starter' | 'pro' | 'multi') => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigateHome,
  onNavigatePath,
  onStartWizard,
  onSelectPlan,
}) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  useEffect(() => {
    updatePageSeo({
      title: 'LocalWeb AI Pricing — Transparent Plans for Local Businesses',
      description:
        'Compare LocalWeb AI plans: Starter Free Forever (₹0), Business Pro (₹499/mo), and Multi-Outlet custom rollout. No hidden fees or surprise renewal costs.',
      canonical: 'https://localwebai.website/pricing',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const comparisonFeatures = [
    { name: 'Business Websites Included', starter: '1 Website', pro: 'Up to 3 Websites', multi: 'Unlimited / Custom' },
    { name: 'AI Website Generation', starter: '3 Free Generations', pro: 'Unlimited AI Regenerations', multi: 'Unlimited AI Regenerations' },
    { name: '1-Tap WhatsApp Booking Button', starter: 'Included', pro: 'Included', multi: 'Included' },
    { name: 'Direct Phone Call Button', starter: 'Included', pro: 'Included', multi: 'Included' },
    { name: 'Google Maps Directions', starter: 'Included', pro: 'Included', multi: 'Included' },
    { name: 'Business Hours & Schedule', starter: 'Included', pro: 'Included', multi: 'Included' },
    { name: 'Printable Counter QR Code', starter: 'Standard Resolution', pro: 'High-Resolution Vector', multi: 'High-Resolution Multi-Branch' },
    { name: 'Visual Section Editor', starter: 'Basic Editing', pro: 'Advanced Customization', multi: 'Advanced Multi-Location' },
    { name: 'Remove LocalWeb AI Branding', starter: 'No (Branding included)', pro: 'Yes (100% Whitelabel)', multi: 'Yes (Custom Branding)' },
    { name: 'Lead & Inquiry Management', starter: 'Restricted', pro: 'Full Leads Dashboard', multi: 'Centralized Multi-Branch Leads' },
    { name: 'Custom Domain Setup (CNAME)', starter: 'Standard URL', pro: 'Custom Domain Support', multi: 'Multi-Subdomain Mapping' },
    { name: 'Support Level', starter: 'Standard Community', pro: 'Priority Email/Chat Support', multi: 'Dedicated Account Manager' },
  ];

  const pricingFaqs = [
    {
      q: 'Is the Starter plan really free forever?',
      a: 'Yes. The Starter plan is 100% free with no trial expiration and no credit card required. You can generate a website, share the link, download your counter QR code, and receive direct WhatsApp inquiries indefinitely.',
    },
    {
      q: 'How does the Business Pro subscription work?',
      a: 'Business Pro costs ₹499/month (or $9/month internationally). It gives you unlimited AI regenerations, removes LocalWeb AI platform branding, enables the incoming leads manager, and supports connecting custom domains.',
    },
    {
      q: 'Can I cancel my Business Pro subscription anytime?',
      a: 'Yes, absolutely. You can cancel your subscription at any time directly from your account settings with one click. There are no long-term lock-in contracts or cancellation penalties.',
    },
    {
      q: 'How are payments handled?',
      a: 'All subscription payments are securely processed through Razorpay using PCI-DSS compliant 256-bit SSL encryption. LocalWeb AI never stores your credit card numbers, debit card details, or UPI credentials.',
    },
    {
      q: 'What is the Multi-Outlet plan designed for?',
      a: 'The Multi-Outlet plan is built for growing businesses with 5 or more physical store locations, clinics, or franchises. It includes centralized lead aggregation across all branches, customized rollout, and a dedicated account manager.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">Pricing</span>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Simple, Fair &amp; Transparent Pricing</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Invest in Your Business Growth
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Choose the plan that fits your stage. From a free neighborhood presence to high-converting pro features with zero agency markups.
            </p>

            {/* Currency Selector */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                    currency === 'INR'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ₹ INR (India)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  $ USD (Global)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Pricing Cards */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* PLAN 1: Starter */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">PLAN 1 — STARTER</span>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mt-1">Free Forever</h2>
                <p className="text-xs text-slate-500 mt-2">Essential web presence for single storefronts and clinics.</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {currency === 'INR' ? '₹0' : '$0'}
                  </span>
                  <span className="text-xs text-slate-500"> / Free Forever</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    1 business website
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Basic AI website generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    1-Tap WhatsApp button
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Direct Call button
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Google Maps integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Business hours display
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Shareable website link
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Counter QR code download
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <X className="h-4 w-4 text-slate-300 shrink-0" />
                    <span>Includes LocalWeb AI branding</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => (onSelectPlan ? onSelectPlan('starter') : onStartWizard())}
                  className="w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Start Free Forever
                </button>
              </div>
            </div>

            {/* PLAN 2: Business Pro */}
            <div className="relative rounded-3xl border-2 border-indigo-600 bg-white p-7 shadow-xl shadow-indigo-100 flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
                MOST POPULAR
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">PLAN 2 — BUSINESS PRO</span>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mt-1">Growth &amp; Leads</h2>
                <p className="text-xs text-slate-500 mt-2">Everything in Starter, plus premium tools to capture customers.</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {currency === 'INR' ? '₹499' : '$9'}
                  </span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2 font-semibold text-indigo-950">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                    Unlimited AI section regenerations
                  </li>
                  <li className="flex items-center gap-2 font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Remove LocalWeb AI branding
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                    Dedicated leads &amp; inquiries manager
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                    Up to 3 business websites
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                    High-resolution vector QR code download
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                    Custom domain connection (CNAME)
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                    Priority email &amp; chat support
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => (onSelectPlan ? onSelectPlan('pro') : onStartWizard())}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition cursor-pointer"
                >
                  Upgrade to Business Pro
                </button>
              </div>
            </div>

            {/* PLAN 3: Multi-Outlet */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">PLAN 3 — MULTI-OUTLET</span>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mt-1">Multi-Branch Scale</h2>
                <p className="text-xs text-slate-500 mt-2">For growing chains, franchises, and 5+ local outlets.</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                  <span className="text-xs text-slate-500"> / tailored quote</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2 font-medium text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Multiple business websites (5+ branches)
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Centralized lead consolidation
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Multi-location branch mapping
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Custom styling &amp; brand guidelines
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Dedicated account manager
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => (onSelectPlan ? onSelectPlan('multi') : onStartWizard())}
                  className="w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Request Multi-Outlet Plan
                </button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Matrix */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Complete Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4">Starter</th>
                    <th className="py-3 px-4 text-indigo-600">Business Pro</th>
                    <th className="py-3 px-4">Multi-Outlet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-medium text-slate-900">{row.name}</td>
                      <td className="py-3 px-4 text-slate-600">{row.starter}</td>
                      <td className="py-3 px-4 font-semibold text-indigo-700">{row.pro}</td>
                      <td className="py-3 px-4 text-slate-600">{row.multi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Billing FAQs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Billing &amp; Subscription Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingFaqs.map((faq, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>
                Need specific billing assistance? Review our{' '}
                <button
                  onClick={() => onNavigatePath('/refund-policy')}
                  className="text-indigo-600 font-semibold underline hover:text-indigo-700 cursor-pointer"
                >
                  Refund &amp; Cancellation Policy
                </button>
                {' '}or{' '}
                <button
                  onClick={() => onNavigatePath('/contact')}
                  className="text-indigo-600 font-semibold underline hover:text-indigo-700 cursor-pointer"
                >
                  Contact Support
                </button>
                .
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigatePath} onStartWizard={onStartWizard} />
    </div>
  );
};
