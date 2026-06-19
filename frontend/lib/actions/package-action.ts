import { getLivePackages, getPackagesBySlug, getPackagesByStatus, getTopBookedPackages } from "../api/package";

// Handle Get Packages By Status
export const handleGetPackagesByStatus = async (status: string) => {
    try {
        const result = await getPackagesByStatus(status);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch packages",
                success: false
            };
        };

        return {
            message: result.message || "Packages fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch packages!",
            success: false
        };
    };
};

// Handle Get Packages By Slug
export const handleGetPackagesBySlug = async (slug: string) => {
    try {
        const result = await getPackagesBySlug(slug);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch packages",
                success: false
            };
        };

        return {
            message: result.message || "Packages fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch packages!",
            success: false
        };
    };
};

// Handle Get Live Packages
export const handleGetLivePackages = async (page: number = 1) => {
    try {
        const result = await getLivePackages(page);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch packages",
                success: false
            };
        };

        return {
            message: result.message || "Packages fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch packages!",
            success: false,
            pagination: null
        };
    };
};

// Handle Get Top Booked Packages
export const handleGetTopBookedPackages = async () => {
    try {
        const result = await getTopBookedPackages();

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch packages",
                success: false
            };
        };

        return {
            message: result.message || "Packages fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch packages!",
            success: false,
            pagination: null
        };
    };
};