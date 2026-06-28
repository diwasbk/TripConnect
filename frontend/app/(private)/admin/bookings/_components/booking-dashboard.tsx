"use client";
import { handleGetBookingSummary } from "@/lib/actions/summary-action";
import { CheckCheck, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BookingDashboard() {
    const [summary, setSummary] = useState({
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
    });

    useEffect(() => {
        const fetchBookingSummary = async () => {
            try {

                const response = await handleGetBookingSummary();

                if (response.success) {
                    setSummary(response.result);
                }

            } catch (error) {
                console.log(error);
            }
        };
        
        fetchBookingSummary();
    }, []);

    const BOOKING_STATUS = [
        {
            title: "Pending",
            value: summary.pending,
            icon: <Clock size={24} />,
            iconStyle: "bg-amber-50 text-amber-700",
            badge: "Requires Action",
            href: "/admin/bookings/pending"
        },
        {
            title: "Confirmed",
            value: summary.confirmed,
            icon: <CheckCircle2 size={24} />,
            iconStyle: "bg-emerald-50 text-emerald-700",
            badge: "Upcoming",
            href: "/admin/bookings/confirmed"
        },
        {
            title: "Completed",
            value: summary.completed,
            icon: <CheckCheck size={24} />,
            iconStyle: "bg-slate-100 text-slate-700",
            badge: "History",
            href: "/admin/bookings/completed"
        },
        {
            title: "Cancelled",
            value: summary.cancelled,
            icon: <XCircle size={24} />,
            iconStyle: "bg-rose-50 text-rose-700",
            badge: "Voided",
            href: "/admin/bookings/cancelled"
        }
    ];

    return (
        <div className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                            Reservations & Sales
                        </p>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                            Booking Management
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Monitor incoming reservations, process payments, and track trip status.
                        </p>
                    </div>
                </div>

                {/* Booking Metrics Grid */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {BOOKING_STATUS.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between">
                                <div className={`rounded-2xl p-3 ${item.iconStyle}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-xs font-bold rounded-full px-3 py-1 ${item.iconStyle}`}>
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