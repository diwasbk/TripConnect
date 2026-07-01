"use client";
import { useEffect, useState, useRef } from "react";
import { Search, Trash2, Edit2, Eye, X, FileText, User, CheckCircle2, AlertTriangle, ChevronDown, Loader2, CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import { formatDateTime } from "@/lib/helpers/helper";
import { handleGetAllBookingsByStatusAndGuestType, handleDeleteBookingByBookingId, handleUpdateBookingStatusByBookingId, handleGetBookingByBookingReference } from "@/lib/actions/booking-action";
import UpdateBookingSection from "./update-booking-form";
import BookingDetails from "./booking-details";
import CancelBookingSection from "@/app/(private)/_components/cancel-booking-section";
import { FcCancel } from "react-icons/fc";

export default function BookingTable({ status }: { status: string }) {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [isGuestFilter, setIsGuestFilter] = useState<boolean>(true);

    // UI & Dropdown State
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    const [detailLoading, setDetailLoading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [bookingDetail, setBookingDetail] = useState<any>(null);
    const [showDetails, setShowDetails] = useState(false);

    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [pendingStatusUpdate, setPendingStatusUpdate] = useState<{ bookingId: string; status: string } | null>(null);
    const [isStatusUpdating, setIsStatusUpdating] = useState(false);

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await handleGetAllBookingsByStatusAndGuestType(status, isGuestFilter, currentPage, 7);

            if (res.success) {
                setBookings(res.result || []);
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
    }, [currentPage, status, isGuestFilter]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleStatusChange = async () => {
        if (!pendingStatusUpdate) return;

        setUpdatingStatusId(pendingStatusUpdate.bookingId);
        setIsStatusUpdating(true);

        try {
            const res = await handleUpdateBookingStatusByBookingId(pendingStatusUpdate.bookingId, pendingStatusUpdate.status);

            if (res.success) {
                toast.success(res.message || "Status updated!");
                setPendingStatusUpdate(null);
                setOpenDropdownId(null);
                fetchBookings();
            } else {
                throw new Error(res.message);
            }

        } catch (err: any) {
            toast.error(err.message || "Failed to update status");
        } finally {
            setUpdatingStatusId(null);
            setIsStatusUpdating(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!pendingDeleteId) return;
        setIsDeleting(true);
        try {
            const res = await handleDeleteBookingByBookingId(pendingDeleteId);
            if (res.success) {
                toast.success(res.message || "Booking removed successfully.");
                setPendingDeleteId(null);
                fetchBookings();
            } else throw new Error(res.message);
        } catch (err: any) {
            toast.error(err.message || "Failed to delete.");
        } finally {
            setIsDeleting(false);
        }
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

    // Consolidate values: fallback to list object property state while API data fetches
    const boo = bookingDetail || selectedBooking;

    const filtered = bookings.filter(b =>
        b.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        b.bookingReference?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="relative max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 pb-2">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full border border-emerald-200 bg-white/70 text-emerald-600">
                                <FileText size={18} />
                            </div>
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600">
                                Bookings
                            </h2>
                        </div>
                        <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                            {filtered.length} {isGuestFilter ? "guest" : "registered"} records found
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsGuestFilter(!isGuestFilter)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${isGuestFilter
                                ? "bg-teal-50 border-teal-200 text-teal-700"
                                : "bg-emerald-50 border-emerald-200 text-emerald-700"
                                }`}
                        >
                            {isGuestFilter ? <User size={14} /> : <CheckCircle2 size={14} />}

                            {isGuestFilter ? "Guest" : "Registered"}
                        </button>

                        <div className="flex items-center gap-2 bg-white/80 border border-emerald-100 rounded-full px-4 py-2">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                placeholder="Search bookings..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="outline-none bg-transparent text-sm w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-emerald-100 rounded-2xl shadow-md overflow-visible">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-emerald-50 bg-slate-50/75">
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Guest Details</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Booking Ref</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Travel Date</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Status</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50">
                            {filtered.map(b => (
                                <tr key={b._id} className="hover:bg-emerald-50/20">
                                    <td className="px-5 py-4">
                                        <p className="font-bold text-sm text-slate-900">{b.fullName}</p>
                                        <p className="text-xs text-slate-500">{b.email}</p>
                                    </td>
                                    <td className="px-5 py-4 font-mono text-sm">{b.bookingReference}</td>
                                    <td className="px-5 py-4 text-xs font-semibold">{formatDateTime(b.travelDate)}</td>

                                    <td className="px-5 py-4 overflow-visible">
                                        <div className="relative inline-block w-32 text-left" ref={openDropdownId === b._id ? dropdownRef : null}>
                                            <button
                                                type="button"
                                                disabled={updatingStatusId === b._id}
                                                onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === b._id ? null : b._id); }}
                                                className={`w-full flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest outline-none transition-all duration-200 cursor-pointer select-none ${b.status === "confirmed" || b.status === "completed"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                                                    : "bg-amber-50/60 text-amber-600 border-amber-300 hover:bg-amber-100/80"
                                                    } disabled:opacity-60`}
                                            >
                                                <span className="flex-1 text-center truncate">
                                                    {updatingStatusId === b._id ? "Saving..." : (b.status || "pending")}
                                                </span>
                                                {updatingStatusId === b._id ? (
                                                    <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                                                ) : (
                                                    <ChevronDown className={`w-3 h-3 text-current transition-transform duration-200 ${openDropdownId === b._id ? "rotate-180" : ""}`} />
                                                )}
                                            </button>

                                            {openDropdownId === b._id && (
                                                <div className="absolute left-0 mt-1 w-full rounded-xl bg-white border border-slate-200 shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                                                    {['pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => {
                                                                setPendingStatusUpdate({
                                                                    bookingId: b._id,
                                                                    status: s
                                                                });
                                                            }}
                                                            className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${b.status === s
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "text-slate-600 hover:bg-slate-50 cursor-pointer"
                                                                }`}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(b);
                                                setShowDetails(true);
                                                fetchBookingDetail(b.bookingReference);
                                            }}
                                            className="p-1.5 rounded-full border border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer inline-flex items-center justify-center"
                                            title="Inspect Requests"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => { setSelectedBookingId(b._id); setIsFormOpen(true); }} className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600"><Edit2 size={14} /></button>
                                        {b.status === "pending" && (
                                            <button
                                                onClick={() => handleCancelClick(b._id)}
                                                className="p-1.5 rounded-full border border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                            >
                                                <FcCancel size={15} />
                                            </button>
                                        )}
                                        <button onClick={() => setPendingDeleteId(b._id)} className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

                {/* PAGINATION PANEL */}
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
                            {pagination.page} of {pagination.totalPages || 1}
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

            {/* DELETE MODAL */}
            {pendingDeleteId && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><AlertTriangle className="text-rose-500" /> Delete Booking</h3>
                        <p className="text-sm text-slate-600 mb-6">Are you sure? This action is permanent.</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setPendingDeleteId(null)} className="px-4 py-2 text-xs font-bold uppercase rounded-xl border">Cancel</button>
                            <button onClick={handleConfirmDelete} disabled={isDeleting} className="px-4 py-2 text-xs font-bold uppercase rounded-xl bg-rose-600 text-white">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* FORM DRAWER */}
            {isFormOpen && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button onClick={() => setIsFormOpen(false)} className="absolute top-10 right-10"><X /></button>
                        <UpdateBookingSection bookingId={selectedBookingId!} onSuccess={() => { setIsFormOpen(false); fetchBookings(); }} />
                    </div>
                </div>
            )}

            {/* STATUS UPDATE CONFIRMATION */}
            {pendingStatusUpdate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-sm">

                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500" />
                            Update Status
                        </h3>

                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to update this booking status to{" "}
                            <b className="uppercase">
                                {pendingStatusUpdate.status}
                            </b>?
                        </p>


                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setPendingStatusUpdate(null)}
                                className="px-4 py-2 text-xs font-bold uppercase rounded-xl border"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleStatusChange}
                                disabled={isStatusUpdating}
                                className="px-4 py-2 text-xs font-bold uppercase rounded-xl bg-emerald-700 text-white"
                            >
                                {isStatusUpdating ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* STATUS UPDATE CONFIRMATION */}
            {pendingStatusUpdate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-sm">

                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500" />
                            Update Status
                        </h3>

                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to update this booking status to{" "}
                            <b className="uppercase">
                                {pendingStatusUpdate.status}
                            </b>?
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setPendingStatusUpdate(null)}
                                className="px-4 py-2 text-xs font-bold uppercase rounded-xl border"
                            >
                                Cancel
                            </button>


                            <button
                                onClick={() => pendingStatusUpdate && handleStatusChange()}
                                disabled={isStatusUpdating}
                                className="px-4 py-2 text-xs font-bold uppercase rounded-xl bg-emerald-700 text-white"
                            >
                                {isStatusUpdating ? "Updating..." : "Confirm"}
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