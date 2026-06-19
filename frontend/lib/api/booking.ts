import { bookingType } from "../schemas/booking.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Create Booking By Package ID
export const createBookingByPackageId = async (packageId: string, data: bookingType) => {
    try {
        const response = await axiosInstance.post(API.BOOKING.CREATE_BY_PACKAGE_ID(packageId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to create booking!");
    };
};

// Get Booking By Booking Reference
export const getBookingByBookingReference = async (bookingReference: string) => {
    try {
        const response = await axiosInstance.get(API.BOOKING.GET_BY_BOOKING_REFERENCE(bookingReference));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch booking summary!");
    };
};

// Get All Bookings By User Id
export const getAllBookingsByUserId = async (userId: string) => {
    try {
        const response = await axiosInstance.get(API.BOOKING.GET_BY_USER_ID(userId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch bookings!");
    };
};