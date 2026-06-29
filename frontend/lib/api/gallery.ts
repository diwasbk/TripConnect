import { deleteGalleryPhotoType, galleryType } from "../schemas/gallery.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Create Gallery
export const createGallery = async (data: galleryType) => {
    try {
        const response = await axiosInstance.post(API.GALLERY.CREATE, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to create gallery!");
    };
};

// Get Gallery By GalleryId
export const getGalleryByGalleryId = async (galleryId: string) => {
    try {
        const response = await axiosInstance.get(API.GALLERY.GET_BY_ID(galleryId));

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

// Get All Galleries By Status
export const getAllGalleriesByStatus = async (isActive: boolean, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.GALLERY.GET_ALL_BY_STATUS(isActive, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch galleries!");
    };
};

// Update Gallery Info By ID
export const updateGalleryInfoById = async (galleryId: string, data: galleryType) => {
    try {
        const response = await axiosInstance.put(API.GALLERY.UPDATE_INFO_BY_ID(galleryId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update gallery!");
    };
};

// Upload Cover Photo By ID
export const uploadCoverPhotoById = async (galleryId: string, data: FormData) => {
    try {
        const response = await axiosInstance.patch(API.GALLERY.UPLOAD_COVER_PHOTO_BY_ID(galleryId), data,
            {
                headers: {
                    // Let Axios handle multipart boundaries automatically
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to upload cover photo!");
    };
};

// Upload Photo By ID
export const uploadGalleryPhotoById = async (galleryId: string, data: FormData) => {
    try {
        const response = await axiosInstance.patch(API.GALLERY.UPLOAD_PHOTO_BY_ID(galleryId), data,
            {
                headers: {
                    // Let Axios handle multipart boundaries automatically
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to upload photo!");
    };
};

// Delete Photo By ID
export const deletePhotoById = async (galleryId: string, data: deleteGalleryPhotoType) => {
    try {
        const response = await axiosInstance.delete(API.GALLERY.DELETE_PHOTO_BY_ID(galleryId), { data });

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete photo!");
    };
};

// Activate Or Deactivate Gallery By ID
export const activateOrDeactivateGalleryById = async (galleryId: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.patch(API.GALLERY.ACTIVATE_OR_DEACTIVATE_BY_ID(galleryId, isActive));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update gallery status!");
    };
};

// Delete Gallery By ID
export const deleteGalleryById = async (galleryId: string) => {
    try {
        const response = await axiosInstance.delete(API.GALLERY.DELETE_BY_ID(galleryId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete gallery!");
    };
};