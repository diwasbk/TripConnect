"use client";
import { handleGetPackageSummary } from "@/lib/actions/summary-action";
import { Ban, CheckCircle2, FileEdit, Package, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PackageDashboard() {
    const [summary, setSummary] = useState({
        total: 0,
        live: 0,
        draft: 0,
        deactivated: 0,
    });

    useEffect(() => {
        const fetchPackageSummary = async () => {
            try {

                const response = await handleGetPackageSummary();

                if (response.success) {
                    setSummary(response.result);
                }

            } catch (error) {
                console.log(error);
            }
        };
        fetchPackageSummary();
    }, []);

    const PACKAGE_STATUS = [
        {
            title: "Total Packages",
            value: summary.total,
            icon: <Package size={24} />,
            iconStyle: "bg-slate-100 text-slate-700",
            badge: "All items",
            href: "/admin/packages"
        },
        {
            title: "Live Packages",
            value: summary.live,
            icon: <CheckCircle2 size={24} />,
            iconStyle: "bg-emerald-50 text-emerald-700",
            badge: "Active",
            href: "/admin/packages/live"
        },
        {
            title: "Draft Packages",
            value: summary.draft,
            icon: <FileEdit size={24} />,
            iconStyle: "bg-amber-50 text-amber-700",
            badge: "In review",
            href: "/admin/packages/draft"
        },
        {
            title: "Deactivated",
            value: summary.deactivated,
            icon: <Ban size={24} />,
            iconStyle: "bg-rose-50 text-rose-700",
            badge: "Hidden",
            href: "/admin/packages/deactivated"
        }
    ];

    return (
        <div className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="space-y-8">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                            Inventory & Status
                        </p>

                        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                            Package Management
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Track, edit, and update your local and international travel itineraries.
                        </p>
                    </div>

                    <Link
                        href="/admin/packages/create"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors self-start sm:self-auto"
                    >
                        <Plus size={18} />
                        Create New Package
                    </Link>
                </div>

                {/* Package Metrics Grid */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    {PACKAGE_STATUS.map((item) => (

                        <Link
                            key={item.title}
                            href={item.href}
                            className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >

                            <div className="flex items-center justify-between">

                                <div className={`rounded-2xl p-3 ${item.iconStyle}`}>
                                    {item.icon}
                                </div>

                                <span
                                    className={`text-xs font-bold rounded-full px-3 py-1 ${item.iconStyle}`}
                                >
                                    {item.badge}
                                </span>

                            </div>


                            <div className="mt-6">

                                <p className="text-sm font-semibold text-slate-500">
                                    {item.title}
                                </p>

                                <h2 className="mt-1 text-3xl font-black text-slate-950">
                                    {item.value}
                                </h2>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>
        </div>
    );
}