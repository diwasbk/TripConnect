import { getGalleryBySlug, getGalleryByStatus } from "../api/gallery";

// Handle Get Gallery By Status
export const handleGetGalleryByStatus = async (isActive: boolean) => {
    try {
        const result = await getGalleryByStatus(isActive);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch gallery!",
                success: false
            };
        };

        return {
            message: result.message || "Gallery fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch gallery!",
            success: false
        };
    };
};

// Handle Get Gallery BySlug
export const handleGetGalleryBySlug = async (slug: string) => {
    try {
        const result = await getGalleryBySlug(slug);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch gallery!",
                success: false
            };
        };

        return {
            message: result.message || "Gallery fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch gallery!",
            success: false
        };
    };
};