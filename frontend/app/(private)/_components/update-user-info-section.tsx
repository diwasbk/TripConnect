"use client";
import { handleGetUserById, handleUpdateUserInfoById } from "@/lib/actions/auth-action";
import { getDecodedTokenFromCookie } from "@/lib/cookie";
import { userSchema, userType } from "@/lib/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UpdateUserInfoSection({ userId }: { userId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<userType>({
        resolver: zodResolver(userSchema),
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {

                // Use userId prop if provided (admin), otherwise use decoded token (user)
                let profileId: string | any = userId;

                if (!profileId) {
                    const decoded = await getDecodedTokenFromCookie();
                    profileId = decoded.id;
                };

                const res = await handleGetUserById(profileId);

                if (!res.success) {
                    throw new Error(res.message || "Failed to fetch user!");
                };

                reset({
                    fullName: res.result.fullName || "",
                    email: res.result.email || "",
                    phoneNumber: res.result.phoneNumber || "",
                });

            } catch (err: any) {
                toast.error(err.message || "Failed to fetch profile!");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId, reset])

    const onSubmit = async (data: userType) => {
        try {
            // Use userId prop if provided (admin), otherwise use decoded token (user)
            let profileId: string | any = userId;

            if (!profileId) {
                const decoded = await getDecodedTokenFromCookie();
                profileId = decoded.id;
            };

            const res = await handleUpdateUserInfoById(profileId, data);

            if (!res.success) {
                throw new Error(res.message || "Failed to update profile!");
            };

            toast.success(res.message || "Profile updated successfully!");

            reset();

            router.push("/user/my-trips")

        } catch (err: any) {
            toast.error(err.message || "Failed to update profile!");
        };
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl sm:rounded-3xl md:rounded-3xl border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5 sm:p-6 md:p-8 lg:p-10 max-w-2xl md:max-w-none"
            >
                <div className="mb-6 sm:mb-8 md:mb-10 space-y-2 sm:space-y-3">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest sm:tracking-wider text-emerald-700">
                        Account Settings
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
                        Update Profile
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base leading-5 sm:leading-6 text-slate-600 max-w-2xl">
                        Keep your personal information accurate and up to date.
                    </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                    <div className="rounded-2xl sm:rounded-3xl border border-emerald-200 bg-emerald-50 p-3 sm:p-4 md:p-5 text-xs sm:text-sm leading-5 sm:leading-6 text-emerald-700">
                        Your profile information is used for bookings, inquiries,
                        and account communication.
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                        <label
                            htmlFor="fullName"
                            className="text-xs sm:text-sm md:text-base font-semibold text-slate-800 block"
                        >
                            Full Name
                        </label>

                        <input
                            {...register("fullName")}
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100"
                        />
                        {errors.fullName && (<p className="text-xs font-medium text-red-500 mt-1">{errors.fullName.message}</p>)}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                        <label
                            htmlFor="email"
                            className="text-xs sm:text-sm md:text-base font-semibold text-slate-800 block"
                        >
                            Email Address
                        </label>

                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100"
                        />
                        {errors.email && (<p className="text-xs font-medium text-red-500 mt-1">{errors.email.message}</p>)}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                        <label
                            htmlFor="phoneNumber"
                            className="text-xs sm:text-sm md:text-base font-semibold text-slate-800 block"
                        >
                            Phone Number
                        </label>

                        <input
                            {...register("phoneNumber")}
                            id="phoneNumber"
                            type="tel"
                            placeholder="98XXXXXXXX"
                            className="w-full rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100"
                        />
                        {errors.phoneNumber && (<p className="text-xs font-medium text-red-500 mt-1">{errors.phoneNumber.message}</p>)}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 ${isSubmitting ? "opacity-50" : "cursor-pointer hover:-translate-y-0.5 hover:bg-emerald-800"}`}
                    >
                        {isSubmitting ? "Updating Profile..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </main>
    );
}