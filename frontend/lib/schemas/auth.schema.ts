import { z } from "zod";

// Signup Schema
export const signupSchema = z.object({
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
        .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z
        .string()
        .nonempty("Password is required.")
        .min(6, "Password must be at least 6 characters."),
    confirmPassword: z
        .string()
        .nonempty("Confirm password is required."),
    termsAgreed: z
        .boolean("You must agree to the rules and regulations.")
        .refine((val) => val === true, "You must agree to the rules and regulations."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
});
export type signupType = z.infer<typeof signupSchema>;

// Login Schema
export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required.")
        .email({ message: "Invalid email." }),
    password: z
        .string()
        .nonempty("Password is required.")
        .min(6, "Password must be at least 6 characters."),
});
export type loginType = z.infer<typeof loginSchema>;

/* Change Password Schema */
export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .nonempty("Current Password is required."),
    newPassword: z
        .string()
        .nonempty("New Password is required.")
        .min(6, "Password must be at least 6 characters."),
    confirmPassword: z
        .string()
        .nonempty("Confirm Password is required."),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});
export type changePasswordType = z.infer<typeof changePasswordSchema>;

/* Request Password Reset Email Schema */
export const requestPasswordResetEmailSchema = z.object({
    email: z
        .string("Email is required.")
        .nonempty("Email is required.")
        .email({ message: "Invalid email." })
});
export type requestPasswordResetEmaiType = z.infer<typeof requestPasswordResetEmailSchema>;

/* Reset Passsword Schema */
export const resetPasswordSchema = z.object({
    token: z
        .string("Token is required."),
    newPassword: z
        .string("New password is required.")
        .nonempty("New password is required.")
        .min(6, "New password must be at least 6 characters."),
    confirmPassword: z
        .string("Confirm Password is required.")
        .nonempty("Confirm Password is required."),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});
export type resetPassswordType = z.infer<typeof resetPasswordSchema>;

// Delete Account Schema
export const deleteAccountSchema = z.object({
    password: z
        .string()
        .nonempty("Password is required.")
        .min(6, "Password must be at least 6 characters."),
});
export type deleteAccountType = z.infer<typeof deleteAccountSchema>;