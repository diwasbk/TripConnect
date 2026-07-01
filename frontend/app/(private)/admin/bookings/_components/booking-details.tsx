import { CheckCircle2, CreditCard } from "lucide-react";

export default function BookingDetails({ boo, detailLoading, handleCloseInspector }: { boo: any, detailLoading: any,  handleCloseInspector: any }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-0 sm:p-4">
            <div className="h-full w-full max-w-5xl border-l sm:border border-slate-200 sm:rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden relative animate-in slide-in-from-right duration-200">

                {/* Drawer Workspace Overlay Loader */}
                {detailLoading && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center z-30">
                        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-2"></div>
                        <p className="text-xs font-semibold text-slate-500">Syncing complete data matrix...</p>
                    </div>
                )}

                {/* FIXED STABLE HEADER */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-white shrink-0">
                    <div>
                        <h1 className="mt-2 text-2xl font-black tracking-tight text-emerald-700 sm:text-3xl">Booking Details</h1>
                    </div>
                    <button
                        onClick={handleCloseInspector}
                        className="rounded-full p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                        <span className="text-xl font-bold leading-none">✕</span>
                    </button>
                </div>

                {/* VERTICALLY SCROLLABLE WORKSPACE */}
                <div className="flex-1 overflow-y-auto px-6 py-6 bg-linear-to-br from-slate-50 via-white to-emerald-50/20 scrollbar-thin">
                    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">

                        {/* Left Content Section: Overview, Traveler & Payment */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-xs">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Booking Reference</p>
                                    <p className="mt-1 font-mono text-sm font-bold text-slate-900">{boo.bookingReference}</p>
                                </div>
                                <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-xs">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System Booking Date</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {boo.bookingDate ? new Date(boo.bookingDate).toDateString() : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Traveler Information Card */}
                            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-xs">
                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-2 mb-4">
                                    Traveler Profile Information
                                </p>
                                <div className="grid grid-cols-1 gap-y-3 gap-x-4 text-sm text-slate-700 sm:grid-cols-2">
                                    <p><span className="font-semibold text-slate-400">Name:</span> <span className="text-slate-900 font-medium ml-1">{boo.fullName}</span></p>
                                    <p><span className="font-semibold text-slate-400">Travel Date:</span> <span className="text-slate-900 font-medium ml-1">{boo.travelDate ? new Date(boo.travelDate).toDateString() : "-"}</span></p>
                                    <p><span className="font-semibold text-slate-400">Email:</span> <span className="text-slate-900 font-medium ml-1 break-all">{boo.email}</span></p>
                                    <p><span className="font-semibold text-slate-400">Number of Travelers:</span> <span className="text-slate-900 font-bold ml-1">{boo.noOfTravelers || boo.noOfTravellers}</span></p>
                                    <p><span className="font-semibold text-slate-400">Phone:</span> <span className="text-slate-900 font-medium ml-1">{boo.phoneNumber}</span></p>
                                    <div className="sm:col-span-2 mt-1">
                                        <span className="font-semibold text-slate-400 block mb-1">Special Request:</span>
                                        <div className="min-h-[44px] rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 text-xs text-slate-600 leading-normal">
                                            {boo.specialRequest || "No customized requests filed."}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment details segments */}
                            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 mb-4">
                                    Financial Ledger Balance
                                </p>
                                <div className="grid grid-cols-1 gap-4 text-sm text-slate-700 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="flex justify-between"><span className="font-semibold text-slate-400">Original Total:</span> <span className="font-mono text-slate-900 font-medium">NPR {boo.originalAmount}</span></p>
                                        <p className="flex justify-between"><span className="font-semibold text-slate-400">Discount Added ({boo.discountPercentage || 0}%):</span> <span className="font-mono text-rose-600 font-medium">NPR {boo.discountAmount}</span></p>
                                        <div className="h-px bg-slate-100 my-1 w-full" />
                                        <p className="flex justify-between items-center text-emerald-800"><span className="font-bold">Total Settled Amount:</span> <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">NPR {boo.totalPaidAmount}</span></p>
                                    </div>
                                    <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-5 flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <p className="flex justify-between"><span className="font-semibold text-slate-400">Applied Voucher:</span> <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-xs font-bold">{boo.promoCode || "NONE"}</span></p>
                                            <p className="flex justify-between"><span className="font-semibold text-slate-400">Gateway Provider:</span> <span className="text-slate-900 font-bold">{boo.paymentMethod}</span></p>
                                            <p className="flex justify-between items-center"><span className="font-semibold text-slate-400">Transaction State:</span> <span className={`font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[10px] ${boo.paymentStatus === "completed" ? "text-emerald-700 bg-emerald-50 border border-emerald-100" : "text-amber-700 bg-amber-50 border border-amber-100"}`}>{boo.paymentStatus || "pending"}</span></p>
                                        </div>

                                        {/* 4. Pay Button Rendered Condition */}
                                        {boo.paymentStatus !== "completed" && (
                                            <button
                                                onClick={() => {
                                                    const targetUrl = `/packages/${boo.slug}/booking/payment?bookingReference=${boo.bookingReference}`;
                                                    window.open(targetUrl, "_blank", "noopener,noreferrer");
                                                }}
                                                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-700 to-emerald-800 text-white font-bold text-xs py-2.5 px-4 shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-900 hover:cursor-pointer"
                                            >
                                                <CreditCard className="w-4 h-4" />
                                                Complete Payment Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Panel Structure Container */}
                        <aside className="space-y-4">
                            <div className="overflow-hidden rounded-2xl bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white shadow-lg shadow-emerald-950/20">
                                <div className="border-b border-emerald-800/60 pb-3">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Package Details</h3>
                                    <h2 className="mt-1 text-lg font-black text-white leading-snug">{boo.packageName || "Loading Package..."}</h2>
                                    <p className="mt-1 text-xs text-emerald-100/70 font-medium">{boo.destination}</p>
                                </div>

                                <div className="mt-4 space-y-2 text-xs text-emerald-100/90">
                                    <p className="flex justify-between border-b border-emerald-800/40 pb-2"><span className="text-emerald-300 font-medium">Duration:</span> <span className="font-bold text-white">{boo.duration}</span></p>
                                    <p className="flex justify-between border-b border-emerald-800/40 pb-2"><span className="text-emerald-300 font-medium">Rate (Per Head):</span> <span className="font-mono font-bold text-white">NPR {boo.pricePerTraveler ? Math.round(boo.pricePerTraveler) : 0}</span></p>

                                    <p className="mt-4 font-bold text-emerald-300 text-[10px] uppercase tracking-wider pt-2">What's included</p>
                                    <ul className="mt-2 space-y-2 text-emerald-100/90">
                                        {(boo.includes && boo.includes.length > 0 ? boo.includes : [
                                            "Standard Accommodations",
                                            "All local transport updates",
                                            "All taxes & site service charges"
                                        ]).map((item: string) => (
                                            <li key={item} className="flex items-start gap-2 text-[11px] leading-tight">
                                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-6 border-t border-emerald-800/60 pt-4 text-[11px]">
                                    <p className="text-emerald-300 font-semibold">Need Assistance?</p>
                                    <p className="mt-1 text-emerald-100/70 leading-normal">
                                        If you notice missing parameters or registry problems, please <a href="/contact" className="font-bold text-white underline hover:text-emerald-200">contact operations</a>.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* FIXED STABLE FOOTER */}
                <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-center shrink-0">
                    <button
                        onClick={handleCloseInspector}
                        className="w-full rounded-2xl border border-slate-100 bg-white py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 active:bg-slate-200 transition-all shadow-xs cursor-pointer text-center"
                    >
                        Dismiss Inspector
                    </button>
                </div>

            </div>
        </div>
    );
}