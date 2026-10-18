import React, { useEffect } from 'react';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Share2,
  Tag,
  DollarSign,
  TrendingUp,
  Store,
  Utensils,
  Scissors,
  Layers,
} from 'lucide-react';
import { Footer } from './Footer';
import { updatePageSeo } from '../lib/seo';

export interface ArticleData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: React.ReactNode;
}

export const RESOURCE_ARTICLES: Record<string, ArticleData> = {
  'small-business-website-costs-in-india': {
    slug: 'small-business-website-costs-in-india',
    title: 'Small-Business Website Costs in India: Complete 2026 Breakdown',
    subtitle: 'A realistic, fact-checked cost analysis comparing domains, hosting, traditional design agencies, freelance developers, and modern AI website builders.',
    category: 'Costs & Budgeting',
    readTime: '6 min read',
    date: 'Updated September 2026',
    summary: 'Everything you need to know about setting up a business website in India: realistic annual expenses for domains (.in vs .com), cloud hosting, SSL, maintenance retainers, and how to avoid agency overcharging.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p>
          One of the first questions Indian retail store owners, clinic managers, and salon operators ask is: <em>&ldquo;How much does a simple, professional website actually cost in India?&rdquo;</em>
        </p>
        <p>
          Quotes can range wildly from freelance developers quoting ₹3,000 to digital agencies asking for ₹65,000+ upfront. In this guide, we break down the exact component-by-component cost of running a website in India in 2026 so you never overpay for digital infrastructure.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          1. Essential Recurring Infrastructure Costs
        </h3>
        <p>
          Regardless of who builds your website, every website on the internet requires two fundamental pieces of infrastructure: a domain name and web hosting.
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Component</th>
                <th className="py-2.5 px-3">Typical Annual Cost (INR)</th>
                <th className="py-2.5 px-3">Key Details &amp; Pitfalls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 font-semibold">Domain Name (.in)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-medium">₹499 &ndash; ₹799 / year</td>
                <td className="py-2.5 px-3 text-slate-500">First-year discounts are common; renewals generally cost ₹699&ndash;₹899 + 18% GST.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Domain Name (.com)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-medium">₹899 &ndash; ₹1,399 / year</td>
                <td className="py-2.5 px-3 text-slate-500">Global standard; priced in USD equivalents and subject to currency fluctuation.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Shared Web Hosting</td>
                <td className="py-2.5 px-3 text-emerald-700 font-medium">₹2,400 &ndash; ₹6,000 / year</td>
                <td className="py-2.5 px-3 text-slate-500">Entry-level shared hosting on Hostinger, Bluehost, or GoDaddy. Often slows down during traffic spikes.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">SSL Certificate (HTTPS)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-medium">₹0 &ndash; ₹2,000 / year</td>
                <td className="py-2.5 px-3 text-slate-500">Should be free via automated Let&apos;s Encrypt / Cloudflare, though some agencies charge a &ldquo;security fee&rdquo;.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          2. The Three Common Website Building Routes in India
        </h3>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h4 className="font-heading font-bold text-slate-900 text-base">
              Route A: Traditional Web Design Agencies (₹20,000 &ndash; ₹60,000+ upfront)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Agencies assign a project manager, designer, and developer. While you receive bespoke graphics, delivery frequently takes 4 to 8 weeks. Crucially, most agencies require annual maintenance contracts (AMCs) costing ₹8,000 to ₹15,000/year simply to update text or prices.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h4 className="font-heading font-bold text-slate-900 text-base">
              Route B: Freelance Developers on WordPress (₹5,000 &ndash; ₹15,000 upfront)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Freelancers often build sites using pre-made WordPress themes and plugins (Elementor, WooCommerce). While cost-effective initially, sites are prone to plugin conflicts, security vulnerabilities if left unpatched, and slower loading speeds on Indian mobile networks.
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 space-y-2">
            <h4 className="font-heading font-bold text-indigo-950 text-base">
              Route C: AI Website Platforms like LocalWeb AI (₹0 Starter &ndash; ₹499/month Pro)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Modern AI platforms eliminate agency markups and server maintenance headaches entirely. You get automated localized copywriting, 1-tap WhatsApp booking, Google Maps directions, and hosting included. A free tier gets you online instantly, while ₹499/month removes all platform branding and unlocks lead management.
            </p>
          </div>
        </div>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          3. Summary Checklist Before Spending Money
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-xs sm:text-sm">
          <li>Never pay separately for an SSL certificate if your hosting provider supports Let&apos;s Encrypt.</li>
          <li>Ensure you retain administrative ownership of your domain registrar account (e.g. GoDaddy, Namecheap, Google Domains). Never allow a contractor to register your domain under their personal email.</li>
          <li>Ensure your website loads in under 2.5 seconds on mobile 4G networks; heavy unoptimized images are the #1 cause of lost local customers.</li>
        </ul>
      </div>
    ),
  },

  'websites-versus-social-media-pages': {
    slug: 'websites-versus-social-media-pages',
    title: 'Websites vs Social Media Pages: Why Local Businesses Need Both',
    subtitle: 'Why an Instagram account or Facebook page alone cannot replace an authoritative, Google-searchable local business website.',
    category: 'Digital Strategy',
    readTime: '5 min read',
    date: 'Updated September 2026',
    summary: 'A factual comparison between social media channels and an independent website. Discover why Google search intent drives higher booking conversion than social feed browsing.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p>
          Many small business owners in India ask: <em>&ldquo;I already have an active Instagram account with 1,500 followers. Why do I need a website?&rdquo;</em>
        </p>
        <p>
          While social media is exceptional for brand discovery and visual storytelling, relying exclusively on social media creates significant vulnerabilities for a local commercial enterprise. Here is an objective analysis of why both channels serve fundamentally different customer intents.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          1. High-Intent Search vs. Casual Feed Browsing
        </h3>
        <p>
          When a consumer opens Instagram, they are in <strong>entertainment mode</strong> &mdash; casually scrolling through reels and friends&apos; stories. They may admire a haircut photo or cafe dessert, but they rarely have immediate purchasing intent.
        </p>
        <p>
          In contrast, when someone opens Google and types <code>&ldquo;dentist clinic near me Bandra&rdquo;</code> or <code>&ldquo;best salon in Indiranagar price list&rdquo;</code>, they have <strong>active, immediate intent</strong>. They need a service today or this weekend. Instagram pages do not rank effectively for localized search queries with pricing and directions; verified websites do.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          2. Platform Comparison Matrix
        </h3>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Criteria</th>
                <th className="py-2.5 px-3">Social Media (Instagram / FB)</th>
                <th className="py-2.5 px-3 font-semibold text-indigo-700">Dedicated Website</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 font-medium">Google &ldquo;Near Me&rdquo; SEO</td>
                <td className="py-2.5 px-3 text-rose-600">Poor / Rarely indexed for local terms</td>
                <td className="py-2.5 px-3 text-emerald-600 font-semibold">High / Direct local search rank</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">Organized Service Menus &amp; Prices</td>
                <td className="py-2.5 px-3 text-slate-500">Scattered across highlights and stories</td>
                <td className="py-2.5 px-3 text-emerald-600 font-semibold">Structured, categorized, searchable</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">Platform Ownership</td>
                <td className="py-2.5 px-3 text-rose-600">Rented land (subject to algorithm shifts)</td>
                <td className="py-2.5 px-3 text-emerald-600 font-semibold">100% Owned digital storefront</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">1-Tap Booking Friction</td>
                <td className="py-2.5 px-3 text-slate-500">Requires DM back-and-forth messaging</td>
                <td className="py-2.5 px-3 text-emerald-600 font-semibold">Direct WhatsApp booking with pre-filled service</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">Google Maps Navigation</td>
                <td className="py-2.5 px-3 text-slate-500">Unreliable in-app browser routing</td>
                <td className="py-2.5 px-3 text-emerald-600 font-semibold">Direct 1-tap Google Maps link</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          3. The Recommended Synergy Model
        </h3>
        <p>
          The most successful neighborhood businesses do not pick one over the other: they link them together.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-xs sm:text-sm">
          <li>Place your website link in your Instagram profile bio so visitors can instantly view verified prices and book appointments.</li>
          <li>Add a link to your website on your Google Business Profile (Google Maps listing).</li>
          <li>Display a counter QR code at your shop counter linking to your website so walk-ins save your details.</li>
        </ul>
      </div>
    ),
  },

  'salon-website-essentials': {
    slug: 'salon-website-essentials',
    title: 'Salon & Beauty Parlor Website Essentials: Features That Convert Walk-Ins',
    subtitle: 'A practical guide to the must-have components that turn website visitors into confirmed beauty appointments.',
    category: 'Industry Guides',
    readTime: '5 min read',
    date: 'Updated September 2026',
    summary: 'Discover the exact page sections, service menu formatting, WhatsApp pre-fills, and location indicators that increase salon appointment bookings.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p>
          In the beauty and wellness sector &mdash; including hair salons, nail spas, and skin care clinics &mdash; customer decisions are driven by trust, transparent pricing, and effortless scheduling.
        </p>
        <p>
          If a client has to call three times during noisy salon hours or wait half a day for an Instagram DM reply just to check bridal package rates, they will immediately go to a competing salon. Here are the core essentials every salon website must have:
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          1. Transparent, Categorized Price List
        </h3>
        <p>
          The #1 reason customers leave salon websites is hidden pricing. While certain complex chemical treatments require consultation, your standard services (haircuts, blowouts, root touch-ups, facials, waxing, manicures) must display starting rates clearly.
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-2">
          <strong>Best Practice:</strong> State <em>&ldquo;Starting from ₹1,200 (based on hair length)&rdquo;</em> rather than leaving price fields blank. Transparency establishes immediate consumer trust.
        </div>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          2. One-Tap WhatsApp Appointment Scheduling
        </h3>
        <p>
          In India, WhatsApp is the dominant communication channel for booking salon appointments. Instead of forcing clients into complex multi-step calendar plugins where they must create accounts, provide a sticky <strong>&ldquo;Book on WhatsApp&rdquo;</strong> button that pre-populates the requested service:
        </p>
        <div className="bg-emerald-50 text-emerald-900 p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-mono">
          &ldquo;Hi Bella Luxe Salon! I would like to inquire about booking a Hair Spa and Blowout appointment this Saturday. Are slots available?&rdquo;
        </div>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          3. Clear Operating Hours &amp; Peak Day Alerts
        </h3>
        <p>
          Salons often have variable hours, such as closing on Mondays or extending hours until 9:00 PM on Friday and Saturday. Clearly displaying open/closed status prevents customer frustration and lost walk-ins.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          4. Physical Location, Landmarks &amp; Valet/Parking Notes
        </h3>
        <p>
          Beauty clients frequently plan travel time around appointment slots. Always include:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
          <li>Complete floor, building, and road details (e.g. <em>&ldquo;2nd Floor, Above Blue Tokai, Linking Road, Bandra West&rdquo;</em>).</li>
          <li>A direct Google Maps navigation button that opens turn-by-turn driving or walking directions.</li>
          <li>Information on parking availability or nearest metro stations.</li>
        </ul>
      </div>
    ),
  },

  'restaurant-website-essentials': {
    slug: 'restaurant-website-essentials',
    title: 'Restaurant & Cafe Website Essentials: Digital Menus, Location, and Direct Ordering',
    subtitle: 'How neighborhood eateries protect their profit margins by driving direct diner orders and table reservations.',
    category: 'Industry Guides',
    readTime: '6 min read',
    date: 'Updated September 2026',
    summary: 'Learn why food aggregators take 20-30% cuts of your revenue and how a mobile-friendly digital menu and WhatsApp ordering website protects your margins.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p>
          Food delivery aggregators like Zomato and Swiggy have brought tremendous discovery to Indian restaurants, but their high commission rates (often 18% to 30% per order) place heavy pressure on food-and-beverage margins.
        </p>
        <p>
          Furthermore, aggregators own the customer data: they do not share customer phone numbers or email addresses with the restaurant. Having your own lightweight restaurant website allows you to build direct customer loyalty and take direct table bookings and party catering inquiries.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          1. Fast, Mobile-Optimized Digital Menu (No Heavy PDF Downloads)
        </h3>
        <p>
          The most widespread mistake Indian restaurants make is uploading a massive, 15MB scanned PDF of their physical menu.
        </p>
        <p>
          On mobile phones with 4G or weak indoor Wi-Fi, downloading a PDF is slow, consumes data, and requires pinching and zooming to read tiny text. A proper restaurant website renders text-based menu categories (Appetizers, Mains, Beverages, Chef Specials) that load instantly and display dietary tags (Veg, Non-Veg, Vegan, Gluten-Free) clearly.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          2. Zero-Commission WhatsApp Order &amp; Takeaway Links
        </h3>
        <p>
          For local neighborhood diners who live within a 2 km radius, offering direct WhatsApp ordering allows them to place repeat orders without aggregator platform fees. You receive 100% of the bill value, and your delivery staff or local Dunzo/Porter dispatch handles the drop.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          3. Hours, Reservation Policy, and Hygiene Information
        </h3>
        <p>
          Include your kitchen operating hours (e.g., lunch 12:00 PM &ndash; 3:30 PM, dinner 7:00 PM &ndash; 11:30 PM), table reservation guidelines, and whether outside catering or birthday party bookings are supported.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          4. Counter &amp; Tabletop QR Codes
        </h3>
        <p>
          Place clean QR codes on dining tables and billing desks. Diners can scan the QR code on their smartphone to view today&apos;s specials or save your contact card to book a table for their next visit.
        </p>
      </div>
    ),
  },

  'choosing-a-suitable-website-plan': {
    slug: 'choosing-a-suitable-website-plan',
    title: 'How to Choose the Right Website Plan for Your Business: Starter vs Pro vs Multi-Outlet',
    subtitle: 'An objective decision-making guide to selecting the optimal website setup based on your business stage, budget, and customer volume.',
    category: 'Platform Guide',
    readTime: '5 min read',
    date: 'Updated September 2026',
    summary: 'Clear, unbiased criteria for deciding between LocalWeb AI Starter (Free Forever), Business Pro (₹499/mo), and Multi-Outlet custom rollouts.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p>
          Choosing the right website plan should never be confusing or involve hidden upsells. At LocalWeb AI, we believe in honest tier structuring. Here is an objective guide to determine which plan matches your specific business stage.
        </p>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          Option 1: The Starter Plan (Free Forever &ndash; ₹0)
        </h3>
        <p>
          <strong>Who it is best for:</strong> Solo practitioners, newly launched neighborhood storefronts, home bakers, freelance tutors, and businesses exploring an online presence for the first time.
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
          <li><strong>What you get:</strong> 1 fully functional website, 3 free AI generations, 1-tap WhatsApp booking button, direct phone call button, Google Maps location, business hours, and a standard printable counter QR code.</li>
          <li><strong>Consideration:</strong> Free websites display clean LocalWeb AI footer attribution and have restricted backend lead manager access.</li>
          <li><strong>Verdict:</strong> Ideal if your goal is to test the waters with zero financial commitment.</li>
        </ul>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          Option 2: Business Pro (₹499 / Month)
        </h3>
        <p>
          <strong>Who it is best for:</strong> Established retail shops, busy beauty salons, medical and dental clinics, popular cafes, and growing service businesses that want a 100% white-labeled digital identity.
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
          <li><strong>What you get:</strong> Everything in Starter, plus complete removal of LocalWeb AI branding, unlimited AI section regenerations, dedicated leads and inquiries dashboard, up to 3 business websites, high-res QR code downloads, and custom domain connection (e.g. www.yourbusiness.com).</li>
          <li><strong>Return on Investment (ROI):</strong> At ₹499/month (approx. ₹16 per day), acquiring just one additional customer or salon appointment per month pays for the subscription several times over.</li>
          <li><strong>Verdict:</strong> The recommended choice for active businesses serious about customer acquisition.</li>
        </ul>

        <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
          Option 3: Multi-Outlet (Custom Tailored Rollout)
        </h3>
        <p>
          <strong>Who it is best for:</strong> Retail chains, dental groups, multi-branch beauty parlors, and franchise networks operating across 5 or more physical locations.
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
          <li><strong>What you get:</strong> Centralized multi-branch lead consolidation, location mapping, custom subdomain routing, and a dedicated account manager.</li>
          <li><strong>Verdict:</strong> Request a custom plan review to receive tailored onboarding for your team.</li>
        </ul>
      </div>
    ),
  },
};

