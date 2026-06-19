import z from "zod";

// PromoCode Schema
export const promoCodeSchema = z.object({
    code: z
        .string("Promocode is required.")
        .nonempty("Promocode is required.")
        .toUpperCase()
        .trim()
});
export type promoCodeType = z.infer<typeof promoCodeSchema>;