"use client";
import { handleGetBookingByBookingReference } from "@/lib/actions/booking-action";
import { handleApplyPromoCodeByPaymentId } from "@/lib/actions/promocode-action";
import { initializeEsewaPaymentById } from "@/lib/api/payment";
import { redirectEsewa } from "@/lib/payment/redirect-esewa";
import { applyPromoCodeSchema, applyPromoCodeType } from "@/lib/schemas/promocode.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";

export default function PaymentSection() {
    const router = useRouter();
    
    const searchParams = useSearchParams();
    const bookingReference = searchParams.get("bookingReference") as string;

    const [bookingDetail, setBookingDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingDetail = async () => {
            try {
                const res = await handleGetBookingByBookingReference(bookingReference);

                if (res.success) {
                    setBookingDetail(res.result);

                } else {
                    throw new Error(res.message || "Failed to fetch booking details!");
                };

            } catch (err: any) {
                toast.error(err.message || "Failed to fetch booking details!");

            } finally {
                setLoading(false)
            };
        };
        fetchBookingDetail();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<applyPromoCodeType>({ resolver: zodResolver(applyPromoCodeSchema) });

    const onSubmit = async (data: applyPromoCodeType) => {
        try {
            const res = await handleApplyPromoCodeByPaymentId(bookingDetail?.paymentId, data);

            if (!res.success) {
                throw new Error(res.message || "Failed to apply promocode!");
            };

            // Update bookingDetail with the new promo code and discount values
            setBookingDetail((prev: any) => ({
                ...prev,
                promoCode: res.result?.promoCode,
                discountPercentage: res.result?.discountPercentage,
                discountAmount: res.result?.discountAmount,
                totalPaidAmount: res.result?.finalAmount,
                originalAmount: res.result?.originalAmount,
            }));

            toast.success(res.message || "Promocode applied successful!");

            reset();

        } catch (err: any) {
            toast.error(err.message || "Failed to apply promocode!");
        };
    };

    const handleInitializePayment = async () => {
        try {
            const res = await initializeEsewaPaymentById(bookingDetail?.paymentId);

            if (!res.success) {
                throw new Error(res.message || "Payment initiation failed!");
            };

            redirectEsewa(res);

        } catch (err: any) {
            toast.error(err.message || "Failed to initialize payment!");
        };
    };

    const summaryRows = [
        { label: "Price per traveler", value: `Rs ${bookingDetail?.pricePerTraveler?.toLocaleString("en-US") || "0"}` },
        { label: "Travelers", value: String(bookingDetail?.noOfTravelers || "N/A") },
        { label: "Discount %", value: `${bookingDetail?.discountPercentage}%` },
        { label: "Promo code", value: bookingDetail?.promoCode || "N/A" }
    ];

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_14px_40px_rgba(15,122,75,0.06)]">
                <div className="px-4 py-4 sm:px-5 sm:py-5">

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <button
                    onClick={() => { router.back() }}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm shadow-emerald-950/5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-50 cursor-pointer"
                >
                    <span>←</span>
                    <span>Back</span>
                </button>
                <p className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 shadow-sm shadow-emerald-950/5">
                    Booking step 2 of 3
                </p>
            </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 shadow-sm shadow-emerald-950/5">
                        <div className="flex items-center gap-3">
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/20">
                                <FiCheckCircle className="h-4 w-4" />
                            </span>
                            <p className="text-sm leading-6 text-slate-800 sm:text-[15px]">
                                <span className="font-semibold">Booking created successfully.</span> Your booking is reserved. Complete your payment to confirm it.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h2 className="font-semibold text-emerald-900 text-2xl mt-5">Booking Summary</h2>

                        <div className="flex items-center gap-2 text-slate-800">
                            <span className="text-sm font-semibold tracking-tight sm:text-[15px]">{bookingDetail?.packageName}</span>
                            <span className="hidden sm:block h-4 w-px bg-emerald-100 mx-3" aria-hidden />
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/60 px-2 py-0.5 text-xs font-medium text-emerald-800">{bookingDetail?.duration}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/60 px-2 py-0.5 text-xs font-medium text-emerald-800">{bookingDetail?.destination}</span>
                        </div>
                    </div>

                    <div className="mt-5 rounded-[20px] border border-emerald-100 bg-emerald-50/50 p-4 sm:p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed text-sm text-slate-700">
                                <tbody>
                                    {summaryRows.map((row) => (
                                        <tr key={row.label} className="border-b border-emerald-100">
                                            <td className="py-2 align-top w-1/2 font-medium text-slate-800">{row.label}</td>
                                            <td className="py-2 align-top text-right font-semibold text-slate-900">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-3 rounded-2xl border border-emerald-100 bg-white px-3 py-2 shadow-sm shadow-emerald-950/5">
                            <div className="flex flex-col gap-1 text-sm text-slate-600">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800">Subtotal</span>
                                    <span className="text-base font-semibold text-emerald-800">Rs {bookingDetail?.originalAmount?.toLocaleString("en-US") || "0"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800">Discount</span>
                                    <span className="text-base font-semibold text-emerald-800">- Rs {bookingDetail?.discountAmount?.toLocaleString("en-US") || "0"}</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-emerald-100 pt-2">
                                    <span className="font-medium text-slate-800">Total</span>
                                    <span className="text-xl font-extrabold tracking-tight text-emerald-900">Rs {bookingDetail?.totalPaidAmount?.toLocaleString("en-US") || "0"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-linear-to-r from-emerald-50 via-white to-lime-50">
                    <div className="px-4 py-4 sm:px-5 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="text-base font-semibold text-emerald-900">Have a promo code?</div>
                            <div className="text-sm text-slate-500 hidden sm:block">Enter code to unlock discounts</div>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-1"
                        >
                            {/* INPUT + BUTTON ROW */}
                            <div className="flex items-start gap-3">
                                <div className="flex flex-col w-full max-w-xs">
                                    <div className="flex flex-wrap items-center rounded-full border border-emerald-200 bg-emerald-100/50 px-3 py-1">
                                        <input
                                            {...register("code")}
                                            type="text"
                                            placeholder="Enter promo code"
                                            className="h-8 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                                            aria-label="Promo code (design only)"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`h-10 rounded-full border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-700 shadow-sm shadow-emerald-950/5 ${isSubmitting ? "opacity-50" : "hover:cursor-pointer hover:bg-emerald-100"}`}
                                >
                                    {isSubmitting ? "Validating" : "Apply"}
                                </button>
                            </div>
                            {errors.code && (
                                <p className="text-xs font-medium text-red-500">{errors.code.message}</p>
                            )}
                        </form>
                    </div>
                    <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
                        <button
                            onClick={() => { handleInitializePayment() }}
                            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-700 to-emerald-800 px-6 text-base font-semibold text-white shadow-[0_18px_35px_rgba(15,122,75,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-900 hover:cursor-pointer"
                        >
                            <img src="/images/esewa.png" alt="eSewa" className="h-5 w-5 object-contain mr-2" />
                            <span>Pay with eSewa</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}