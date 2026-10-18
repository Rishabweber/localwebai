import React, { useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Smartphone,
  Search,
  Zap,
  ShieldCheck,
  QrCode,
  Layers,
  ArrowLeft,
  Scissors,
  Stethoscope,
  Utensils,
  Dumbbell,
  Wrench,
  Coffee,
} from 'lucide-react';
import { Footer } from './Footer';
import { updatePageSeo } from '../lib/seo';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
  onStartWizard: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigateHome,
  onNavigatePath,
  onStartWizard,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'LocalWeb AI Services — Website Solutions for Local Businesses',
      description:
        'Explore website services tailored for local shops: AI generation, 1-tap WhatsApp booking, local SEO, Google Maps directions, printable QR codes, and lead management.',
      canonical: 'https://localwebai.website/services',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const serviceFeatures = [
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-600" />,
      title: 'AI Website Generation for Local Categories',
      desc: 'Get a tailored, complete business website generated in under two minutes. Our AI drafts persuasive headlines, service descriptions, and localized copy customized for salons, clinics, cafes, restaurants, gyms, and home repair professionals.',
      benefits: [
        'Domain-specific copywriting crafted for your industry',
        'Mobile-first responsive layouts that look sharp on all screen sizes',
        'Custom brand color palettes matching your business aesthetic',
      ],
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-emerald-600" />,
      title: '1-Tap WhatsApp Lead & Booking Integration',
      desc: 'Turn website visitors into booked clients immediately. Websites feature sticky and inline WhatsApp buttons configured with automated pre-filled inquiry messages so customers can book with a single tap.',
      benefits: [
        'Pre-filled service and appointment messages',
        'Direct phone calling button for immediate inquiries',
        'Zero commission fees on your bookings or orders',
      ],
    },
    {
      icon: <Search className="h-6 w-6 text-blue-600" />,
      title: 'Local SEO & Google Search Readiness',
      desc: 'Help customers searching for your services in your neighborhood find you on Google. Websites include automated local schema structured data, meta descriptions, and rapid Core Web Vitals performance.',
      benefits: [
        'Automated Schema.org LocalBusiness structured data',
        'Fast server-side pre-rendering for Googlebot indexing',
        'Optimized for "near me" mobile queries in your city',
      ],
    },
    {
      icon: <MapPin className="h-6 w-6 text-rose-600" />,
      title: 'Google Maps & Turn-by-Turn Directions',
      desc: 'Make it easy for walk-ins and appointment holders to locate your physical premises. Embed interactive Google Maps with direct navigation links that launch Google Maps on mobile devices.',
      benefits: [
        'One-touch Google Maps navigation for driving and walking directions',
        'Clear display of landmarks, locality, and complete address',
        'Accurate map coordinates for instant location accuracy',
      ],
    },
    {
      icon: <QrCode className="h-6 w-6 text-purple-600" />,
      title: 'Printable Counter QR Codes',
      desc: 'Bridge offline walk-in clients with your digital menu and booking catalog. Every website includes a clean, high-resolution QR code ready to print for shop counters, reception desks, and billing tables.',
      benefits: [
        'Instant high-resolution QR code download',
        'Display on billing counters, entrance doors, and take-away menus',
        'Allows walk-in visitors to save your direct WhatsApp booking link',
      ],
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-600" />,
      title: 'Operating Hours & Service Catalog Management',
      desc: 'Keep your customers informed with real-time business hours, transparent pricing, and comprehensive service descriptions. Update prices or services anytime through an intuitive visual editor.',
      benefits: [
        'Clear day-by-day operating schedules and holiday hours',
        'Categorized service menus with transparent starting prices',
        'One-click section editing and instant live updates',
      ],
    },
    {
      icon: <Layers className="h-6 w-6 text-teal-600" />,
      title: 'Centralized Lead & Inquiry Management',
      desc: 'Never lose track of customer inquiries. Receive incoming booking requests and contact messages directly inside your authenticated dashboard, complete with visitor contact details and timestamps.',
      benefits: [
        'Centralized dashboard tracking all customer inquiries',
        'Direct call and email response shortcuts from the dashboard',
        'Exportable inquiry logs for client follow-ups',
      ],
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
      title: 'Multi-Outlet & Multi-Location Branch Coordination',
      desc: 'Scaling across multiple neighborhood branches? Manage separate localized website pages for 5+ outlets under a single administrative dashboard with custom plan support.',
      benefits: [
        'Dedicated location landing pages for each physical branch',
        'Centralized oversight for multi-unit retail and clinic groups',
        'Custom domain mapping and priority account support',
      ],
    },
  ];

  const industries = [
    { icon: <Scissors className="h-5 w-5" />, name: 'Hair Salons & Spas' },
    { icon: <Stethoscope className="h-5 w-5" />, name: 'Clinics & Dentists' },
    { icon: <Utensils className="h-5 w-5" />, name: 'Restaurants & Bistros' },
    { icon: <Coffee className="h-5 w-5" />, name: 'Cafes & Bakeries' },
    { icon: <Dumbbell className="h-5 w-5" />, name: 'Gyms & Yoga Studios' },
    { icon: <Wrench className="h-5 w-5" />, name: 'Home Repair & Services' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">Website Services</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 mb-3 border border-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full-Stack Website Features for Local Business</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Website Services &amp; Capabilities
            </h1>
            <p className="mt-4 text-base sm:text-xl text-slate-600 leading-relaxed">
              Everything your local business needs to attract nearby searchers, showcase services, accept WhatsApp appointments, and guide customers to your store.
            </p>
          </div>
        </div>
      </div>

      {/* Industries Ribbon */}
      <div className="border-b border-slate-200 bg-slate-100/60 py-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
            <span className="text-slate-400 uppercase tracking-wider text-[11px]">Specialized for:</span>
            {industries.map((ind, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                {ind.icon}
                <span>{ind.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Service Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceFeatures.map((svc, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 inline-block">
                    {svc.icon}
                  </div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    {svc.title}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Highlights
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {svc.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Comparison Anchor */}
          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-blue-50/50 to-indigo-50 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Transparent Plans With No Hidden Costs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Start with our Starter Free Forever plan, or upgrade to Business Pro for ₹499/month for custom branding removal and unlimited AI editing.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigatePath('/pricing')}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer"
              >
                View Detailed Pricing
              </button>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-center text-white space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
              Ready to Launch Your Local Website?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
              Takes less than 2 minutes. Enter your business details and watch your website come to life.
            </p>
            <div className="pt-3">
              <button
                onClick={onStartWizard}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Create Your Website Free</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigatePath} onStartWizard={onStartWizard} />
    </div>
  );
};
