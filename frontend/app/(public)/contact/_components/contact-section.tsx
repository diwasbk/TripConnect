export default function ContactSection() {

    return (
        <section aria-labelledby="contact-heading" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="w-full">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Contact TripConnect</p>
                <h1 id="contact-heading" className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Plan your next trip with our local experts</h1>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 text-justify">
                    Share your details and we’ll help you build a trip that fits your pace, budget, and travel goals.
                </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_520px] lg:items-stretch">
                <form
                    className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:p-8"
                >
                    <div className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="fullName"
                                    className="text-sm font-semibold text-slate-800"
                                >
                                    Full name
                                </label>
                                <input
                                    id="fullName"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-slate-800"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="phoneNumber"
                                className="text-sm font-semibold text-slate-800"
                            >
                                Phone number
                            </label>
                            <input
                                id="phoneNumber"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="text-sm font-semibold text-slate-800"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="min-h-25 w-full rounded-3xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Tell us what kind of trip you want"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:bg-emerald-800"
                        >
                            Send message
                        </button>
                    </div>
                </form>

                <aside className="relative h-full overflow-hidden rounded-4xl bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-900 p-8 text-white shadow-lg shadow-emerald-900/20">
                    <svg className="absolute -top-10 -right-10 opacity-20" width="220" height="220" viewBox="0 0 220 220" fill="none" aria-hidden>
                        <defs>
                            <linearGradient id="contact-glow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#34D399" stopOpacity="0.6" />
                                <stop offset="1" stopColor="#06B6D4" stopOpacity="0.4" />
                            </linearGradient>
                        </defs>
                        <circle cx="110" cy="110" r="110" fill="url(#contact-glow)" />
                    </svg>

                    <div className="relative z-10">
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">Support details</p>
                        <h3 className="mt-3 text-lg font-semibold text-white">We reply quickly during office hours</h3>
                        <p className="mt-3 text-sm text-emerald-50/90">Send a message and our team will follow up with next steps, package suggestions, and booking guidance.</p>

                        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-emerald-50/90">
                            <li>Email: support@tripconnect.com</li>
                            <li>Phone: +977 9800000000</li>
                            <li>Office hours: Sun-Fri, 9:00 AM to 6:00 PM (NPT)</li>
                            <li>Average response time: under 2 hours during office hours</li>
                        </ul>

                        <div className="mt-6 flex gap-3">
                            <a href="/packages" className="inline-flex items-center rounded-4xl bg-white/90 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm hover:bg-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">View packages</a>
                            <a href="/about" className="inline-flex items-center rounded-4xl border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/5">About us</a>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}