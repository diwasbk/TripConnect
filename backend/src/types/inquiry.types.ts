import z from "zod"

/* Send Inquiry Schema */
export const inquirySchema = z.object({
    fullName: z.string("Full name is required.").nonempty("Full name is required.").min(6, "Full name must be at least 6 characters"),
    email: z.string("Email is required.").nonempty("Email is required.").email({ message: "Invalid email." }),
    phoneNumber: z.string("Phone number is required.").nonempty("Phone number is required.").regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
    message: z.string("Message is required.").nonempty("Message is required.").min(10, "Message must be at least 10 characters"),
    status: z.enum(["pending", "replied"]).default("pending"),
    reply: z.string().optional()
});
export type inquiryType = z.infer<typeof inquirySchema>;


/* Inquiry Reply Schema */
export const inquiryReplySchema = z.object({
    reply: z.string("Reply Message is required.").nonempty("Reply Message is required.").min(10, "Reply Message must be at least 10 characters")
});
export type inquiryReplyType = z.infer<typeof inquiryReplySchema>;