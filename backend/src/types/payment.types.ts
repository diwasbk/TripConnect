import mongoose from "mongoose";
import { z } from "zod";

/* Payment Schema */
export const paymentSchema = z.object({
    bookingId: z
        .instanceof(mongoose.Types.ObjectId, {
            message: "Booking ID is required."
        }),
    packageId: z
        .instanceof(mongoose.Types.ObjectId, {
            message: "Package ID is required."
        }),
    promoCodeId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    originalAmount: z
        .number("Original ammount is required.")
        .min(0, "Original amount cannot be negative."),
    discountPercentage: z
        .number()
        .min(0, "Discount percentage cannot be negative.")
        .default(0),
    discountAmount: z
        .number()
        .min(0, "Discount amount cannot be negative.")
        .default(0),
    finalAmount: z
        .number("Payment amount is required.")
        .min(0, "Payment amount cannot be negative."),
    paymentMethod: z
        .enum(["cash", "esewa", "khalti", "others"])
        .default("esewa"),
    paymentStatus: z
        .enum(["pending", "completed", "failed"])
        .default("pending"),
});
export type paymentType = z.infer<typeof paymentSchema>;