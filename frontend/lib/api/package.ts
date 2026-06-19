import axiosInstance from "./axios";
import API from "./endpoint";

// Get Packages By Status
export const getPackagesByStatus = async (status: string) => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.GET_BY_STATUS(status));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch packages!");
    };
};

// Get Package By Slug
export const getPackagesBySlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.GET_BY_SLUG(slug));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch packages!");
    };
};

// Get Live Packages
export const getLivePackages = async (page: number = 1) => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.LIVE(page) );

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch packages!");
    };
};

// Get Top Booked Packages
export const getTopBookedPackages = async () => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.GET_TOP_BOOKED );

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch packages!");
    };
};