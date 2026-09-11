export type BusinessCategory =
  | 'salon'
  | 'restaurant'
  | 'cafe'
  | 'gym'
  | 'clinic'
  | 'tutor'
  | 'retail'
  | 'service'
  | 'freelancer'
  | 'other';

export type StylePreference =
  | 'modern-minimal'
  | 'warm-friendly'
  | 'elegant-luxury'
  | 'vibrant-bold'
  | 'clean-corporate';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  popular?: boolean;
  category?: string;
}

export interface DaySchedule {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface BusinessInfo {
  businessName: string;
  category: string;
  city: string;
  address: string;
  shortDescription: string;
  services: ServiceItem[];
  phoneNumber: string;
  whatsappNumber: string;
  openingHours: {
    general: string;
    schedule: DaySchedule[];
  };
  businessEmail: string;
  stylePreference: StylePreference;
  currencySymbol: string;
}

export interface WebsiteHero {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  coverImage: string;
}

export interface WebsiteAbout {
  title: string;
  subtitle: string;
  story: string;
  highlights: Array<{ title: string; desc: string }>;
  yearsInBusiness?: string;
  image?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface WebsiteSeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  title?: string;
  description?: string;
}

export interface WebsiteTheme {
  style: StylePreference;
  primaryColor: string; // Tailwind color class or hex
  accentColor?: string;
  fontFamily?: string;
  borderRadius?: 'rounded-lg' | 'rounded-2xl' | 'rounded-3xl';
  removeBranding?: boolean; // Pro & Multi-Outlet feature
}

export interface WebsiteContact {
  phone: string;
  whatsapp: string;
  whatsappMessagePreset: string;
  email: string;
  address: string;
  city?: string;
  googleMapsQuery?: string;
}

export interface WebsiteContent {
  hero: WebsiteHero;
  about: WebsiteAbout;
  services: ServiceItem[];
  schedule: DaySchedule[];
  contact: WebsiteContact;
  testimonials: TestimonialItem[];
  faq: FaqItem[];
  seo: WebsiteSeo;
  theme: WebsiteTheme;
}

export interface CustomDomainConfig {
  domain: string;
  status: 'pending' | 'verified' | 'active' | 'error';
  cnameTarget: string;
  dnsRecordType: 'CNAME';
  dnsHost: string;
  sslStatus?: 'active' | 'issuing' | 'pending';
  configuredAt?: string;
  verifiedAt?: string;
  lastCheckedAt?: string;
  errorMessage?: string;
}

export interface Project {
  id: string;
  userId: string;
  slug: string;
  businessInfo: BusinessInfo;
  website: WebsiteContent;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  whatsappClicksCount: number;
  callClicksCount: number;
  leadsCount: number;
  customDomain?: CustomDomainConfig;
  branchName?: string; // Multi-Outlet feature
  removeBranding?: boolean; // Pro & Multi-Outlet feature
}

export type PlanType = 'starter' | 'pro' | 'multi';
export type PlanStatus = 'active' | 'inactive' | 'pending' | 'expired';
export type MultiOutletStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'expired';

export interface MultiOutletRequest {
  id: string;
  userId: string;
  userEmail: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  locationsCount: number;
  requirements: string;
  status: MultiOutletStatus;
  customPrice?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  expiresAt?: string;
}

export interface UserSubscription {
  orderId?: string;
  paymentId?: string;
  plan: 'pro';
  amount: number;
  currency: string;
  status: 'active' | 'pending' | 'cancelled';
  activatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  token: string;
  role?: 'user' | 'admin';
  plan: PlanType;
  planStatus?: PlanStatus;
  multiOutletRequestId?: string;
  aiGenerationsUsed: number;
  aiGenerationsLimit: number; // 3 for starter, Infinity for pro/multi
  subscription?: UserSubscription;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  paymentId?: string;
  signature?: string;
  userId: string;
  userEmail: string;
  amount: number; // in paise (e.g. 49900 = ₹499)
  currency: string; // 'INR'
  plan: 'pro';
  status: 'created' | 'authorized' | 'captured' | 'verified' | 'failed';
  createdAt: string;
  verifiedAt?: string;
  receipt?: string;
  errorMessage?: string;
}

export interface LeadInquiry {
  id: string;
  projectId: string;
  name: string;
  phone: string;
  email?: string;
  serviceRequested?: string;
  message: string;
  createdAt: string;
}
