"use client";

import { handleDeleteDepartureByDepartureId } from "@/lib/actions/package-action";
import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCalendar, FiPlus } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { toast } from "react-toastify";

interface DepartureItem {
    _id: string;
    date: string | Date;
    totalSeats: number;
    availableSeats: number;
}

interface PackageDeparturesSectionProps {
    packageId: string;
    initialDepartures: DepartureItem[];
    onAddClick: () => void;
    onEditClick: (departure: DepartureItem) => void;
}

export default function PackageDeparturesSection({
    packageId,
    initialDepartures,
    onAddClick,
    onEditClick
}: PackageDeparturesSectionProps) {
    const [departures, setDepartures] = useState<DepartureItem[]>(initialDepartures);

    // Track the departure ID pending deletion for the custom modal
    const [pendingDeleteDeparture, setPendingDeleteDeparture] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Sync local state when parent props change
    useEffect(() => {
        setDepartures(initialDepartures);
    }, [initialDepartures]);

    // Handle when the user clicks the initial delete icon button
    const handleDeleteClick = (id: string) => {
        setPendingDeleteDeparture(id);
    };

    // Handle confirmation logic calling the backend server action
    const handleConfirmDelete = async () => {
        if (!pendingDeleteDeparture) return;

        setIsDeleting(true);
        try {
            const res = await handleDeleteDepartureByDepartureId(packageId, pendingDeleteDeparture);

            if (res.success) {
                setDepartures((prev) => prev.filter((item) => item._id !== pendingDeleteDeparture));
                toast.success(res.message || "Package departure slot deleted successfully!");
            } else {
                throw new Error(res.message || "Failed to delete departure slot!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to delete departure slot!");
            console.error(err);
        } finally {
            setIsDeleting(false);
            setPendingDeleteDeparture(null);
        }
    };

    // Handle cancellation of the delete modal
    const handleCancelDelete = () => {
        setPendingDeleteDeparture(null);
    };

    return (
        <div className="space-y-4 w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-950">3. Departure Availability</h3>

            <div className="rounded-4xl border border-emerald-100 bg-white p-5 sm:p-8 shadow-md shadow-emerald-950/5">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Scheduling</p>
                        <h4 className="text-xl font-black text-slate-950">Active Slots</h4>
                    </div>
                    <button
                        onClick={onAddClick}
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100 cursor-pointer"
                    >
                        <FiPlus className="text-xs" /> Add Slot
                    </button>
                </div>

                {departures.length > 0 ? (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {departures.map((dep) => (
                            <div
                                key={dep._id}
                                className="group flex items-center justify-between rounded-full border border-emerald-100 bg-emerald-50/50 p-4 transition-all hover:bg-emerald-50/40"
                            >
                                <div className="space-y-1.5 min-w-0">
                                    <div className="flex items-center gap-2 text-sm font-black text-slate-950 truncate">
                                        <FiCalendar className="text-emerald-700 text-xs shrink-0" />
                                        <span>
                                            {new Date(dep.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                timeZone: "UTC"
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold pl-4">
                                        <LuUsers className="shrink-0 text-[11px]" />
                                        <span className="truncate">
                                            {dep.availableSeats} / {dep.totalSeats} seats
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                                    {/* Edit Button - now styled like the delete button but in green */}
                                    <button
                                        onClick={() => onEditClick(dep)}
                                        type="button"
                                        className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:scale-105 hover:bg-emerald-200 transition-all cursor-pointer"
                                    >
                                        <FiEdit2 className="text-sm" />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteClick(dep._id)}
                                        type="button"
                                        className="p-2 rounded-full bg-red-100 text-red-700 hover:scale-105 hover:bg-red-200 transition-all cursor-pointer"
                                    >
                                        <FiTrash2 className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-emerald-100 rounded-2xl text-slate-400 text-xs">
                        No active departures tracked yet.
                    </div>
                )}
            </div>

            {/* DELETE DEPARTURE CONFIRMATION MODAL */}
            {pendingDeleteDeparture && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Departure Slot</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to <span className="font-bold text-rose-600">delete</span> this departure batch slot? This action is permanent and cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                                type="button"
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                type="button"
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