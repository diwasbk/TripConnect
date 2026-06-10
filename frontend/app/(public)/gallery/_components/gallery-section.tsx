import { gallery } from "@/lib/_content";
import Link from "next/link";

export default function GallerySection() {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Gallery</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Photos from our completed tours</h1>
                <p className="mt-4 text-lg leading-8 text-slate-600">Real travellers, real moments — browse photos from past trips and happy guests.</p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {gallery.map((item, index) => (
                    <Link
                        key={item._id}
                        href={`/gallery/${item._id}`}
                        className={`card-reveal group overflow-hidden rounded-4xl border border-emerald-100 bg-white shadow-lg shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/10 card-delay-${(index % 5) + 1}`}
                    >
                        <div className="relative overflow-hidden">
                            <img src={item.image} alt={item.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                            <div className="absolute inset-0 bg-linear-to-t from-emerald-950/45 via-transparent to-transparent opacity-80" />
                            <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                                View gallery
                            </p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-slate-600">{item.caption}</p>
                            <p className="mt-2 text-xs text-slate-500">{item.photos?.length || 1} photos</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}