import { z } from "zod";

// Subscriber Schema
export const subscriberSchema = z.object({
    email: z
        .string("Email is required.")
        .nonempty("Email is required.")
        .email({ message: "Invalid email." }),
    status: z
        .enum(["subscribed", "unsubscribed"])
        .default("subscribed")
});
export type subscriberType = z.infer<typeof subscriberSchema>;