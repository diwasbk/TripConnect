"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "../../_components/navbar";
import Footer from "../../_components/footer";
import { gallery } from "@/lib/_content";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const item = gallery.find((g) => g._id === id);

  const photos = item?.photos || (item?.image ? [item.image] : []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!photos.length) return;
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos.length]);

  if (!item) return <div className="p-8">Image not found</div>;

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <div>
      <NavBar/>
      <section className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-50 via-white to-lime-50">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Tour photos</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{item.title}</h1>
            <p className="mt-1 text-sm text-slate-600">{item.caption} · {photos.length} photos</p>
          </div>
          <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50">
            <span>←</span>
            <span>Back to gallery</span>
          </Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <img src={photos[index]} alt={`${item.title} ${index + 1}`} className="w-full h-[70vh] object-cover object-center bg-slate-100" />
          </div>

          <button
            aria-label="Previous photo"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md hover:bg-white hover:cursor-pointer"
          >
            ‹
          </button>

          <button
            aria-label="Next photo"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md hover:bg-white hover:cursor-pointer"
          >
            ›
          </button>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">{index + 1} / {photos.length}</p>
            <a href={photos[index]} target="_blank" rel="noreferrer" className="text-sm font-medium text-emerald-700 hover:underline">Open full size</a>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
