import { z } from "zod";

/* Departure Schema */
export const departureSchema = z.object({
    date: z
        .coerce.date("Date is required."),
    totalSeats: z
        .number("Total seats is required.")
        .min(1, "Total seats must be at least 1."),
    availableSeats: z
        .number("Available seats is required.")
        .min(0, "Available seats cannot be negative.")
});

/* Itinerary Schema */
export const itinerarySchema = z.object({
    day: z
        .number("Day is required."),
    title: z
        .string("Title is required.")
        .nonempty("Title is required.")
        .min(5, "Title must be at least 5 characters."),
    description: z
        .string("Description is required.")
        .nonempty("Description is required.")
        .min(20, "Description must be at least 20 characters."),
    activities: z
        .array(
            z.string().min(2, "Activity must be at least 2 characters.")
        )
        .min(1, "At least one activity is required.")
});

/* Package Schema */
export const packageSchema = z.object({
    title: z
        .string("Title is required")
        .nonempty("Title is required")
        .min(5, "Title must be at least 5 characters."),
    slug: z
        .string()
        .optional(),
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
        .min(1, "At least one include item is required."),
    photoUrls: z
        .array(
            z.string().url("Invalid photo URL.")
        )
        .min(1, "At least one photo is required."),
    itinerary: z
        .array(itinerarySchema)
        .default([]),
    departures: z
        .array(departureSchema)
        .default([]),
    totalBookings: z
        .number()
        .optional(),
    status: z
        .enum(["draft", "published"])
        .default("draft"),
    isActive: z
        .boolean()
        .default(true),
});
export type packageType = z.infer<typeof packageSchema>;

// Package Basic Info Schema
export const packageBasicInfoSchema = packageSchema.pick({
    title: true,
    destination: true,
    intro: true,
    description: true,
    duration: true,
    price: true,
    includes: true,
});