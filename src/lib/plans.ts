import { PlanType, User } from '../types';

export interface PlanConfig {
  id: PlanType;
  name: string;
  price: string;
  pricePeriod?: string;
  badge?: string;
  tagline: string;
  description: string;
  features: string[];
  limits: {
    maxWebsites: number;
    maxAiGenerations: number;
    allowLeadManager: boolean;
    allowRemoveBranding: boolean;
    allowHighResQR: boolean;
    allowCustomDomain: boolean;
    allowMultiBranch: boolean;
    allowCentralizedLeads: boolean;
    allowAdvancedCustomization: boolean;
  };
}

export const PLANS: Record<PlanType, PlanConfig> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: '₹0',
    pricePeriod: 'Free Forever',
    tagline: 'Perfect to get your shop or clinic online today.',
    description: 'Essential presence for single local shops and independent service providers.',
    features: [
      '1 business website',
      'Basic AI website generation',
      'WhatsApp button',
      'Call button',
      'Google Maps',
      'Business hours',
      'Shareable website link',
      'Basic QR code',
      'Basic content/section editing',
      'Limited AI generations (3 credits)',
      'LocalWeb AI branding on website',
    ],
    limits: {
      maxWebsites: 1,
      maxAiGenerations: 3,
      allowLeadManager: false,
      allowRemoveBranding: false,
      allowHighResQR: false,
      allowCustomDomain: false,
      allowMultiBranch: false,
      allowCentralizedLeads: false,
      allowAdvancedCustomization: false,
    },
  },
  pro: {
    id: 'pro',
    name: 'Business Pro',
    price: '₹499',
    pricePeriod: 'per month',
    badge: 'MOST POPULAR',
    tagline: 'For growth-focused salons, clinics, cafes, and local stores.',
    description: 'Everything in Starter plus unlimited AI, inquiry manager, and complete brand control.',
    features: [
      'Includes everything in Starter, plus:',
      'Unlimited AI section/content regeneration',
      'Lead/inquiry manager',
      'Booking/inquiry management',
      'Remove LocalWeb AI branding',
      'High-resolution QR download',
      'Advanced customization',
      'Priority support',
    ],
    limits: {
      maxWebsites: 3,
      maxAiGenerations: 999999,
      allowLeadManager: true,
      allowRemoveBranding: true,
      allowHighResQR: true,
      allowCustomDomain: true,
      allowMultiBranch: false,
      allowCentralizedLeads: false,
      allowAdvancedCustomization: true,
    },
  },
  multi: {
    id: 'multi',
    name: 'Multi-Outlet',
    price: 'Custom',
    pricePeriod: 'Contact for pricing',
    tagline: 'For multi-branch stores, franchises, and regional brands.',
    description: 'Scale across multiple locations with branch-level controls and centralized leads.',
    features: [
      'Includes everything in Pro, plus:',
      'Multiple business websites',
      'Multiple locations/branches',
      'Separate branch management',
      'Centralized lead management',
      'Custom branding',
      'Advanced customization',
      'Dedicated support',
    ],
    limits: {
      maxWebsites: 999999,
      maxAiGenerations: 999999,
      allowLeadManager: true,
      allowRemoveBranding: true,
      allowHighResQR: true,
      allowCustomDomain: true,
      allowMultiBranch: true,
      allowCentralizedLeads: true,
      allowAdvancedCustomization: true,
    },
  },
};

export const STARTER_AI_LIMIT = 3;

// Access control helper functions
export function getUserPlan(user: User | null): PlanType {
  return user?.plan || 'starter';
}

export function canCreateMoreWebsites(user: User | null, currentProjectsCount: number): boolean {
  const plan = getUserPlan(user);
  const limit = PLANS[plan].limits.maxWebsites;
  return currentProjectsCount < limit;
}

export function canUseUnlimitedAI(user: User | null): boolean {
  const plan = getUserPlan(user);
  return plan === 'pro' || plan === 'multi';
}

export function getRemainingAiGenerations(user: User | null): number {
  if (!user) return STARTER_AI_LIMIT;
  if (canUseUnlimitedAI(user)) return 999999;
  return Math.max(0, STARTER_AI_LIMIT - (user.aiGenerationsUsed || 0));
}

export function canAccessLeadManager(user: User | null): boolean {
  const plan = getUserPlan(user);
  return PLANS[plan].limits.allowLeadManager;
}

export function canRemoveBranding(user: User | null): boolean {
  const plan = getUserPlan(user);
  return PLANS[plan].limits.allowRemoveBranding;
}

export function canDownloadHighResQR(user: User | null): boolean {
  const plan = getUserPlan(user);
  return PLANS[plan].limits.allowHighResQR;
}

export function canUseCustomDomain(user: User | null): boolean {
  const plan = getUserPlan(user);
  return PLANS[plan].limits.allowCustomDomain;
}

export function canManageMultipleOutlets(user: User | null): boolean {
  const plan = getUserPlan(user);
  return PLANS[plan].limits.allowMultiBranch;
}

export function canAccessCentralizedLeads(user: User | null): boolean {
  const plan = getUserPlan(user);
  return PLANS[plan].limits.allowCentralizedLeads;
}

export function getPlanDisplayName(plan: PlanType): string {
  return PLANS[plan]?.name || 'Starter';
}
