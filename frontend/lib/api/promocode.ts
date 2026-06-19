import { promoCodeType } from "../schemas/promocode.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Apply promo code to a payment using payment ID
export const applyPromoCodeByPaymentId = async (paymentId: string, data: promoCodeType) => {
    try {
        const response = await axiosInstance.put(API.PROMOCODE.APPLY_BY_PAYMENT_ID(paymentId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to apply promocode!");
    };
};