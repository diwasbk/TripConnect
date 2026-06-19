"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { handleGetGalleryBySlug } from "@/lib/actions/gallery-action";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/config";

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;

  const [gallery, setGallery] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const photos = gallery?.photoUrls?.map((photo: string) => `${API_BASE_URL}/${photo}`) || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryByStatus = async () => {
      try {
        const res = await handleGetGalleryBySlug(slug);

        if (res.success) {
          setGallery(res.result);

        } else {
          throw new Error(res.message || "Failed to fetch gallery!");
        };

      } catch (err: any) {
        toast.error(err.message || "Failed to fetch gallery!");

      } finally {
        setLoading(false);
      };
    };
    fetchGalleryByStatus();
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!photos.length) return;
      if (e.key === "ArrowLeft" && index > 0) setIndex(index - 1);
      if (e.key === "ArrowRight" && index < photos.length - 1) setIndex(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos.length, index]);

  if (!gallery) return <div className="p-8">Image not found</div>;

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };
  const next = () => {
    if (index < photos.length - 1) setIndex(index + 1);
  };

  const isPrevDisabled = index === 0;
  const isNextDisabled = index === photos.length - 1;

  return (
    <div>
      <section className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-50 via-white to-lime-50">
        <div className="mb-6 flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Tour photos</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{gallery.title}</h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">{gallery.caption} · {photos.length} photos</p>
          </div>
          <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 whitespace-nowrap">
            <span>←</span>
            <span className="hidden sm:inline">Back to gallery</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <img src={photos[index]} alt={`${gallery?.title} ${index + 1}`} className="w-full h-[70vh] object-cover object-center bg-slate-100" />
          </div>

          <button
            aria-label="Previous photo"
            onClick={prev}
            disabled={isPrevDisabled}
            className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-md transition-all ${
              isPrevDisabled
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-white/90 hover:bg-white hover:cursor-pointer"
            }`}
          >
            ‹
          </button>

          <button
            aria-label="Next photo"
            onClick={next}
            disabled={isNextDisabled}
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-md transition-all ${
              isNextDisabled
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-white/90 hover:bg-white hover:cursor-pointer"
            }`}
          >
            ›
          </button>

          <div className="mt-4 flex items-center justify-between w-full">
            <p className="text-xs sm:text-sm text-slate-600">{index + 1} / {photos.length}</p>
            <a href={photos[index]} target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-medium text-emerald-700 hover:underline">Open full size</a>
          </div>
        </div>
      </section>
    </div>
  );
}