"use client";
import { handleGiveRatingToPackage, handleGiveReviewToPackage } from "@/lib/actions/review-action";
import { giveReviewSchema, giveReviewType } from "@/lib/schemas/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function ReviewForm({ packageId }: { packageId: string }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<giveReviewType>(
        {
            resolver: zodResolver(giveReviewSchema)
        }
    );

    const handleStarClick = async (star: number) => {
        setRating(star); // Update UI immediately

        const res = await handleGiveRatingToPackage(packageId, { rating: star });

        if (!res.success) {
            toast.error(res.message || "Failed to save rating");
            // Optionally revert the rating if it failed
            setRating(0);
        } else {
            toast.success(res.message || "Rating saved successfully!");
        }
    };

    const onSubmit = async (data: giveReviewType) => {
        try {
            const res = await handleGiveReviewToPackage(packageId, data);

            if (!res.success) {
                throw new Error(res.message || "Failed to submit review!");
            };

            toast.success(res.message || "Review submitted successfully!");

            reset();

        } catch (err: any) {
            toast.error(err.message || "Failed to submit review!");
        };
    };

    return (
        <div className="mt-8 rounded-4xl border border-emerald-100 bg-emerald-50/20 p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-950">Leave a review</h3>
            <p className="text-sm text-slate-600 mt-1 mb-6">How was your trip? Share your experience with other travelers.</p>

            <div className="space-y-5">
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className={`text-2xl transition-colors ${star <= (hover || rating) ? 'text-orange-400' : 'text-slate-200'} cursor-pointer`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        {...register("review")}
                        placeholder="Write your review here..."
                        className="w-full rounded-2xl border border-emerald-100 p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        rows={4}
                    />

                    {errors.review && (
                        <p className="text-xs font-medium text-red-500">{errors.review.message}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-2 rounded-full bg-emerald-700 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition-all cursor-pointer"
                    >
                        {isSubmitting ? "Posting..." : "Post Review"}
                    </button>
                </form>
            </div>
        </div>
    );
}