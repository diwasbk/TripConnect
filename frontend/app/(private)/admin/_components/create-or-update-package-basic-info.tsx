"use client";
import { handleCreatePackageBasicInfo, handleGetPackageById, handleUpdatePackageBasicInfoById } from "@/lib/actions/package-action";
import { packageBasicInfoSchema, packageBasicInfoType } from "@/lib/schemas/package.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation"; // Imported useSearchParams
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateOrUpdatePackageBasicInfoSection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const packageId = searchParams.get("packageId");

    const [includes, setIncludes] = useState<string[]>([]);
    const [includeValue, setIncludeValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<packageBasicInfoType>({
        resolver: zodResolver(packageBasicInfoSchema),
        defaultValues: {
            title: "",
            destination: "",
            duration: "",
            price: undefined,
            intro: "",
            description: "",
            includes: [],
        }
    });

    // Fetch package by ID if it exists in the search params
    useEffect(() => {
        if (!packageId) return;

        const fetchPackageData = async () => {
            setIsLoading(true);
            try {
                const res = await handleGetPackageById(packageId);

                if (!res.success) {
                    throw new Error(res.message);
                };

                // Explicitly map properties just like our profile reference snippet
                reset({
                    title: res.result.title || "",
                    destination: res.result.destination || "",
                    duration: res.result.duration || "",
                    price: res.result.price || undefined,
                    intro: res.result.intro || "",
                    description: res.result.description || "",
                    includes: res.result.includes || [],
                });

                // Keep our state pill sync in step with the reset data
                setIncludes(res.result.includes || []);

            } catch (err: any) {
                toast.error(err.message || "An error occurred while fetching the package.");

            } finally {
                setIsLoading(false);
            };
        };

        fetchPackageData();
    }, [packageId, reset]);

    useEffect(() => {
        register("includes");
    }, [register]);

    const updateIncludesInForm = (newIncludes: string[]) => {
        setIncludes(newIncludes);
        setValue("includes", newIncludes, { shouldValidate: true });
    };

    const addInclude = () => {
        if (!includeValue.trim()) return;
        const updated = [...includes, includeValue.trim()];
        updateIncludesInForm(updated);
        setIncludeValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addInclude();
        }
    };

    const removeInclude = (index: number) => {
        const updated = includes.filter((_, i) => i !== index);
        updateIncludesInForm(updated);
    };

    const onSubmit = async (data: packageBasicInfoType) => {
        try {
            let res;

            if (packageId) {
                // f packageId exists, call the Update API
                res = await handleUpdatePackageBasicInfoById(packageId, data);

                if (!res.success) {
                    throw new Error(res.message || "Failed to update package basic info!");
                };

                router.push(`/admin/packages/update/details?packageId=${packageId}`);

            } else {
                // Otherwise, call the Create API
                res = await handleCreatePackageBasicInfo(data);

                if (!res.success) {
                    throw new Error(res.message || "Failed to save package!");
                };

                router.push(`/admin/packages/add-details?packageId=${res.result._id}`);
            };

            toast.success(res.message || `Package ${packageId ? "updated" : "created"} successfully!`);

            // Clear local state and form fields
            reset();
            setIncludes([]);

        } catch (err: any) {
            toast.error(err.message || "An unexpected error occurred while saving.");
        };
    };
    
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-emerald-700 font-semibold animate-pulse">Loading package details...</p>
            </div>
        );
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10 max-w-2xl md:max-w-none"
            >
                <div className="mb-8 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        TripConnect Inventory
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        {packageId ? "Edit Travel Package" : "Create a Travel Package"}
                    </h2>
                    <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                        Fill out the form below to register or update a curated destination plan for our global travelers.
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Title + Destination */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-semibold text-slate-800">
                                Package Title
                            </label>
                            <input
                                {...register("title")}
                                id="title"
                                type="text"
                                placeholder="Ghandruk Himalayan Escape"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.title && (
                                <p className="text-xs font-medium text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="destination" className="text-sm font-semibold text-slate-800">
                                Destination
                            </label>
                            <input
                                {...register("destination")}
                                id="destination"
                                type="text"
                                placeholder="Ghandruk, Kaski, Nepal"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.destination && (
                                <p className="text-xs font-medium text-red-500">{errors.destination.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Duration + Price */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800">Duration</label>
                            <input
                                {...register("duration")}
                                type="text"
                                placeholder="2 Night / 3 Days"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.duration && (
                                <p className="text-xs font-medium text-red-500">{errors.duration.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800">Price (NPR)</label>
                            <input
                                {...register("price", { valueAsNumber: true })}
                                type="number"
                                placeholder="17500"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.price && (
                                <p className="text-xs font-medium text-red-500">{errors.price.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Intro */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-800">Intro</label>
                        <input
                            {...register("intro")}
                            type="text"
                            placeholder="Explore the beautiful village of Ghandruk..."
                            className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        />
                        {errors.intro && (
                            <p className="text-xs font-medium text-red-500">{errors.intro.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-800">Description</label>
                        <textarea
                            {...register("description")}
                            placeholder="A scenic Himalayan village getaway..."
                            className="min-h-28 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 resize-none"
                        />
                        {errors.description && (
                            <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Includes Section */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-800">Includes</label>

                        <div className="flex gap-2">
                            <input
                                value={includeValue}
                                onChange={(e) => setIncludeValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="e.g., Free Breakfast, Tour Guide..."
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            <button
                                type="button"
                                onClick={addInclude}
                                className="rounded-2xl bg-emerald-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 cursor-pointer"
                            >
                                Add
                            </button>
                        </div>
                        {errors.includes && (
                            <p className="text-xs font-medium text-red-500">{errors.includes.message}</p>
                        )}

                        {includes.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {includes.map((item, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 border border-emerald-100"
                                    >
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeInclude(index)}
                                            className="text-emerald-500 hover:text-emerald-700 focus:outline-none ml-0.5"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 cursor-pointer disabled:opacity-50"
                    >
                        {packageId ? "Update Package" : "Create Package"}
                    </button>
                </div>
            </form>
        </main>
    );
}