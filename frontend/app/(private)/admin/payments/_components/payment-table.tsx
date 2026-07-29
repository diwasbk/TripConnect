"use client";
import { useEffect, useState } from "react";
import { Search, CreditCard, ChevronDown, AlertTriangle, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { getAllPaymentsByStatus, updatePaymentStatusById, } from "@/lib/api/payment";
import { handleGetBookingByBookingReference } from "@/lib/actions/booking-action";
import BookingDetails from "../../bookings/_components/booking-details";
import { formatDateTime } from "@/lib/helpers/helper";

export default function PaymentTable() {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("completed");
    
    const [detailLoading, setDetailLoading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [bookingDetail, setBookingDetail] = useState<any>(null);
    const [showDetails, setShowDetails] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    const [isUpdating, setIsUpdating] = useState(false);
    const [pendingStatusUpdate, setPendingStatusUpdate] = useState<{ id: string; status: string } | null>(null);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await getAllPaymentsByStatus(status, currentPage);
            setPayments(res.result);
            setPagination(res.pagination || null);
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch payments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [status, currentPage]);

    const handleUpdateStatus = async (paymentId: string, newStatus: string) => {
        setIsUpdating(true);
        try {
            const res = await updatePaymentStatusById(paymentId, newStatus);

            if (res.success) {
                toast.success("Payment status updated!");
                setPendingStatusUpdate(null);
                // Refresh the data to reflect changes in the table
                fetchPayments();
            } else {
                throw new Error(res.message || "Update failed");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to update payment status");
        } finally {
            setIsUpdating(false);
        }
    };

    const filtered = payments.filter((p) =>
        p.bookingId?.bookingReference.toLowerCase().includes(query.toLowerCase()) ||
        p.promoCodeId?.code.toLowerCase().includes(query.toLowerCase())
    );

    const toggleStatus = () => {
        const statuses = ["completed", "pending", "failed"];
        const nextIndex = (statuses.indexOf(status) + 1) % statuses.length;
        setStatus(statuses[nextIndex]);
    };

    // Clean toggle handler to reset view states cleanly
    const handleCloseInspector = () => {
        setShowDetails(false);
        setSelectedBooking(null);
        setBookingDetail(null);
    };

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

    // Consolidate values: fallback to list object property state while API data fetches
    const boo = bookingDetail || selectedBooking;

    return (
        <div className="relative max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 pb-2">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full border border-emerald-200 bg-white/70 text-emerald-600">
                                <CreditCard size={18} />
                            </div>
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600">
                                Payments
                            </h2>
                        </div>
                        <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                            {filtered.length} transactions found
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleStatus}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100 transition-all"
                        >
                            <ChevronDown size={14} />
                            Status: {status}
                        </button>

                        <div className="flex items-center gap-2 bg-white/80 border border-emerald-100 rounded-full px-4 py-2">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                placeholder="Search by booking or promo..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="outline-none bg-transparent text-sm w-full md:w-64"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-emerald-100 rounded-2xl shadow-md overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-emerald-50 bg-slate-50/75">
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Method</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Pricing</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Discount</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Status</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Created</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Updated</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p) => (
                                <tr key={p._id} className="hover:bg-emerald-50/20">
                                    <td className="px-5 py-4 font-bold text-sm capitalize">{p.paymentMethod}</td>

                                    <td className="px-5 py-4 text-sm">
                                        <div className="flex flex-col">
                                            <p className="font-semibold">NPR {p.finalAmount}</p>
                                            {p.originalAmount > p.finalAmount && (
                                                <p className="text-xs text-red-400 line-through">NPR {p.originalAmount}</p>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm">
                                        <div className="flex flex-col">
                                            <p className="font-semibold">NPR {p.discountAmount || 0}</p>
                                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded w-max mt-1 font-bold">
                                                {p.promoCodeId?.code || "N/A"}
                                            </span>
                                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded w-max mt-1 font-bold">
                                                {`${p.discountPercentage}${"%"} ` || "0%"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${p.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                                            p.paymentStatus === "completed" ? "bg-emerald-100 text-emerald-700" :
                                                "bg-red-100 text-red-700"
                                            }`}>
                                            {p.paymentStatus}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600">
                                        {formatDateTime(p.createdAt)}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600">
                                        {formatDateTime(p.updatedAt)}
                                    </td>

                                    <td className="px-5 py-4 text-right flex justify-end gap-2">
                                        {/* Inspect Button */}
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(p);
                                                setShowDetails(true);
                                                fetchBookingDetail(p.bookingId?.bookingReference);
                                            }}
                                            className="p-1.5 rounded-full border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>

                                        {/* Status Update Trigger Button */}
                                        <button
                                            onClick={() => setPendingStatusUpdate({ id: p._id, status: p.paymentStatus === "pending" ? "completed" : "pending" })}
                                            className="p-1.5 rounded-full border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer"
                                        >
                                            <CreditCard className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
            </div>

            {pendingStatusUpdate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500" />
                            Confirm Update
                        </h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Change status to {pendingStatusUpdate.status}?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setPendingStatusUpdate(null)} className="px-4 py-2 text-xs font-bold uppercase rounded-xl border">
                                Cancel
                            </button>
                            <button onClick={() => handleUpdateStatus(pendingStatusUpdate.id, pendingStatusUpdate.status)} disabled={isUpdating} className="px-4 py-2 text-xs font-bold uppercase rounded-xl bg-emerald-700 text-white">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Premium Broad Sidebar Inspector Panel */}
            {showDetails && boo && (
                <BookingDetails boo={boo} detailLoading={detailLoading} handleCloseInspector={handleCloseInspector} />
            )}

        </div>
    );
}