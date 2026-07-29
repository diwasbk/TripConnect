"use client";
import Link from "next/link";
import { handleGetLivePackages } from "@/lib/actions/package-action";
import { useEffect, useState, useMemo } from "react";
import { API_BASE_URL } from "@/lib/config";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

export default function PackageSection() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    useEffect(() => {
        const fetchPackages = async () => {
            setLoading(true);
            try {
                const res = await handleGetLivePackages(currentPage);
                if (res.success) {
                    setPackages(res.result);
                    setPagination(res.pagination);
                } else {
                    throw new Error(res.message || "Failed to fetch packages!");
                }
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch packages!");
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [currentPage]);

    // Use useMemo to filter only when packages or query change
    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return packages.filter(pkg => 
            pkg.title?.toLowerCase().includes(q) || 
            pkg.destination?.toLowerCase().includes(q)
        );
    }, [query, packages]);

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Packages</p>
                    <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Explore all packages.</h1>
                    <p className="mt-4 text-lg leading-8 text-slate-600">Compare curated pkgs by duration, budget, and travel style, then open full itineraries before booking.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm shrink-0">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        placeholder="Search packages..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="outline-none bg-transparent text-sm w-48"
                    />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-y-6">
                {/* Map over 'filtered' instead of 'packages' */}
                {filtered.length > 0 ? (
                    filtered.map((pkg, index) => (
                        <Link key={pkg._id} href={`packages/${pkg.slug}`} className="block w-full">
                            <article className={`card-reveal overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-100 bg-white shadow-md shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-950/10 card-delay-${(index % 5) + 1}`}>
                                <div className="flex flex-col sm:flex-row min-h-auto sm:min-h-48 min-w-0">
                                    <div className="relative w-full sm:w-40 sm:shrink-0 h-40 sm:h-auto lg:w-64">
                                        <img src={`${API_BASE_URL}/${pkg?.photoUrls[0]}`} className="h-full w-full object-cover" alt={pkg.title} />
                                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 rounded-full bg-white/90 px-2.5 py-1 sm:px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
                                            {pkg.duration}
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 lg:gap-6 min-w-0">
                                        <div className="min-w-0 flex-1 space-y-2">
                                            <h2 className="text-lg lg:text-xl font-black leading-tight text-slate-950 truncate">{pkg.title}</h2>
                                            <p className="line-clamp-2 text-sm leading-5 text-slate-600 sm:leading-6">{pkg.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-800 sm:px-3 sm:py-1.5 sm:text-xs">
                                                    {pkg.duration}
                                                </span>
                                                <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-800 sm:px-3 sm:py-1.5 sm:text-xs">
                                                    {pkg.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex w-full sm:w-auto shrink-0 items-end sm:items-center self-stretch sm:self-auto">
                                            <div className="flex w-full sm:w-auto flex-col items-stretch sm:items-end justify-center gap-2 border-t sm:border-t-0 sm:border-l border-emerald-100 pt-4 sm:pt-0 sm:pl-4 pl-0 text-left sm:text-right sm:min-w-36 lg:min-w-40">
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Per traveler</p>
                                                <p className="text-base font-black text-slate-950">{pkg.price}</p>
                                                <div className="inline-flex rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:bg-emerald-800 sm:text-sm w-full sm:w-auto justify-center">
                                                    Explore
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-slate-500 py-10">No packages found matching your search.</p>
                )}
            </div>

            {/* Pagination remains the same */}
            {pagination && (
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    <button
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={!pagination.hasPreviousPage || loading}
                        className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasPreviousPage || loading
                            ? "pointer-events-none border-emerald-200 bg-white text-slate-400"
                            : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                            }`}
                    >
                        Previous
                    </button>
                    <span className="rounded-full bg-emerald-700 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-white">
                        {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!pagination.hasNextPage || loading}
                        className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasNextPage || loading
                            ? "pointer-events-none border-emerald-200 bg-white text-slate-400"
                            : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}