"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { handleUploadPackagePhotosByPackageId, handleAddPackageDetailsByPackageId } from "@/lib/actions/package-action";
import { departureInputSchema, departureSchema, departureType, itineraryInputSchema, itinerarySchema, itineraryType, packageDetailsSchema, photoUploadSchema } from "@/lib/schemas/package.schema";

// Extended Form state containing array schemas, temp inputs, and the file field
const packageDetailsFormSchema = packageDetailsSchema.extend({
    myfile: z.any().optional(),
    dayInput: z.number(),
    itineraryTitle: z.string(),
    itineraryDesc: z.string(),
    activityValue: z.string(),
    depDate: z.string(),
    depSeats: z.number(),
});

type PackageDetailsFormValues = z.infer<typeof packageDetailsFormSchema>;

export default function PackageDetailsFormSection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const packageId = searchParams.get("packageId");

    // Live synced array states
    const [itineraries, setItineraries] = useState<itineraryType[]>([]);
    const [activities, setActivities] = useState<string[]>([]);
    const [departures, setDepartures] = useState<departureType[]>([]);

    // Photo preview state
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<PackageDetailsFormValues>({
        resolver: zodResolver(packageDetailsFormSchema) as any,
        mode: "onChange",
        defaultValues: {
            itinerary: [],
            departures: [],
            dayInput: 1,
            itineraryTitle: "",
            itineraryDesc: "",
            activityValue: "",
            depDate: "",
            depSeats: 0
        }
    });

    // Integrated Photo Handler
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const result = photoUploadSchema.safeParse({
            myfile: file
        });

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        setValue("myfile", result.data.myfile, {
            shouldValidate: true
        });

        setPhotoPreview(URL.createObjectURL(result.data.myfile));
    };

    // Itinerary Handlers
    const addActivity = (e?: React.MouseEvent | React.KeyboardEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const value = getValues("activityValue")?.trim();
        if (!value) return;

        if (value.length < 2) {
            setError("activityValue", { type: "manual", message: "Activity must be at least 2 characters." });
            return;
        }

        clearErrors("activityValue");
        setActivities((prev) => [...prev, value]);
        setValue("activityValue", "");
    };

    const handleActivityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            addActivity();
        }
    };

    const removeActivity = (index: number) => {
        setActivities((prev) => prev.filter((_, i) => i !== index));
    };

    const addItineraryDay = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const inputResult = itineraryInputSchema.safeParse({
            dayInput: getValues("dayInput"),
            itineraryTitle: getValues("itineraryTitle"),
            itineraryDesc: getValues("itineraryDesc"),
        });

        if (!inputResult.success) {
            inputResult.error.issues.forEach(issue => {
                setError(issue.path[0] as any, { type: "manual", message: issue.message });
            });
            return;
        }

        if (activities.length === 0) {
            setError("activityValue", { type: "manual", message: "At least one activity is required." });
            return;
        }

        const newItem: itineraryType = {
            day: inputResult.data.dayInput,
            title: inputResult.data.itineraryTitle,
            description: inputResult.data.itineraryDesc,
            activities: activities
        };

        const result = itinerarySchema.safeParse(newItem);
        if (!result.success) return;

        const updated = [...itineraries, result.data].sort((a, b) => a.day - b.day);

        setItineraries(updated);
        setValue("itinerary", updated, { shouldValidate: true });

        setValue("itineraryTitle", "");
        setValue("itineraryDesc", "");
        setValue("dayInput", result.data.day + 1);
        setValue("activityValue", "");
        setActivities([]);

        clearErrors(["itineraryTitle", "itineraryDesc", "activityValue"]);
    };

    const removeItineraryDay = (index: number) => {
        const updatedItineraries = itineraries.filter((_, i) => i !== index);
        setItineraries(updatedItineraries);
        setValue("itinerary", updatedItineraries, { shouldValidate: true });
    };

    // Departure Handlers
    const addDeparture = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const inputResult = departureInputSchema.safeParse({
            depDate: getValues("depDate"),
            depSeats: getValues("depSeats"),
        });

        if (!inputResult.success) {
            inputResult.error.issues.forEach(issue => {
                setError(issue.path[0] as any, { type: "manual", message: issue.message });
            });
            return;
        }

        const departure = {
            date: new Date(inputResult.data.depDate),
            totalSeats: inputResult.data.depSeats,
            availableSeats: inputResult.data.depSeats
        };

        const result = departureSchema.safeParse(departure);
        if (!result.success) return;

        const updated = [...departures, result.data].sort((a, b) => a.date.getTime() - b.date.getTime());

        setDepartures(updated);
        setValue("departures", updated, { shouldValidate: true });

        setValue("depDate", "");
        setValue("depSeats", 0);
        clearErrors(["depDate", "depSeats"]);
    };

    const removeDeparture = (index: number) => {
        const updatedDepartures = departures.filter((_, i) => i !== index);
        setDepartures(updatedDepartures);
        setValue("departures", updatedDepartures, { shouldValidate: true });
    };

    // Unified Submit Action
    const onSubmit = async (data: PackageDetailsFormValues) => {
        if (!packageId) {
            toast.error("Package ID is missing from the URL parameters.");
            return;
        }

        try {
            // 1. Process and execute photo upload sequence first if file asset is bound
            if (data.myfile) {
                const photoFormData = new FormData();
                photoFormData.append("myfile", data.myfile);

                const photoRes = await handleUploadPackagePhotosByPackageId(packageId, photoFormData);
                if (!photoRes.success) {
                    throw new Error(photoRes.message || "Failed to upload banner photo.");
                }
            }

            // 2. Submit logistics payload configuration arrays
            const cleanPayload = {
                itinerary: data.itinerary,
                departures: data.departures
            };

            const detailsRes = await handleAddPackageDetailsByPackageId(packageId, cleanPayload);
            if (!detailsRes.success) throw new Error(detailsRes.message || "Failed to save logistics details.");

            toast.success("All package settings and photos saved successfully!");

            router.push("/admin/packages/draft")

        } catch (err: any) {
            toast.error(err.message || "An unexpected error occurred.");
        };
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 md:px-6 lg:px-6">
            <div className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10 max-w-2xl md:max-w-none space-y-8">

                {/* Header Section */}
                <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        Package Configuration
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        Add Itinerary & Availability
                    </h2>
                    <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                        Set daily activities, departure schedules, and package cover photo.
                    </p>
                </div>

                <hr className="border-emerald-100/60" />

                {/* SECTION 1: PHOTO UPLOAD */}
                <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-950">1. Package Cover Photo</h3>
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-slate-800 block">
                            Upload Package Photo
                        </label>
                        <div className="flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/20 p-6 transition-all hover:border-emerald-300">
                            {photoPreview ? (
                                <div className="w-full text-center space-y-4">
                                    <img
                                        src={photoPreview}
                                        alt="Preview"
                                        className="mx-auto max-h-56 rounded-xl object-cover shadow-sm"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                                            ✓ Image selected and ready to save
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => { setValue("myfile", null); setPhotoPreview(null); }}
                                            className="text-xs font-semibold text-red-600 hover:text-red-700 underline cursor-pointer"
                                        >
                                            Remove image and choose another
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
                                            <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 1MB</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="border-emerald-100/60" />

                {/* MAIN STRUCTURED DATA FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* SECTION 2: ITINERARY BUILDER */}
                    <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-bold text-slate-950">2. Itinerary Schedule</h3>

                        {errors.itinerary && (
                            <p className="text-xs font-semibold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                                {errors.itinerary.message}
                            </p>
                        )}

                        <div className="bg-emerald-50/20 border border-emerald-100/60 p-4 sm:p-5 rounded-3xl space-y-4">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-1 sm:col-span-1">
                                    <label className="text-xs sm:text-sm font-semibold text-slate-800 block">Day Number</label>
                                    <input
                                        type="number"
                                        min="1"
                                        readOnly
                                        {...register("dayInput", { valueAsNumber: true })}
                                        className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm sm:text-base text-slate-950 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 cursor-not-allowed select-none"
                                    />
                                    {errors.dayInput && (
                                        <p className="text-xs font-medium text-red-500 mt-1">{errors.dayInput.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-xs sm:text-sm font-semibold text-slate-800 block">Day Title</label>
                                    <input
                                        type="text"
                                        placeholder="Nagarkot Sunrise & Transfer"
                                        {...register("itineraryTitle")}
                                        className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                                    />
                                    {errors.itineraryTitle && (
                                        <p className="text-xs font-medium text-red-500 mt-1">{errors.itineraryTitle.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">Description</label>
                                <textarea
                                    placeholder="Early morning drive to Nagarkot. Witness the breathtaking sunrise..."
                                    {...register("itineraryDesc")}
                                    className="min-h-20 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 resize-none"
                                />
                                {errors.itineraryDesc && (
                                    <p className="text-xs font-medium text-red-500 mt-1">{errors.itineraryDesc.message}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">Target Activities</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g., Mountain sunrise, Village walk..."
                                        {...register("activityValue")}
                                        onKeyDown={handleActivityKeyDown}
                                        className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addActivity()}
                                        className="rounded-3xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors active:scale-[0.98] cursor-pointer"
                                    >
                                        Add
                                    </button>
                                </div>
                                {errors.activityValue && (
                                    <p className="text-xs font-medium text-red-500 mt-1">{errors.activityValue.message}</p>
                                )}

                                {activities.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {activities.map((act, index) => (
                                            <div key={index} className="inline-flex items-center gap-1 rounded-full bg-emerald-100/60 px-2.5 py-0.5 text-xs font-medium text-emerald-950">
                                                <span>{act}</span>
                                                <button type="button" onClick={() => removeActivity(index)} className="text-emerald-700 hover:text-emerald-950 font-bold ml-0.5">×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={addItineraryDay}
                                className="w-full text-center border border-emerald-600 text-emerald-700 font-semibold text-sm rounded-2xl py-2.5 hover:bg-emerald-50 transition-colors cursor-pointer"
                            >
                                + Confirm and Save This Day
                            </button>
                        </div>

                        {itineraries.length > 0 && (
                            <div className="space-y-3 pt-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled Timeline View</p>
                                <div className="space-y-3">
                                    {itineraries.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4 border border-slate-100 rounded-2xl p-4 bg-white shadow-sm">
                                            <div className="bg-emerald-700 text-white font-black text-sm h-9 w-9 rounded-xl flex items-center justify-center shrink-0">
                                                D{item.day}
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h4>
                                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                                                {item.activities.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 pt-1.5">
                                                        {item.activities.map((a, i) => (
                                                            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md">✓ {a}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeItineraryDay(idx)}
                                                className="text-slate-400 hover:text-red-500 text-sm p-1"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <hr className="border-emerald-100/60" />

                    {/* SECTION 3: DEPARTURES */}
                    <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-bold text-slate-950">3. Tour Departures</h3>

                        {errors.departures && (
                            <p className="text-xs font-semibold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                                {errors.departures.message}
                            </p>
                        )}

                        <div className="grid gap-4 sm:grid-cols-3 items-end bg-emerald-50/20 border border-emerald-100/60 p-4 rounded-3xl">
                            <div className="space-y-1">
                                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">Departure Date</label>
                                <input
                                    type="date"
                                    {...register("depDate")}
                                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none focus:border-emerald-300"
                                />
                                {errors.depDate && (
                                    <p className="text-xs font-medium text-red-500 mt-1">{errors.depDate.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs sm:text-sm font-semibold text-slate-800 block">Total Capacity</label>
                                <input
                                    type="number"
                                    {...register("depSeats", { valueAsNumber: true })}
                                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none focus:border-emerald-300"
                                />
                                {errors.depSeats && (
                                    <p className="text-xs font-medium text-red-500 mt-1">{errors.depSeats.message}</p>
                                )}
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={addDeparture}
                                    className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                                >
                                    Add Departure
                                </button>
                            </div>
                        </div>

                        {departures.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {departures.map((dep, index) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center gap-3 rounded-2xl border border-emerald-200/60 bg-emerald-50/70 pl-4 pr-2 py-2 text-xs sm:text-sm text-emerald-900 font-medium shadow-sm"
                                    >
                                        <div>
                                            <span className="font-bold text-slate-950 block">
                                                {dep.date.toLocaleDateString()}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-normal">Seats Available: {dep.availableSeats}/{dep.totalSeats}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeDeparture(index)}
                                            className="h-5 w-5 bg-emerald-200/60 hover:bg-red-200 hover:text-red-900 rounded-full flex items-center justify-center transition-colors focus:outline-none"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Main Component Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:bg-emerald-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isSubmitting ? "Processing..." : "Complete Package Setup"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}