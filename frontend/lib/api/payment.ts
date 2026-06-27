import axiosInstance from "./axios";
import API from "./endpoint";

// Get All Payments By Status
export const getAllPaymentsByStatus = async (paymentStatus: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.PAYMENT.GET_ALL_BY_STATUS(paymentStatus, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch payments!");
    };
};

// Get Payment By ID
export const getPaymentById = async (paymentId: string) => {
    try {
        const response = await axiosInstance.get(API.PAYMENT.GET_BY_ID(paymentId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch payment!");
    };
};

// Update Payment Status By ID
export const updatePaymentStatusById = async (paymentId: string, paymentStatus: string) => {
    try {
        const response = await axiosInstance.patch(API.PAYMENT.UPDATE_BY_STATUS(paymentId, paymentStatus));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update payment status!");
    };
};

// Initialize Esewa Payment By ID
export const initializeEsewaPaymentById = async (paymentId: string) => {
    try {
        const response = await axiosInstance.post(API.PAYMENT.INITIALIZE_ESEWA_BY_ID(paymentId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to initialize Esewa payment!");
    };
};

// Verify Esewa Payment
export const verifyEsewaPayment = async (data: string) => {
    try {
        const response = await axiosInstance.get(API.PAYMENT.VERIFY_ESEWA(data));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to verify Esewa payment!");
    };
};