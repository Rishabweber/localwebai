import React from 'react';
import { CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
  onStartWizard?: () => void;
  onExploreDemo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onStartWizard,
  onExploreDemo,
}) => {
  function handleLinkClick(e: React.MouseEvent, path: string) {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-50/70 pt-16 pb-12 text-slate-600 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Column 1: Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="inline-block cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  id="footer-official-logo"
                  src="/logo-horizontal.svg"
                  alt="LocalWeb AI"
                  className="h-8 sm:h-9 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              The fastest, easiest AI-powered website builder designed exclusively for neighborhood shops, healthcare clinics, beauty salons, and local multi-branch businesses.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" /> 100% Mobile Ready
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" /> 1-Tap WhatsApp
              </span>
            </div>
          </div>

          {/* Column 2: Solutions / Who It's For */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a
                  href="/#who-its-for"
                  onClick={(e) => handleLinkClick(e, '/#who-its-for')}
                  className="hover:text-indigo-600 transition"
                >
                  Salons &amp; Beauty
                </a>
              </li>
              <li>
                <a
                  href="/#who-its-for"
                  onClick={(e) => handleLinkClick(e, '/#who-its-for')}
                  className="hover:text-indigo-600 transition"
                >
                  Clinics &amp; Care
                </a>
              </li>
              <li>
                <a
                  href="/#who-its-for"
                  onClick={(e) => handleLinkClick(e, '/#who-its-for')}
                  className="hover:text-indigo-600 transition"
                >
                  Cafes &amp; Bakeries
                </a>
              </li>
              <li>
                <a
                  href="/#who-its-for"
                  onClick={(e) => handleLinkClick(e, '/#who-its-for')}
                  className="hover:text-indigo-600 transition"
                >
                  Restaurants
                </a>
              </li>
              <li>
                <a
                  href="/#who-its-for"
                  onClick={(e) => handleLinkClick(e, '/#who-its-for')}
                  className="hover:text-indigo-600 transition"
                >
                  Fitness &amp; Gyms
                </a>
              </li>
              <li>
                <a
                  href="/#who-its-for"
                  onClick={(e) => handleLinkClick(e, '/#who-its-for')}
                  className="hover:text-indigo-600 transition"
                >
                  Home &amp; Repair
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Sections */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a
                  href="/#what-it-does"
                  onClick={(e) => handleLinkClick(e, '/#what-it-does')}
                  className="hover:text-indigo-600 transition"
                >
                  What It Does
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  onClick={(e) => handleLinkClick(e, '/#how-it-works')}
                  className="hover:text-indigo-600 transition"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  onClick={(e) => handleLinkClick(e, '/#features')}
                  className="hover:text-indigo-600 transition"
                >
                  Main Features
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  onClick={(e) => handleLinkClick(e, '/#pricing')}
                  className="hover:text-indigo-600 transition font-semibold text-indigo-700"
                >
                  Pricing Plans
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => handleLinkClick(e, '/#faq')}
                  className="hover:text-indigo-600 transition"
                >
                  Frequently Asked
                </a>
              </li>
              <li>
                <a
                  href="/#about-founder"
                  onClick={(e) => handleLinkClick(e, '/#about-founder')}
                  className="hover:text-indigo-600 transition"
                >
                  About Founder
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policy */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
              <span>Legal &amp; Policy</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a
                  id="footer-privacy-policy-link"
                  href="/privacy-policy"
                  onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                  className="hover:text-indigo-600 transition block font-medium"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  id="footer-terms-link"
                  href="/terms"
                  onClick={(e) => handleLinkClick(e, '/terms')}
                  className="hover:text-indigo-600 transition block font-medium"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  id="footer-refund-policy-link"
                  href="/refund-policy"
                  onClick={(e) => handleLinkClick(e, '/refund-policy')}
                  className="hover:text-indigo-600 transition block font-medium"
                >
                  Refund &amp; Cancellation
                </a>
              </li>
              <li>
                <a
                  id="footer-contact-link"
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="text-indigo-600 font-semibold hover:underline transition flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} LocalWeb AI. All rights reserved. Helping local businesses build websites with AI.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <a
              href="https://localwebai.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 underline"
            >
              https://localwebai.website/
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
