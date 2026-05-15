import z from "zod";

// PromoCode Schema
export const promoCodeSchema = z.object({
    code: z
        .string("Promocode is required.")
        .nonempty("Promocode is required.")
        .toUpperCase()
        .trim(),
    description: z
        .string("Description is required.")
        .nonempty("Description is required.")
        .min(10, "Description must be at least 10 characters long."),
    discountPercentage: z
        .number()
        .min(0, "Discount percentage cannot be negative.")
        .default(0),
    expiresAt: z
        .coerce.date("Expire Date is required."),
    isActive: z
        .boolean()
        .default(true),
});
export type promoCodeType = z.infer<typeof promoCodeSchema>;