"use client";
import { useEffect, useState, useRef } from "react";
import { Search, Trash2, Eye, CornerUpLeft, X, ChevronDown, Loader2, MessageCircleCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleDeleteInquiryByInquiryId, handleGetAllInquiries, handleUpdateInquiryByInquiryId } from "@/lib/actions/inquiry-action";
import InquiryReplySection from "./inquiry-reply-section";
import { formatDateTime } from "@/lib/helpers/helper";

export default function InquiryTable() {
    const router = useRouter();
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    // Track state for Delete Confirmation Modal
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Track state for view modal & slide-over form pane
    const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

    // Track open state for individual custom status menus by row ID
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdowns if user clicks anywhere outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await handleGetAllInquiries(currentPage, 7);
            if (res.success) {
                setInquiries(res.result || []);
                setPagination(res.pagination || null);
            } else {
                throw new Error(res.message || "Failed to fetch inquiries!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch inquiries!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [currentPage]);

    // Client-side filtration
    const filtered = inquiries.filter(inq => {
        const q = query.toLowerCase();
        return (
            inq.fullName?.toLowerCase().includes(q) ||
            inq.email?.toLowerCase().includes(q) ||
            inq.phoneNumber?.includes(q) ||
            inq.status?.toLowerCase().includes(q)
        );
    });

    // Handle Status Change Integration
    const handleStatusChange = async (inquiryId: string, newStatus: string) => {
        setUpdatingStatusId(inquiryId);
        setOpenDropdownId(null);
        try {
            const res = await handleUpdateInquiryByInquiryId(inquiryId, newStatus);
            if (res.success) {
                toast.success(res.message || "Status updated successfully.");
                fetchInquiries();
                if (selectedInquiry && selectedInquiry._id === inquiryId) {
                    setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus }));
                }
            } else {
                throw new Error(res.message || "Failed to update status.");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setUpdatingStatusId(null);
        }
    };

    // Handle Delete Trigger
    const handleDeleteClick = (id: string) => {
        setPendingDeleteId(id);
    };

    const handleCancelDelete = () => {
        setPendingDeleteId(null);
    };

    const handleConfirmDelete = async () => {
        if (!pendingDeleteId) return;
        setIsDeleting(true);
        try {
            const res = await handleDeleteInquiryByInquiryId(pendingDeleteId, { reply: "" });
            if (res.success) {
                toast.success(res.message || "Inquiry removed successfully.");
                setPendingDeleteId(null);
                fetchInquiries();
            } else {
                throw new Error(res.message || "Failed to delete inquiry.");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleViewClick = (inquiry: any) => {
        setSelectedInquiry(inquiry);
        setIsViewModalOpen(true);
    };

    const handleOpenReplyForm = () => {
        setIsViewModalOpen(false);
        setIsReplyFormOpen(true);
    };

    return (
        <div className="relative overflow-hidden max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-5">
                {/* HEADER */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/70 p-2 text-emerald-600 transition-all hover:bg-emerald-50 hover:-translate-x-0.5 cursor-pointer"
                            >
                                <MessageCircleCheck size={18} />
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                <span className="bg-linear-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Inquiries
                                </span>
                            </h2>
                        </div>

                        <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                            {filtered.length} inquiries cataloged on this page
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search inquiries..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="outline-none bg-transparent text-sm w-48"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white border border-emerald-100 rounded-2xl shadow-md overflow-visible isolate">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-emerald-50 bg-slate-50/75">
                                {/* 3. Explicitly round the first header column */}
                                <th className="rounded-tl-2xl px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Contact Details</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Message Snippet</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Status Update</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Timestamp</th>
                                {/* 4. Explicitly round the last header column */}
                                <th className="rounded-tr-2xl px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-emerald-50/60">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                        Loading customer inquiries data...
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                        No inquiries found matching parameters.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(inq => (
                                    <tr key={inq._id} className="hover:bg-emerald-50/20 transition">
                                        {/* Contact Details */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar / Icon */}
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-800 border border-emerald-200 shrink-0">
                                                    {inq.fullName?.charAt(0).toUpperCase() || "U"}
                                                </div>

                                                {/* Text Details Stacked Vertically */}
                                                <div className="flex flex-col min-w-0">
                                                    <p className="text-sm font-bold text-slate-900 truncate">{inq.fullName}</p>
                                                    <p className="text-xs text-slate-500 truncate">{inq.email}</p>
                                                    <p className="text-[11px] font-mono text-slate-400">{inq.phoneNumber}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Message Snippet */}
                                        <td className="px-5 py-4 max-w-[240px]">
                                            <div className="flex flex-col">
                                                <p
                                                    className="text-sm text-slate-700 line-clamp-2 whitespace-normal break-words"
                                                    title={inq.message}
                                                >
                                                    {inq.message}
                                                </p>
                                                {inq.reply && (
                                                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 mt-1 font-medium self-start">
                                                        <CornerUpLeft size={10} /> Replied
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* CUSTOM DROPDOWN MENU SYSTEM */}
                                        <td className="px-5 py-4 overflow-visible">
                                            <div className="relative inline-block w-32 text-left" ref={openDropdownId === inq._id ? dropdownRef : null}>
                                                <button
                                                    type="button"
                                                    disabled={updatingStatusId === inq._id}
                                                    onClick={() => setOpenDropdownId(openDropdownId === inq._id ? null : inq._id)}
                                                    className={`w-full flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest outline-none transition-all duration-200 cursor-pointer select-none ${inq.status === "replied"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                                                        : "bg-amber-50/60 text-amber-600 border-amber-300 hover:bg-amber-100/80"
                                                        } disabled:opacity-60`}
                                                >
                                                    <span className="flex-1 text-center truncate">
                                                        {updatingStatusId === inq._id ? "Saving..." : (inq.status || "pending")}
                                                    </span>
                                                    {updatingStatusId === inq._id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                                                    ) : (
                                                        <ChevronDown className={`w-3 h-3 text-current transition-transform duration-200 ${openDropdownId === inq._id ? "rotate-180" : ""}`} />
                                                    )}
                                                </button>

                                                {/* Animated Dropdown Drawer overlay */}
                                                {openDropdownId === inq._id && (
                                                    <div className="absolute left-0 mt-1 w-full rounded-xl bg-white border border-slate-200 shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                                                        {['pending', 'replied'].map((s) => (
                                                            <button
                                                                key={s}
                                                                type="button"
                                                                onClick={() => {
                                                                    handleStatusChange(
                                                                        inq._id,
                                                                        s
                                                                    );
                                                                }}
                                                                className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${inq.status === s
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

                                        {/* SERIAL TIMELINE LOGS */}
                                        <td className="px-5 py-4 text-xs font-semibold whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-slate-700" title="Received Timestamp">
                                                    {formatDateTime(inq.createdAt)}
                                                </span>
                                                <span className="text-slate-400 text-[11px] font-medium border-t border-slate-100 pt-0.5" title="Last Updated Timestamp">
                                                    {formatDateTime(inq.updatedAt || inq.createdAt)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Row Actions */}
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewClick(inq)}
                                                    className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer transition-colors"
                                                >
                                                    <Eye size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(inq._id)}
                                                    className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-colors"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
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

            {/* 1. VIEW INQUIRY MESSAGE OVERLAY MODAL */}
            {isViewModalOpen && selectedInquiry && (
                <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl max-w-lg w-full p-6 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsViewModalOpen(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        <div className="mb-4">
                            <span className={`px-2 py-0.5 text-[9px] uppercase font-bold border rounded-full tracking-wider ${selectedInquiry.status === "replied" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}>
                                {selectedInquiry.status || "pending"}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedInquiry.fullName}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{selectedInquiry.email} • {selectedInquiry.phoneNumber}</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 max-h-60 overflow-y-auto mb-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Inquiry Message Context:</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedInquiry.message}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
                            <button
                                onClick={handleOpenReplyForm}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                                <CornerUpLeft size={14} /> Reply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. REPLIES DRAWER SHEET - Embedded InquiryReplySection */}
            {isReplyFormOpen && selectedInquiry && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button
                            onClick={() => {
                                setIsReplyFormOpen(false);
                                fetchInquiries();
                            }}
                            className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                        >
                            <X size={20} />
                        </button>
                        <InquiryReplySection inquiryId={selectedInquiry._id} />
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {pendingDeleteId && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Inquiry</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-rose-600">delete</span> this inquiry? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer bg-rose-600 hover:bg-rose-700 transition-colors"
                            >
                                {isDeleting ? "Deleting..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}