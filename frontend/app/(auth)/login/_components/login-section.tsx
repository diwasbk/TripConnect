"use client";
import { handleLogin } from "@/lib/actions/auth-action";
import { loginSchema, loginType } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginSection() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<loginType>(
        {
            resolver: zodResolver(loginSchema)
        }
    );

    const onSubmit = async (data: loginType) => {
        try {
            const res = await handleLogin(data);

            if (!res.success) {
                throw new Error(res.message || "Login failed!");
            };

            toast.success(res.message || "Login successful!");

            router.push("/user/my-trips");

        } catch (err: any) {
            toast.error(err.message || "Login failed!");
        };
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
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
                                Welcome back to TripConnect
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/80">Login</p>
                                <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
                                    Continue your Nepal travel plans from one clean dashboard.
                                </h1>
                                <p className="max-w-xl text-base leading-8 text-emerald-50/85 sm:text-lg">
                                    Access saved inquiries, booking updates, and package recommendations with the same calm, polished experience as the rest of the site.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                { value: "24/7", label: "Support ready" },
                                { value: "Fast", label: "Secure access" },
                                { value: "Easy", label: "Booking follow-up" }
                            ].map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-2xl font-black text-white">{item.value}</p>
                                    <p className="mt-1 text-sm text-emerald-50/80">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSubmit(onSubmit)} className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10">
                    <div className="mb-8 space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Login</p>
                        <h2 className="text-3xl font-black tracking-tight text-slate-950">Log in to your account</h2>
                        <p className="max-w-xl text-sm leading-6 text-slate-600">
                            Use your email and password to access your account. We’ve designed the experience to be clean, simple, and fast across all devices.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="login-email" className="text-sm font-semibold text-slate-800">Email address</label>
                            <input
                                {...register("email")}
                                id="login-email"
                                name="email"
                                autoComplete="email"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-xs font-medium text-red-500">{errors.email?.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="login-password" className="text-sm font-semibold text-slate-800">Password</label>
                            <input
                                {...register("password")}
                                id="login-password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="text-xs font-medium text-red-500">{errors.password?.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4 text-sm">
                            <label className="inline-flex items-center gap-2 text-slate-600">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-emerald-300 text-emerald-700 focus:ring-emerald-200"
                                />
                                Remember me
                            </label>
                            <Link href="/forgot-password" className="font-semibold text-emerald-700 hover:text-emerald-800">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 ${isSubmitting ? "opacity-50" : "hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer"}`}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        <p className="text-center text-sm text-slate-600">
                            New to TripConnect?{" "}
                            <Link href="/signup" className="font-semibold text-emerald-700 hover:text-emerald-800">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}