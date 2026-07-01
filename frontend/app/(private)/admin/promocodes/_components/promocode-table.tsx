"use client";
import { useEffect, useState } from "react";
import { Search, Trash2, Edit2, Plus, X, Percent, Calendar, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { formatDateTime } from "@/lib/helpers/helper";
import { handleActivateOrDeactivatePromoCodeByPromoCodeId, handleDeletePromoCodeByPromoCodeId, handleGetAllPromoCodeByStatus } from "@/lib/actions/promocode-action";
import CreateOrUpdatePromoCodeSection from "./create-or-update-promocode";

export default function PromoCodeTable() {
    const [promoCodes, setPromoCodes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    // Status Filter State (true = Active, false = Paused/Inactive)
    const [activeFilter, setActiveFilter] = useState<boolean>(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    // Track state for Delete Confirmation Modal
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Track state for Toggle Status Confirmation Modal
    const [pendingToggleData, setPendingToggleData] = useState<{ id: string; currentStatus: boolean } | null>(null);
    const [isToggling, setIsToggling] = useState(false);

    // Track state for create/edit slide-over form pane
    const [selectedPromoCodeId, setSelectedPromoCodeId] = useState<string | undefined>(undefined);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchPromoCodes = async () => {
        setLoading(true);
        try {
            const res = await handleGetAllPromoCodeByStatus(activeFilter, currentPage, 7);
            if (res.success) {
                setPromoCodes(res.result || []);
                setPagination(res.pagination || null);
            } else {
                throw new Error(res.message || "Failed to fetch promo codes!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch promo codes!");
        } finally {
            setLoading(false);
        }
    };

    // Refetch data when page OR status filter changes
    useEffect(() => {
        fetchPromoCodes();
    }, [currentPage, activeFilter]);

    // Client-side filtration
    const filtered = promoCodes.filter(promo => {
        const q = query.toLowerCase();
        return (
            promo.code?.toLowerCase().includes(q) ||
            promo.description?.toLowerCase().includes(q)
        );
    });

    // Toggle Action Intermediaries
    const handleToggleClick = (id: string, currentStatus: boolean) => {
        setPendingToggleData({ id, currentStatus });
    };

    const handleCancelToggle = () => {
        setPendingToggleData(null);
    };

    const handleConfirmToggleStatus = async () => {
        if (!pendingToggleData) return;
        setIsToggling(true);
        const { id, currentStatus } = pendingToggleData;
        try {
            const res = await handleActivateOrDeactivatePromoCodeByPromoCodeId(id, !currentStatus);
            if (res.success) {
                toast.success(res.message || "Status updated successfully.");
                setPendingToggleData(null);
                fetchPromoCodes();
            } else {
                throw new Error(res.message || "Failed to update status.");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsToggling(false);
        }
    };

    // Handle Form Opening Actions
    const handleCreateClick = () => {
        setSelectedPromoCodeId(undefined);
        setIsFormOpen(true);
    };

    // Close form and refresh layout data
    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setSelectedPromoCodeId(undefined);
        fetchPromoCodes(); // Re-fetch data to reflect newly added/modified items
    };

    const handleEditClick = (id: string) => {
        setSelectedPromoCodeId(id);
        setIsFormOpen(true);
    };

    // Handle Delete Trigger
    const handleDeleteClick = (id: string) => {
        setPendingDeleteId(id);
    };

    const handleCancelDelete = () => {
        setPendingDeleteId(null);
    };

    const handleConfirmDelete = async () => {
        if (!pendingDeleteId) return;
        setIsDeleting(true);
        try {
            const res = await handleDeletePromoCodeByPromoCodeId(pendingDeleteId);

            if (res.success) {
                toast.success(res.message || "Promo code removed successfully.");
                setPendingDeleteId(null);
                fetchPromoCodes();
            } else {
                throw new Error(res.message || "Failed to delete promo code.");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="relative overflow-hidden max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-5">
                {/* HEADER */}
                <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 pb-2">
                    <div className="min-w-[250px] shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/70 p-2 text-emerald-600">
                                <Percent size={18} />
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Promo Codes
                                </span>
                            </h2>
                        </div>

                        <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                            {filtered.length} {activeFilter ? "active" : "paused"} configurations on this page
                        </p>
                    </div>

                    {/* Controls wrapper forced into a single row on desktop */}
                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap ml-auto">
                        {/* SEARCH INPUT */}
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm min-w-[200px]">
                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                            <input
                                placeholder="Search promo codes..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="outline-none bg-transparent text-sm w-full"
                            />
                        </div>

                        {/* STATUS FILTER BUTTON */}
                        <button
                            onClick={() => {
                                setActiveFilter(prev => !prev);
                                setCurrentPage(1); // Reset page to 1 on filter switch
                            }}
                            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all border shadow-sm cursor-pointer select-none whitespace-nowrap ${activeFilter
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                                }`}
                        >
                            {activeFilter ? (
                                <>
                                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                                    Showing: Active
                                </>
                            ) : (
                                <>
                                    <XCircle size={14} className="text-red-500 shrink-0" />
                                    Showing: Paused
                                </>
                            )}
                        </button>

                        {/* CREATE BUTTON */}
                        <button
                            onClick={handleCreateClick}
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:-translate-y-0.5 cursor-pointer select-none whitespace-nowrap"
                        >
                            <Plus size={16} className="shrink-0" /> Create Promocode
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white border border-emerald-100 rounded-2xl shadow-md overflow-visible isolate">
                    <div className="overflow-x-auto rounded-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-emerald-50 bg-slate-50/75">
                                    <th className="rounded-tl-2xl px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Promo Configuration</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Discount Value</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Validity Timeline</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Status</th>
                                    <th className="rounded-tr-2xl px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-50/60">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            Loading systematic promo configurations data...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            No {activeFilter ? "active" : "paused"} promo codes found matching parameters.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(promo => (
                                        <tr key={promo._id} className="hover:bg-emerald-50/20 transition">
                                            {/* Code & Description */}
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="inline-flex items-center font-mono font-black text-sm bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md border border-slate-200 self-start">
                                                        {promo.code}
                                                    </span>
                                                    <p className="text-xs font-medium text-slate-500 mt-1.5 truncate max-w-xs" title={promo.description}>
                                                        {promo.description || "No description provided."}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Discount Value */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-base font-black text-slate-900">{promo.discountPercentage}%</span>
                                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 rounded-sm uppercase tracking-wide">
                                                        Off
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Timestamps */}
                                            <td className="px-5 py-4 text-xs font-semibold whitespace-nowrap">
                                                <div className="flex flex-col space-y-1">
                                                    <span className="text-slate-700 flex items-center gap-1" title="Expiration Target">
                                                        <Calendar size={12} className="text-slate-400" />
                                                        Exp: {formatDateTime(promo.expiresAt)}
                                                    </span>
                                                    <span className="text-slate-400 text-[10px] font-medium border-t border-slate-100 pt-0.5" title="Creation Date">
                                                        Created: {formatDateTime(promo.createdAt)}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Inline Status Toggle Indicator */}
                                            <td className="px-5 py-4">
                                                <button
                                                    onClick={() => handleToggleClick(promo._id, promo.isActive)}
                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-150 cursor-pointer select-none ${promo.isActive
                                                        ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                                                        : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                                                        }`}
                                                >
                                                    {promo.isActive ? (
                                                        <>
                                                            <CheckCircle2 size={11} /> Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle size={11} /> Paused
                                                        </>
                                                    )}
                                                </button>
                                            </td>

                                            {/* Actions Layout */}
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(promo._id)}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer transition-colors"
                                                        title="Modify Configuration"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(promo._id)}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-colors"
                                                        title="Revoke Promocode"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION PANEL */}
                {pagination && (
                    <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <button
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={!pagination.hasPreviousPage || loading}
                            className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasPreviousPage || loading
                                ? "pointer-events-none border-emerald-200 bg-white text-slate-400"
                                : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                                }`}
                        >
                            Previous
                        </button>
                        <span className="rounded-full bg-emerald-700 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-white">
                            {pagination.page} of {pagination.totalPages || 1}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={!pagination.hasNextPage || loading}
                            className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasNextPage || loading
                                ? "pointer-events-none border-emerald-200 bg-white text-slate-400"
                                : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* CREATION & UPDATE DRAWER SYSTEM */}
            {isFormOpen && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button
                            onClick={() => {
                                setIsFormOpen(false);
                                setSelectedPromoCodeId(undefined);
                                fetchPromoCodes();
                            }}
                            className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                        >
                            <X size={20} />
                        </button>
                        <CreateOrUpdatePromoCodeSection
                            promoCodeId={selectedPromoCodeId}
                            onSuccess={handleFormSuccess}
                        />
                    </div>
                </div>
            )}

            {/* STATUS TOGGLE CONFIRMATION MODAL */}
            {pendingToggleData && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <AlertTriangle size={20} className="text-amber-500" /> Change Promo Status
                        </h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to {pendingToggleData.currentStatus ? (
                                <>
                                    <span className="font-bold text-rose-600">pause</span> this promo code? Clients will no longer be able to apply it at checkout.
                                </>
                            ) : (
                                <>
                                    <span className="font-bold text-emerald-600">activate</span> this promo code? Clients can immediately begin using it.
                                </>
                            )}
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelToggle}
                                disabled={isToggling}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmToggleStatus}
                                disabled={isToggling}
                                className={`px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer transition-colors ${pendingToggleData.currentStatus
                                    ? "bg-rose-600 hover:bg-rose-700"
                                    : "bg-emerald-600 hover:bg-emerald-700"
                                    }`}
                            >
                                {isToggling ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CRITICAL DELETE CONFIRMATION MODAL */}
            {pendingDeleteId && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Revoke Promo Code</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you absolutely sure you want to <span className="font-bold text-rose-600">delete</span> this promo configuration? Active client redemptions using this code will break immediately.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer bg-rose-600 hover:bg-rose-700 transition-colors"
                            >
                                {isDeleting ? "Deleting..." : "Confirm Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}