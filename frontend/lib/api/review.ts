import { giveRatingType, giveReviewType } from "../schemas/review.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Give Review To a Package
export const giveReviewToPackage = async (packageId: string, data: giveReviewType) => {
    try {
        const response = await axiosInstance.patch(API.REVIEW.GIVE_REVIEW_BY_PACKAGE_ID(packageId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to submit review!");
    };
};

// Give or Update Rating To a Package
export const giveRatingToPackage = async (packageId: string, data: giveRatingType) => {
    try {
        const response = await axiosInstance.patch(API.REVIEW.GIVE_RATING_BY_PACKAGE_ID(packageId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to submit rating!");
    };
};

// Get All Reviews
export const getAllReviews = async (page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.REVIEW.GET_ALL(page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch reviews!");
    };
};

// Get All Reviews By Package ID
export const getAllReviewsByPackageId = async (packageId: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.REVIEW.GET_ALL_BY_PACKAGE_ID(packageId, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch reviews!");
    };
};

// Get Average Rating By Package ID
export const getAverageRatingByPackageId = async (packageId: string) => {
    try {
        const response = await axiosInstance.get(API.REVIEW.GIVE_RATING_BY_PACKAGE_ID(packageId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch everage rating!");
    };
};

// Delete Review BY Review ID
export const deleteReviewByReviewId = async (reviewId: string) => {
    try {
        const response = await axiosInstance.delete(API.REVIEW.DELETE_BY_ID(reviewId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete review!");
    };
};