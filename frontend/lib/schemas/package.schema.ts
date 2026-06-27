import { z } from "zod";

/* Package Basic Info Schema */
export const packageBasicInfoSchema = z.object({
    title: z
        .string("Title is required")
        .nonempty("Title is required")
        .min(5, "Title must be at least 5 characters."),
    destination: z
        .string("Destination is required")
        .nonempty("Destination is required")
        .min(5, "Destination must be at least 5 characters."),
    intro: z
        .string("Intro is required.")
        .nonempty("Intro is required.")
        .min(10, "Intro must be at least 10 characters."),
    description: z
        .string("Description is required.")
        .nonempty("Description is required.")
        .min(20, "Description must be at least 20 characters."),
    duration: z
        .string("Duration is required.")
        .nonempty("Duration is required."),
    price: z
        .number("Price is required.")
        .min(0, "Price cannot be negative."),
    includes: z
        .array(
            z.string().min(2, "Include item is too short.")
        )
        .min(1, "At least one include item is required.")
});
export type packageBasicInfoType = z.infer<typeof packageBasicInfoSchema>;


/* Departure Schema */
export const departureSchema = z.object({
    date: z.coerce.date("Date is required."),
    totalSeats: z
        .number("Total seats is required.")
        .min(1, "Total seats must be at least 1."),
    availableSeats: z
        .number("Available seats is required.")
        .min(0, "Available seats cannot be negative.")
});
export type departureType = z.infer<typeof departureSchema>;

/* Itinerary Schema */
export const itinerarySchema = z.object({
    day: z.number("Day is required."),
    title: z
        .string("Title is required.")
        .min(5, "Title must be at least 5 characters."),
    description: z
        .string("Description is required.")
        .min(20, "Description must be at least 20 characters."),
    activities: z
        .array(z.string().min(2, "Activity must be at least 2 characters."))
        .min(1, "At least one activity is required.")
});
export type itineraryType = z.infer<typeof itinerarySchema>;

/* Package Details Schema */
export const packageDetailsSchema = z.object({
    itinerary: z
        .array(itinerarySchema)
        .min(1, "At least one itinerary day is required."),
    departures: z
        .array(departureSchema)
        .min(1, "At least one departure batch is required.")
});
export type packageDetailsType = z.infer<typeof packageDetailsSchema>;

/* Intermediate Validation Schemas for Inputs */
export const itineraryInputSchema = z.object({
    dayInput: z.coerce
        .number("Day is required.")
        .min(1, "Day must be at least 1."),
    itineraryTitle: z
        .string("Title is required.")
        .min(5, "Title must be at least 5 characters."),
    itineraryDesc: z
        .string("Description is required.")
        .min(20, "Description must be at least 20 characters."),
});

export const departureInputSchema = z.object({
    depDate: z.string().min(1, "Departure date is required."),
    depSeats: z.coerce
        .number("Total capacity is required.")
        .min(1, "Total capacity must be at least 1."),
});

/* Photo Upload Schema */
export const photoUploadSchema = z.object({
    myfile: z
        .instanceof(File, { message: "Please select an image to upload." })
        .refine(
            (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
            "We only support .jpg, .jpeg, and .png formats."
        )
        .refine(
            (file) => file.size <= 1 * 1024 * 1024,
            "This image is too heavy (Max 1MB). Please try a smaller one."
        )
});