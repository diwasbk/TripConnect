"use client";
import { handleDeleteUserAccount } from "@/lib/actions/auth-action";
import { deleteAccountSchema, deleteAccountType } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function DeleteUserAccountSection() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<deleteAccountType>({
        resolver: zodResolver(deleteAccountSchema)
    });

    const onSubmit = async (data: deleteAccountType) => {
        try {
            const res = await handleDeleteUserAccount(data);

            if (!res.success) {
                throw new Error(res.message || "Failed to delete account!");
            }

            toast.success(res.message || "Account deleted successfully!");

            router.push("/");
        } catch (err: any) {
            toast.error(err.message || "Failed to delete account!");
        }
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border border-red-100 bg-white p-6 shadow-xl shadow-red-950/5 sm:p-8 lg:p-10"
            >
                <div className="mb-8 space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-700">
                        Confirm deletion
                    </p>

                    <h2 className="text-3xl font-black tracking-tight text-slate-950">
                        Delete account
                    </h2>

                    <p className="text-sm leading-6 text-slate-600">
                        Enter your password to confirm account deletion.
                    </p>
                </div>

                <div className="space-y-5">

                    <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                        Warning: This action is irreversible. Once your
                        account is deleted, all associated information
                        will be permanently removed.
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-slate-800"
                        >
                            Current password
                        </label>

                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-2xl border border-red-100 bg-red-50/40 px-4 py-3 text-slate-950 outline-none transition-all focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
                        />

                        {errors.password && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.password.message}
                            </p>
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
                            ? "Deleting Account..."
                            : "Delete Account"}
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Changed your mind?{" "}
                        <Link
                            href="/dashboard"
                            className="font-semibold text-emerald-700"
                        >
                            Return to dashboard
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    );
}