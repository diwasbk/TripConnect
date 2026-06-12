export default function AboutSection() {
    return (
        <section aria-labelledby="about-heading" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="w-full">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">About TripConnect</p>
                <h1 id="about-heading" className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">We connect curious travelers with authentic Nepal experiences</h1>

                <p className="mt-4 text-lg leading-8 text-slate-600 text-justify">TripConnect is a small team of Nepali travel specialists building carefully planned journeys that highlight the country’s landscapes, culture, and communities. We design personalized itineraries, partner with vetted local suppliers, and manage logistics so you travel with confidence and purpose.</p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_520px] lg:items-stretch">
                <div className="h-full">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {[
                            'Personalized itineraries tuned to your interests and pace.',
                            'Local guides and vetted partners who know the places they lead.',
                            'Transparent pricing and clear inclusions — no surprises at checkout.',
                            'Safety-first planning with reliable logistics and 24/7 support options.',
                            'Responsible travel: we work with communities and minimize impact.',
                            'Secure booking and clear travel documentation guidance.'
                        ].map((text, idx) => (
                            <article key={idx} className={`card-reveal overflow-hidden rounded-4xl border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5 transition-all`}> 
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-black flex-none">{String(idx + 1).padStart(2, '0')}</div>
                                    <p className="text-sm leading-7 text-slate-700">{text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <aside className="relative h-full rounded-4xl bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-900 p-8 text-white shadow-lg shadow-emerald-900/20 overflow-hidden">
                    <svg className="absolute -top-10 -right-10 opacity-20" width="220" height="220" viewBox="0 0 220 220" fill="none" aria-hidden>
                        <defs>
                            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#34D399" stopOpacity="0.6" />
                                <stop offset="1" stopColor="#06B6D4" stopOpacity="0.4" />
                            </linearGradient>
                        </defs>
                        <circle cx="110" cy="110" r="110" fill="url(#g)" />
                    </svg>

                    <div className="relative z-10">
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">Why travelers choose us</p>
                        <h3 className="mt-3 text-lg font-semibold text-white">Travel with local confidence</h3>
                        <p className="mt-3 text-sm text-emerald-50/90">Hands-on support, trusted partners, and thoughtfully designed itineraries so you can explore Nepal with ease.</p>

                        <ul className="mt-4 space-y-2 text-sm text-emerald-50/90 list-disc list-inside">
                            <li>Personalized itineraries tailored to your interests.</li>
                            <li>Vetted local guides and trusted suppliers.</li>
                            <li>Transparent pricing with no hidden fees.</li>
                            <li>Flexible booking and reliable logistics.</li>
                        </ul>

                        <div className="mt-6 flex gap-3">
                            <a href="/contact" className="inline-flex items-center rounded-4xl bg-white/90 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm hover:bg-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">Plan your trip</a>
                            <a href="/packages" className="inline-flex items-center rounded-4xl border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/5">View packages</a>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}