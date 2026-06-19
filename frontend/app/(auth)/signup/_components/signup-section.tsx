"use client";
import { handleSignup } from "@/lib/actions/auth-action";
import { signupSchema, signupType } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignupSection() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<signupType>(
        {
            resolver: zodResolver(signupSchema)
        }
    );

    const onSubmit = async (data: signupType) => {
        try {
            const res = await handleSignup(data);

            if (!res.success) {
                throw new Error(res.message || "Signup failed!");
            };

            toast.success(res.message || "Signup successful!");

            router.push("/login");

        } catch (err: any) {
            toast.error(err.message || "Signup failed!");
        };
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
                <aside className="relative overflow-hidden rounded-4xl border border-emerald-100 bg-linear-to-br from-emerald-950 via-emerald-800 to-teal-900 p-8 text-white shadow-[0_30px_80px_rgba(6,78,59,0.24)] sm:p-10">
                    <div className="absolute inset-0 opacity-25">
                        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                                <span className="pulse-soft inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                                Join the TripConnect community
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/80">Create account</p>
                                <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                                    Plan, book, and track your next Nepal trip with one account.
                                </h1>
                                <p className="max-w-xl text-base leading-8 text-emerald-50/85 sm:text-lg">
                                    Create your TripConnect profile to book trips faster, manage travel plans with ease, save your travel preferences, and stay connected with every step of your journey through one secure and personalized account.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { title: "Quick setup", description: "Create your profile in a few steps." },
                                { title: "Trip ready", description: "Save details for faster booking." },
                            ].map((item) => (
                                <div key={item.title} className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-base font-black text-white">{item.title}</p>
                                    <p className="mt-1 text-sm leading-6 text-emerald-50/80">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <form onSubmit={handleSubmit(onSubmit)} className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10">
                    <div className="mb-8 space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Sign up</p>
                        <h2 className="text-3xl font-black tracking-tight text-slate-950">Create your TripConnect account</h2>
                        <p className="max-w-2xl text-sm leading-6 text-slate-600">
                            Add your details once, then use the account to manage inquiries, bookings, and future travel plans.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <label htmlFor="signup-fullName" className="text-sm font-semibold text-slate-800">Full name</label>
                            <input
                                {...register("fullName")}
                                id="signup-fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Your full name"
                            />
                            {errors.fullName && (
                                <p className="text-xs font-medium text-red-500">{errors.fullName?.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 sm:col-span-1">
                            <label htmlFor="signup-email" className="text-sm font-semibold text-slate-800">Email address</label>
                            <input
                                {...register("email")}
                                id="signup-email"
                                name="email"
                                autoComplete="email"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-xs font-medium text-red-500">{errors.email?.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 sm:col-span-1">
                            <label htmlFor="signup-phoneNumber" className="text-sm font-semibold text-slate-800">Phone number</label>
                            <input
                                {...register("phoneNumber")}
                                id="signup-phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                autoComplete="tel"
                                inputMode="numeric"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="98XXXXXXXX"
                            />
                            {errors.phoneNumber && (
                                <p className="text-xs font-medium text-red-500">{errors.phoneNumber?.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 sm:col-span-1">
                            <label htmlFor="signup-password" className="text-sm font-semibold text-slate-800">Password</label>
                            <input
                                {...register("password")}
                                id="signup-password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Create a password"
                            />
                            {errors.password && (
                                <p className="text-xs font-medium text-red-500">{errors.password?.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 sm:col-span-1">
                            <label htmlFor="signup-confirmPassword" className="text-sm font-semibold text-slate-800">Confirm password</label>
                            <input
                                {...register("confirmPassword")}
                                id="signup-confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Repeat your password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs font-medium text-red-500">{errors.confirmPassword?.message}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="flex items-start gap-3 mb-2 rounded-3xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm text-slate-600">
                                <input
                                    {...register("termsAgreed")}
                                    type="checkbox"
                                    className="mt-0.5 h-4 w-4 rounded border-emerald-300 text-emerald-700 focus:ring-emerald-200"
                                />
                                <span>
                                    I agree to TripConnect&apos;s terms and travel rules, and I understand this account will be used to manage bookings and support requests.
                                </span>
                            </label>
                            {errors.termsAgreed && (
                                <p className="text-xs font-medium text-red-500">{errors.termsAgreed?.message}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2 flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm leading-6 text-slate-600">
                                Already have an account?{" "}
                                <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                                    Log in instead
                                </Link>
                            </p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 ${isSubmitting ? "opacity-50" : "hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer"}`}
                            >
                                {isSubmitting ? "Creating account..." : "Create account"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}