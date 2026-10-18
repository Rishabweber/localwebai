import React, { useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  Code2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Smartphone,
  MapPin,
  Clock,
  Layers,
  HeartHandshake,
  Users,
  Target,
  ArrowLeft,
} from 'lucide-react';
import { Footer } from './Footer';
import { updatePageSeo } from '../lib/seo';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
  onStartWizard: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigatePath,
  onStartWizard,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'About LocalWeb AI — Mission, Platform & Engineering for Local Businesses',
      description:
        'Discover LocalWeb AI: an intelligent website builder built specifically for neighborhood shops, beauty parlors, clinics, and local services in India and worldwide.',
      canonical: 'https://localwebai.website/about',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back button */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">About LocalWeb AI</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 mb-3 border border-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Democratizing Local Business Web Presence</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              About LocalWeb AI
            </h1>
            <p className="mt-4 text-base sm:text-xl text-slate-600 leading-relaxed">
              We build specialized, fast, mobile-first website technology tailored specifically for neighborhood retail shops, salons, healthcare clinics, cafes, and multi-branch local enterprises.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section 1: The Problem & Our Mission */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <Target className="h-4 w-4" />
              <span>Our Core Mission</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Why Traditional Website Creation Fails Local Businesses
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              For over two decades, local small business owners in India and across the world have faced an unfair dilemma when attempting to establish a digital presence:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 space-y-2">
                <h3 className="font-heading font-bold text-rose-900 text-base">
                  The Traditional Agency Dilemma
                </h3>
                <p className="text-xs sm:text-sm text-rose-800/90 leading-relaxed">
                  Traditional web design agencies typically quote ₹25,000 to ₹75,000+ upfront for a simple 5-page website, require weeks of back-and-forth communication, and demand expensive ongoing maintenance retainers whenever you want to update a menu item or phone number.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 space-y-2">
                <h3 className="font-heading font-bold text-amber-900 text-base">
                  The Complex DIY Builder Dilemma
                </h3>
                <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed">
                  Generic international site builders (such as WordPress or heavy drag-and-drop systems) require extensive design and technical know-how. They frequently result in slow-loading, bloated websites with sluggish performance on Indian mobile 4G networks and lack built-in local WhatsApp workflows.
                </p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base pt-2">
              <strong>LocalWeb AI was founded to eliminate this barrier completely.</strong> By combining purpose-built artificial intelligence with lightweight, mobile-first web engineering, we allow neighborhood shopkeepers, salon stylists, doctors, and restaurateurs to launch a professional, high-converting digital storefront in under two minutes without writing a single line of code.
            </p>
          </section>

          {/* Section 2: What Makes LocalWeb AI Different */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Platform Principles
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                Built Around Real Local Customer Behavior
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Unlike generic portfolio templates, every website generated on LocalWeb AI incorporates essential neighborhood commerce features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base">
                  1-Tap WhatsApp Conversion
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Over 80% of local customers in India prefer inquiring and booking appointments over WhatsApp. LocalWeb AI places sticky, contextual WhatsApp and Call CTAs directly into every visitor view.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base">
                  Extreme Mobile Performance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Zero heavy JavaScript plugins or bloated frameworks. Websites load almost instantaneously even on budget smartphones and entry-level 4G mobile connections.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base">
                  Built-In Local SEO &amp; Maps
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Includes automated Schema.org structured data, location tags, operating hours, and direct Google Maps routing so nearby customers can navigate straight to your shop doorstep.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Architecture & Security */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Technology Architecture &amp; Data Ethics
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At LocalWeb AI, transparency and data security are foundational:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Content Ownership:</strong> All business descriptions, photos, prices, and menus remain 100% the property of the business owner. You may edit, publish, unpublish, or delete your websites at any time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>PCI-DSS Compliant Payments:</strong> Subscriptions are processed through Razorpay. LocalWeb AI never stores raw debit/credit card numbers or banking secrets on our servers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Data Brokering:</strong> We do not sell, rent, or trade your leads, customer phone numbers, or inquiry databases to third-party telemarketers or advertisers.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: Founder Biography — Maintained distinctly from startup identity */}
          <section id="founder" className="rounded-3xl border border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Code2 className="h-4 w-4" />
              <span>Founder &amp; Engineering Leadership</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              About the Creator
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pt-2">
              <div className="flex flex-col items-center shrink-0">
                <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-800 text-white shadow-md text-3xl font-extrabold">
                  RK
                </div>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-indigo-100/70 px-3 py-1 text-xs font-semibold text-indigo-800">
                  Rishab Kumar
                </span>
              </div>
              <div className="flex-1 space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  <strong>Rishab Kumar</strong> is a coder, web developer, and digital entrepreneur with 4+ years of hands-on software engineering experience across modern web technologies, cloud infrastructure, and AI systems.
                </p>
                <p>
                  Observing how neighborhood retail stores, beauty parlors, and medical clinics struggle with bloated platforms or predatory agency fees, Rishab architected LocalWeb AI as an independent, lightweight product engine designed to give every local business access to clean, professional, mobile-first web presence.
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  To learn more about Rishab’s personal engineering background and portfolio projects, you can view his personal biography:
                </p>
                <div className="pt-2">
                  <a
                    href="https://rishab.ai.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-indigo-600 shadow-xs hover:bg-slate-50 transition"
                  >
                    <span>View Founder Profile (rishab.ai.studio)</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Call to Action */}
          <section className="rounded-3xl bg-indigo-600 p-8 sm:p-12 text-center text-white space-y-4">
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold">
              Build Your Business Website Today
            </h2>
            <p className="text-indigo-100 max-w-xl mx-auto text-sm sm:text-base">
              Try our AI website wizard completely free. No credit card required, instant WhatsApp booking, and ready to share in 2 minutes.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onStartWizard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 shadow-md hover:bg-slate-50 transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Create My Website Free</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigatePath('/contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition cursor-pointer"
              >
                <span>Contact Our Team</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigatePath} onStartWizard={onStartWizard} />
    </div>
  );
};
