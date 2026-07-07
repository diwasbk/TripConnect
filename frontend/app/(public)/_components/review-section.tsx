"use client";
import { handleGetAllReviewsByPackageId } from "@/lib/actions/review-action";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Helper function to get initials
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export default function ReviewSection({ packageId }: { packageId: string }) {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await handleGetAllReviewsByPackageId(packageId, currentPage);
                if (res.success) {
                    setReviews(res.result);
                    setPagination(res.pagination);
                } else {
                    throw new Error(res.message || "Failed to fetch reviews!");
                }
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch reviews!");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [currentPage, packageId]);

    if (!loading && reviews.length === 0) {
        return;
    };

    return (
        <section className="mt-16 rounded-4xl border border-emerald-100 bg-white p-8 sm:p-10 shadow-lg shadow-emerald-950/5">
            <h3 className="text-xl font-black text-slate-950">Traveler Reviews</h3>
            <div className="mt-8 grid gap-6">
                {reviews.map((rev) => (
                    <article key={rev._id} className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Profile Initials */}
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                    {getInitials(rev.userId.fullName)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-950">{rev.userId.fullName}</h4>
                                    {/* Star Rating Display */}
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className={star <= (rev.rating || 0) ? 'text-orange-400' : 'text-slate-200'}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-widest">
                                {new Date(rev.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-slate-600 bg-white/50 p-4 rounded-xl border border-emerald-50">
                            {rev.review}
                        </p>
                    </article>
                ))}
            </div>
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
        </section>
    );
}