import { deleteReviewByReviewId, getAllReviews, getAllReviewsByPackageId, getAverageRatingByPackageId, giveRatingToPackage, giveReviewToPackage } from "../api/review";
import { giveRatingType, giveReviewType } from "../schemas/review.schema";

// Handle Give Review To a Package
export const handleGiveReviewToPackage = async (packageId: string, data: giveReviewType) => {
    try {
        const result = await giveReviewToPackage(packageId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to submit review!",
                success: false
            };
        };

        return {
            message: result.message || "Review saved successfully",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to submit review!",
            success: false
        };
    };
};

// Handle Give or Update Rating To a Package
export const handleGiveRatingToPackage = async (packageId: string, data: giveRatingType) => {
    try {
        const result = await giveRatingToPackage(packageId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to submit rating!",
                success: false
            };
        };

        return {
            message: result.message || "Rating saved successfully",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to submit rating!",
            success: false
        };
    };
};

// Handle Get All Reviews
export const handleGetAllReviews = async (page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllReviews(page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch review!",
                success: false
            };
        };

        return {
            message: result.message || "Review fetched successfully",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch review!",
            success: false
        };
    };
};

// Handle Get All Reviews By Package ID
export const handleGetAllReviewsByPackageId = async (packageId: string, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllReviewsByPackageId(packageId, page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch review!",
                success: false
            };
        };

        return {
            message: result.message || "Review fetched successfully",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch review!",
            success: false
        };
    };
};

// Handle Get Average Rating By Package ID
export const handleGetAverageRatingByPackageId = async (packageId: string) => {
    try {
        const result = await getAverageRatingByPackageId(packageId);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch rating!",
                success: false
            };
        };

        return {
            message: result.message || "Rating fetched successfully",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch rating!",
            success: false
        };
    };
};

// Handle Delete Review BY Review ID
export const handleDeleteReviewByReviewId = async (reviewId: string) => {
    try {
        const result = await deleteReviewByReviewId(reviewId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delte review!",
                success: false
            };
        };

        return {
            message: result.message || "Review deleted successfully",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete review!",
            success: false
        };
    };
};