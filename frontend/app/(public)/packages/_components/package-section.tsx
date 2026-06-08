import { packages } from "@/lib/_content";
import Link from "next/link";

export default function PackageSection() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Packages</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Explore all packages.</h1>
                <p className="mt-4 text-lg leading-8 text-slate-600">Compare curated trips by duration, budget, and travel style, then open full itineraries before booking.</p>
            </div>

            <div className="mt-8 grid gap-4 sm:gap-6 lg:gap-8">
                {packages.map((trip, index) => (
                    <Link key={trip._id} href={`/packages/${trip.slug}`}>
                        <article className={`card-reveal overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-100 bg-white shadow-md shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-950/10 card-delay-${(index % 5) + 1}`}>
                            <div className="flex flex-col sm:flex-row min-h-auto sm:min-h-48">
                                <div className="relative w-full sm:w-40 sm:shrink-0 h-40 sm:h-auto lg:w-64">
                                    <img src={trip.photoUrls[0]} alt={trip.title} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 rounded-full bg-white/90 px-2.5 py-1 sm:px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
                                        {trip.duration}
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 lg:gap-6">
                                    <div className="min-w-0 flex-1 space-y-2">
                                        <h2 className="text-lg sm:text-lg lg:text-xl font-black leading-tight text-slate-950">{trip.title}</h2>
                                        <p className="line-clamp-2 text-sm leading-5 text-slate-600 sm:text-sm sm:leading-6">{trip.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-800 sm:px-3 sm:py-1.5 sm:text-xs">
                                                {trip.duration}
                                            </span>
                                            <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-800 sm:px-3 sm:py-1.5 sm:text-xs">
                                                {trip.price}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex w-full sm:w-auto shrink-0 sm:items-center self-stretch sm:self-auto">
                                        <div className="flex w-full sm:w-auto flex-col items-end justify-center gap-2 border-t sm:border-t-0 sm:border-l border-emerald-100 pt-4 sm:pt-0 sm:pl-4 pl-0 text-right sm:min-w-36 lg:min-w-40">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Per traveler</p>
                                            <p className="text-base font-black text-slate-950">{trip.price}</p>
                                            <div className="inline-flex rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:bg-emerald-800 sm:text-sm w-full sm:w-auto justify-center">
                                                Explore
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Link
                    href={"/packages"}
                    className="rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors pointer-events-none border-emerald-200 bg-white text-slate-400"
                >
                    Previous
                </Link>
                <span className="rounded-full bg-emerald-700 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-white">
                    1
                </span>
                <Link
                    href={"/packages"}
                    className="rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50"
                >
                    Next   
                </Link>
            </div>
        </div>
    );
}