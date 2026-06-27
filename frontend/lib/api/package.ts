import { departureType, itineraryType, packageBasicInfoType, packageDetailsType } from "../schemas/package.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Create Package Basic Info
export const createPackageBasicInfo = async (data: packageBasicInfoType) => {
    try {
        const response = await axiosInstance.post(API.PACKAGE.CREATE_BASIC_INFO, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to create package!");
    };
};

// Add Package Details By Package ID
export const addPackageDetailsByPackageId = async (packageId: string, data: packageDetailsType) => {
    try {
        const response = await axiosInstance.put(API.PACKAGE.ADD_PACKAGE_DETAILS(packageId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to add package details!");
    };
};

// Get Packages By Status
export const getPackagesByStatus = async (status: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.GET_BY_STATUS(status, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch packages!");
    };
};

// Get Packages By Active Status
export const getPackagesByActiveStatus = async (isActive: boolean, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.GET_BY_ACTIVE_STATUS(isActive, page, limit));

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

// Get Package By Package ID
export const getPackageById = async (packageId: string) => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.GET_BY_ID(packageId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch package!");
    };
};

// Get Live Packages
export const getLivePackages = async (page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.LIVE(page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch packages!");
    };
};

// Get Top Booked Packages
export const getTopBookedPackages = async () => {
    try {
        const response = await axiosInstance.get(API.PACKAGE.GET_TOP_BOOKED);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch packages!");
    };
};

// Update Package Basic Info By ID
export const updatePackageBasicInfoById = async (packageId: string, data: packageBasicInfoType) => {
    try {
        const response = await axiosInstance.put(API.PACKAGE.UPDATE_BASIC_INFO_BY_ID(packageId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update package basic info!");
    };
};

// Upload Package Photos By Package ID
export const uploadPackagePhotosByPackageId = async (packageId: string, data: FormData) => {
    try {
        const response = await axiosInstance.put(API.PACKAGE.PHOTO.UPLOAD_PHOTO_BY_ID(packageId), data,
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

// Activate or Deactivate Package By ID
export const activateORdeactivatePackageById = async (packageId: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.patch(API.PACKAGE.ACTIVATE_OR_DEACTIVATE_BY_ID(packageId, isActive));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update active status!");
    };
};

// Publish Package By Package ID
export const publishPackageByPackageId = async (packageId: string) => {
    try {
        const response = await axiosInstance.patch(API.PACKAGE.PUBLISH_PACKAGE_BY_ID(packageId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to publish package!");
    };
};

// Delete Package By Package ID
export const deletePackageByPackageId = async (packageId: string) => {
    try {
        const response = await axiosInstance.delete(API.PACKAGE.DELETE_BY_ID(packageId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete package!");
    };
};

// Add Package Itinerary By Package ID
export const addPackageItineraryByPackageId = async (packageId: string, data: itineraryType) => {
    try {
        const response = await axiosInstance.put(API.PACKAGE.ITINERARY.ADD_BY_PKG_ID(packageId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to add package itinerary!");
    };
};

// Update Package Itinerary By Itinerary ID
export const updatePackageItineraryByItineraryId = async (packageId: string, itineraryId: string, data: itineraryType) => {
    try {
        const response = await axiosInstance.put(API.PACKAGE.ITINERARY.UPDATE_BY_ID(packageId, itineraryId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update package itinerary!");
    };
};

// Delete Itinerary By Itinerary ID
export const deleteItineraryByItineraryId = async (packageId: string, itineraryId: string) => {
    try {
        const response = await axiosInstance.delete(API.PACKAGE.ITINERARY.DELETE_BY_ID(packageId, itineraryId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete package itinerary!");
    };
};

// Add Package Departure By Package ID
export const addPackageDepartureByPackageId = async (packageId: string, data: departureType) => {
    try {
        const response = await axiosInstance.put(API.PACKAGE.DEPARTURE.ADD_BY_PKG_ID(packageId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to add package departure!");
    };
};

// Update Package Departure By Departure ID
export const updatePackageDepartureByDepartureId = async (packageId: string, itineraryId: string, data: departureType) => {
    try {
        const response = await axiosInstance.put(API.PACKAGE.DEPARTURE.UPDATE_BY_ID(packageId, itineraryId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update package departure!");
    };
};

// Delete Departure By Departure ID
export const deleteDepartureByDepartureId = async (packageId: string, itineraryId: string) => {
    try {
        const response = await axiosInstance.delete(API.PACKAGE.DEPARTURE.DELETE_BY_ID(packageId, itineraryId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete package departure!");
    };
};