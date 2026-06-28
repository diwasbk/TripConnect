import { z } from "zod";

// Booking Schema
export const bookingSchema = z.object({
    fullName: z
        .string()
        .nonempty("Full name is required.")
        .min(5, "Full name must be at least 5 characters."),
    email: z
        .string()
        .nonempty("Email is required.")
        .email("Invalid email address."),
    phoneNumber: z
        .string()
        .nonempty("Phone number is required.")
        .length(10, "Phone number must be exactly 10 digits.")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    travelDate: z
        .string()
        .nonempty("Travel date is required."),
    noOfTravelers: z
        .number("Number of travelers is required.")
        .min(1, {
            message: "At least 1 traveler is required."
        }),
    specialRequest: z
        .string()
        .optional()
});
export type bookingType = z.infer<typeof bookingSchema>;

// Cancel Booking Schema
export const bookingCancelSchema = z.object({
    cancellationReason: z
        .string("Cancellation reason is required.")
        .nonempty("Cancellation reason is required.")
        .min(5, "Cancellation reason must be at least 5 characters."),
});
export type bookingCancelType = z.infer<typeof bookingCancelSchema>;