"use client";
import { handleGetDashboardSummary } from "@/lib/actions/summary-action";
import { CalendarCheck, Package, Users, CreditCard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [summary, setSummary] = useState({
        totalBookings: 0,
        totalPackages: 0,
        totalUsers: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await handleGetDashboardSummary();
                if (response.success) {
                    setSummary(response.result);
                }

            } catch (error) {
                console.log(error);
            };
        };

        fetchSummary();
    }, []);

    const stats = [
        {
            title: "Total Bookings",
            value: summary.totalBookings,
            icon: <CalendarCheck size={24} />,
            change: "+12%",
            href: "/admin/bookings"
        },
        {
            title: "Packages",
            value: summary.totalPackages,
            icon: <Package size={24} />,
            change: "+4",
            href: "/admin/packages"
        },
        {
            title: "Users",
            value: summary.totalUsers,
            icon: <Users size={24} />,
            change: "+18%",
            href: "/admin/users"
        },
        {
            title: "Revenue",
            value: summary.totalRevenue,
            icon: <CreditCard size={24} />,
            change: "+21%",
            href: "/admin/payments"
        },
    ];

    return (
        <div className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                            Admin Overview
                        </p>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                            Dashboard
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Manage your Nepal travel platform from one place.
                        </p>
                    </div>
                    <div className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800">
                        System Online
                    </div>
                </div>

                {/* Right Panel */}
                <div className="rounded-4xl bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white shadow-xl shadow-emerald-950/20">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                        Travel Insights
                    </p>
                    <h2 className="mt-3 text-3xl font-black">
                        Welcome Admin
                    </h2>
                    <p className="mt-3 leading-7 text-emerald-100/80">
                        Monitor bookings, packages, payments and travelers from your admin workspace.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                                    {item.icon}
                                </div>
                            </div>

                            <p className="mt-6 text-sm font-semibold text-slate-500">
                                {item.title}
                            </p>

                            <h2 className="mt-1 text-3xl font-black text-slate-950">
                                {item.value}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}