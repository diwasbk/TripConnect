import { bookingCancelType, bookingType } from "../schemas/booking.schema";
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

// Get All Bookings By Status And Guest Type
export const getAllBookingsByStatusAndGuestType = async (status: string, isGuest: boolean, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.BOOKING.GET_ALL_BY_STATUS_AND_GUEST_TYPE(status, isGuest, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch bookings!");
    };
};

// Get Booking By Booking Id
export const getBookingByBookingId = async (bookingId: string) => {
    try {
        const response = await axiosInstance.get(API.BOOKING.GET_BY_BOOKING_ID(bookingId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch booking!");
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

// Get All Bookings By Package Id
export const getAllBookingsByPackageId = async (packageId: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.BOOKING.GET_ALL_BY_PACKAGE_ID(packageId, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch bookings!");
    };
};

// Get All Bookings By User Id
export const getAllBookingsByUserId = async (userId: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.BOOKING.GET_ALL_BY_USER_ID(userId, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch bookings!");
    };
};

// Update Booking Details By Booking ID
export const updateBookingDetailsByBookingId = async (bookingId: string, data: bookingType) => {
    try {
        const response = await axiosInstance.put(API.BOOKING.UPDATE_DETAILS_BY_ID(bookingId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update booking!");
    };
};

// Update Booking's Travel Status By Booking ID
export const updateBookingStatusByBookingId = async (bookingId: string, status: string) => {
    try {
        const response = await axiosInstance.patch(API.BOOKING.UPDATE_STATUS_BY_ID(bookingId, status));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update booking status!");
    };
};

// Delete Booking By Booking ID
export const deleteBookingByBookingId = async (bookingId: string) => {
    try {
        const response = await axiosInstance.delete(API.BOOKING.DELETE_BY_ID(bookingId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete booking!");
    };
};

// Cancel Booking By Booking ID And Cancellation Reason
export const cancelBookingByBookingIdAndCancellationReason = async (bookingId: string, data: bookingCancelType) => {
    try {
        const response = await axiosInstance.patch(API.BOOKING.CANCEL_BY_ID_AND_CANCELLATION_REASON(bookingId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to cancel booking!");
    };
};