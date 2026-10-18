import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { GeneratorWizard } from './components/GeneratorWizard';
import { WebsitePreview } from './components/WebsitePreview';
import { WebsiteEditor } from './components/WebsiteEditor';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { PublishModal } from './components/PublishModal';
import { ProjectSettingsModal } from './components/ProjectSettingsModal';
import { UpgradeModal, PlanFeatureKey } from './components/UpgradeModal';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { RefundPolicyPage } from './components/RefundPolicyPage';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { PricingPage } from './components/PricingPage';
import { PortfolioPage } from './components/PortfolioPage';
import { ResourcesPage, RESOURCE_ARTICLES } from './components/ResourcesPage';
import { getMe, clearStoredToken, getPublicSite, saveProject, updateProject, loginGuest } from './lib/api';
import { User, Project, BusinessInfo, WebsiteContent } from './types';
import { CategoryPreset, CATEGORY_PRESETS } from './lib/presets';
import { updatePageSeo } from './lib/seo';

type ViewMode =
  | 'landing'
  | 'wizard'
  | 'preview'
  | 'editor'
  | 'dashboard'
  | 'public_site'
  | 'privacy-policy'
  | 'terms'
  | 'refund-policy'
  | 'contact'
  | 'about'
  | 'services'
  | 'pricing'
  | 'portfolio'
  | 'resources';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Active generation/editing workspace
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeBusinessInfo, setActiveBusinessInfo] = useState<BusinessInfo | null>(null);
  const [activeWebsite, setActiveWebsite] = useState<WebsiteContent | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<CategoryPreset | null>(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [settingsProject, setSettingsProject] = useState<Project | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeFeatureKey, setUpgradeFeatureKey] = useState<PlanFeatureKey>('general');

  function handleUpgradeRequest(feature: PlanFeatureKey = 'general') {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setUpgradeFeatureKey(feature);
    setUpgradeModalOpen(true);
  }

  function handleSelectPlan(plan: 'starter' | 'pro' | 'multi') {
    if (plan === 'starter') {
      handleStartWizard();
      return;
    }
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (plan === 'multi') {
      setUpgradeFeatureKey('multi_outlet');
      setUpgradeModalOpen(true);
      return;
    }
    // 'pro' plan upgrade
    setUpgradeFeatureKey('general');
    setUpgradeModalOpen(true);
  }

  // Public standalone site loading state
  const [publicSiteSlug, setPublicSiteSlug] = useState<string | null>(null);
  const [publicSiteData, setPublicSiteData] = useState<{
    slug: string;
    businessInfo: BusinessInfo;
    website: WebsiteContent;
  } | null>(null);
  const [publicSiteError, setPublicSiteError] = useState<string | null>(null);

  // On mount, check URL path and user authentication
  useEffect(() => {
    checkCurrentRoute();
    checkAuth();

    // Listen to browser navigation
    window.addEventListener('popstate', checkCurrentRoute);
    return () => window.removeEventListener('popstate', checkCurrentRoute);
  }, []);

  // Update document title, meta description, and canonical URL dynamically for each view
  useEffect(() => {
    if (currentView === 'landing') {
      updatePageSeo({
        title: 'LocalAI Web — AI Website Builder for Local Businesses & Shops',
        description:
          'Create a fast, mobile-friendly website for your local business in minutes. LocalAI Web generates tailored copy, menus, WhatsApp bookings, and Google Maps directions.',
        canonical: 'https://localwebai.website/',
      });
    } else if (currentView === 'about') {
      updatePageSeo({
        title: 'About LocalWeb AI — Mission, Platform & Engineering for Local Businesses',
        description:
          'Discover LocalWeb AI: an intelligent website builder built specifically for neighborhood shops, beauty parlors, clinics, and local services in India and worldwide.',
        canonical: 'https://localwebai.website/about',
      });
    } else if (currentView === 'services') {
      updatePageSeo({
        title: 'LocalWeb AI Services — Website Solutions for Local Businesses',
        description:
          'Explore website services tailored for local shops: AI generation, 1-tap WhatsApp booking, local SEO, Google Maps directions, printable QR codes, and lead management.',
        canonical: 'https://localwebai.website/services',
      });
    } else if (currentView === 'pricing') {
      updatePageSeo({
        title: 'LocalWeb AI Pricing — Transparent Plans for Local Businesses',
        description:
          'Compare LocalWeb AI plans: Starter Free Forever (₹0), Business Pro (₹499/mo), and Multi-Outlet custom rollout. No hidden fees or surprise renewal costs.',
        canonical: 'https://localwebai.website/pricing',
      });
    } else if (currentView === 'portfolio') {
      updatePageSeo({
        title: 'LocalWeb AI Showcase & Demo Projects — Real Website Previews',
        description:
          'Explore live and interactive demo websites created with LocalWeb AI: salons, bistros, clinics, and fitness studios with 1-tap WhatsApp booking.',
        canonical: 'https://localwebai.website/portfolio',
      });
    } else if (currentView === 'resources') {
      if (currentArticleSlug && RESOURCE_ARTICLES[currentArticleSlug]) {
        const art = RESOURCE_ARTICLES[currentArticleSlug];
        updatePageSeo({
          title: `${art.title} | LocalWeb AI Resources`,
          description: art.summary,
          canonical: `https://localwebai.website/resources/${art.slug}`,
        });
      } else {
        updatePageSeo({
          title: 'LocalWeb AI Knowledge & Resources — Guides for Local Businesses',
          description:
            'Expert, fact-checked guides on small business website costs in India, local SEO, salon and restaurant website essentials, and digital strategies.',
          canonical: 'https://localwebai.website/resources',
        });
      }
    } else if (currentView === 'wizard') {
      updatePageSeo({
        title: 'Create Your Business Website | LocalAI Web',
        description:
          'Step-by-step AI wizard to generate your local business website with custom branding, services, and WhatsApp contact in 2 minutes.',
        canonical: 'https://localwebai.website/',
      });
    } else if (currentView === 'preview') {
      const name = activeBusinessInfo?.businessName || 'Local Business';
      updatePageSeo({
        title: `Preview: ${name} Website | LocalAI Web`,
        description: `Live responsive mobile and desktop preview for ${name}. Review services, WhatsApp booking button, and business hours.`,
        canonical: 'https://localwebai.website/',
      });
    } else if (currentView === 'editor') {
      const name = activeBusinessInfo?.businessName || 'Local Business';
      updatePageSeo({
        title: `Edit ${name} Website Content | LocalAI Web`,
        description: `Fine-tune your website headlines, services catalog, pricing, contact details, and visual styling.`,
        canonical: 'https://localwebai.website/',
      });
    } else if (currentView === 'dashboard') {
      updatePageSeo({
        title: 'My Websites & Business Dashboard | LocalAI Web',
        description:
          'Manage your published local business websites, view customer inquiries, and download counter QR codes.',
        canonical: 'https://localwebai.website/',
      });
    } else if (currentView === 'public_site' && publicSiteData) {
      const { businessInfo, slug } = publicSiteData;
      const categoryCapitalized = businessInfo.category
        ? businessInfo.category.charAt(0).toUpperCase() + businessInfo.category.slice(1)
        : 'Business';
      updatePageSeo({
        title: `${businessInfo.businessName} — ${categoryCapitalized} in ${businessInfo.city}`,
        description:
          businessInfo.shortDescription ||
          `Official website for ${businessInfo.businessName} in ${businessInfo.city}. Book on WhatsApp, view services, pricing, hours, and directions.`,
        canonical: `https://localwebai.website/site/${slug}`,
      });
    }
  }, [currentView, currentArticleSlug, activeBusinessInfo, publicSiteData]);

  function checkCurrentRoute() {
    const path = window.location.pathname;

    const matchSite = path.match(/^\/site\/([a-zA-Z0-9_-]+)/);
    if (matchSite && matchSite[1]) {
      const slug = matchSite[1];
      setPublicSiteSlug(slug);
      setCurrentView('public_site');
      loadPublicSite(slug);
      return;
    }

    const matchResource = path.match(/^\/resources\/([a-zA-Z0-9_-]+)/);
    if (matchResource && matchResource[1]) {
      setCurrentArticleSlug(matchResource[1]);
      setCurrentView('resources');
      return;
    }

    if (path === '/resources') {
      setCurrentArticleSlug(null);
      setCurrentView('resources');
      return;
    }

    if (path === '/about') {
      setCurrentView('about');
      return;
    }

    if (path === '/services') {
      setCurrentView('services');
      return;
    }

    if (path === '/pricing') {
      setCurrentView('pricing');
      return;
    }

    if (path === '/portfolio' || path === '/showcase') {
      setCurrentView('portfolio');
      return;
    }

    if (path === '/privacy-policy') {
      setCurrentView('privacy-policy');
      return;
    }

    if (path === '/terms') {
      setCurrentView('terms');
      return;
    }

    if (path === '/refund-policy') {
      setCurrentView('refund-policy');
      return;
    }

    if (path === '/contact') {
      setCurrentView('contact');
      return;
    }

    if (path === '/') {
      setCurrentView('landing');
      return;
    }
  }

  function navigateToPath(path: string) {
    if (path.startsWith('/#')) {
      if (currentView !== 'landing') {
        window.history.pushState({}, '', '/');
        setCurrentView('landing');
        setTimeout(() => {
          const hash = path.substring(2);
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const hash = path.substring(2);
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    checkCurrentRoute();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function checkAuth() {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setIsAuthChecking(false);
    }
  }

  async function loadPublicSite(slug: string) {
    setPublicSiteError(null);
    try {
      const data = await getPublicSite(slug);
      setPublicSiteData(data);
    } catch (err: any) {
      setPublicSiteError(err.message || 'Website not found or has been unpublished.');
    }
  }

  function handleLogout() {
    clearStoredToken();
    setUser(null);
    setCurrentView('landing');
  }

  function handleStartWizard(preset?: CategoryPreset) {
    setSelectedPreset(preset || null);
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleGenerationComplete(info: BusinessInfo, website: WebsiteContent) {
    setActiveBusinessInfo(info);
    setActiveWebsite(website);

    // If user is logged in, auto-save to their projects
    if (user) {
      try {
        const proj = await saveProject(info, website);
        setActiveProject(proj);
      } catch (err) {
        console.error('Auto-save project failed:', err);
      }
    }
  }

  async function handleSaveWebsite(updatedWebsite: WebsiteContent, updatedInfo: BusinessInfo) {
    setActiveWebsite(updatedWebsite);
    setActiveBusinessInfo(updatedInfo);

    // If user is logged in and activeProject exists, save to DB
    if (user && activeProject) {
      const updated = await updateProject(activeProject.id, {
        website: updatedWebsite,
        businessInfo: updatedInfo,
      });
      if (updated) {
        setActiveProject(updated);
      }
    }
  }

  function handlePublish() {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setPublishModalOpen(true);
  }

  function handleExploreDemo() {
    // Navigate to showcase portfolio view
    navigateToPath('/portfolio');
  }

  function handleViewLiveSite(slug: string) {
    window.open(`/site/${slug}`, '_blank');
  }

  // Handle standalone public website view
  if (currentView === 'public_site') {
    if (publicSiteError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Website Not Found</h2>
            <p className="mt-2 text-sm text-slate-600">{publicSiteError}</p>
            <button
              onClick={() => {
                window.history.pushState({}, '', '/');
                setCurrentView('landing');
              }}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
            >
              Go to LocalWeb AI Home
            </button>
          </div>
        </div>
      );
    }

    if (!publicSiteData) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <p className="text-sm font-medium text-slate-600">Loading website...</p>
          </div>
        </div>
      );
    }

    return (
      <WebsitePreview
        businessInfo={publicSiteData.businessInfo}
        website={publicSiteData.website}
        isStandalone={true}
        slug={publicSiteData.slug}
        removeBranding={publicSiteData.website.removeBranding || false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Site-wide Sticky Navigation */}
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onNavigate={(view) => {
          if (view === 'landing') {
            window.history.pushState({}, '', '/');
          }
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentView={currentView}
        onNavigatePath={navigateToPath}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartWizard={handleStartWizard}
            onExploreDemo={handleExploreDemo}
            onNavigatePath={navigateToPath}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
            onStartWizard={handleStartWizard}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
            onStartWizard={handleStartWizard}
          />
        )}

        {currentView === 'pricing' && (
          <PricingPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
            onStartWizard={handleStartWizard}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentView === 'portfolio' && (
          <PortfolioPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
            onStartWizard={handleStartWizard}
            onExploreDemo={handleExploreDemo}
          />
        )}

        {currentView === 'resources' && (
          <ResourcesPage
            currentArticleSlug={currentArticleSlug}
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
            onStartWizard={handleStartWizard}
          />
        )}

        {currentView === 'privacy-policy' && (
          <PrivacyPolicyPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
          />
        )}

        {currentView === 'terms' && (
          <TermsPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
          />
        )}

        {currentView === 'refund-policy' && (
          <RefundPolicyPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onNavigateHome={() => navigateToPath('/')}
            onNavigatePath={navigateToPath}
          />
        )}

        {currentView === 'wizard' && (
          <GeneratorWizard
            initialPreset={selectedPreset}
            onGenerationComplete={handleGenerationComplete}
            onCancel={() => setCurrentView('landing')}
            onPreview={() => setCurrentView('preview')}
            onEdit={() => setCurrentView('editor')}
            onPublish={handlePublish}
            generatedWebsite={activeWebsite}
          />
        )}

        {currentView === 'preview' && activeBusinessInfo && activeWebsite && (
          <WebsitePreview
            businessInfo={activeBusinessInfo}
            website={activeWebsite}
            isStandalone={false}
            slug={activeProject?.slug || 'preview'}
            removeBranding={activeProject?.removeBranding ?? (user?.plan === 'pro' || user?.plan === 'multi')}
            onEdit={() => setCurrentView('editor')}
            onPublish={handlePublish}
            onBack={() => setCurrentView(user ? 'dashboard' : 'landing')}
          />
        )}

        {currentView === 'editor' && activeBusinessInfo && activeWebsite && (
          <WebsiteEditor
            businessInfo={activeBusinessInfo}
            website={activeWebsite}
            user={user}
            onSave={handleSaveWebsite}
            onPreview={() => setCurrentView('preview')}
            onPublish={handlePublish}
            onBack={() => setCurrentView('preview')}
            onUpgradeRequest={handleUpgradeRequest}
            onUserUpdated={(updatedUser) => setUser(updatedUser)}
          />
        )}

        {currentView === 'dashboard' && user && (
          <Dashboard
            user={user}
            onCreateNew={() => {
              setActiveBusinessInfo(null);
              setActiveWebsite(null);
              setActiveProject(null);
              setCurrentView('wizard');
            }}
            onEditProject={(proj) => {
              setActiveProject(proj);
              setActiveBusinessInfo(proj.businessInfo);
              setActiveWebsite(proj.website);
              setCurrentView('editor');
            }}
            onPreviewProject={(proj) => {
              setActiveProject(proj);
              setActiveBusinessInfo(proj.businessInfo);
              setActiveWebsite(proj.website);
              setCurrentView('preview');
            }}
            onPublishProject={(proj) => {
              setActiveProject(proj);
              setActiveBusinessInfo(proj.businessInfo);
              setActiveWebsite(proj.website);
              setPublishModalOpen(true);
            }}
            onUpgradeRequest={handleUpgradeRequest}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          if (activeWebsite && activeBusinessInfo && !activeProject) {
            saveProject(activeBusinessInfo, activeWebsite).then((p) => setActiveProject(p));
          }
        }}
      />

      {/* Publish Modal */}
      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        project={activeProject}
        userPlan={user?.plan || 'starter'}
        onUpgradeRequest={handleUpgradeRequest}
        onViewLive={handleViewLiveSite}
        onOpenCustomDomain={(proj) => {
          setPublishModalOpen(false);
          setSettingsProject(proj);
        }}
      />

      {/* Project Settings Modal */}
      <ProjectSettingsModal
        isOpen={!!settingsProject}
        onClose={() => setSettingsProject(null)}
        project={settingsProject}
        onProjectUpdated={(updated) => {
          if (activeProject?.id === updated.id) {
            setActiveProject(updated);
          }
          setSettingsProject(updated);
        }}
      />

      {/* Upgrade / Plan Management Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        user={user}
        featureKey={upgradeFeatureKey}
        onPlanUpdated={(updatedUser) => {
          setUser(updatedUser);
        }}
      />
    </div>
  );
}
