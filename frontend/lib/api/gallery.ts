import axiosInstance from "./axios";
import API from "./endpoint";

// Get Gallery By Status
export const getGalleryByStatus = async (isActive: boolean) => {
    try {
        const response = await axiosInstance.get(API.GALLERY.GET_BY_STATUS(isActive));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch gallery!");
    };
};

// Get Gallery By Slug
export const getGalleryBySlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(API.GALLERY.GET_BY_SLUG(slug));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch gallery!");
    };
};