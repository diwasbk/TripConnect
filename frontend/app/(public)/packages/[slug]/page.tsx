"use client";
import Link from "next/link";
import { packages } from "@/lib/_content";
import { useParams } from "next/navigation";
import NavBar from "../../_components/navbar";
import Footer from "../../_components/footer";

export default function Page() {
    const params = useParams();
    const packageSlug = params?.slug as string;

    const pkg = packages.find((p) => p.slug === packageSlug);
    const totalDays = pkg?.itinerary?.length ?? 0;

    return (
        <div>
            <NavBar />
            <section className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8 bg-linear-to-br from-emerald-50 via-white to-lime-50">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <Link href="/packages" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50">
                        <span>←</span>
                        <span>Back to packages</span>
                    </Link>
                    <p className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Trip details</p>
                </div>

                <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl border border-emerald-100 bg-slate-900 shadow-[0_20px_60px_rgba(15,122,75,0.18)] sm:shadow-[0_28px_90px_rgba(15,122,75,0.22)]">
                    <img src={pkg?.photoUrls?.[0]} alt={pkg?.title} className="w-full h-56 sm:h-80 md:h-96 lg:h-136 object-cover opacity-80" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-9">
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-emerald-200">{pkg?.duration}</p>
                        <h1 className="mt-2 max-w-3xl text-2xl leading-tight font-black tracking-tight text-white sm:text-4xl md:text-5xl">{pkg?.title}</h1>
                        <p className="mt-3 sm:mt-4 max-w-3xl text-xs leading-6 text-emerald-50/90 sm:text-sm sm:leading-7 md:text-base">{pkg?.description}</p>
                        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="rounded-full bg-white/12 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest sm:tracking-[0.15em] text-emerald-100">{pkg?.price}</span>
                            <span className="rounded-full bg-white/12 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest sm:tracking-[0.15em] text-emerald-100">{totalDays} day itinerary</span>
                            <span className="rounded-full bg-white/12 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest sm:tracking-[0.15em] text-emerald-100">{pkg?.includes?.length ?? 0} inclusions</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                        <article className="rounded-4xl border border-emerald-100 bg-white p-7 shadow-md shadow-emerald-950/5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Overview</p>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">What this trip feels like</h2>
                            <p className="mt-4 text-base leading-8 text-slate-600">{pkg?.intro}</p>
                        </article>

                        <article className="rounded-4xl border border-emerald-100 bg-white p-7 shadow-md shadow-emerald-950/5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Included</p>
                            <h3 className="mt-3 text-2xl font-black text-slate-950">What is covered</h3>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                {pkg?.includes?.map((item) => (
                                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/55 px-4 py-3 text-sm font-medium text-slate-700">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">✓</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-4xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-950/10">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Ready to go?</p>
                            <h3 className="mt-3 text-2xl font-black text-slate-950">Book this package</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">Secure your dates now. You can customize pickup options and traveler details in the booking step.</p>

                            <div className="mt-5 space-y-3 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-4">
                                <div className="flex items-center justify-between text-sm text-slate-700">
                                    <span>Starting price</span>
                                    <span className="font-bold text-emerald-900">{pkg?.price}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-700">
                                    <span>Duration</span>
                                    <span className="font-bold text-slate-900">{pkg?.duration}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-700">
                                    <span>Route code</span>
                                    <span className="font-bold uppercase text-slate-900">{pkg?.routeCode}</span>
                                </div>
                            </div>

                            <Link
                                href={`/packages/${pkg?.slug}/booking`}
                                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800"
                            >
                                Continue to booking
                            </Link>
                            <Link href="/contact" className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50">
                                Ask a travel expert
                            </Link>
                        </div>
                    </aside>
                </div>

                <div className="mt-16 rounded-4xl border border-emerald-100 bg-white p-6 sm:p-8 lg:p-10 shadow-lg shadow-emerald-950/5">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Your journey</p>
                            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Day-by-day itinerary</h2>
                        </div>
                        <p className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">{totalDays} planned days</p>
                    </div>

                    <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-emerald-200 sm:before:left-5">
                        {pkg?.itinerary?.map((day) => (
                            <article key={day.day} className="relative rounded-3xl border border-emerald-100 bg-emerald-50/35 p-5 sm:p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="z-10 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">{day.day}</div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Day {day.day}</p>
                                </div>
                                <h3 className="text-xl font-black text-slate-950 sm:text-2xl">{day.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{day.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {day.activities?.map((activity) => (
                                        <span key={activity} className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800">
                                            {activity}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-10 rounded-4xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-8 text-center text-white sm:p-11">
                    <h3 className="text-2xl font-black sm:text-4xl">Ready to confirm {pkg?.title}?</h3>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-emerald-50/85 sm:text-base">
                        Lock your dates now and our team will handle the rest, from transfers to itinerary support.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                            href={`/packages/${pkg?.slug}/booking`}
                            className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
                        >
                            Book this package
                        </Link>
                        <Link href="/packages" className="inline-flex rounded-full border border-emerald-300/50 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                            View all packages
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}