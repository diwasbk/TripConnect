import { z } from "zod";

// Gallery Schema
export const gallerySchema = z.object({
    title: z
        .string("Title is required.")
        .nonempty("Title is required.")
        .min(5, "Title must be at least 5 characters."),
    caption: z
        .string("Caption is required.")
        .nonempty("Caption is required.")
        .min(10, "Caption must be at least 10 characters."),
    coverPhotoUrl: z
        .string("Cover Photo is required.")
        .nonempty("Cover Photo is required.")
        .url("Invalid photo URL."),
    photoUrls: z
        .array(
            z.string().url("Invalid photo URL.")
        )
        .min(1, "At least one photo is required."),
    isActive: z
        .boolean()
        .default(true)
});
export type galleryType = z.infer<typeof gallerySchema>;