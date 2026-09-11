import React from 'react';
import { ArrowLeft, Shield, Calendar, Globe } from 'lucide-react';
import { Footer } from './Footer';

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
  toc?: Array<{ id: string; label: string }>;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  subtitle,
  lastUpdated = 'September 2026',
  children,
  onNavigateHome,
  onNavigatePath,
  toc,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back button */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">{title}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 mb-3 border border-indigo-100">
                <Shield className="h-3.5 w-3.5" />
                <span>LocalWeb AI Official Policy</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0 self-start sm:self-center">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Last updated: <strong>{lastUpdated}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Optional Table of Contents pill list */}
          {toc && toc.length > 0 && (
            <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Quick Navigation
              </h2>
              <div className="flex flex-wrap gap-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Policy Text & Structured Content */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
            {children}
          </div>

          {/* Help / Contact prompt card */}
          <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-base text-indigo-950">
                Have questions about our terms or policies?
              </h3>
              <p className="text-xs sm:text-sm text-indigo-800 mt-1">
                Reach out to our team directly through our official contact page.
              </p>
            </div>
            <button
              onClick={() => onNavigatePath('/contact')}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-indigo-700 transition shrink-0"
            >
              Contact LocalWeb AI
            </button>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigatePath} />
    </div>
  );
};
