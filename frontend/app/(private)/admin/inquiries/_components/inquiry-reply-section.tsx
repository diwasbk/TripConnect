"use client";
import { handleReplyInquiryById } from "@/lib/actions/inquiry-action";
import { inquiryReplySchema, inquiryReplyType } from "@/lib/schemas/inquiry.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function InquiryReplySection({ inquiryId }: { inquiryId: string }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<inquiryReplyType>({
        resolver: zodResolver(inquiryReplySchema)
    });

    const onSubmit = async (data: inquiryReplyType) => {
        try {
            if (!inquiryId) {
                throw new Error("Missing structural identification parameters.");
            };

            const res = await handleReplyInquiryById(inquiryId, data);

            if (!res.success) {
                throw new Error(res.message || "Failed to submit formal reply!");
            };

            toast.success(res.message || "Inquiry response transmitted successfully!");
            
            reset();

        } catch (err: any) {
            toast.error(err.message || "Failed to submit response tracking updates!");
        }
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10 max-w-2xl md:max-w-none space-y-6"
            >
                {/* Header Typography Section */}
                <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        Communications Center
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        Reply to Inquiry
                    </h2>
                    <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                        Compose and transmit a direct response message regarding client request logs. This will mark the conversation status flag as answered.
                    </p>
                </div>

                {/* Form Fields Architecture */}
                <div className="space-y-4">

                    {/* Visual context alert note */}
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-xs sm:text-sm leading-5 sm:leading-6 text-emerald-800">
                        Your system signature will be appended dynamically. Please ensure all details are complete before submitting.
                    </div>

                    {/* Rich Response Text Area */}
                    <div className="space-y-1">
                        <label htmlFor="reply" className="text-xs sm:text-sm font-semibold text-slate-800 block">
                            Your Reply Message
                        </label>
                        <textarea
                            {...register("reply")}
                            id="reply"
                            rows={6}
                            placeholder="Type your official or formal response details here..."
                            className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 resize-none"
                        />
                        {errors.reply && (
                            <p className="text-xs font-medium text-red-500 pt-0.5">
                                {errors.reply.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Action Button Wrapper */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 ${isSubmitting
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer"
                                }`}
                        >
                            {isSubmitting ? "Transmitting Reply..." : "Send Formal Reply"}
                        </button>
                    </div>

                </div>
            </form>
        </main>
    );
}