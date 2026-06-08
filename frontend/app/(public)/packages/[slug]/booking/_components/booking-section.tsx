"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiShield } from "react-icons/fi";
import { packages } from "@/lib/_content";

const amountFormatter = new Intl.NumberFormat("en-NP", {
    maximumFractionDigits: 0,
});

function parsePackagePrice(price: string | undefined) {
    if (!price) {
        return 0;
    }

    const numericValue = Number(price.replace(/[^\d]/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
};

function formatCurrency(amount: number) {
    return `NPR ${amountFormatter.format(amount)}`;
};

export default function BookingSection() {
    const params = useParams();
    const packageSlug = params?.slug as string;

    const [travelerCount, setTravelerCount] = useState("1");

    const selectedPackage = packages.find((item) => item.slug === packageSlug) ?? packages[0];

    const travelerTotal = Math.max(1, Number(travelerCount) || 1);
    const packagePrice = parsePackagePrice(selectedPackage?.price);
    const totalPrice = packagePrice * travelerTotal;

    return (
       <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <Link
                    href="/packages"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm shadow-emerald-950/5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                    <span>←</span>
                    <span>Back to packages</span>
                </Link>
                <p className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 shadow-sm shadow-emerald-950/5">
                    Booking step 1 of 2
                </p>
            </div>

            <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Traveler information</p>
                        <p className="max-w-2xl text-lg leading-8 text-slate-600">
                            Fill in your details to continue to payment.
                        </p>
                    </div>

                    <form className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:p-8">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <label htmlFor="full-name" className="text-sm font-semibold text-slate-800">
                                    Full name
                                </label>
                                <input
                                    id="full-name"
                                    name="fullName"
                                    type="text"
                                    autoComplete="name"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email-address" className="text-sm font-semibold text-slate-800">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone-number" className="text-sm font-semibold text-slate-800">
                                    Phone number
                                </label>
                                <input
                                    id="phone-number"
                                    name="phoneNumber"
                                    type="tel"
                                    autoComplete="tel"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    placeholder="98XX XXX XXX"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="travel-date" className="text-sm font-semibold text-slate-800">
                                    Travel date
                                </label>
                                <input
                                    id="travel-date"
                                    name="travelDate"
                                    type="date"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="travelers" className="text-sm font-semibold text-slate-800">
                                    Number of travelers
                                </label>
                                <input
                                    id="travelers"
                                    name="travelerCount"
                                    type="number"
                                    min="1"
                                    value={travelerCount}
                                    onChange={(event) => setTravelerCount(event.target.value)}
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    placeholder="1"
                                />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-semibold text-slate-800">Package</label>
                                <div className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950">
                                    {selectedPackage?.title}
                                </div>
                                <input type="hidden" name="packageId" value={selectedPackage?._id ?? ""} />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label htmlFor="special-requests" className="text-sm font-semibold text-slate-800">
                                    Special requests
                                </label>
                                <textarea
                                    id="special-requests"
                                    name="specialRequests"
                                    className="min-h-32 w-full rounded-3xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    placeholder="Pickup preferences, room type, dietary notes, or anything else we should know"
                                />
                            </div>
                        </div>

                        <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-black text-white shadow-lg shadow-emerald-700/20">
                                    ✓
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Secure booking</p>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Your information is only used for booking confirmation, payment updates, and trip support.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={`/payment?paymentId=`}
                                className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800"
                            >
                                Continue to payment →
                            </Link>
                            <Link
                                href={`/packages/${selectedPackage?.slug ?? ""}`}
                                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3.5 text-sm font-semibold text-emerald-900 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50"
                            >
                                Review package
                            </Link>
                        </div>
                    </form>
                </div>

                <aside className="lg:sticky lg:top-24 lg:self-start">
                    <div className="overflow-hidden rounded-4xl border border-emerald-100 bg-white shadow-xl shadow-emerald-900/5">
                        <div className="relative">
                            <img
                                src={selectedPackage?.photoUrls?.[0]}
                                alt={selectedPackage?.title}
                                className="h-56 w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">Your trip</p>
                                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{selectedPackage?.title}</h2>
                                <p className="mt-2 text-sm text-emerald-50/90">{selectedPackage?.destination}</p>
                            </div>
                        </div>

                        <div className="space-y-5 p-5 sm:p-6">
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                                    {selectedPackage?.duration}
                                </span>
                                <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                                    {selectedPackage?.includes?.length ?? 0} inclusions
                                </span>
                            </div>

                            <div className="space-y-3 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-4 text-sm text-slate-700">
                                    <span>Price per traveler</span>
                                    <span className="font-bold text-emerald-900">{selectedPackage?.price}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 text-sm text-slate-700">
                                    <span>Travelers</span>
                                    <span className="font-bold text-slate-900">{travelerTotal}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 border-t border-emerald-100 pt-3 text-sm text-slate-700">
                                    <span className="font-medium text-slate-900">Estimated total</span>
                                    <span className="text-lg font-black text-emerald-900">{formatCurrency(totalPrice)}</span>
                                </div>
                                <p className="text-xs leading-6 text-slate-500">
                                    Final amount may change after promo codes, room upgrades, or pickup changes.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm shadow-emerald-950/5 sm:p-5">
                                <ul className="space-y-4">
                                    {[
                                        {
                                            title: "Instant confirmation",
                                            description: "Get booking details immediately.",
                                        },
                                        {
                                            title: "Secure payment",
                                            description: "Your payment is handled safely.",
                                        },
                                        {
                                            title: "24/7 support",
                                            description: "We are here when you need help.",
                                        },
                                    ].map((item) => (
                                        <li key={item.title} className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                                                    <path
                                                        d="M20 6 9 17l-5-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.5"
                                                    />
                                                </svg>
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                                                <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-slate-900 px-5 py-3 text-white shadow-lg shadow-slate-950/20">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-emerald-100">
                                        <FiShield />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-white">We value your privacy</p>
                                        <p className="mt-1 text-sm leading-6 text-slate-300">
                                            Your data is protected and never shared.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex w-full items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50"
                            >
                                Need help before booking?
                            </Link>
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}