import mongoose from "mongoose";
import { z } from "zod";

// Booking Schema
export const bookingSchema = z.object({
    userId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    packageId: z
        .instanceof(mongoose.Types.ObjectId),
    fullName: z
        .string("Full name is required.")
        .nonempty("Full name is required.")
        .min(5, "Full name must be at least 5 characters."),
    email: z
        .string("Email is required.")
        .nonempty("Email is required.")
        .email("Invalid email address."),
    phoneNumber: z
        .string("Phone number is required.")
        .nonempty("Phone number is required.")
        .length(10, "Phone number must be exactly 10 digits.")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    travelDate: z
        .coerce.date("Date is required."),
    noOfTravellers: z
        .number()
        .default(1),
    isGuest: z
        .boolean()
        .default(false),
    specialRequest: z
        .string()
        .optional(),
    travelStatus: z
        .enum(["pending", "confirmed", "in-progress", "completed", "cancelled"])
        .default("pending"),
});
export type bookingType = z.infer<typeof bookingSchema>;