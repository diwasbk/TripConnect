import z from "zod";

/* Review Schema */
export const reviewSchema = z.object({
    userId: z.string().optional(),
    packageId: z.string().optional(),
    rating: z
        .number("Rating is required.")
        .min(1, "Rating must be between 1 and 5.")
        .max(5, "Rating must be between 1 and 5."),
    review: z
        .string("Review is required.")
        .nonempty("Review is required.")
        .max(100, "Review cannot exceed 100 characters.")
});

export type reviewType = z.infer<typeof reviewSchema>;