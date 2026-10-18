import React, { useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  MapPin,
  CheckCircle2,
  Eye,
  Scissors,
  Utensils,
  Stethoscope,
  Dumbbell,
} from 'lucide-react';
import { Footer } from './Footer';
import { updatePageSeo } from '../lib/seo';

interface PortfolioPageProps {
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
  onStartWizard: () => void;
  onExploreDemo: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigateHome,
  onNavigatePath,
  onStartWizard,
  onExploreDemo,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'LocalWeb AI Showcase & Demo Projects — Real Website Previews',
      description:
        'Explore live and interactive demo websites created with LocalWeb AI: salons, bistros, clinics, and fitness studios with 1-tap WhatsApp booking.',
      canonical: 'https://localwebai.website/portfolio',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const demoProjects = [
    {
      title: 'Bella Luxe Salon & Spa',
      category: 'Luxury Salon & Beauty Spa',
      city: 'Bandra West, Mumbai',
      icon: <Scissors className="h-5 w-5 text-indigo-600" />,
      tag: 'Live Deployed Project',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description:
        'A full-featured beauty salon web presence featuring bridal packages, hair therapy services, transparent pricing, Google Maps navigation to Bandra West, and pre-filled WhatsApp appointment booking.',
      features: ['Bridal spa package showcase', 'Bandra West Google Maps pin', 'WhatsApp pre-filled booking CTA'],
      url: '/site/bella-luxe-salon-mumbai',
      isLiveLink: true,
      buttonText: 'View Live Published Site',
    },
    {
      title: 'Spice & Soul Bistro',
      category: 'Restaurant & Contemporary Cafe',
      city: 'Indiranagar, Bengaluru',
      icon: <Utensils className="h-5 w-5 text-amber-600" />,
      tag: 'Interactive Demo Showcase',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description:
        'Demonstrates how independent cafes and bistros eliminate third-party food app commissions with a mobile-optimized menu, dietary tags, chef specials, and direct WhatsApp table reservation.',
      features: ['Mobile food menu with pricing', 'Zero commission direct orders', 'Operating hours & reservation hours'],
      url: '#',
      isLiveLink: false,
      buttonText: 'Explore in Editor Wizard',
    },
    {
      title: 'Dr. Sharma Smile Dental Clinic',
      category: 'Healthcare & Dental Care',
      city: 'South Extension, New Delhi',
      icon: <Stethoscope className="h-5 w-5 text-teal-600" />,
      tag: 'Interactive Demo Showcase',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description:
        'A clean, reassuring clinic website showcasing specialized dental procedures (root canals, invisible aligners, teeth whitening), verified clinic hours, hygiene standards, and consultation inquiries.',
      features: ['Treatment catalog with guidelines', 'Direct consultation booking', 'Landmark & parking directions'],
      url: '#',
      isLiveLink: false,
      buttonText: 'Explore in Editor Wizard',
    },
    {
      title: 'FitZone Performance Studio',
      category: 'Gym, Crossfit & Fitness',
      city: 'Koregaon Park, Pune',
      icon: <Dumbbell className="h-5 w-5 text-rose-600" />,
      tag: 'Interactive Demo Showcase',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description:
        'Designed for personal trainers and boutique fitness gyms. Features membership tiers, class schedules, trainer qualifications, and instant trial session booking over WhatsApp.',
      features: ['Membership plan comparison', 'Trainer specialization list', '1-Tap trial session booking'],
      url: '#',
      isLiveLink: false,
      buttonText: 'Explore in Editor Wizard',
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
            <span className="text-xs font-medium text-slate-500">Portfolio &amp; Showcase</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 mb-3 border border-indigo-100">
              <Eye className="h-3.5 w-3.5" />
              <span>Real Demo Implementations</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Website Showcase &amp; Demos
            </h1>
            <p className="mt-4 text-base sm:text-xl text-slate-600 leading-relaxed">
              Explore live, interactive websites created with LocalWeb AI. See how salons, bistros, clinics, and local services present their brand, accept WhatsApp bookings, and drive walk-in customers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Featured Live Site Notice */}
          <div className="rounded-3xl border border-indigo-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Live Public Project</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Bella Luxe Salon &amp; Spa (Mumbai)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Test the actual speed, responsiveness, and 1-tap WhatsApp booking flow of a live published LocalWeb AI site on your desktop or mobile phone.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <a
                href="/site/bella-luxe-salon-mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition"
              >
                <span>Launch Live Site</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Demo Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoProjects.map((project, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                      {project.icon}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${project.tagColor}`}>
                      {project.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{project.city}</span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Capabilities Included:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  {project.isLiveLink ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-indigo-700 transition"
                    >
                      <span>{project.buttonText}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={onStartWizard}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{project.buttonText}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-center text-white space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
              Want a Website Like These for Your Business?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
              Use our AI website generator to build and preview your customized website in 2 minutes. Completely free to start.
            </p>
            <div className="pt-3">
              <button
                onClick={onStartWizard}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Create Your Website Now</span>
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
