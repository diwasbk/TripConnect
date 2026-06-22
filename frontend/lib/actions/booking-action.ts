import { createBookingByPackageId, getAllBookingsByUserId, getBookingByBookingReference } from "../api/booking";
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

// Handle Get All Bookings By User Id
export const handleGetAllBookingsByUserId = async (userId: string, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllBookingsByUserId(userId, page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch booking!",
                success: false
            };
        };

        return {
            message: result.message || "Booking fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch booking!",
            success: false
        };
    };
};