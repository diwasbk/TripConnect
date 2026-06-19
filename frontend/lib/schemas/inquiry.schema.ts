import z from "zod"

/* Send Inquiry Schema */
export const inquirySchema = z.object({
    fullName: z
        .string()
        .nonempty("Full name is required.")
        .min(6, "Full name must be at least 6 characters"),
    email: z
        .string()
        .nonempty("Email is required.")
        .email({ message: "Invalid email." }),
    phoneNumber: z
        .string()
        .nonempty("Phone number is required.")
        .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
    message: z
        .string()
        .nonempty("Message is required.")
        .min(10, "Message must be at least 10 characters"),
    reply: z
        .string().optional()
});
export type inquiryType = z.infer<typeof inquirySchema>;


/* Inquiry Reply Schema */
export const inquiryReplySchema = z.object({
    reply: z
        .string("Reply Message is required.")
        .nonempty("Reply Message is required.")
        .min(10, "Reply Message must be at least 10 characters")
});
export type inquiryReplyType = z.infer<typeof inquiryReplySchema>;