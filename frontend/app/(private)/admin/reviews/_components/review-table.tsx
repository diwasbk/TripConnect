"use client";
import { useEffect, useState } from "react";
import { Search, Trash2, Star, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import { formatDateTime } from "@/lib/helpers/helper";
import { handleGetAllReviews, handleDeleteReviewByReviewId } from "@/lib/actions/review-action";

export default function ReviewsTable() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await handleGetAllReviews(currentPage, 7);
            if (res.success) {
                setReviews(res.result || []);
                setPagination(res.pagination || null);
            } else {
                throw new Error(res.message || "Failed to fetch reviews!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch reviews!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [currentPage]);

    // Search updated to include fullName
    const filtered = reviews.filter(rev => 
        rev.review?.toLowerCase().includes(query.toLowerCase()) ||
        rev.userId?.fullName?.toLowerCase().includes(query.toLowerCase())
    );

    const handleConfirmDelete = async () => {
        if (!pendingDeleteId) return;
        setIsDeleting(true);
        try {
            const res = await handleDeleteReviewByReviewId(pendingDeleteId);
            if (res.success) {
                toast.success(res.message || "Review removed successfully.");
                setPendingDeleteId(null);
                fetchReviews();
            } else {
                throw new Error(res.message || "Failed to delete review.");
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
                                <Star size={18} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Customer Reviews
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap ml-auto">
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm min-w-[200px]">
                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                            <input
                                placeholder="Search by name or review..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="outline-none bg-transparent text-sm w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white border border-emerald-100 rounded-2xl shadow-md overflow-visible">
                    <div className="overflow-x-auto rounded-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-emerald-50 bg-slate-50/75">
                                    <th className="rounded-tl-2xl px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">User</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Review Content</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Rating</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Created At</th>
                                    <th className="rounded-tr-2xl px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-50/60">
                                {loading ? (
                                    <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">Loading reviews...</td></tr>
                                ) : filtered.map(rev => (
                                    <tr key={rev._id} className="hover:bg-emerald-50/20 transition">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-800 border border-emerald-200">
                                                    {rev.userId?.fullName?.charAt(0).toUpperCase() || "U"}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-950">{rev.userId?.fullName || "N/A"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-start gap-2">
                                                <MessageSquare className="w-4 h-4 text-emerald-400 mt-1" />
                                                <p className="text-sm text-slate-700 italic max-w-xs">{rev.review}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-amber-500">
                                                <Star size={16} fill="currentColor" />
                                                <span className="text-sm font-bold text-slate-700">{rev.rating || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500 font-medium">
                                            {formatDateTime(rev.createdAt)}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button
                                                onClick={() => setPendingDeleteId(rev._id)}
                                                className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION */}
                {pagination && (
                    <div className="mt-8 flex justify-center gap-2">
                        <button disabled={!pagination.hasPreviousPage} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 border rounded-full text-xs font-bold text-emerald-600 border-emerald-200 hover:bg-emerald-50">Previous</button>
                        <span className="px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-bold">{pagination.page}</span>
                        <button disabled={!pagination.hasNextPage} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 border rounded-full text-xs font-bold text-emerald-600 border-emerald-200 hover:bg-emerald-50">Next</button>
                    </div>
                )}
            </div>

            {/* DELETE MODAL */}
            {pendingDeleteId && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 border">
                        <h3 className="text-lg font-bold mb-2">Delete Review</h3>
                        <p className="text-sm text-slate-600 mb-6">Are you sure you want to remove this review? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setPendingDeleteId(null)} className="px-4 py-2 rounded-xl border text-xs font-bold uppercase hover:bg-slate-50">Cancel</button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold uppercase">
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}