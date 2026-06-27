import { getBookingSummary, getDashboardSummary, getPackageSummary } from "../api/summary";

// Handle Get Dashboard Summary
export const handleGetDashboardSummary = async () => {
    try {
        const result = await getDashboardSummary();

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch dashboard summary!",
                success: false
            };
        };

        return {
            message: result.message || "Dashboard summary fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch dashboard summary!",
            success: false
        };
    };
};

// Handle Get Package Summary
export const handleGetPackageSummary = async () => {
    try {
        const result = await getPackageSummary();

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch package summary!",
                success: false
            };
        };

        return {
            message: result.message || "Package summary fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch package summary!",
            success: false
        };
    };
};

// Handle Get Booking Summary
export const handleGetBookingSummary = async () => {
    try {
        const result = await getBookingSummary();

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch booking summary!",
                success: false
            };
        };

        return {
            message: result.message || "Booking summary fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch booking summary!",
            success: false
        };
    };
};