"use client";
import { handleUploadPackagePhotosByPackageId } from "@/lib/actions/package-action";
import { API_BASE_URL } from "@/lib/config";
import { photoUploadSchema } from "@/lib/schemas/package.schema";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function UploadPackagePhoto({ packageId, initialPhotoUrl }: { packageId: string, initialPhotoUrl: string | null }) {
    const initialSrc = initialPhotoUrl ? `${API_BASE_URL}/${initialPhotoUrl}` : null;
    const [photoPreview, setPhotoPreview] = useState<string | null>(initialSrc);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialPhotoUrl) {
            setPhotoPreview(`${API_BASE_URL}/${initialPhotoUrl}`);
        }
    }, [initialPhotoUrl]);

    const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validation = photoUploadSchema.safeParse({ myfile: file });
        if (!validation.success) {
            const formattedError = validation.error.issues[0]?.message || "Invalid file.";
            toast.error(formattedError);
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);

        setIsUploading(true);
        const formData = new FormData();
        formData.append("myfile", file);

        try {
            const response = await handleUploadPackagePhotosByPackageId(packageId, formData);

            if (response.success) {
                toast.success(response.message || "Package photo uploaded successfully!");
            } else {
                toast.error(response.message || "Failed to upload photo.");
                setPhotoPreview(initialSrc);
            }
        } catch (err) {
            toast.error("An unexpected network error occurred.");
            setPhotoPreview(initialSrc);
        } finally {
            setIsUploading(false);
        }
    };

    const handleTriggerChangePhoto = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-950">1. Package Cover Photo</h3>
            <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                    Upload Package Photo
                </label>

                <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/jpg"
                    className="sr-only"
                    onChange={handlePhotoChange}
                    disabled={isUploading}
                />

                {/* Main Container - added `relative overflow-hidden h-64` to maintain a fixed canvas area */}
                <div className={`relative flex flex-col items-center justify-center w-full h-64 rounded-4xl border-2 border-dashed border-emerald-200 bg-emerald-50/20 transition-all hover:border-emerald-300 overflow-hidden ${!photoPreview ? "p-6" : "p-0"}`}>
                    {photoPreview ? (
                        <div className="absolute inset-0 w-full h-full group p-1">
                            {/* Full width and height image covering the space */}
                            <img
                                src={photoPreview}
                                alt="Preview"
                                className={`w-full h-full object-cover rounded-4xl transition-opacity duration-350 ${isUploading ? "opacity-50" : "opacity-100"}`}
                            />
                            
                            {/* Loading Spinner overlay */}
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-xs">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
                                </div>
                            )}

                            {/* "Change photo" action banner that smoothly appears on hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <button
                                    type="button"
                                    disabled={isUploading}
                                    onClick={handleTriggerChangePhoto}
                                    className="pointer-events-auto px-4 py-2 bg-white/90 hover:bg-white text-xs font-semibold text-slate-900 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    Change Photo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-emerald-600/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="mt-4 flex text-sm text-slate-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-emerald-700 hover:text-emerald-800 focus-within:outline-none">
                                    <span>Upload a file</span>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 1MB</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}