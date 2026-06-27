import z from "zod";

// PromoCode Schema
export const promoCodeSchema = z.object({
    code: z
        .string()
        .nonempty("Promocode is required.")
        .toUpperCase()
        .trim(),
    description: z
        .string()
        .nonempty("Description is required.")
        .min(10, "Description must be at least 10 characters long."),
    discountPercentage: z
        .number("Discount percentage is required.")
        .min(0, "Discount percentage cannot be negative.")
        .max(100, "Discount percentage cannot be more than 100%."),
    expiresAt: z
        .string()
        .nonempty("Expire Date is required.")
});
export type promoCodeType = z.infer<typeof promoCodeSchema>;

// Apply PromoCode Schema
export const applyPromoCodeSchema = z.object({
    code: z
        .string("Promocode is required.")
        .nonempty("Promocode is required.")
        .toUpperCase()
        .trim()
});
export type applyPromoCodeType = z.infer<typeof promoCodeSchema>;