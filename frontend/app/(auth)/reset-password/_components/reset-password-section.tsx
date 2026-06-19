"use client";
import { handleResetAccountPassword } from "@/lib/actions/auth-action";
import { resetPassswordType, resetPasswordSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ResetPasswordSection() {
    const router = useRouter();
    const serachParams = useSearchParams();
    const tokenFromURL = serachParams.get("token");

    const [remainingSeconds, setRemainingSeconds] = useState(180);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setRemainingSeconds((currentSeconds) => Math.max(currentSeconds - 1, 0));
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, []);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<resetPassswordType>(
        {
            resolver: zodResolver(resetPasswordSchema),
            defaultValues: { "token": tokenFromURL || "" }
        }
    );

    const onSubmit = async (data: resetPassswordType) => {
        try {
            const res = await handleResetAccountPassword(data);

            if (!res.success) {
                throw new Error(res.message || "Failed to reset password!");
            };

            toast.success(res.message || "Password reset successfully!");

            reset();

            router.push("/login");

        } catch (err: any) {
            toast.error(err.message || "Failed to reset password!");
        };
    };

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
                                Set a new secure password
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/80">Reset password</p>
                                <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
                                    Create a new password and get back to booking.
                                </h1>
                                <p className="max-w-xl text-base leading-8 text-emerald-50/85 sm:text-lg">
                                    Your password reset session will expire in 3 minutes. Please proceed to set a new password.
                                </p>
                                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                                    <span className="pulse-soft inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                                    <span>Time remaining</span>
                                    <span className="tabular-nums text-base text-white">
                                        {minutes}:{seconds.toString().padStart(2, "0")}
                                    </span>
                                    sec
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                <p className="text-2xl font-black text-white">Reset</p>
                                <p className="mt-1 text-sm text-emerald-50/80">Use the email link</p>
                            </div>
                            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                <p className="text-2xl font-black text-white">New</p>
                                <p className="mt-1 text-sm text-emerald-50/80">Choose password</p>
                            </div>
                            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                <p className="text-2xl font-black text-white">Done</p>
                                <p className="mt-1 text-sm text-emerald-50/80">Return to login</p>
                            </div>
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSubmit(onSubmit)} className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10">
                    <div className="mb-8 space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Secure update</p>
                        <h2 className="text-3xl font-black tracking-tight text-slate-950">Set your new password</h2>
                        <p className="max-w-xl text-sm leading-6 text-slate-600">
                            Use the password reset link from your email and create a new password that you will use for TripConnect going forward.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="reset-password" className="text-sm font-semibold text-slate-800">New password</label>
                            <input
                                {...register("newPassword")}
                                id="reset-password"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Create a strong password"
                            />
                            {errors.newPassword && (
                                <p className="text-xs font-medium text-red-500">{errors.newPassword?.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="reset-confirmPassword" className="text-sm font-semibold text-slate-800">Confirm password</label>
                            <input
                                {...register("confirmPassword")}
                                id="reset-confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Repeat your new password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs font-medium text-red-500">{errors.confirmPassword?.message}</p>
                            )}
                        </div>

                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm leading-6 text-slate-600">
                            Your reset link expires after 3 minutes, so complete the form as soon as you open it.
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 ${isSubmitting ? "opacity-50" : "hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer"}`}
                        >
                            {isSubmitting ? "Updating Password..." : "Update Password"}
                        </button>

                        <p className="text-center text-sm text-slate-600">
                            Return to{" "}
                            <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                                login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}