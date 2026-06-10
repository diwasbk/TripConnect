"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";

export default function PaymentSection() {
    const searchParams = useSearchParams();
    const bookingReference = searchParams.get("bookingReference");

    const params = useParams();
    const packageSlug = params?.slug as string;

    const selectedPackageTitle = "Pokhara Relax Trip";
    const selectedPackageDuration = "2 nights / 3 days";
    const selectedPackageDestination = "Pokhara, Nepal";
    const pricePerTraveler = 14200;
    const travelerCount = 1;
    const promoCodeId = "None";
    const discountPercentage = 0;

    const subtotal = pricePerTraveler * travelerCount;
    const discountAmount = 0;
    const totalAfterDiscount = subtotal - discountAmount;

    const summaryRows = [
        { label: "Price per traveler", value: `Rs ${pricePerTraveler.toLocaleString("en-US")}` },
        { label: "Travelers", value: String(travelerCount) },
        { label: "Promo code", value: promoCodeId },
        { label: "Discount %", value: `${discountPercentage}%` },
    ];
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_14px_40px_rgba(15,122,75,0.06)]">
                <div className="px-4 py-4 sm:px-5 sm:py-5">
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
                            <span className="text-sm font-semibold tracking-tight sm:text-[15px]">{selectedPackageTitle}</span>
                            <span className="hidden sm:block h-4 w-px bg-emerald-100 mx-3" aria-hidden />
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/60 px-2 py-0.5 text-xs font-medium text-emerald-800">{selectedPackageDuration}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/60 px-2 py-0.5 text-xs font-medium text-emerald-800">{selectedPackageDestination}</span>
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
                                    <span className="text-base font-semibold text-emerald-800">Rs {subtotal.toLocaleString("en-US")}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800">Discount</span>
                                    <span className="text-base font-semibold text-emerald-800">- Rs {discountAmount.toLocaleString("en-US")}</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-emerald-100 pt-2">
                                    <span className="font-medium text-slate-800">Total</span>
                                    <span className="text-xl font-extrabold tracking-tight text-emerald-900">Rs {totalAfterDiscount.toLocaleString("en-US")}</span>
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

                        <div className="flex items-center gap-3">
                            <div className="flex w-full max-w-xs items-center rounded-2xl border border-emerald-200 bg-emerald-100/50 px-3 py-1">
                                <input
                                    type="text"
                                    name="promoCode"
                                    placeholder="Enter promo code"
                                    className="h-8 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                                    aria-label="Promo code (design only)"
                                />
                            </div>

                            <button
                                type="button"
                                className="h-9 rounded-2xl border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-700 shadow-sm shadow-emerald-950/5 hover:cursor-pointer"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
                        <Link
                            href={`/packages/${packageSlug}/booking/payment/success`}
                            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-700 to-emerald-800 px-6 text-base font-semibold text-white shadow-[0_18px_35px_rgba(15,122,75,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-900 hover:cursor-pointer"
                        >
                            <img src="/images/esewa.png" alt="eSewa" className="h-5 w-5 object-contain mr-2" />
                            <span>Pay with eSewa</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}