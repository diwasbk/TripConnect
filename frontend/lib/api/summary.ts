import axiosInstance from "./axios";
import API from "./endpoint";

// Get Dashboard Summary
export const getDashboardSummary = async () => {
    try {
        const response = await axiosInstance.get(API.SUMMARY.DASHBOARD);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch dashboard summary!");
    };
};

// Get Package Summary
export const getPackageSummary = async () => {
    try {
        const response = await axiosInstance.get(API.SUMMARY.PACKAGE);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch package summary!");
    };
};

// Get Booking Summary
export const getBookingSummary = async () => {
    try {
        const response = await axiosInstance.get(API.SUMMARY.BOOKING);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch booking summary!");
    };
};