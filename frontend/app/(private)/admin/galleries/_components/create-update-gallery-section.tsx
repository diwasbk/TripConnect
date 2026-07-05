"use client";
import { handleCreateGallery, handleGetGalleryByGalleryId, handleUpdateGalleryInfoById } from "@/lib/actions/gallery-action";
import { gallerySchema, galleryType } from "@/lib/schemas/gallery.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateOrUpdateGallerySection({ galleryId, onSuccess }: { galleryId: any, onSuccess: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<galleryType>({
        resolver: zodResolver(gallerySchema),
    });

    const fetchGallery = async () => {
            setIsLoading(true);
            try {
                const res = await handleGetGalleryByGalleryId(galleryId);
                if (!res.success) throw new Error(res.message);
                reset(res.result);
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch gallery details.");
            } finally {
                setIsLoading(false);
            }
        };

    useEffect(() => {
        if (!galleryId) return;
        fetchGallery();
    }, [galleryId, reset]);

    const onSubmit = async (data: galleryType) => {
        try {
            const res = galleryId ? await handleUpdateGalleryInfoById(galleryId, data) : await handleCreateGallery(data);

            if (!res.success) throw new Error(res.message);

            toast.success(res.message || `Gallery ${galleryId ? "updated" : "created"} successfully!`);
            onSuccess();
        } catch (err: any) {
            toast.error(err.message || "An error occurred.");
        }
    };

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center animate-pulse text-emerald-700">Loading gallery...</div>;
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-4xl border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-950/5">
                <div className="mb-8 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Gallery Management</p>
                    <h2 className="text-3xl font-black text-slate-950">{galleryId ? "Edit Gallery Item" : "Add Gallery Item"}</h2>
                </div>

                <div className="space-y-5">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-800">Title</label>
                        <input {...register("title")} className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 focus:ring-4 focus:ring-emerald-100 outline-none" placeholder="e.g. Chitwan City Tour" />
                        {errors.title && <p className="text-xs font-medium text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Caption */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-800">Caption</label>
                        <textarea {...register("caption")} className="w-full min-h-28 rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 focus:ring-4 focus:ring-emerald-100 outline-none resize-none" placeholder="Describe the gallery item..." />
                        {errors.caption && <p className="text-xs font-medium text-red-500">{errors.caption.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-emerald-700 px-5 py-3.5 text-white font-semibold hover:bg-emerald-800 disabled:opacity-50 transition-all">
                        {galleryId ? "Update Gallery" : "Create Gallery"}
                    </button>
                </div>
            </form>
        </main>
    );
}