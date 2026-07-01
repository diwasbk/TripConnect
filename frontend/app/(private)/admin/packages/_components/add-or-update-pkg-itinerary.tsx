"use client";
import { handleAddPackageItineraryByPackageId, handleUpdatePackageItineraryByItineraryId } from "@/lib/actions/package-action";
import { itinerarySchema, itineraryType } from "@/lib/schemas/package.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddOrUpdateItinerarySection({ packageId, itineraryId, itinerary, onSuccess }: { packageId: string, itineraryId: string, itinerary: any, onSuccess: any }) {
    const router = useRouter();

    // Initialize activities state directly from the itinerary prop if available
    const [activities, setActivities] = useState<string[]>(itinerary?.activities || []);
    const [activityValue, setActivityValue] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<itineraryType>({
        resolver: zodResolver(itinerarySchema),
        // Directly map passed prop configurations into the form's initial values
        defaultValues: {
            day: itinerary?.day ?? undefined,
            title: itinerary?.title || "",
            description: itinerary?.description || "",
            activities: itinerary?.activities || [],
        }
    });

    // Reset form values if the itinerary prop changes down the line
    useEffect(() => {
        if (itinerary) {
            reset({
                day: itinerary.day,
                title: itinerary.title || "",
                description: itinerary.description || "",
                activities: itinerary.activities || [],
            });
            setActivities(itinerary.activities || []);
        }
    }, [itinerary, reset]);

    // Register dynamic array field
    useEffect(() => {
        register("activities");
    }, [register]);

    const updateActivitiesInForm = (newActivities: string[]) => {
        setActivities(newActivities);
        setValue("activities", newActivities, { shouldValidate: true });
    };

    const addActivity = () => {
        if (!activityValue.trim()) return;
        const updated = [...activities, activityValue.trim()];
        updateActivitiesInForm(updated);
        setActivityValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addActivity();
        }
    };

    const removeActivity = (index: number) => {
        const updated = activities.filter((_, i) => i !== index);
        updateActivitiesInForm(updated);
    };

    const onSubmit = async (data: itineraryType) => {
        try {
            let res;

            if (itineraryId) {
                // Calls Update Action matching its (packageId, itineraryId, data) signature
                res = await handleUpdatePackageItineraryByItineraryId(packageId, itineraryId, data);

            } else {
                // Calls Create Action matching its (packageId, data) signature
                res = await handleAddPackageItineraryByPackageId(packageId, data);
            }

            if (!res.success) {
                throw new Error(res.message);
            }

            toast.success(res.message);

            reset();
            setActivities([]);

            // close form
            onSuccess();

        } catch (err: any) {
            toast.error(err.message || "An unexpected error occurred while saving.");
        }
    };

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-5 sm:py-6 md:px-6 md:py-6 lg:px-6 lg:py-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-4xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10 max-w-2xl md:max-w-none"
            >
                <div className="mb-8 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        TripConnect Timeline
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        {itineraryId ? "Edit Itinerary Day" : "Add Itinerary Day"}
                    </h2>
                    <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                        Outline the structured daily events, key sights, and specific excursions built out for this day plan.
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Day + Title */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2 sm:col-span-1">
                            <label htmlFor="day" className="text-sm font-semibold text-slate-800">
                                Day Number
                            </label>
                            <input
                                {...register("day", { valueAsNumber: true })}
                                id="day"
                                type="number"
                                placeholder="3"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.day && (
                                <p className="text-xs font-medium text-red-500">{errors.day.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <label htmlFor="title" className="text-sm font-semibold text-slate-800">
                                Itinerary Title
                            </label>
                            <input
                                {...register("title")}
                                id="title"
                                type="text"
                                placeholder="Nagarkot Sunrise & Transfer"
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            {errors.title && (
                                <p className="text-xs font-medium text-red-500">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-semibold text-slate-800">Description</label>
                        <textarea
                            {...register("description")}
                            id="description"
                            placeholder="Early morning drive to Nagarkot. Witness the breathtaking sunrise over the Himalayas..."
                            className="min-h-28 w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100 resize-none"
                        />
                        {errors.description && (
                            <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Activities Section */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-800">Activities</label>

                        <div className="flex gap-2">
                            <input
                                value={activityValue}
                                onChange={(e) => setActivityValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="e.g., Mountain sunrise, Village walk..."
                                className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            <button
                                type="button"
                                onClick={addActivity}
                                className="rounded-2xl bg-emerald-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 cursor-pointer"
                            >
                                Add
                            </button>
                        </div>
                        {errors.activities && (
                            <p className="text-xs font-medium text-red-500">{errors.activities.message}</p>
                        )}

                        {activities.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {activities.map((item, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 border border-emerald-100"
                                    >
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeActivity(index)}
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
                        {itineraryId ? "Update Itinerary Day" : "Save Itinerary Day"}
                    </button>
                </div>
            </form>
        </main>
    );
}