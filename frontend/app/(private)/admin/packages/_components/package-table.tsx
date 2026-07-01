"use client";
import { useEffect, useState } from "react";
import { Search, Rocket, Power, X, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
    handleActivateORdeactivatePackageById,
    handleGetLivePackages,
    handleGetPackagesByActiveStatus,
    handleGetPackagesByStatus,
    handlePublishPackageByPackageId,
    handleDeletePackageByPackageId
} from "@/lib/actions/package-action";
import { API_BASE_URL } from "@/lib/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLeftArrow } from "react-icons/bi";

const PACKAGE_STATUS: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-amber-50 text-amber-700 border-amber-200",
};

interface PendingUpdate {
    id: string;
    isActive: boolean;
}

export default function PackageTable({ live, status, isActive }: { live?: string, status?: string, isActive?: boolean }) {
    const router = useRouter();
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    // Pagination State Matching your PackageSection UI
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    // Track the image URL currently being previewed
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Track pending package active/inactive updates for the modal
    const [pendingActiveUpdate, setPendingActiveUpdate] = useState<PendingUpdate | null>(null);

    // Track pending package publish updates for the confirmation modal
    const [pendingPublishUpdate, setPendingPublishUpdate] = useState<string | null>(null);

    // Track pending package deletions
    const [pendingDeletePackage, setPendingDeletePackage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPackages = async () => {
            setLoading(true);
            try {
                let res;

                if (live) {
                    // Assuming handleGetLivePackages can take (page, limit) arguments matching others
                    res = await handleGetLivePackages(currentPage);
                }
                else if (status) {
                    res = await handleGetPackagesByStatus(status, currentPage);
                }
                else if (isActive !== undefined) {
                    res = await handleGetPackagesByActiveStatus(isActive, currentPage);
                }
                else {
                    throw new Error("No package filter provided");
                }

                if (res.success) {
                    setPackages(res.result || []);
                    setPagination(res.pagination || null);
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
    }, [live, status, isActive, currentPage]); // Added currentPage trigger dependency

    const filtered = packages.filter(pkg => {
        const q = query.toLowerCase();
        return (
            pkg.title.toLowerCase().includes(q) ||
            pkg.destination.toLowerCase().includes(q)
        );
    });

    // Handle when the user clicks the publish (Rocket) button
    const handlePublishClick = (id: string) => {
        setPendingPublishUpdate(id);
    };

    // Handle confirmation logic invoking the server action
    const handleConfirmPublish = async () => {
        if (!pendingPublishUpdate) return;

        try {
            const res = await handlePublishPackageByPackageId(pendingPublishUpdate);

            if (res.success) {
                setPackages(prev =>
                    prev.map(pkg =>
                        pkg._id === pendingPublishUpdate ? { ...pkg, status: "published" } : pkg
                    )
                );
                toast.success(res.result || "Package published successfully!");

                router.push("/admin/packages/live");

            } else {
                throw new Error(res.message || "Failed to publish package!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to publish package!");
        } finally {
            setPendingPublishUpdate(null);
        }
    };

    // Handle cancellation of the publish event
    const handleCancelPublish = () => {
        setPendingPublishUpdate(null);
    };

    const updateActiveStatus = async (id: string, isActive: boolean) => {
        try {
            const res = await handleActivateORdeactivatePackageById(id, isActive);

            if (res.success) {
                setPackages(prev => prev.filter(pkg => pkg._id !== id));
                toast.success(`Package ${isActive ? "activated" : "deactivated"} successfully`);
                
                router.push("/admin/packages/live");
            } else {
                throw new Error(res.message || "Failed to update active status!");
            }

        } catch (err: any) {
            toast.error(err.message || "Failed to update package status!");
        }
    };

    const handleActiveActionClick = (id: string, isActive: boolean) => {
        setPendingActiveUpdate({ id, isActive });
    };

    const handleConfirmActiveUpdate = () => {
        if (pendingActiveUpdate) {
            updateActiveStatus(
                pendingActiveUpdate.id,
                pendingActiveUpdate.isActive
            );
            setPendingActiveUpdate(null);
        }
    };

    const handleCancelActiveUpdate = () => {
        setPendingActiveUpdate(null);
    };

    // Handle when the user clicks the delete button
    const handleDeleteClick = (id: string) => {
        setPendingDeletePackage(id);
    };

    // Handle deletion logic invoking the server action
    const handleConfirmDelete = async () => {
        if (!pendingDeletePackage) return;

        try {
            const res = await handleDeletePackageByPackageId(pendingDeletePackage);

            if (res.success) {
                setPackages(prev => prev.filter(pkg => pkg._id !== pendingDeletePackage));
                toast.success(res.message || "Package deleted successfully!");
            } else {
                throw new Error(res.message || "Failed to delete package!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to delete package!");
        } finally {
            setPendingDeletePackage(null);
        }
    };

    // Handle cancellation of the delete event
    const handleCancelDelete = () => {
        setPendingDeletePackage(null);
    };

    return (
        <div className="relative overflow-hidden max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-5">
                {/* HEADER */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.back()}
                                aria-label="Go back"
                                title="Go back"
                                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/70 p-2 text-emerald-600 transition-all hover:bg-emerald-50 hover:-translate-x-0.5 cursor-pointer"
                            >
                                <BiLeftArrow size={18} />
                            </button>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Packages
                                </span>
                            </h2>
                        </div>

                        <p className="text-sm font-semibold text-slate-500 mt-2 ml-1">
                            {filtered.length} packages cataloged on this page
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-full px-4 py-2 shadow-sm">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Search packages..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="outline-none bg-transparent text-sm w-48"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-emerald-50 bg-slate-50/75">
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Package</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Destination</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Pricing</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Schedule</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500">Status</th>
                                    <th className="px-5 py-4 text-[10px] uppercase tracking-[.15em] text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-50/60">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            Loading catalog data...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-slate-400">
                                            No packages found matching parameters.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(pkg => (
                                        <tr key={pkg._id} className="hover:bg-emerald-50/20 transition">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`${API_BASE_URL}/${pkg.photoUrls[0]}`}
                                                        alt={pkg.title}
                                                        onClick={() => setPreviewImage(`${API_BASE_URL}/${pkg.photoUrls[0]}`)}
                                                        className="w-12 h-12 rounded-full object-cover border border-emerald-100 cursor-pointer hover:scale-105 transition duration-200"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-black text-slate-950">{pkg.title}</p>
                                                        <Link
                                                            href={`/packages/${pkg.slug}`}
                                                            target="_blank"
                                                            className="text-[11px] text-emerald-400 truncate hover:text-emerald-600 hover:cursor-pointer"
                                                        >
                                                            /{pkg.slug}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium">{pkg.destination}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-bold text-sm truncate">NPR {pkg.price?.toLocaleString()}</p>
                                                <p className="text-xs text-slate-400 truncate">{pkg.duration}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-bold">{pkg.departures?.length || 0} Departures</p>
                                                <p className="text-xs text-slate-400">{pkg.totalBookings || 0} Bookings</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase ${PACKAGE_STATUS[pkg.status] || "bg-slate-50"}`}>
                                                    {pkg.status}
                                                </span>
                                                <p className={`mt-1 text-[10px] font-bold uppercase ${pkg.isActive ? "text-emerald-600" : "text-slate-400"}`}>
                                                    {pkg.isActive ? "Active" : "Inactive"}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/packages/update?packageId=${pkg._id}`}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                                                    >
                                                        <Edit size={15} />
                                                    </Link>
                                                    {pkg.status !== "published" && (
                                                        <button
                                                            onClick={() => handlePublishClick(pkg._id)}
                                                            className="p-1.5 rounded-full border border-slate-200 hover:bg-emerald-50 cursor-pointer"
                                                        >
                                                            <Rocket size={15} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleActiveActionClick(pkg._id, !pkg.isActive)}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-100 cursor-pointer"
                                                    >
                                                        <Power size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(pkg._id)}
                                                        className="p-1.5 rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
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
                </div>

                {/* PAGINATION UI LOGIC */}
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

            {/* LIGHTBOX / IMAGE MODAL */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative max-w-3xl max-h-[80vh] p-1 bg-white rounded-2xl shadow-2xl m-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                        <img
                            src={previewImage}
                            alt="Package Preview"
                            className="max-w-full max-h-[75vh] object-contain rounded-xl"
                        />
                    </div>
                </div>
            )}

            {/* PUBLISH PACKAGE CONFIRMATION MODAL */}
            {pendingPublishUpdate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Publish Package</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-emerald-600">publish</span> this package? This action will make the package visible to public users immediately.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelPublish}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPublish}
                                className="px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* STATUS UPDATE CONFIRMATION MODAL */}
            {pendingActiveUpdate && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Update Package Status</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-emerald-600">{pendingActiveUpdate.isActive ? "activate" : "deactivate"}</span> this package? This action will update immediately.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelActiveUpdate}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmActiveUpdate}
                                className={`px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer ${pendingActiveUpdate.isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE PACKAGE CONFIRMATION MODAL */}
            {pendingDeletePackage && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Package</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-rose-600">delete</span> this package? This action is permanent and cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer bg-rose-600 hover:bg-rose-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}