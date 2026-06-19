import { applyPromoCodeByPaymentId } from "../api/promocode";
import { promoCodeType } from "../schemas/promocode.schema";

// Handle Apply promo code to a payment using payment ID
export const handleApplyPromoCodeByPaymentId  = async (paymentId: string, data: promoCodeType) => {
    try {
        const result = await applyPromoCodeByPaymentId(paymentId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to apply promocode!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode applied successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to apply promocode!",
            success: false
        };
    };
};