import { z } from "zod";

// Signup Schema
export const signupSchema = z.object({
    fullName: z
        .string("Full name is required.")
        .nonempty("Full name is required.")
        .min(5, "Full name must be at least 5 characters."),
    email: z
        .string("Email is required.")
        .nonempty("Email is required.")
        .email({ message: "Invalid email." }),
    phoneNumber: z
        .string("Phone number is required.")
        .nonempty("Phone number is required.")
        .length(10, "Phone number must be exactly 10 digits.")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z
        .string("Password is required.")
        .nonempty("Password is required.")
        .min(6, "Password must be at least 6 characters."),
    confirmPassword: z
        .string("Confirm password is required.")
        .nonempty("Confirm password is required."),
    termsAgreed: z
        .boolean("You must agree to the rules and regulations.")
        .refine((val) => val === true, "You must agree to the rules and regulations."),
    role: z
        .enum(["user", "admin"])
        .default("user")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
});
export type signupType = z.infer<typeof signupSchema>;