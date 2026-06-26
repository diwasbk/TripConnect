import { createBookingByPackageId, getAllBookingsByStatusAndGuestType, getBookingByBookingId, getBookingByBookingReference, getAllBookingsByPackageId, getAllBookingsByUserId, updateBookingDetailsByBookingId, updateBookingStatusByBookingId, deleteBookingByBookingId } from "../api/booking";
import { bookingType } from "../schemas/booking.schema";

// Handle Create Booking By Package ID
export const handleCreateBookingByPackageId = async (packageId: string, data: bookingType) => {
    try {
        const result = await createBookingByPackageId(packageId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to create booking!",
                success: false
            };
        };

        return {
            message: result.message || "Booking created successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to create booking!",
            success: false
        };
    };
};

// Handle Get All Bookings By Status And Guest Type
export const handleGetAllBookingsByStatusAndGuestType = async (status: string, isGuest: boolean, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllBookingsByStatusAndGuestType(status, isGuest, page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch bookings!",
                success: false
            };
        };

        return {
            message: result.message || "Bookings fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch bookings!",
            success: false
        };
    };
};

// Handle Get Booking By Booking ID
export const handleGetBookingByBookingId = async (bookingId: string) => {
    try {
        const result = await getBookingByBookingId(bookingId);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch booking!",
                success: false
            };
        };

        return {
            message: result.message || "Booking fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch booking!",
            success: false
        };
    };
};

// Handle Get Booking By Booking Reference
export const handleGetBookingByBookingReference = async (bookingReference: string) => {
    try {
        const result = await getBookingByBookingReference(bookingReference);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch booking!",
                success: false
            };
        };

        return {
            message: result.message || "Booking fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch booking!",
            success: false
        };
    };
};

// Handle Get All Bookings By Package ID
export const handleGetAllBookingsByPackageId = async (packageId: string, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllBookingsByPackageId(packageId, page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch bookings!",
                success: false
            };
        };

        return {
            message: result.message || "Bookings fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch bookings!",
            success: false
        };
    };
};

// Handle Get All Bookings By User ID
export const handleGetAllBookingsByUserId = async (userId: string, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllBookingsByUserId(userId, page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch bookings!",
                success: false
            };
        };

        return {
            message: result.message || "Bookings fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch bookings!",
            success: false
        };
    };
};

// Handle Update Booking Details By Booking ID
export const handleUpdateBookingDetailsByBookingId = async (bookingId: string, data: bookingType) => {
    try {
        const result = await updateBookingDetailsByBookingId(bookingId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to update booking!",
                success: false
            };
        };

        return {
            message: result.message || "Booking updated successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update booking!",
            success: false
        };
    };
};

// Handle Update Booking Status By Booking ID
export const handleUpdateBookingStatusByBookingId = async (bookingId: string, status: string) => {
    try {
        const result = await updateBookingStatusByBookingId(bookingId, status);

        if (!result.success) {
            return {
                message: result.message || "Failed to update booking status!",
                success: false
            };
        };

        return {
            message: result.message || "Booking status updated successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update booking status!",
            success: false
        };
    };
};

// Handle Delete Booking By Booking ID
export const handleDeleteBookingByBookingId = async (bookingId: string) => {
    try {
        const result = await deleteBookingByBookingId(bookingId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete booking!",
                success: false
            };
        };

        return {
            message: result.message || "Booking deleted successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete booking!",
            success: false
        };
    };
};