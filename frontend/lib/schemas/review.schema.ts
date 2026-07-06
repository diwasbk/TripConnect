import z from "zod";

/* Give Review Schema */
export const giveReviewSchema = z.object({
    review: z
        .string("Review is required.")
        .nonempty("Review is required.")
        .max(100, "Review cannot exceed 100 characters.")
});
export type giveReviewType = z.infer<typeof giveReviewSchema>;

/* Give Rating Schema */
export const giveRatingSchema = z.object({
    rating: z
        .number("Rating is required.")
        .min(1, "Rating must be between 1 and 5.")
        .max(5, "Rating must be between 1 and 5.")
});
export type giveRatingType = z.infer<typeof giveRatingSchema>;
