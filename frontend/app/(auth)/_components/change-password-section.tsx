"use client";

export default function ChangePasswordSection() {
    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10">
                <div className="mb-8 space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        Account Security
                    </p>

                    <h2 className="text-3xl font-black tracking-tight text-slate-950">
                        Change Password
                    </h2>

                    <p className="text-sm leading-6 text-slate-600">
                        Update your password to keep your account secure.
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-700">
                        Choose a strong password with a mix of letters,
                        numbers, and special characters.
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="currentPassword"
                            className="text-sm font-semibold text-slate-800"
                        >
                            Current Password
                        </label>

                        <input
                            id="currentPassword"
                            type="password"
                            placeholder="Enter current password"
                            className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="newPassword"
                            className="text-sm font-semibold text-slate-800"
                        >
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-semibold text-slate-800"
                        >
                            Confirm New Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:bg-emerald-800"
                    >
                        Update Password
                    </button>
                </div>
            </form>
        </main>
    );
}