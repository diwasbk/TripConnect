"use client";
import { handleVerifyEsewaPayment } from "@/lib/actions/payment-action";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";

export default function SuccessSection({ navUrl1, navUrl2 }: { navUrl1: string, navUrl2: string }) {
    const params = useParams();
    const packageSlug = params?.slug as string;
    const bookingReference = params?.bookingReference as string;

    const searchParams = useSearchParams();
    const data = searchParams.get("data") as string;

    useEffect(() => {
        const verifyEsewaPayment = async () => {
            try {
                if (!data) return;

                const res = await handleVerifyEsewaPayment(data);

                if (!res.success) {
                    throw new Error(res.message || "Failed to verify payment!");
                }
            } catch (err: any) {
                toast.error(err.message || "Failed to verify payment!");
            }
        };

        verifyEsewaPayment();
    }, []);

    return (
        <div className="mx-auto w-full max-w-2xl px-4 py-12">
            <div className="rounded-4xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <FiCheck className="h-10 w-10" />
                </div>

                <h1 className="mb-2 text-2xl font-extrabold text-slate-900">Booking confirmed!</h1>
                <p className="mb-6 text-sm text-slate-600">Your trip is booked and payment was successful.</p>

                <div className="flex flex-col gap-3">
                    <Link
                        href={`${navUrl1}packages/${packageSlug}/booking/${bookingReference}`}
                        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-emerald-800"
                    >
                        View My Booking
                    </Link>

                    <Link
                        href={`${navUrl2}`}
                        className="inline-flex w-full items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition-colors duration-200 hover:bg-emerald-50"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}