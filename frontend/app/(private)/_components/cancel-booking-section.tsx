import { handleCancelBookingByBookingIdAndCancellationReason } from "@/lib/actions/booking-action";
import { bookingCancelSchema, bookingCancelType } from "@/lib/schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CancelBookingSection({ bookingId, onSuccess }: { bookingId: any, onSuccess: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<bookingCancelType>({
        resolver: zodResolver(bookingCancelSchema)
    });

    const onSubmit = async (data: bookingCancelType) => {
        try {
            const res = await handleCancelBookingByBookingIdAndCancellationReason(bookingId, data);

            if (!res.success) {
                throw new Error(res.message || "Failed to cancel booking!");
            };

            toast.success(res.message || "Booking cancelled successfully!");

            onSuccess();

        } catch (err: any) {
            toast.error(err.message || "Failed to cancel booking!");
        };
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border border-red-100 bg-white p-6 shadow-xl shadow-red-950/5 sm:p-8 lg:p-10"
            >
                <div className="mb-8 space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-700">
                        Confirm cancellation
                    </p>
                    <h2 className="text-3xl font-black tracking-tight text-slate-950">
                        Cancel booking
                    </h2>
                    <p className="text-sm leading-6 text-slate-600">
                        Please provide a reason for cancelling your booking.
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                        Warning: Once your
                        booking is cancelled, you may lose your reserved
                        slot and any associated benefits.
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="cancellationReason"
                            className="text-sm font-semibold text-slate-800"
                        >
                            Cancellation Reason
                        </label>
                        <input
                            {...register("cancellationReason")}
                            id="cancellationReason"
                            type="text"
                            placeholder="e.g., Change of plans"
                            className="w-full rounded-2xl border border-red-100 bg-red-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
                        />
                        {errors.cancellationReason && (
                            <p className="text-xs font-medium text-red-500">{errors.cancellationReason.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex w-full items-center justify-center rounded-full bg-red-700 px-5 py-3.5 text-base font-semibold text-white transition-all ${isSubmitting
                            ? "opacity-50"
                            : "cursor-pointer hover:bg-red-800"
                            }`}
                    >
                        {isSubmitting
                            ? "Cancelling Booking..."
                            : "Cancel Booking"}
                    </button>
                </div>
            </form>
        </main>
    );
}