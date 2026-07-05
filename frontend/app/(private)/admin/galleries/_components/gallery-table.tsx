"use client";
import { useEffect, useState, useRef } from "react";
import { Search, Power, Trash2, Edit, X, Percent, Plus, CheckCircle2, XCircle, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
import { handleDeleteGalleryById, handleGetAllGalleriesByStatus, handleUploadCoverPhotoById } from "@/lib/actions/gallery-action";
import { activateOrDeactivateGalleryById } from "@/lib/api/gallery";
import { formatDateTime } from "@/lib/helpers/helper";
import CreateOrUpdateGallerySection from "./create-update-gallery-section";
import Link from "next/link";

export default function GalleryTable() {
    const router = useRouter();
    const [galleries, setGalleries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);
    const [activeFilter, setActiveFilter] = useState(true);

    // Upload Logic States
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState<string | null>(null);
    const [targetGalleryId, setTargetGalleryId] = useState<string | null>(null);

    // Track state for create/edit slide-over form pane
    const [selectedGalleryId, setSelectedGalleryId] = useState<string | undefined>(undefined);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Modal States
    const [pendingStatusUpdate, setPendingStatusUpdate] = useState<{ id: string, isActive: boolean } | null>(null);
    const [pendingDelete, setPendingDelete] = useState<string | null>(null);

    const fetchGalleries = async () => {
        setLoading(true);
        try {
            const res = await handleGetAllGalleriesByStatus(activeFilter, currentPage);
            if (res.success) {
                setGalleries(res.result || []);
                setPagination(res.pagination || null);
            }
        } catch (err: any) {
            toast.error("Failed to load galleries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchGalleries(); }, [currentPage, activeFilter]);

    // --- Action Handlers ---
    const handleConfirmStatus = async () => {
        if (!pendingStatusUpdate) return;
        try {
            const res = await activateOrDeactivateGalleryById(pendingStatusUpdate.id, !pendingStatusUpdate.isActive);
            if (res.success) {
                toast.success("Status updated successfully!");
                fetchGalleries();
            } else throw new Error(res.message);
        } catch (err) {
            toast.error("Failed to update status");
        } finally {
            setPendingStatusUpdate(null);
        }
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            const res = await handleDeleteGalleryById(pendingDelete);
            if (res.success) {
                toast.success("Gallery deleted successfully!");
                fetchGalleries();
            } else throw new Error(res.message);
        } catch (err) {
            toast.error("Failed to delete gallery");
        } finally {
            setPendingDelete(null);
        }
    };

    const handleEditClick = (id: string) => {
        setSelectedGalleryId(id);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setSelectedGalleryId(undefined);
        fetchGalleries();
    };

    const filtered = galleries.filter(g => g.title.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="relative overflow-hidden max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            {/* Hidden File Input for Uploads */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file && targetGalleryId) {
                        const formData = new FormData();
                        formData.append("myfile", file);

                        setIsUploading(targetGalleryId);
                        const res = await handleUploadCoverPhotoById(targetGalleryId, formData);
                        console.log(res);

                        if (res.success) {
                            toast.success("Cover photo updated successfully!");
                            fetchGalleries();
                        } else {
                            toast.error(res.message);
                        }
                        setIsUploading(null);
                        setTargetGalleryId(null);
                    }
                }}
            />

            <div className="space-y-5">
                {/* HEADER */}
                <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 pb-2">
                    <div className="min-w-[250px] shrink-0 flex items-center gap-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/70 p-2 text-emerald-600">
                                    <Percent size={18} />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                    <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        Galleries
                                    </span>
                                </h2>
                            </div>
                            <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                                {filtered.length} {activeFilter ? "active" : "paused"} configurations on this page
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap ml-auto">
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm min-w-[200px]">
                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                            <input
                                placeholder="Search galleries..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="outline-none bg-transparent text-sm w-full"
                            />
                        </div>

                        <button
                            onClick={() => {
                                setActiveFilter(prev => !prev);
                                setCurrentPage(1);
                            }}
                            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all border shadow-sm cursor-pointer select-none whitespace-nowrap ${activeFilter
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                                }`}
                        >
                            {activeFilter ? (
                                <>
                                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                                    Showing: Active
                                </>
                            ) : (
                                <>
                                    <XCircle size={14} className="text-red-500 shrink-0" />
                                    Showing: Paused
                                </>
                            )}
                        </button>

                        {/* CREATE BUTTON */}
                        <button
                            onClick={() => {
                                setSelectedGalleryId(undefined);
                                setIsFormOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:-translate-y-0.5 cursor-pointer select-none whitespace-nowrap"
                        >
                            <Plus size={16} className="shrink-0" /> Create Gallery
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-md">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/75 border-b border-emerald-50">
                            <tr>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Gallery</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Status</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Timestamp</th>
                                <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-emerald-50/60">
                            {filtered.map(g => (
                                <tr key={g._id} className="hover:bg-emerald-50/20">
                                    <td className="px-5 py-4 flex items-center gap-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`${API_BASE_URL}/${g.coverPhotoUrl}`}
                                                alt={g.title}
                                                onClick={() => {
                                                    setTargetGalleryId(g._id);
                                                    fileInputRef.current?.click();
                                                }}
                                                className={`w-12 h-12 rounded-full object-cover border border-emerald-100 cursor-pointer hover:scale-105 transition duration-200 ${isUploading === g._id ? "opacity-50 cursor-wait" : ""
                                                    }`}
                                            />
                                            <div>
                                                <p className="text-sm font-black text-slate-950">{g.title}</p>
                                                <Link href={`/gallery/${g.slug}`} target="_blank" className="text-[11px] text-emerald-400 truncate hover:text-emerald-600 hover:cursor-pointer">
                                                    /{g.slug}
                                                </Link>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${g.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                            {g.isActive ? "ACTIVE" : "INACTIVE"}
                                        </span>
                                    </td>
                                    
                                    {/* SERIAL TIMELINE LOGS */}
                                    <td className="px-5 py-4 text-xs font-semibold whitespace-nowrap">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-slate-700" title="Received Timestamp">
                                                {formatDateTime(g.createdAt)}
                                            </span>
                                            <span className="text-slate-400 text-[11px] font-medium border-t border-slate-100 pt-0.5" title="Last Updated Timestamp">
                                                {formatDateTime(g.updatedAt || g.createdAt)}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => router.push(`/admin/galleries/${g.slug}`)} className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 cursor-pointer"><Eye size={14} /></button>
                                            <button onClick={() => handleEditClick(g._id)} className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer transition-colors" title="Modify Configuration"><Edit size={14} /></button>
                                            <button onClick={() => setPendingStatusUpdate({ id: g._id, isActive: g.isActive })} className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-100 cursor-pointer"><Power size={14} /></button>
                                            <button onClick={() => setPendingDelete(g._id)} className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 text-rose-600 cursor-pointer"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* CREATION & UPDATE DRAWER SYSTEM */}
                {isFormOpen && (
                    <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                        <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                            <button
                                onClick={() => {
                                    setIsFormOpen(false);
                                    setSelectedGalleryId(undefined);
                                    fetchGalleries();
                                }}
                                className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                            >
                                <X size={20} />
                            </button>
                            <CreateOrUpdateGallerySection
                                galleryId={selectedGalleryId}
                                onSuccess={handleFormSuccess}
                            />
                        </div>
                    </div>
                )}

                {/* PAGINATION UI */}
                {pagination && (
                    <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <button
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={!pagination.hasPreviousPage || loading}
                            className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasPreviousPage || loading ? "pointer-events-none border-emerald-200 bg-white text-slate-400" : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"}`}
                        >
                            Previous
                        </button>
                        <span className="rounded-full bg-emerald-700 px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-white">
                            {pagination.page} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={!pagination.hasNextPage || loading}
                            className={`rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors ${!pagination.hasNextPage || loading ? "pointer-events-none border-emerald-200 bg-white text-slate-400" : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 cursor-pointer"}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {pendingStatusUpdate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Update Gallery Status</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-emerald-600">{pendingStatusUpdate.isActive ? "deactivate" : "activate"}</span> this gallery? This action will update immediately.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setPendingStatusUpdate(null)}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmStatus}
                                className={`px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer ${pendingStatusUpdate.isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {pendingDelete && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border">
                        <h3 className="font-bold text-lg mb-2">Delete Gallery</h3>
                        <p className="text-sm text-slate-600 mb-6">This action is permanent. Are you sure?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setPendingDelete(null)} className="px-4 py-2 rounded-xl border">Cancel</button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 rounded-xl bg-rose-600 text-white">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}