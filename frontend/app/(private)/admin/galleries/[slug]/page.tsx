"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { handleGetGalleryBySlug } from "@/lib/actions/gallery-action";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/config";
import AdminSideBar from "../../_components/admin-sidebar";
import GalleryManagementSection from "./_components/gallery-management-section";

export default function Page() {
    const params = useParams();
    const slug = params?.slug as string;

    const [gallery, setGallery] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const photos = gallery?.photoUrls?.map((photo: string) => `${API_BASE_URL}/${photo}`) || [];
    const [index, setIndex] = useState(0);

    const fetchGalleryBySlug = async () => {
        try {
            const res = await handleGetGalleryBySlug(slug);

            if (res.success) {
                setGallery(res.result);
                setIndex(0); // reset image after refresh

            } else {
                throw new Error(res.message || "Failed to fetch gallery!");
            };

        } catch (err: any) {
            toast.error(err.message || "Failed to fetch gallery!");

        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchGalleryBySlug();
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
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="md:shrink-0">
                <AdminSideBar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <GalleryManagementSection gallery={gallery} photos={photos} index={index} prev={prev} next={next} isPrevDisabled={isPrevDisabled} isNextDisabled={isNextDisabled} refreshGallery={fetchGalleryBySlug} />
            </div>
        </div>
    );
}