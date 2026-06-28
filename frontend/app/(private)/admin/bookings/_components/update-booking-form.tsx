"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { bookingSchema, bookingType } from "@/lib/schemas/booking.schema";
import { handleGetBookingByBookingId, handleUpdateBookingDetailsByBookingId } from "@/lib/actions/booking-action";

export default function UpdateBookingSection({ bookingId, onSuccess }: { bookingId: string, onSuccess: any }) {
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<bookingType>({
        resolver: zodResolver(bookingSchema)
    });

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await handleGetBookingByBookingId(bookingId);
                if (!res.success) throw new Error(res.message);

                const b = res.result;
                reset({
                    fullName: b.fullName,
                    email: b.email,
                    phoneNumber: b.phoneNumber,
                    travelDate: b.travelDate?.split("T")[0],
                    noOfTravelers: b.noOfTravelers,
                    specialRequest: b.specialRequest ?? "",
                });
            } catch (err: any) {
                toast.error(err.message || "Failed to load booking");

            } finally {
                setLoading(false);
            };
        };
        
        if (bookingId) fetchBooking();
    }, [bookingId, reset]);

    const onSubmit = async (data: bookingType) => {
        try {
            const res = await handleUpdateBookingDetailsByBookingId(bookingId, data);
            if (!res.success) throw new Error(res.message || "Update failed");
            toast.success(res.message || "Booking updated successfully");
            onSuccess?.();
        } catch (err: any) {
            toast.error(err.message || "Failed to update booking");
        };
    };

    if (loading) return <p className="p-8 text-center text-slate-500">Loading...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:p-8">

            {/* Header info */}
            <div className="mb-8 space-y-3">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                    TripConnect Management
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                    Update Booking
                </h2>
                <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                    Modify your travel details, update passenger information, or adjust any special requests for your upcoming trip.
                </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">

                {/* Full Name */}
                <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-800">Full name</label>
                    <input {...register("fullName")} type="text" className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100" placeholder="Enter your full name" />
                    {errors.fullName && <p className="text-xs font-medium text-red-500">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">Email address</label>
                    <input {...register("email")} type="email" className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100" placeholder="name@example.com" />
                    {errors.email && <p className="text-xs font-medium text-red-500">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">Phone number</label>
                    <input {...register("phoneNumber")} type="tel" className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100" placeholder="98XX XXX XXX" />
                    {errors.phoneNumber && <p className="text-xs font-medium text-red-500">{errors.phoneNumber.message}</p>}
                </div>

                {/* Date */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">Travel date</label>
                    <input type="date" {...register("travelDate")} className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100" />
                    {errors.travelDate && <p className="text-xs font-medium text-red-500">{errors.travelDate.message}</p>}
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">Number of travelers</label>
                    <input type="number" {...register("noOfTravelers", { valueAsNumber: true })} readOnly
                        className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400" />
                    {errors.noOfTravelers && <p className="text-xs font-medium text-red-500">{errors.noOfTravelers.message}</p>}
                </div>

                {/* Special Request */}
                <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-800">Special requests</label>
                    <textarea {...register("specialRequest")} className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 min-h-32" placeholder="Any special notes..." />
                </div>
            </div>

            <button
                disabled={isSubmitting}
                type="submit"
                className={`mt-6 w-full rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition-all hover:bg-emerald-800 ${isSubmitting ? "opacity-50" : ""}`}
            >
                {isSubmitting ? "Updating..." : "Update Booking"}
            </button>
        </form>
    );
}