import { z } from "zod";

// Gallery Schema
export const gallerySchema = z.object({
    title: z
        .string()
        .nonempty("Title is required.")
        .min(5, "Title must be at least 5 characters."),
    caption: z
        .string()
        .nonempty("Caption is required.")
        .min(10, "Caption must be at least 10 characters.")
});
export type galleryType = z.infer<typeof gallerySchema>;

// Delete Gallery Photo Schema
export const deleteGalleryPhotoSchema = z.object({
    photoUrl: z
        .string()
        .nonempty("Photo URL is required.")
        .url("Invalid photo URL.")
});
export type deleteGalleryPhotoType = z.infer<typeof deleteGalleryPhotoSchema>;
