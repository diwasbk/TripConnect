import { useState, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { handleDeletePhotoById, handleUploadGalleryPhotoById } from "@/lib/actions/gallery-action";
import { toast } from "react-toastify";

export default function GalleryManagementSection({ gallery, photos, index, prev, next, isPrevDisabled, isNextDisabled, refreshGallery }: { gallery: any, photos: any, index: any, prev: any, next: any, isPrevDisabled: any, isNextDisabled: any, refreshGallery: any }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [pendingDelete, setPendingDelete] = useState<boolean>(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("myfile", file);

        const res = await handleUploadGalleryPhotoById(gallery._id, formData);
        if (res.success) {
            toast.success(res.message || "Photo uploaded successfully!");

            refreshGallery();

        } else {
            toast.error(res.message);
        };
    };

    const handleConfirmDelete = async () => {
        const photoPath = photos[index];

        const fileName = photoPath.split("/").pop();

        const data = { photoUrl: `uploads/packages/${fileName}` };

        const res = await handleDeletePhotoById(gallery._id, data);

        setPendingDelete(false);

        if (res.success) {
            toast.success(res.message || "Deleted successfully!");

            refreshGallery();

        } else {
            toast.error(res.message);
        };
    };

    return (
        <section className="mx-auto h-full w-full px-4 py-10 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-50 via-white to-lime-50">
            <div className="mb-6 flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Tour photos</p>
                    <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{gallery.title}</h1>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all cursor-pointer"
                >
                    <Plus size={16} /> Add More Photos
                </button>
            </div>

            <div className="relative">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
                    <img src={photos[index]} alt="Gallery" className="w-full h-[70vh] object-cover" />

                    <button
                        onClick={() => setPendingDelete(true)}
                        className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition-colors cursor-pointer"
                        title="Delete Photo"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                {/* Navigation and footer remain unchanged */}
                <button
                    aria-label="Previous photo"
                    onClick={prev}
                    disabled={isPrevDisabled}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-md transition-all ${isPrevDisabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-white/90 hover:bg-white hover:cursor-pointer"}`}
                >‹</button>

                <button
                    aria-label="Next photo"
                    onClick={next}
                    disabled={isNextDisabled}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-md transition-all ${isNextDisabled ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-white/90 hover:bg-white hover:cursor-pointer"}`}
                >›</button>

                <div className="mt-4 flex items-center justify-between w-full">
                    <p className="text-xs sm:text-sm text-slate-600">{index + 1} / {photos.length}</p>
                    <a href={photos[index]} target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-medium text-emerald-700 hover:underline">Open full size</a>
                </div>
            </div>

            {/* Confirmation Modal */}
            {pendingDelete && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border">
                        <h3 className="font-bold text-lg mb-2">Delete Photo</h3>
                        <p className="text-sm text-slate-600 mb-6">This action is permanent. Are you sure?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setPendingDelete(false)} className="px-4 py-2 rounded-xl border cursor-pointer">Cancel</button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 rounded-xl bg-rose-600 text-white cursor-pointer">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}