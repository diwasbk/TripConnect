"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Search, CheckCircle2, CreditCard, X } from "lucide-react";
import { toast } from "react-toastify";
import { handleGetAllBookingsByUserId, handleGetBookingByBookingReference } from "@/lib/actions/booking-action";
import { getDecodedTokenFromCookie } from "@/lib/cookie";
import { formatDate } from "@/lib/helpers/helper";
import { FcCancel } from "react-icons/fc";
import CancelBookingSection from "@/app/(private)/_components/cancel-booking-section";

const AVATAR_COLORS = [
    "bg-emerald-100 text-emerald-800 border-emerald-200",
    "bg-teal-100 text-teal-800 border-teal-200",
    "bg-cyan-100 text-cyan-800 border-cyan-200",
    "bg-slate-100 text-slate-800 border-slate-200",
];

const STATUS_BADGE: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200 w-[95px] justify-center uppercase tracking-wider text-[9px]",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200 w-[95px] justify-center uppercase tracking-wider text-[9px]",
    rejected: "bg-rose-50 text-rose-700 border-rose-200 w-[95px] justify-center uppercase tracking-wider text-[9px]",
    cancelled: "bg-slate-100 text-slate-600 border-slate-200 w-[95px] justify-center uppercase tracking-wider text-[9px]",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-200 w-[95px] justify-center uppercase tracking-wider text-[9px]",
};

export default function TripTable() {
    const router = useRouter();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [bookingDetail, setBookingDetail] = useState<any>(null);
    const [showDetails, setShowDetails] = useState(false);

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    // Initial load: Get all user bookings
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const decoded = await getDecodedTokenFromCookie();
            const res = await handleGetAllBookingsByUserId(decoded.id, currentPage);

            if (res.success) {
                setBookings(res.result);
                setPagination(res.pagination || null);
            } else {
                throw new Error(res.message || "Failed to fetch bookings!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch bookings!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Filter list logic
    const filtered = (bookings || []).filter((booking) => {
        const q = query.toLowerCase();
        return (
            booking.fullName?.toLowerCase().includes(q) ||
            booking.email?.toLowerCase().includes(q) ||
            booking.phoneNumber?.toLowerCase().includes(q) ||
            booking.bookingReference?.toLowerCase().includes(q)
        );
    });

    // Fetch the structural deep details for a single target booking reference
    const fetchBookingDetail = async (bookingReference: string) => {
        setDetailLoading(true);
        try {
            const res = await handleGetBookingByBookingReference(bookingReference);
            if (res.success) {
                setBookingDetail(res.result);
            } else {
                throw new Error(res.message || "Failed to fetch booking details!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch booking details!");
            setBookingDetail(null);
        } finally {
            setDetailLoading(false);
        }
    };

    // Handle Cancel Side Drawer Open
    const handleCancelClick = (id: string) => {
        setSelectedBookingId(id);
        setIsEditFormOpen(true);
    };

    // Close form and refresh layout data
    const handleFormSuccess = () => {
        setIsEditFormOpen(false);
        fetchBookings();
    };

    // Clean toggle handler to reset view states cleanly
    const handleCloseInspector = () => {
        setShowDetails(false);
        setSelectedBooking(null);
        setBookingDetail(null);
    };

    // 3. Handle Navigation Action for incomplete payments
    const handleIncompletePaymentRedirect = (data: any) => {
        // Resolve the package object wrapper or direct pkg mapping from data context
        const packageSlug = data?.slug;

        // Construct target url string exactly as requested
        const targetUrl = `/user/packages/${packageSlug}/booking/payment?bookingReference=${data.bookingReference}`;

        router.push(targetUrl);
    };

    // Consolidate values: fallback to list object property state while API data fetches
    const boo = bookingDetail || selectedBooking;

    return (
        <div className="relative overflow-hidden max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="relative z-10 space-y-5">
                {/* Header Actions Panel */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Bookings
                            </span>
                        </h2>
                        <p className="text-sm font-semibold text-slate-500 mt-1">
                            {loading ? "Counting..." : `${filtered.length} booking${filtered.length !== 1 ? "s" : ""} cataloged`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm shadow-emerald-950/5">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search traveler details..."
                                value={query}
                                disabled={loading}
                                onChange={(e) => setQuery(e.target.value)}
                                className="text-sm text-slate-700 placeholder:text-slate-400 outline-none w-48 sm:w-64 bg-transparent disabled:opacity-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Stable Container Shell */}
                <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-md shadow-emerald-950/5 hover:shadow-lg transition-all duration-300 relative">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-xs z-20">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-9 h-9 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin"></div>
                                <p className="text-sm font-medium text-slate-600">Retrieving system bookings...</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-md">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-emerald-50 bg-slate-50/75">
                                        <th className="px-5 py-4 text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">Traveler</th>
                                        <th className="px-5 py-4 text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">Contact Info</th>
                                        <th className="px-5 py-4 text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">Reference</th>
                                        <th className="px-5 py-4 text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">Travel Date</th>
                                        <th className="px-5 py-4 text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">Party Size</th>
                                        <th className="px-5 py-4 text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">Status</th>
                                        <th className="px-5 py-4 text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold text-right">Details</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-emerald-50/60">
                                    {!loading && filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-12 text-sm text-slate-400">
                                                No tracking references record matched this criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((booking, idx) => (
                                            <tr key={booking._id} className="hover:bg-emerald-50/20 transition-colors duration-200">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-11 h-9 rounded-full flex items-center justify-center border text-xs font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                                                            {booking.fullName?.charAt(0).toUpperCase() || "U"}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-950 truncate">{booking.fullName}</p>
                                                            <p className="text-[11px] font-medium text-slate-400 capitalize truncate">
                                                                {booking.isGuest ? "Guest User" : "Account Holder"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-medium text-slate-700">{booking.email}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{booking.phoneNumber}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="text-xs font-mono bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-slate-700 font-semibold">
                                                        {booking.bookingReference}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                                                    {formatDate(booking.travelDate)}
                                                </td>
                                                <td className="px-5 py-4 text-sm font-bold text-slate-900">
                                                    {booking.noOfTravelers || booking.noOfTravelers} Pax
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex font-bold px-2.5 py-1 rounded-full border ${STATUS_BADGE[booking.status] || "bg-slate-100 text-slate-700"}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBooking(booking);
                                                                setShowDetails(true);
                                                                fetchBookingDetail(booking.bookingReference);
                                                            }}
                                                            className="p-1.5 rounded-full border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer inline-flex items-center justify-center"
                                                            title="Inspect Requests"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        {booking.status === "pending" && (
                                                            <button
                                                                onClick={() => handleCancelClick(booking._id)}
                                                                className="p-1.5 rounded-full border border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                                            >
                                                                <FcCancel size={15} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* SLIDING SIDE DRAWER MODAL - USER EDIT OVERLAY */}
            {isEditFormOpen && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button
                            onClick={() => setIsEditFormOpen(false)}
                            className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                        >
                            <X size={20} />
                        </button>
                        <CancelBookingSection bookingId={selectedBookingId} onSuccess={handleFormSuccess} />
                    </div>
                </div>
            )}

            {/* PAGINATION */}
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

            {/* Premium Broad Sidebar Inspector Panel */}
            {showDetails && boo && (
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
                                                        onClick={() => handleIncompletePaymentRedirect(boo)}
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
            )}
        </div>
    );
}