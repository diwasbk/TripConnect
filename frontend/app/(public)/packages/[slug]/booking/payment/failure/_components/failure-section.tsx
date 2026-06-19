"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

export default function FailureSection({ navUrl }: { navUrl: string }) {
    const router = useRouter();

    return (
        <div className="mx-auto w-full max-w-2xl px-4 py-12">
            <div className="rounded-4xl border border-rose-100 bg-white p-8 text-center shadow-xl">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-rose-700">
                    <FiX className="h-10 w-10" />
                </div>

                <h1 className="mb-2 text-2xl font-extrabold text-slate-900">Payment failed</h1>
                <p className="mb-6 text-sm text-slate-600">We couldn't process your payment. Please try again or contact support.</p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={()=>{router.back()}}
                        className="inline-flex w-full items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-rose-700"
                    >
                        Try again
                    </button>

                    <Link
                        href={`${navUrl}`}
                        className="inline-flex w-full items-center justify-center rounded-full border border-rose-100 bg-white px-6 py-3 text-sm font-semibold text-rose-700 transition-colors duration-200 hover:bg-rose-50"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}