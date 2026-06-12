"use client";
import Link from "next/link";

export default function DeleteUserAccountSection() {
    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form className="rounded-3xl border border-red-100 bg-white p-6 shadow-xl shadow-red-950/5 sm:p-8 lg:p-10">
                <div className="mb-8 space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-700">
                        Confirm deletion
                    </p>

                    <h2 className="text-3xl font-black tracking-tight text-slate-950">
                        Delete account
                    </h2>

                    <p className="text-sm leading-6 text-slate-600">
                        Enter your password to confirm account deletion.
                    </p>
                </div>

                <div className="space-y-5">

                    <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                        Warning: This action is irreversible. Once your
                        account is deleted, all associated information
                        will be permanently removed.
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-slate-800"
                        >
                            Current password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-2xl border border-red-100 bg-red-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-full bg-red-700 px-5 py-3.5 text-base font-semibold text-white transition-all  cursor-pointer hover:bg-red-800">
                        Delete Account
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Changed your mind?{" "}
                        <Link
                            href="/dashboard"
                            className="font-semibold text-emerald-700"
                        >
                            Return to dashboard
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    );
}