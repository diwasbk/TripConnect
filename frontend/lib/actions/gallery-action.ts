import { createGallery, getGalleryBySlug, getAllGalleriesByStatus, updateGalleryInfoById, uploadCoverPhotoById, uploadPhotoById, deletePhotoById, activateOrDeactivateGalleryById, deleteGalleryById } from "../api/gallery";
import { deleteGalleryPhotoType, galleryType } from "../schemas/gallery.schema";

// Handle Create Gallery
export const handleCreateGallery = async () => {
    try {
        const result = await createGallery();

        if (!result.success) {
            return {
                message: result.message || "Failed to create gallery!",
                success: false
            };
        };

        return {
            message: result.message || "Gallery created successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to create gallery!",
            success: false
        };
    };
};

// Handle Get Gallery By Slug
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

// Handle Get All Galleries By Status
export const handleGetAllGalleriesByStatus = async (isActive: boolean, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllGalleriesByStatus(isActive, page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch galleries!",
                success: false
            };
        };

        return {
            message: result.message || "Galleries fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch galleries!",
            success: false
        };
    };
};

// Handle Update Gallery Info By ID
export const handleUpdateGalleryInfoById = async (galleryId: string, data: galleryType) => {
    try {
        const result = await updateGalleryInfoById(galleryId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to update gallery!",
                success: false
            };
        };

        return {
            message: result.message || "Gallery updated successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update gallery!",
            success: false
        };
    };
};

// Handle Upload Cover Photo By ID
export const handleUploadCoverPhotoById = async (galleryId: string, data: FormData) => {
    try {
        const result = await uploadCoverPhotoById(galleryId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to upload cover photo!",
                success: false
            };
        };

        return {
            message: result.message || "Cover photo uploaded successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to upload cover photo!",
            success: false
        };
    };
};

// Handle Upload Photo By ID
export const handleUploadPhotoById = async (galleryId: string, data: FormData) => {
    try {
        const result = await uploadPhotoById(galleryId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to upload photo!",
                success: false
            };
        };

        return {
            message: result.message || "Photo uploaded successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to upload photo!",
            success: false
        };
    };
};

// Handle Delete Photo By ID
export const handleDeletePhotoById = async (galleryId: string, data: deleteGalleryPhotoType) => {
    try {
        const result = await deletePhotoById(galleryId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete photo!",
                success: false
            };
        };

        return {
            message: result.message || "Photo deleted successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete photo!",
            success: false
        };
    };
};

// Handle Activate Or Deactivate Gallery By ID
export const handleActivateOrDeactivateGalleryById = async (galleryId: string, isActive: boolean) => {
    try {
        const result = await activateOrDeactivateGalleryById(galleryId, isActive);

        if (!result.success) {
            return {
                message: result.message || "Failed to update gallery status!",
                success: false
            };
        };

        return {
            message: result.message || "Gallery status updated successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update gallery status!",
            success: false
        };
    };
};

// Handle Delete Gallery By ID
export const handleDeleteGalleryById = async (galleryId: string) => {
    try {
        const result = await deleteGalleryById(galleryId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete gallery!",
                success: false
            };
        };

        return {
            message: result.message || "Gallery deleted successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete gallery!",
            success: false
        };
    };
}; 