interface ResourcesPageProps {
  currentArticleSlug?: string | null;
  onNavigateHome: () => void;
  onNavigatePath: (path: string) => void;
  onStartWizard: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  currentArticleSlug,
  onNavigateHome,
  onNavigatePath,
  onStartWizard,
}) => {
  const activeArticle = currentArticleSlug ? RESOURCE_ARTICLES[currentArticleSlug] : null;

  useEffect(() => {
    if (activeArticle) {
      updatePageSeo({
        title: `${activeArticle.title} | LocalWeb AI Resources`,
        description: activeArticle.summary,
        canonical: `https://localwebai.website/resources/${activeArticle.slug}`,
      });
    } else {
      updatePageSeo({
        title: 'LocalWeb AI Knowledge & Resources — Guides for Local Businesses',
        description:
          'Expert, fact-checked guides on small business website costs in India, local SEO, salon and restaurant website essentials, and digital strategies.',
        canonical: 'https://localwebai.website/resources',
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeArticle]);

  // If viewing a specific article
  if (activeArticle) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        {/* Article Header */}
        <div className="border-b border-slate-200 bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => onNavigatePath('/resources')}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Guides &amp; Resources</span>
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-medium text-slate-500 truncate max-w-[200px] sm:max-w-none">
                {activeArticle.category}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700 border border-indigo-100">
                  {activeArticle.category}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activeArticle.readTime}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {activeArticle.date}
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {activeArticle.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeArticle.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <main className="flex-1 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
              {activeArticle.content}
            </div>

            {/* Author / Editorial Note */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">
                  Published by LocalWeb AI Editorial &amp; Engineering Team
                </p>
                <p className="text-slate-500 text-xs">
                  We write practical, fact-checked guides to help neighborhood businesses succeed digitally without agency fees.
                </p>
              </div>
              <button
                onClick={onStartWizard}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition shrink-0 cursor-pointer"
              >
                Create Free Website
              </button>
            </div>

            {/* Next Articles Navigation */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                More Guides for Small Businesses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(RESOURCE_ARTICLES)
                  .filter((a) => a.slug !== activeArticle.slug)
                  .slice(0, 2)
                  .map((rec) => (
                    <button
                      key={rec.slug}
                      onClick={() => onNavigatePath(`/resources/${rec.slug}`)}
                      className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 transition-all space-y-2 cursor-pointer"
                    >
                      <span className="text-[11px] font-bold text-indigo-600 uppercase">
                        {rec.category}
                      </span>
                      <h3 className="font-heading font-bold text-slate-900 text-sm line-clamp-2">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {rec.summary}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </main>

        <Footer onNavigate={onNavigatePath} onStartWizard={onStartWizard} />
      </div>
    );
  }

  // Listing page for all resources
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
            <span className="text-xs font-medium text-slate-500">Resources &amp; Guides</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 mb-3 border border-indigo-100">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Original Educational Resources</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Small Business Website Guides &amp; Insights
            </h1>
            <p className="mt-4 text-base sm:text-xl text-slate-600 leading-relaxed">
              In-depth, practical guides written for shopkeepers, salon stylists, clinic doctors, and local entrepreneurs. Fact-checked advice on costs, features, and online conversion.
            </p>
          </div>
        </div>
      </div>

      {/* Main Articles List */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(RESOURCE_ARTICLES).map((article) => (
              <div
                key={article.slug}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700 border border-indigo-100">
                      {article.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-slate-900 leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {article.date}
                  </span>
                  <button
                    onClick={() => onNavigatePath(`/resources/${article.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Generator Callout */}
          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-blue-50/50 to-indigo-50 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Ready to Apply These Best Practices to Your Website?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                LocalWeb AI automatically incorporates mobile optimization, transparent pricing, 1-tap WhatsApp booking, and Google Maps directions into every generated site.
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={onStartWizard}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Build Free Website</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigatePath} onStartWizard={onStartWizard} />
    </div>
  );
};
