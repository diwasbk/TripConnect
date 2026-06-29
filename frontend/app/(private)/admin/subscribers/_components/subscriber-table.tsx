"use client";
import { useEffect, useState } from "react";
import { MailCheck, Search, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleDeleteSubscriberBySubscriberId, handleGetAllSubscribersByStatus } from "@/lib/actions/subscriber.action";
import { formatDateTime } from "@/lib/helpers/helper";

export default function SubscriberTable() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    // Track state for the centered Delete Confirmation Modal
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const res = await handleGetAllSubscribersByStatus("subscribed", currentPage, 7);

            if (res.success) {
                setSubscribers(res.result || []);
                setPagination(res.pagination || null);
            } else {
                throw new Error(res.message || "Failed to fetch subscribers!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch subscribers!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, [currentPage]);

    // Client-side search filtration matching by email or status
    const filtered = subscribers.filter(sub => {
        const q = query.toLowerCase();
        return (
            sub.email?.toLowerCase().includes(q) ||
            sub.status?.toLowerCase().includes(q)
        );
    });

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
            const res = await handleDeleteSubscriberBySubscriberId(pendingDeleteId);

            if (res.success) {
                toast.success(res.message || "Subscriber removed successfully.");
                setPendingDeleteId(null);
                fetchSubscribers();
            } else {
                throw new Error(res.message || "Failed to delete subscriber.");
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
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/70 p-2 text-emerald-600 transition-all hover:bg-emerald-50 hover:-translate-x-0.5"
                            >
                                <MailCheck size={18} />
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                <span className="bg-linear-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Subscribers
                                </span>
                            </h2>
                        </div>

                        <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                            {filtered.length} subscribers cataloged on this page
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search subscribers..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="outline-none bg-transparent text-sm w-48"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-emerald-50 bg-slate-50/75">
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Subscriber ID</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Email Address</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Status</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Timestamp</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-50/60">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            Loading system subscribers data...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            No accounts found matching parameters.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(sub => (
                                        <tr key={sub._id} className="hover:bg-emerald-50/20 transition">
                                            {/* ID Column */}
                                            <td className="px-5 py-4">
                                                <span className="text-[11px] text-slate-400 font-mono truncate max-w-xs block">
                                                    {sub._id}
                                                </span>
                                            </td>

                                            {/* Email Column */}
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-slate-900">{sub.email}</p>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase ${sub.status === "subscribed"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    : "bg-rose-50 text-rose-700 border-rose-200"
                                                    }`}>
                                                    {sub.status || "subscribed"}
                                                </span>
                                            </td>

                                            {/* SERIAL TIMELINE LOGS */}
                                            <td className="px-5 py-4 text-xs font-semibold whitespace-nowrap">
                                                <div className="flex flex-col space-y-1">
                                                    <span className="text-slate-700" title="Received Timestamp">
                                                        {formatDateTime(sub.createdAt)}
                                                    </span>
                                                    <span className="text-slate-400 text-[11px] font-medium border-t border-slate-100 pt-0.5" title="Last Updated Timestamp">
                                                        {formatDateTime(sub.updatedAt || sub.createdAt)}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Row Actions */}
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleDeleteClick(sub._id)}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-colors"
                                                        title="Delete Subscriber"
                                                    >
                                                        <Trash2 size={15} />
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

                {/* PAGINATION */}
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
                            {pagination.page} of {pagination.totalPages}
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

            {/* DELETE SUBSCRIBER CONFIRMATION MODAL */}
            {pendingDeleteId && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Subscriber</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-rose-600">delete</span> this subscriber? This action is permanent and cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer bg-rose-600 hover:bg-rose-700 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}