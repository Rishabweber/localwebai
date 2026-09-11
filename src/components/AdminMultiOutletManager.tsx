import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  X,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  Check,
} from 'lucide-react';
import { MultiOutletRequest, User } from '../types';
import { getAdminMultiOutletRequests, updateAdminMultiOutletStatus, setAdminCustomPrice } from '../lib/api';

interface AdminMultiOutletManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserStatusChanged?: () => void;
}

export const AdminMultiOutletManager: React.FC<AdminMultiOutletManagerProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserStatusChanged,
}) => {
  const [requests, setRequests] = useState<MultiOutletRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'active' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Price quote state for individual request
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<string>('2499');

  const isAdmin =
    currentUser?.role === 'admin' ||
    currentUser?.email === 'admin@localweb.ai' ||
    currentUser?.email === 'kshubham70896@gmail.com';

  useEffect(() => {
    if (isOpen) {
      loadRequests();
    }
  }, [isOpen]);

  async function loadRequests() {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminMultiOutletRequests();
      setRequests(res.requests || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load enterprise requests.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(
    id: string,
    status: 'pending' | 'approved' | 'rejected' | 'active' | 'expired',
    customPrice?: number
  ) {
    setActionLoadingId(id);
    setError(null);
    try {
      const res = await updateAdminMultiOutletStatus(id, status, customPrice);
      setSuccessToast(res.message);
      setTimeout(() => setSuccessToast(null), 4000);
      await loadRequests();
      if (onUserStatusChanged) {
        onUserStatusChanged();
      }
    } catch (err: any) {
      setError(err.message || 'Status update failed.');
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleSaveCustomPrice(id: string) {
    const num = Number(priceInput);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid price in INR.');
      return;
    }
    setActionLoadingId(id);
    try {
      const res = await setAdminCustomPrice(id, num);
      setSuccessToast(res.message);
      setEditingPriceId(null);
      setTimeout(() => setSuccessToast(null), 4000);
      await loadRequests();
    } catch (err: any) {
      setError(err.message || 'Failed to save price.');
    } finally {
      setActionLoadingId(null);
    }
  }

  if (!isOpen) return null;

  const filteredRequests = requests.filter((r) => {
    const matchesFilter = filter === 'all' || r.status === filter;
    const matchesSearch =
      r.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl font-extrabold text-slate-900">
                  Admin: Multi-Outlet Review & Approvals
                </h3>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-amber-800 uppercase">
                  Staff Only
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Review incoming enterprise multi-branch requests, configure custom quotes, or activate full multi-outlet access.
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

        {/* Access Warning if current user is not admin */}
        {!isAdmin && (
          <div className="my-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>
                You are currently signed in as <strong>{currentUser?.email || 'Guest'}</strong>. Full authorization requires an admin account (e.g. <code>admin@localweb.ai</code>).
              </span>
            </div>
          </div>
        )}

        {/* Notification Toasts */}
        {successToast && (
          <div className="my-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 flex items-center gap-2 shrink-0 animate-fadeIn">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {error && (
          <div className="my-3 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-center gap-2 shrink-0">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Controls: Search and Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 shrink-0 border-b border-slate-100">
          <div className="relative min-w-[220px] max-w-sm flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search business, contact, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex rounded-xl bg-slate-100 p-1 text-[11px] font-semibold text-slate-600">
              {(['all', 'pending', 'approved', 'active', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`capitalize px-3 py-1 rounded-lg transition ${
                    filter === status
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button
              onClick={loadRequests}
              disabled={loading}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition disabled:opacity-50"
              title="Refresh requests"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {loading && requests.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-slate-400" />
              Loading requests...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="py-12 text-center rounded-2xl border border-dashed border-slate-200 p-8 space-y-2">
              <Building2 className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">No requests found</p>
              <p className="text-[11px] text-slate-400">
                {filter === 'all'
                  ? 'No custom plan requests have been submitted yet.'
                  : `No requests with status "${filter}".`}
              </p>
            </div>
          ) : (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-sm font-bold text-slate-900">
                        {req.businessName}
                      </h4>
                      {/* Status Badges */}
                      {req.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                          <Clock className="h-3 w-3" /> Pending Review
                        </span>
                      )}
                      {req.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-800">
                          <CheckCircle2 className="h-3 w-3" /> Approved Quote
                        </span>
                      )}
                      {req.status === 'active' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" /> Active Plan
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-800">
                          <XCircle className="h-3 w-3" /> Rejected
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Submitted on {new Date(req.createdAt).toLocaleString()} • ID: <code className="font-mono">{req.id}</code>
                    </p>
                  </div>

                  {/* Price Quote Tag */}
                  {req.customPrice && (
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 px-3 py-1 text-right">
                      <div className="text-[10px] uppercase font-bold text-indigo-700">Custom Quote</div>
                      <div className="font-heading text-sm font-black text-indigo-900">
                        ₹{req.customPrice.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl bg-slate-50/70 p-3 text-xs text-slate-700 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{req.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{req.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold">{req.locationsCount} Branches</span>
                  </div>
                </div>

                {req.requirements && (
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-0.5">Requirements / Notes:</span>
                    <p className="whitespace-pre-wrap">{req.requirements}</p>
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500">
                    User Account: <code className="font-mono text-slate-700">{req.userEmail}</code>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {editingPriceId === req.id ? (
                      <div className="flex items-center gap-1.5">
                        <div className="relative">
                          <IndianRupee className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-400" />
                          <input
                            type="number"
                            value={priceInput}
                            onChange={(e) => setPriceInput(e.target.value)}
                            placeholder="Price"
                            className="w-24 rounded-lg border border-slate-200 py-1 pl-6 pr-2 text-xs font-bold"
                          />
                        </div>
                        <button
                          onClick={() => handleSaveCustomPrice(req.id)}
                          disabled={actionLoadingId === req.id}
                          className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-700 transition"
                        >
                          Save Quote
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingPriceId(req.id);
                          setPriceInput(req.customPrice ? String(req.customPrice) : '2499');
                        }}
                        disabled={actionLoadingId === req.id}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        {req.customPrice ? 'Edit Quote Price' : 'Set Custom Price'}
                      </button>
                    )}

                    {req.status !== 'active' && (
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'active')}
                        disabled={actionLoadingId === req.id}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Approve &amp; Activate</span>
                      </button>
                    )}

                    {req.status !== 'rejected' && req.status !== 'active' && (
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'rejected')}
                        disabled={actionLoadingId === req.id}
                        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
