"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { handleGetPackageById } from "@/lib/actions/package-action";
import UploadPackagePhoto from "./upload-package-photo-section";
import PackageItinerarySection from "./package-itinerary-section";
import PackageDeparturesSection from "./package-departures-section";
import AddOrUpdateItinerarySection from "../../_components/add-or-update-pkg-itinerary";
import AddOrUpdatePackageDeparture from "../../_components/add-or-update-pkg-departure"; // Ensure this matches your directory path
import Link from "next/link";
import { Edit, Plus, X, Calendar } from "lucide-react";

export default function PackageManagementSection() {
    const searchParams = useSearchParams();
    const packageId = searchParams.get("packageId") as string;

    const [pkg, setPackage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // State to handle the visibility of the Add/Edit Itinerary form
    const [isItineraryFormOpen, setIsItineraryFormOpen] = useState<boolean>(false);
    const [selectedItinerary, setSelectedItinerary] = useState<any>(null);

    // State to handle the visibility of the Add/Edit Departure form
    const [isDepartureFormOpen, setIsDepartureFormOpen] = useState<boolean>(false);
    const [selectedDeparture, setSelectedDeparture] = useState<any>(null);

    const fetchPackage = async () => {
        try {
            setLoading(true);
            const res = await handleGetPackageById(packageId);
            if (res.success) {
                setPackage(res.result);
            } else {
                throw new Error(res.message || "Failed to fetch package!");
            }
        } catch (err: any) {
            console.error(err.message || "Failed to fetch package!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (packageId) {
            fetchPackage();
        };
    }, [packageId]);

    // Triggers when user clicks 'Add New Itinerary Day'
    const handleAddNewItinerary = () => {
        setSelectedItinerary(null);
        setIsItineraryFormOpen(true);
    };

    // Pass this down to PackageItinerarySection so its Edit buttons can call it
    const handleEditItinerary = (itineraryItem: any) => {
        setSelectedItinerary(itineraryItem);
        setIsItineraryFormOpen(true);
    };

    // Close itinerary form and refresh layout data
    const handleItineraryFormSuccess = () => {
        setIsItineraryFormOpen(false);
        setSelectedItinerary(null);
        fetchPackage(); // Re-fetch data to reflect newly added/modified items
    };

    // Triggers when user clicks 'Add Slot' inside departure area
    const handleAddNewDeparture = () => {
        setSelectedDeparture(null);
        setIsDepartureFormOpen(true);
    };

    // Pass this down to PackageDeparturesSection so its Edit buttons can call it
    const handleEditDeparture = (departureItem: any) => {
        setSelectedDeparture(departureItem);
        setIsDepartureFormOpen(true);
    };

    // Close departure form and refresh layout data
    const handleDepartureFormSuccess = () => {
        setIsDepartureFormOpen(false);
        setSelectedDeparture(null);
        fetchPackage(); // Re-fetch data to reflect newly added/modified items
    };

    if (loading) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            </div>
        );
    }

    if (!pkg) {
        return <p className="text-center text-xs text-slate-400 py-12">No data found for this package selection.</p>;
    };

    return (
        <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 space-y-6 max-w-7xl">

            {/* 0. Top Title Actions Bar */}
            <div className="border-b border-slate-100 flex flex-wrap items-start justify-between gap-4 pb-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        {pkg.title}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                            {pkg.duration || `${pkg.itinerary?.length || 0} Days`}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={handleAddNewDeparture}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                        <Calendar size={17} />
                        Add Departure Slot
                    </button>

                    <button
                        onClick={handleAddNewItinerary}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        <Plus size={18} />
                        Add Itinerary Day
                    </button>

                    <Link
                        href={`/admin/packages/update/basic?packageId=${pkg._id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
                    >
                        <Edit size={18} />
                        Update Basic Info
                    </Link>
                </div>
            </div>

            {/* Dynamic Form Toggling Overlay/Container pinned to the RIGHT side - ITINERARY FORM */}
            {isItineraryFormOpen && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button
                            onClick={() => setIsItineraryFormOpen(false)}
                            className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                        >
                            <X size={20} />
                        </button>
                        <AddOrUpdateItinerarySection
                            packageId={packageId}
                            itineraryId={selectedItinerary?._id || ""}
                            itinerary={selectedItinerary}
                            onSuccess={handleItineraryFormSuccess}
                        />
                    </div>
                </div>
            )}

            {/* Dynamic Form Toggling Overlay/Container pinned to the RIGHT side - DEPARTURE FORM */}
            {isDepartureFormOpen && (
                <div className="fixed h-full inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl my-auto animate-in slide-in-from-right duration-200">
                        <button
                            onClick={() => setIsDepartureFormOpen(false)}
                            className="absolute top-10 right-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer z-50"
                        >
                            <X size={20} />
                        </button>
                        <AddOrUpdatePackageDeparture
                            packageId={packageId}
                            departureId={selectedDeparture?._id || ""}
                            departure={selectedDeparture}
                            onSuccess={handleDepartureFormSuccess}
                        />
                    </div>
                </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
                {pkg?.includes?.map((item: any) => (
                    <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/55 px-4 py-3 text-sm font-medium text-slate-700"
                    >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                            ✓
                        </span>
                        <span className="whitespace-nowrap">{item}</span>
                    </div>
                ))}
            </div>

            {/* 1. Upload Photo Component */}
            <div>
                <UploadPackagePhoto packageId={packageId} initialPhotoUrl={pkg.photoUrls?.[0]} />
            </div>

            {/* 2. Itinerary Layout Section */}
            <div>
                <PackageItinerarySection
                    packageId={packageId}
                    initialItinerary={pkg.itinerary || []}
                    onAddClick={handleAddNewItinerary}
                    onEditClick={handleEditItinerary}
                />
            </div>

            {/* 3. Departures Layout Section */}
            <div>
                <PackageDeparturesSection
                    packageId={packageId}
                    initialDepartures={pkg.departures || []}
                    onAddClick={handleAddNewDeparture}
                    onEditClick={handleEditDeparture}
                />
            </div>
        </div>
    );
}