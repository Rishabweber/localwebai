import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  ShieldCheck,
  AlertCircle,
  Inbox,
  QrCode,
  Globe,
  Sliders,
  Loader2,
  CreditCard,
  Check,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { User } from '../types';
import {
  getRazorpayConfig,
  createRazorpayOrder,
  verifyRazorpayPayment,
  loadRazorpayCheckoutScript,
  getMyMultiOutletRequest,
} from '../lib/api';
import { CustomPlanRequestModal } from './CustomPlanRequestModal';

export type PlanFeatureKey =
  | 'more_websites'
  | 'unlimited_ai'
  | 'leads'
  | 'remove_branding'
  | 'high_res_qr'
  | 'advanced_customization'
  | 'multi_outlet'
  | 'general';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  featureKey?: PlanFeatureKey;
  onPlanUpdated: (updatedUser: User) => void;
}

const FEATURE_CALLOUTS: Record<PlanFeatureKey, { title: string; desc: string; icon: any }> = {
  more_websites: {
    title: 'Multiple Websites',
    desc: 'The Starter plan includes 1 business website. Upgrade to Business Pro to create and manage multiple businesses.',
    icon: Globe,
  },
  unlimited_ai: {
    title: 'Unlimited AI Section Regeneration',
    desc: 'You have reached the limit of 3 AI section regenerations on Starter. Upgrade to Business Pro for unlimited AI regenerations.',
    icon: Sparkles,
  },
  leads: {
    title: 'Lead/Inquiry Manager & Bookings',
    desc: 'Customer inquiry inbox, booking alerts, and visitor lead management are unlocked on Business Pro.',
    icon: Inbox,
  },
  remove_branding: {
    title: 'Remove LocalWeb AI Branding',
    desc: 'Remove all LocalWeb AI footer badges and platform watermarks with Business Pro.',
    icon: ShieldCheck,
  },
  high_res_qr: {
    title: 'High-Resolution QR Code Download',
    desc: 'Download ultra-crisp 1200x1200px print-ready QR codes for table stands and storefront flyers.',
    icon: QrCode,
  },
  advanced_customization: {
    title: 'Advanced Customization',
    desc: 'Access custom color themes, typography controls, and section customization on Business Pro.',
    icon: Sliders,
  },
  multi_outlet: {
    title: 'Multi-Outlet Scalability',
    desc: 'Deploy multiple branch websites with centralized headquarters lead tracking.',
    icon: Building2,
  },
  general: {
    title: 'Upgrade to Business Pro',
    desc: 'Unlock all professional growth tools, unlimited AI generations, and lead management.',
    icon: Zap,
  },
};

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  user,
  featureKey = 'general',
  onPlanUpdated,
}) => {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [pendingMultiRequest, setPendingMultiRequest] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ orderId: string; paymentId: string } | null>(null);
  const [rzpConfig, setRzpConfig] = useState<{
    keyId: string;
    isConfigured: boolean;
    testMode: boolean;
    displayPrice: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccessData(null);
      getRazorpayConfig()
        .then((cfg) => setRzpConfig(cfg))
        .catch(() => {});

      getMyMultiOutletRequest()
        .then((res) => {
          if (res.request && res.request.status === 'pending') {
            setPendingMultiRequest(true);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlan = user?.plan || 'starter';
  const callout = FEATURE_CALLOUTS[featureKey] || FEATURE_CALLOUTS.general;
  const CalloutIcon = callout.icon;

  async function handleStartProPayment() {
    if (currentPlan === 'pro') {
      onClose();
      return;
    }

    setError(null);
    setLoadingOrder(true);

    try {
      // 1. Ensure Razorpay checkout script is loaded
      const scriptReady = await loadRazorpayCheckoutScript();
      if (!scriptReady || !(window as any).Razorpay) {
        throw new Error('Razorpay Checkout SDK could not be loaded. Please check your network connection.');
      }

      // 2. Create Razorpay order on server
      const orderData = await createRazorpayOrder();

      setLoadingOrder(false);

      // 3. Open Razorpay Checkout popup
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LocalWeb AI',
        description: 'Business Pro Plan Upgrade (₹499/month)',
        image: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
        order_id: orderData.orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: '',
        },
        theme: {
          color: '#4f46e5',
        },
        modal: {
          ondismiss: () => {
            setLoadingOrder(false);
            setVerifying(false);
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          // 4. Server-side verification (Never trust frontend success alone)
          setVerifying(true);
          setError(null);
          try {
            const verificationResult = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // 5. Upgrade state & show success confirmation
            setSuccessData({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            });
            onPlanUpdated(verificationResult.user);
          } catch (verifyErr: any) {
            setError(verifyErr.message || 'Server payment verification failed. Please contact support.');
          } finally {
            setVerifying(false);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        setError(`Payment failed: ${response.error?.description || response.error?.reason || 'Transaction was not completed'}`);
        setLoadingOrder(false);
        setVerifying(false);
      });

      rzp.open();
    } catch (err: any) {
      setLoadingOrder(false);
      setError(err.message || 'Unable to initiate Razorpay checkout.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl">
        <button
          id="close-upgrade-modal-btn"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ================= SUCCESS STATE AFTER VERIFICATION ================= */}
        {successData ? (
          <div className="py-6 text-center space-y-6 animate-fadeIn">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Payment Verified &amp; Activated
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                You're now on Business Pro.
              </h2>
              <p className="text-sm font-semibold text-emerald-700">
                This feature is now available on Business Pro.
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your ₹499 monthly subscription is confirmed. All pro capabilities, unlimited AI section regenerations, and lead tracking are unlocked immediately.
              </p>
            </div>

            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Plan:</span>
                <span className="font-bold text-slate-900">Business Pro (₹499/month)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment ID:</span>
                <span className="font-mono font-medium text-slate-800">{successData.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-medium text-slate-800">{successData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Server Verified
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="continue-pro-btn"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition active:scale-95"
              >
                <span>Continue to Pro Features</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= STANDARD MODAL CONTENT ================= */
          <>
            {/* FEATURE-GATE CALLOUT BANNER: Show exact requested copy when Starter user tries to access a Pro feature */}
            {featureKey !== 'general' && (
              <div
                id="pro-feature-restriction-callout"
                className="mb-6 rounded-2xl bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200/80 p-4 sm:p-5 text-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <CalloutIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900">
                      This feature is available on Business Pro.
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {callout.title}: {callout.desc}
                    </p>
                  </div>
                </div>

                <button
                  id="feature-gate-upgrade-btn"
                  onClick={handleStartProPayment}
                  disabled={loadingOrder || verifying}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition active:scale-95 disabled:opacity-60"
                >
                  {loadingOrder ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Creating Order...</span>
                    </>
                  ) : verifying ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Upgrade to Pro</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="text-center mb-8">
              <span className="rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Razorpay Secure Checkout
              </span>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                Choose the Perfect Plan for Your Business
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Upgrade to Business Pro for ₹499/month with instant server-verified Razorpay activation.
              </p>
            </div>

            {/* In-Progress Loading Banner */}
            {(loadingOrder || verifying) && (
              <div className="mb-6 rounded-2xl bg-indigo-50 border border-indigo-200 p-4 text-center space-y-2 animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold text-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span>
                    {loadingOrder
                      ? 'Creating secure Razorpay order...'
                      : 'Verifying payment signature with server...'}
                  </span>
                </div>
                <p className="text-xs text-indigo-600/80">
                  Please complete the payment in the Razorpay popup. Do not refresh this page.
                </p>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-700 space-y-1">
                <div className="flex items-center gap-2 font-bold text-rose-800">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>Payment Notice</span>
                </div>
                <p className="pl-6">{error}</p>
                {error.includes('credentials') && (
                  <p className="pl-6 text-[11px] text-rose-600 font-medium">
                    Tip: Set <code>RAZORPAY_KEY_ID</code> and <code>RAZORPAY_KEY_SECRET</code> in your project environment secrets to enable test/live payments.
                  </p>
                )}
              </div>
            )}

            {/* PLANS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {/* PLAN 1: STARTER */}
              <div
                className={`rounded-3xl border p-6 flex flex-col justify-between transition ${
                  currentPlan === 'starter'
                    ? 'border-indigo-400 bg-indigo-50/20 shadow-sm ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">STARTER</span>
                    {currentPlan === 'starter' && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        CURRENT PLAN
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">₹0 / Free Forever</h3>
                  <p className="text-xs text-slate-500 mt-1">Only Starter features included.</p>

                  <div className="my-5 border-t border-slate-100 pt-4">
                    <ul className="space-y-2 text-xs text-slate-600">
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
                        WhatsApp &amp; Call buttons
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Google Maps &amp; Business hours
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Shareable website link
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Basic QR code
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Basic content/section editing
                      </li>
                      <li className="flex items-center gap-2 text-slate-500">
                        <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0" />
                        3 AI section regenerations
                      </li>
                      <li className="flex items-center gap-2 text-slate-400">
                        <CheckCircle2 className="h-4 w-4 text-slate-300 shrink-0" />
                        Shows LocalWeb AI branding
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="select-starter-plan-btn"
                    disabled={currentPlan === 'starter'}
                    onClick={() => onClose()}
                    className="w-full rounded-xl py-2.5 text-xs font-bold transition bg-slate-100 text-slate-400 cursor-default"
                  >
                    {currentPlan === 'starter' ? 'Active Plan' : 'Current Plan'}
                  </button>
                </div>
              </div>

              {/* PLAN 2: BUSINESS PRO (₹499/month, Start Pro button) */}
              <div
                className={`relative rounded-3xl border-2 p-6 flex flex-col justify-between shadow-lg transition ${
                  currentPlan === 'pro'
                    ? 'border-indigo-600 bg-indigo-50/30 shadow-indigo-100 ring-2 ring-indigo-300'
                    : 'border-indigo-600 bg-white shadow-indigo-100 ring-1 ring-indigo-100'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                  MOST POPULAR
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">BUSINESS PRO</span>
                    {currentPlan === 'pro' && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        CURRENT PLAN
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-slate-900 mt-1">₹499/month</h3>
                  <p className="text-xs text-slate-500 mt-1">All Starter features, plus:</p>

                  <div className="my-5 border-t border-slate-100 pt-4">
                    <ul className="space-y-2.5 text-xs text-slate-700">
                      <li className="flex items-center gap-2 font-semibold text-indigo-950">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                        Unlimited AI section/content regeneration
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                        Lead/inquiry manager
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                        Booking/inquiry management
                      </li>
                      <li className="flex items-center gap-2 font-medium text-emerald-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Remove LocalWeb AI branding
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                        High-resolution QR download
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                        Advanced customization
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                        Priority support
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="select-pro-plan-btn"
                    onClick={handleStartProPayment}
                    disabled={currentPlan === 'pro' || loadingOrder || verifying}
                    className={`w-full rounded-xl py-3 text-xs font-bold shadow-md transition flex items-center justify-center gap-2 ${
                      currentPlan === 'pro'
                        ? 'bg-slate-100 text-slate-400 cursor-default shadow-none'
                        : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 active:scale-95'
                    }`}
                  >
                    {loadingOrder ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Opening Razorpay...</span>
                      </>
                    ) : verifying ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Verifying with Server...</span>
                      </>
                    ) : currentPlan === 'pro' ? (
                      <span>Active Plan</span>
                    ) : (
                      <>
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>{featureKey !== 'general' ? 'Upgrade to Pro' : 'Start Pro'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PLAN 3: MULTI-OUTLET */}
              <div
                className={`rounded-3xl border p-6 flex flex-col justify-between transition ${
                  currentPlan === 'multi'
                    ? 'border-emerald-500 bg-emerald-50/20 shadow-sm ring-2 ring-emerald-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">MULTI-OUTLET</span>
                    {currentPlan === 'multi' && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        CURRENT PLAN
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">Custom</h3>
                  <p className="text-xs text-slate-500 mt-1">Multi-branch enterprise setup.</p>

                  <div className="my-5 border-t border-slate-100 pt-4">
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-center gap-2 font-semibold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Multiple business websites
                      </li>
                      <li className="flex items-center gap-2 font-semibold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Centralized lead management
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Multi-branch selector
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Custom branding &amp; domains
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Dedicated support
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  {currentPlan === 'multi' && user?.planStatus === 'active' ? (
                    <button
                      id="multi-plan-active-btn"
                      disabled
                      className="w-full rounded-xl py-2.5 text-xs font-bold bg-slate-100 text-slate-400 cursor-default"
                    >
                      Active Plan
                    </button>
                  ) : pendingMultiRequest || user?.planStatus === 'pending' ? (
                    <button
                      id="view-pending-multi-plan-btn"
                      onClick={() => setCustomModalOpen(true)}
                      className="w-full rounded-xl py-2.5 text-xs font-bold border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 transition flex items-center justify-center gap-1.5"
                    >
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      <span>Request Pending</span>
                    </button>
                  ) : (
                    <button
                      id="request-custom-plan-btn"
                      onClick={() => setCustomModalOpen(true)}
                      className="w-full rounded-xl py-2.5 text-xs font-bold border border-indigo-200 bg-indigo-50/70 text-indigo-700 hover:bg-indigo-100 transition flex items-center justify-center gap-1.5"
                    >
                      <Building2 className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Request Custom Plan</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Custom Plan Request Modal */}
      <CustomPlanRequestModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        user={user}
        onRequestSubmitted={() => {
          setPendingMultiRequest(true);
        }}
      />
    </div>
  );
};
