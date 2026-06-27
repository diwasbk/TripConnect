import { applyPromoCodeType, promoCodeType } from "../schemas/promocode.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Create promo code
export const createPromoCode = async ( data: promoCodeType) => {
    try {
        const response = await axiosInstance.post(API.PROMOCODE.CREATE, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to create promocode!");
    };
};

// Apply promo code to a payment using payment ID
export const applyPromoCodeByPaymentId = async (paymentId: string, data: applyPromoCodeType) => {
    try {
        const response = await axiosInstance.put(API.PROMOCODE.APPLY_BY_PAYMENT_ID(paymentId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to apply promocode!");
    };
};

// Get All Promo Code By Status
export const getAllPromoCodeByStatus = async (isActive: boolean, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.PROMOCODE.GET_BY_STATUS(isActive, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to apply promocode!");
    };
};

// Get All Promo Code By Promo Code ID
export const getPromoCodeByPromoCodeId = async (promoCodeId: string) => {
    try {
        const response = await axiosInstance.get(API.PROMOCODE.GET_BY_ID(promoCodeId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch promocode!");
    };
};

// Activate or Deactivate Promo Code By  Promo Code ID
export const activateOrDeactivatePromoCodeByPromoCodeId = async (promocodeId: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.patch(API.PROMOCODE.ACTIVATE_OR_DEACTIVATE_BY_ID(promocodeId, isActive));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update promocode status!");
    };
};

// Update Promo Code By  Promo Code ID
export const updatePromoCodeByPromoCodeId = async (promoCodeId: string, data: applyPromoCodeType) => {
    try {
        const response = await axiosInstance.put(API.PROMOCODE.UPDATE_BY_ID(promoCodeId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update promocode!");
    };
};

// Delete Promo Code By Promo Code ID
export const deletePromoCodeByPromoCodeId = async (paymentId: string) => {
    try {
        const response = await axiosInstance.delete(API.PROMOCODE.DELETE_BY_ID(paymentId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete promocode!");
    };
};