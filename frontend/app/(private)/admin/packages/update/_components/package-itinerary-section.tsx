"use client";
import { handleDeleteItineraryByItineraryId } from "@/lib/actions/package-action";
import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function PackageItinerarySection({
    packageId,
    initialItinerary,
    onAddClick,
    onEditClick
}: {
    packageId: string,
    initialItinerary: any[],
    onAddClick: any,
    onEditClick: any
}) {
    const [itinerary, setItinerary] = useState<any[]>(initialItinerary);

    // Track the itinerary ID pending deletion for the custom modal
    const [pendingDeleteItinerary, setPendingDeleteItinerary] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Sync local state when parent props change
    useEffect(() => {
        setItinerary(initialItinerary);
    }, [initialItinerary]);

    // Handle when the user clicks the initial delete button
    const handleDeleteClick = (id: string) => {
        setPendingDeleteItinerary(id);
    };

    // Handle confirmation logic calling the backend server action
    const handleConfirmDelete = async () => {
        if (!pendingDeleteItinerary) return;

        setIsDeleting(true);
        try {
            const res = await handleDeleteItineraryByItineraryId(packageId, pendingDeleteItinerary);

            if (res.success) {
                setItinerary((prev) => prev.filter((item) => item._id !== pendingDeleteItinerary));
                toast.success(res.message || "Package itinerary deleted successfully!");
            } else {
                throw new Error(res.message || "Failed to delete itinerary!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to delete itinerary!");
            console.error(err);
        } finally {
            setIsDeleting(false);
            setPendingDeleteItinerary(null);
        }
    };

    // Handle cancellation of the delete modal
    const handleCancelDelete = () => {
        setPendingDeleteItinerary(null);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-950">2. Package Itinerary Plan</h3>
            <div className="rounded-4xl border border-emerald-100 bg-white p-5 sm:p-8 shadow-md shadow-emerald-950/5">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Journey Flow</p>
                        <h4 className="text-xl font-black text-slate-950">Day-by-day sequence</h4>
                    </div>
                    <button
                        onClick={onAddClick}
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100 cursor-pointer"
                    >
                        <FiPlus className="text-xs" /> Add Itinerary
                    </button>
                </div>

                {itinerary.length > 0 ? (
                    <div className="relative space-y-6">
                        {itinerary.map((day) => (
                            <article key={day._id} className="group relative rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 ml-2 transition-all hover:bg-emerald-50">
                                <div className="mb-2 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">
                                            {day.day}
                                        </div>
                                        <h5 className="text-base sm:text-lg font-black text-slate-950">{day.title}</h5>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => onEditClick(day)}
                                            type="button"
                                            className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:scale-105 hover:bg-emerald-200 transition-all cursor-pointer"
                                        >
                                            <FiEdit2 className="text-sm" />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteClick(day._id)}
                                            type="button"
                                            className="p-2 rounded-full bg-red-100 text-red-700 hover:scale-105 hover:bg-red-200 transition-all cursor-pointer"
                                        >
                                            <FiTrash2 className="text-sm" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">{day.description}</p>

                                {day.activities?.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2 pl-1">
                                        {day.activities.map((activity: string) => (
                                            <span key={activity} className="inline-flex rounded-full border border-emerald-200 text-emerald-700 px-3 py-1 text-xs font-semibold">
                                                {activity}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-emerald-100 rounded-2xl text-slate-400 text-xs">
                        No active itinerary days configured yet.
                    </div>
                )}
            </div>

            {/* DELETE ITINERARY CONFIRMATION MODAL */}
            {pendingDeleteItinerary && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Itinerary Day</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-rose-600">delete</span> this itinerary day? This action is permanent and cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer bg-rose-600 hover:bg-rose-700 disabled:opacity-50 flex items-center gap-1"
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