export default function NewsLetterSection() {
    return (
        <div className="rounded-b-4xl border border-emerald-100 bg-linear-to-r from-emerald-50 to-teal-50 p-6 sm:p-8 lg:p-10">
            <div className="sm:max-w-xl">
                <h3 className="text-xl font-black text-slate-950 sm:text-2xl">Stay updated on new packages</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Get notified about exclusive deals and new destinations curated just for you.
                </p>
            </div>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm text-slate-900 placeholder-slate-500 transition-colors focus:border-emerald-700 focus:outline-none sm:px-6"
                    required
                />
                <button
                    type="submit"
                    className="rounded-full bg-emerald-700 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:bg-emerald-800 sm:flex-none"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}