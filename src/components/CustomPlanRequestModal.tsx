import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle2, Clock, AlertCircle, X, Send, Sparkles, Phone, Mail, User as UserIcon, MapPin } from 'lucide-react';
import { User, MultiOutletRequest } from '../types';
import { submitMultiOutletRequest, getMyMultiOutletRequest } from '../lib/api';

interface CustomPlanRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onRequestSubmitted?: (request: MultiOutletRequest) => void;
}

export const CustomPlanRequestModal: React.FC<CustomPlanRequestModalProps> = ({
  isOpen,
  onClose,
  user,
  onRequestSubmitted,
}) => {
  const [existingRequest, setExistingRequest] = useState<MultiOutletRequest | null>(null);
  const [loadingExisting, setLoadingExisting] = useState(false);

  // Form State
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [contactPerson, setContactPerson] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [locationsCount, setLocationsCount] = useState('2');
  const [requirements, setRequirements] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      setBusinessName(user.businessName || '');
      setContactPerson(user.name || '');
      setEmail(user.email || '');
      setError(null);
      setSuccessMessage(null);

      // Fetch any existing request
      setLoadingExisting(true);
      getMyMultiOutletRequest()
        .then((res) => {
          if (res.request) {
            setExistingRequest(res.request);
          }
        })
        .catch(() => {})
        .finally(() => {
          setLoadingExisting(false);
        });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!businessName.trim() || !contactPerson.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all required contact and business fields.');
      return;
    }

    const count = parseInt(locationsCount, 10);
    if (isNaN(count) || count < 1) {
      setError('Please specify at least 1 branch location.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await submitMultiOutletRequest({
        businessName: businessName.trim(),
        contactPerson: contactPerson.trim(),
        email: email.trim(),
        phone: phone.trim(),
        locationsCount: count,
        requirements: requirements.trim(),
      });

      setSuccessMessage(res.message || 'Request received. Our team will contact you with a custom plan and pricing.');
      setExistingRequest(res.request);
      if (onRequestSubmitted) {
        onRequestSubmitted(res.request);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const isMultiActive = user?.plan === 'multi' && user?.planStatus === 'active';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl font-extrabold text-slate-900">
                  Request Custom Plan
                </h3>
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-indigo-800 uppercase">
                  Multi-Outlet
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                For businesses with multiple locations. Contact us for a tailored plan.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Existing Active Multi-Outlet State */}
        {isMultiActive && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>Multi-Outlet Plan is Currently Active</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Your account is fully entitled to multi-location branch management, unlimited websites, centralized leads, and priority support.
            </p>
          </div>
        )}

        {/* Success Confirmation after new request submission */}
        {successMessage ? (
          <div className="space-y-6 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="font-heading text-lg font-bold text-slate-900">
                Request Received!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {successMessage}
              </p>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
                <p className="font-semibold text-slate-800">What happens next?</p>
                <p>1. Our business team evaluates your locations and customized feature needs.</p>
                <p>2. We will contact you at <span className="font-semibold text-slate-800">{email}</span> / <span className="font-semibold text-slate-800">{phone}</span> with a custom proposal.</p>
                <p>3. Once confirmed, Multi-Outlet multi-branch access will be activated on your account.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              Back to Dashboard
            </button>
          </div>
        ) : existingRequest && existingRequest.status === 'pending' ? (
          /* Existing Pending Request View */
          <div className="space-y-5 py-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span>Custom Plan Request Under Review</span>
                </div>
                <span className="rounded-full bg-amber-200/80 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 uppercase">
                  Pending Approval
                </span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                We received your Multi-Outlet custom plan request on{' '}
                {new Date(existingRequest.createdAt).toLocaleDateString()}. Our team is currently reviewing your branch requirements.
              </p>
              <div className="rounded-xl bg-white/80 p-3 border border-amber-200/60 text-xs text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Business:</span>
                  <span className="font-semibold">{existingRequest.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Locations Requested:</span>
                  <span className="font-semibold">{existingRequest.locationsCount} outlets</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-semibold">{existingRequest.contactPerson} ({existingRequest.phone})</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Royal Sweets & Bakery"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Person *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Number of Branch Locations *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min="2"
                  max="100"
                  required
                  value={locationsCount}
                  onChange={(e) => setLocationsCount(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-hidden"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Multi-Outlet plans are designed for businesses managing 2 or more physical locations.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Custom Requirements & Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Tell us about your branches, POS/CRM integrations needed, or specific custom branding preferences..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-hidden resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Custom Plan Request</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Submitting this request will not charge your card. Our team will prepare a tailored proposal.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
