import { z } from "zod";

// User Schema
export const userSchema = z.object({
    fullName: z
        .string()
        .nonempty("Full name is required.")
        .min(5, "Full name must be at least 5 characters."),
    email: z
        .string()
        .nonempty("Email is required.")
        .email({ message: "Invalid email." }),
    phoneNumber: z
        .string()
        .nonempty("Phone number is required.")
        .length(10, "Phone number must be exactly 10 digits.")
        .regex(/^\d+$/, "Phone number must contain only digits")
});
export type userType = z.infer<typeof userSchema>;