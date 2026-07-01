"use client";
import { handleCreatePromoCode, handleGetPromoCodeByPromoCodeId, handleUpdatePromoCodeByPromoCodeId } from "@/lib/actions/promocode-action";
import { formatDateForInput } from "@/lib/helpers/helper";
import { promoCodeSchema, promoCodeType } from "@/lib/schemas/promocode.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateOrUpdatePromoCodeSection({ promoCodeId, onSuccess }: { promoCodeId?: string, onSuccess: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<promoCodeType>(
        {
            resolver: zodResolver(promoCodeSchema)
        }
    );

    // Fetch promocode data if promoCodeId is provided
    useEffect(() => {
        if (!promoCodeId) return;

        const fetchPromoCodeData = async () => {
            setIsLoading(true);
            try {
                const res = await handleGetPromoCodeByPromoCodeId(promoCodeId);

                if (!res.success) {
                    throw new Error(res.message);
                };

                reset({
                    code: res.result.code || "",
                    description: res.result.description || "",
                    discountPercentage: res.result.discountPercentage ?? 0,
                    expiresAt: formatDateForInput(res.result.expiresAt),
                });

            } catch (err: any) {
                toast.error(err.message || "An error occurred while fetching the promocode.");
            } finally {
                setIsLoading(false);
            };
        };

        fetchPromoCodeData();
    }, [promoCodeId, reset]);

    const onSubmit = async (data: promoCodeType) => {
        try {
            let res;

            if (promoCodeId) {
                // 1. Update Mode
                res = await handleUpdatePromoCodeByPromoCodeId(promoCodeId, data);

                if (!res.success) {
                    throw new Error(res.message || "Failed to update promotional code!");
                };

                // close form
                onSuccess();

            } else {
                // 2. Create Mode
                res = await handleCreatePromoCode(data);

                if (!res.success) {
                    throw new Error(res.message || "Failed to save promotional code!");
                };

                // close form
                onSuccess();
            };

            toast.success(res.message || `Promo code ${promoCodeId ? "updated" : "created"} successfully!`);

        } catch (err: any) {
            toast.error(err.message || "An unexpected error occurred while saving.");
        };
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-emerald-700 font-semibold animate-pulse">Loading promo code details...</p>
            </div>
        );
    }

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10 max-w-2xl md:max-w-none"
            >
                {/* Header info */}
                <div className="mb-8 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        TripConnect Marketing
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        {promoCodeId ? "Edit Promo Code" : "Create a Promo Code"}
                    </h2>
                    <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                        Configure rules and constraints for seasonal discounts or customized rewards for global campaigns.
                    </p>
                </div>

                {/* Form fields layout */}
                <div className="space-y-5">

                    {/* Code + Discount Percentage */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="code" className="text-sm font-semibold text-slate-800">
                                Promo Code
                            </label>
                            <input
                                {...register("code")}
                                id="code"
                                type="text"
                                placeholder="SUMMERVALE20"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 uppercase"
                            />
                            {errors.code && (
                                <p className="text-xs font-medium text-red-500">{errors.code.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="discountPercentage" className="text-sm font-semibold text-slate-800">
                                Discount Percentage (%)
                            </label>
                            <input
                                {...register("discountPercentage", { valueAsNumber: true })}
                                id="discountPercentage"
                                type="number"
                                placeholder="0"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.discountPercentage && (
                                <p className="text-xs font-medium text-red-500">{errors.discountPercentage.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Expiry Date */}
                    <div className="space-y-2">
                        <label htmlFor="expiresAt" className="text-sm font-semibold text-slate-800">
                            Expiration Date
                        </label>
                        <input
                            {...register("expiresAt")}
                            id="expiresAt"
                            type="date"
                            className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                        {errors.expiresAt && (
                            <p className="text-xs font-medium text-red-500">{errors.expiresAt.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-semibold text-slate-800">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            id="description"
                            placeholder="Valid for premium flight and stay pairings over the holiday seasons..."
                            className="min-h-28 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 resize-none"
                        />
                        {errors.description && (
                            <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer disabled:opacity-50"
                    >
                        {promoCodeId ? "Update Promo Code" : "Create Promo Code"}
                    </button>
                </div>
            </form>
        </main>
    );
}