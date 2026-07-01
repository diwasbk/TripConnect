"use client";
import { handleAddPackageDepartureByPackageId, handleUpdatePackageDepartureByDepartureId } from "@/lib/actions/package-action";
import { departureSchema, departureType } from "@/lib/schemas/package.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AddOrUpdatePackageDepartureProps {
    packageId: string;
    departureId: string;
    departure: any;
    onSuccess: () => void;
}

export default function AddOrUpdatePackageDeparture({ packageId, departureId, departure, onSuccess }: AddOrUpdatePackageDepartureProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<departureType>({
        resolver: zodResolver(departureSchema) as any,
        // Maps backend prop structure into default form values format
        defaultValues: {
            date: departure?.date ? new Date(departure.date).toISOString().split("T")[0] : "",
            totalSeats: departure?.totalSeats ?? undefined,
            availableSeats: departure?.availableSeats ?? undefined,
        } as any
    });

    // Reset form values if the departure prop updates dynamically
    useEffect(() => {
        if (departure) {
            reset({
                date: departure.date ? new Date(departure.date).toISOString().split("T")[0] : "",
                totalSeats: departure.totalSeats,
                availableSeats: departure.availableSeats,
            } as any);
        }
    }, [departure, reset]);

    const onSubmit = async (data: departureType) => {
        try {
            let res;

            if (departureId) {
                res = await handleUpdatePackageDepartureByDepartureId(packageId, departureId, data);
            } else {
                res = await handleAddPackageDepartureByPackageId(packageId, data);
            }

            if (!res.success) {
                throw new Error(res.message);
            }

            toast.success(res.message);
            reset();

            // Fire completion callback to hide form/re-fetch lists
            onSuccess();
            router.refresh();
        } catch (err: any) {
            toast.error(err.message || "An unexpected error occurred while saving.");
        }
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10 max-w-2xl md:max-w-none"
            >
                <div className="mb-8 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        TripConnect Scheduling
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        {departureId ? "Edit Departure Slot" : "Add Departure Slot"}
                    </h2>
                    <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                        Set up specific departure slots, handle overall availability pools, and adjust remaining open seats.
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Departure Date */}
                    <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-semibold text-slate-800">
                            Departure Date
                        </label>
                        <input
                            {...register("date")}
                            id="date"
                            type="date"
                            className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                        {errors.date && (
                            <p className="text-xs font-medium text-red-500">{errors.date.message}</p>
                        )}
                    </div>

                    {/* Capacity Management */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="totalSeats" className="text-sm font-semibold text-slate-800">
                                Total Allotted Seats
                            </label>
                            <input
                                {...register("totalSeats", { valueAsNumber: true })}
                                id="totalSeats"
                                type="number"
                                placeholder="20"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.totalSeats && (
                                <p className="text-xs font-medium text-red-500">{errors.totalSeats.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="availableSeats" className="text-sm font-semibold text-slate-800">
                                Available Open Seats
                            </label>
                            <input
                                {...register("availableSeats", { valueAsNumber: true })}
                                id="availableSeats"
                                type="number"
                                placeholder="20"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.availableSeats && (
                                <p className="text-xs font-medium text-red-500">{errors.availableSeats.message}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer disabled:opacity-50"
                    >
                        {departureId ? "Update Departure Details" : "Save Departure Slot"}
                    </button>
                </div>
            </form>
        </main>
    );
}