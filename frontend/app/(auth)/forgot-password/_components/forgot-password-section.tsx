"use client";
import Link from "next/link";

export default function ForgotPasswordSection() {

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
                <section className="relative overflow-hidden rounded-4xl border border-emerald-100 bg-linear-to-br from-emerald-950 via-emerald-800 to-teal-900 p-8 text-white shadow-[0_30px_80px_rgba(6,78,59,0.24)] sm:p-10">
                    <div className="absolute inset-0 opacity-25">
                        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                                <span className="pulse-soft inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                                Reset access in a calm, clear flow
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/80">Forgot password</p>
                                <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
                                    We&apos;ll help you get back into your TripConnect account.
                                </h1>
                                <p className="max-w-xl text-base leading-8 text-emerald-50/85 sm:text-lg">
                                    Enter your email address, get a reset link, and return to booking with the same polished travel-focused interface.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                { value: "Step 1", label: "Request email" },
                                { value: "Step 2", label: "Open inbox" },
                                { value: "Step 3", label: "Set new password" }
                            ].map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-2xl font-black text-white">{item.value}</p>
                                    <p className="mt-1 text-sm text-emerald-50/80">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <form className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10">
                    <div className="mb-8 space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Password help</p>
                        <h2 className="text-3xl font-black tracking-tight text-slate-950">Reset your password</h2>
                        <p className="max-w-xl text-sm leading-6 text-slate-600">
                            Use the email linked to your account and we&apos;ll guide you to the next step.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="forgot-email" className="text-sm font-semibold text-slate-800">Email address</label>
                            <input
                                id="forgot-email"
                                name="email"
                                autoComplete="email"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm leading-6 text-slate-600">
                            If the email is in our system, you&apos;ll receive a link to set a new password. Check spam or promotions if it doesn&apos;t arrive right away.
                        </div>

                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer"
                        >
                            Send Reset Link
                        </button>

                        <p className="text-center text-sm text-slate-600">
                            Remembered your password?{" "}
                            <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                                Back to login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}