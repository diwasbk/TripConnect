import Link from "next/link";
import { heroStats, packages } from "../_content";

export default function HeroSection() {
    return (
        <div>
            <section className="relative overflow-hidden">
                <section className="relative overflow-hidden">
                    <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_520px] lg:px-8 lg:py-12">
                        <div className="space-y-8">
                            <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                                <span className="pulse-soft inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                Trusted local experts for travel across Nepal
                            </div>

                            <div className="space-y-6">
                                <h1 className="hero-reveal hero-delay-1 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                                    Travel #nepal with confidence.
                                </h1>
                                <p className="hero-reveal hero-delay-2 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                                    Discover curated packages, compare destinations, and secure your itinerary with transparent pricing, expert support, and flexible planning.
                                </p>
                            </div>

                            <div className="hero-reveal hero-delay-3 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/packages"
                                    className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800"
                                >
                                    Browse Packages
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-7 py-4 text-base font-semibold text-emerald-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
                                >
                                    Start Inquiry
                                </Link>
                            </div>

                            <div className="hero-reveal hero-delay-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {heroStats.map((item) => (
                                    <div key={item.label} className="rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-lg shadow-emerald-950/5">
                                        <p className="text-3xl font-black text-emerald-800">{item.value}</p>
                                        <p className="mt-2 text-sm font-medium text-slate-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-5 lg:justify-self-end">
                            <article className="card-reveal flex h-auto flex-col overflow-hidden rounded-4xl border border-white/70 bg-white p-4 shadow-[0_20px_40px_rgba(15,122,75,0.14)] lg:h-140 lg:w-130">
                                <img
                                    src={packages[0].photoUrls[0]}
                                    alt={packages[0].title}
                                    className="h-96 w-full rounded-3xl object-cover lg:h-80"
                                />
                                <div className="mt-5 flex flex-1 flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Featured package</p>
                                        <h2 className="mt-3 text-2xl font-black text-slate-950">{packages[0].title}</h2>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{packages[0].description}</p>
                                    </div>
                                    <div className="flex flex-col gap-3 border-t border-emerald-100 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                                                {packages[0].duration}
                                            </span>
                                        </div>

                                        <div className="flex items-baseline gap-2">
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">From</p>
                                            <p className="text-lg font-black text-emerald-900">{packages[0].price}</p>
                                        </div>
                                        <Link
                                            href={`/packages/${packages[0]._id}`}
                                            className="inline-flex w-full justify-center shrink-0 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-800 sm:w-auto"
                                        >
                                            Explore Package
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
                <section className="mx-auto w-full max-w-7xl px-4 mt-5 mb-12 sm:px-6 lg:px-8">
                    <div className="section-reveal flex items-end justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Featured Packages</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                Three curated packages travelers book most.
                            </h2>
                        </div>
                        <Link href="/packages" className="hidden rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 lg:inline-flex">
                            View all packages
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {packages.slice(0, 3).map((pkg, index) => (
                            <Link
                                key={pkg._id}
                                href={`/packages/${pkg._id}`}
                                className={`card-reveal overflow-hidden rounded-4xl border border-emerald-100 bg-white shadow-md shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10 card-delay-${(index % 5) + 1}`}
                            >
                                <div className="relative">
                                    <img src={pkg.photoUrls[0]} alt={pkg.title} className="h-52 w-full object-cover" />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-800">
                                        {pkg.duration}
                                    </div>
                                </div>
                                <div className="space-y-3 p-5">
                                    <h3 className="text-xl font-black text-slate-950">{pkg.title}</h3>
                                    <p className="line-clamp-2 text-sm leading-6 text-slate-600">{pkg.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-bold text-emerald-800">{pkg.price}</p>
                                        <span className="rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white">Explore</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    );
}