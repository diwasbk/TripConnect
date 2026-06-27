import { activateORdeactivatePackageById, addPackageDetailsByPackageId, createPackageBasicInfo, deletePackageByPackageId, getLivePackages, getPackagesByActiveStatus, getPackageById, getPackagesBySlug, getPackagesByStatus, getTopBookedPackages, publishPackageByPackageId, uploadPackagePhotosByPackageId, updatePackageBasicInfoById, addPackageItineraryByPackageId, updatePackageItineraryByItineraryId, deleteItineraryByItineraryId, updatePackageDepartureByDepartureId, deleteDepartureByDepartureId, addPackageDepartureByPackageId } from "../api/package";
import { departureType, itineraryType, packageBasicInfoType, packageDetailsType } from "../schemas/package.schema";

// Handle Create Package Basic Info
export const handleCreatePackageBasicInfo = async (data: packageBasicInfoType) => {
    try {
        const result = await createPackageBasicInfo(data);

        if (!result) {
            return {
                message: result.message || "Failed to create package!",
                success: false
            };
        };

        return {
            message: result.message || "Package created successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to create package!",
            success: false
        };
    };
};

// Handle Add Package Details By Package ID
export const handleAddPackageDetailsByPackageId = async (packageId: string, data: packageDetailsType) => {
    try {
        const result = await addPackageDetailsByPackageId(packageId, data);

        if (!result) {
            return {
                message: result.message || "Failed to add package details!",
                success: false
            };
        };

        return {
            message: result.message || "Package details added successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to add package details!",
            success: false
        };
    };
};

// Handle Get Packages By Status
export const handleGetPackagesByStatus = async (status: string, page: number = 1, limit: number = 5) => {
    try {
        const result = await getPackagesByStatus(status, page, limit);

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
            success: false
        };
    };
};

// Handle Get Packages By Active Status
export const handleGetPackagesByActiveStatus = async (isActive: boolean, page: number = 1, limit: number = 5) => {
    try {
        const result = await getPackagesByActiveStatus(isActive, page, limit);

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

export const handleGetPackageById = async (packageId: string) => {
    try {
        const result = await getPackageById(packageId);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch package",
                success: false
            };
        };

        return {
            message: result.message || "Package fetched successfully!",
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
export const handleGetLivePackages = async (page: number = 1, limit: number = 5) => {
    try {
        const result = await getLivePackages(page, limit);

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
            success: false
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
            success: false
        };
    };
};

// Handle Update Package Basic Info By ID
export const handleUpdatePackageBasicInfoById = async (packageId: string, data: packageBasicInfoType) => {
    try {
        const result = await updatePackageBasicInfoById(packageId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to update package basic info!",
                success: false
            };
        };

        return {
            message: result.message || "Package basic info updated successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update package basic info!",
            success: false,
        };
    };
};

// Handle Upload Package Photos By Package ID
export const handleUploadPackagePhotosByPackageId = async (packageId: string, data: FormData) => {
    try {
        const result = await uploadPackagePhotosByPackageId(packageId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to upload package photo!",
                success: false
            };
        };

        return {
            message: result.message || "Package photo uploaded successfully!",
            result: result.result,
            success: true,
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to upload package photo!",
            success: false
        };
    };
};

// Handle Activate or Deactivate Package By ID
export const handleActivateORdeactivatePackageById = async (packageId: string, isActive: boolean) => {
    try {
        const result = await activateORdeactivatePackageById(packageId, isActive);

        if (!result.success) {
            return {
                message: result.message || "Failed to update active status!",
                success: false
            };
        };

        return {
            message: result.message || "Active status updated successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to upload package photo!",
            success: false
        };
    };
};

// Handle Publish Package By Package ID
export const handlePublishPackageByPackageId = async (packageId: string) => {
    try {
        const result = await publishPackageByPackageId(packageId);

        if (!result.success) {
            return {
                message: result.message || "Failed to publish package!",
                success: false
            };
        };

        return {
            message: result.message || "Package published successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to publish package!",
            success: false
        };
    };
};

// Handle Delete Package By Package ID
export const handleDeletePackageByPackageId = async (packageId: string) => {
    try {
        const result = await deletePackageByPackageId(packageId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete package!",
                success: false
            };
        };

        return {
            message: result.message || "Package deleted successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete package!",
            success: false
        };
    };
};

// Handle Add Package Itinerary By Package ID
export const handleAddPackageItineraryByPackageId = async (packageId: string, data:itineraryType) => {
    try {
        const result = await addPackageItineraryByPackageId(packageId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to add package itinerary!",
                success: false
            };
        };

        return {
            message: result.message || "Package itinerary added successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to add package itinerary!",
            success: false
        };
    };
};

// Handle Update Package Itinerary By Itinerary ID
export const handleUpdatePackageItineraryByItineraryId = async (packageId: string, itineraryId: string, data: itineraryType) => {
    try {
        const result = await updatePackageItineraryByItineraryId(packageId, itineraryId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to update package itinerary!",
                success: false
            };
        };

        return {
            message: result.message || "Package itinerary updated successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update package itinerary!",
            success: false
        };
    };
};

// Handle Delete Itinerary By Itinerary ID
export const handleDeleteItineraryByItineraryId = async (packageId: string, itineraryId: string) => {
    try {
        const result = await deleteItineraryByItineraryId(packageId, itineraryId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete package itinerary!",
                success: false
            };
        };

        return {
            message: result.message || "Package itinerary deleted successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete package itinerary!",
            success: false
        };
    };
};

// Handle Add Package Departure By Package ID
export const handleAddPackageDepartureByPackageId = async (packageId: string, data: departureType) => {
    try {
        const result = await addPackageDepartureByPackageId(packageId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to add package departure!",
                success: false
            };
        };

        return {
            message: result.message || "Package departure added successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to add package departure!",
            success: false
        };
    };
};

// Handle Update Package Departure By Departure ID
export const handleUpdatePackageDepartureByDepartureId = async (packageId: string, departureId: string, data: departureType) => {
    try {
        const result = await updatePackageDepartureByDepartureId(packageId, departureId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to update package departure!",
                success: false
            };
        };

        return {
            message: result.message || "Package departure updated successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update package departure!",
            success: false
        };
    };
};

// Handle Delete Departure By Departure ID
export const handleDeleteDepartureByDepartureId = async (packageId: string, departureId: string) => {
    try {
        const result = await deleteDepartureByDepartureId(packageId, departureId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete package departure!",
                success: false
            };
        };

        return {
            message: result.message || "Package departure deleted successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete package departure!",
            success: false
        };
    };
};