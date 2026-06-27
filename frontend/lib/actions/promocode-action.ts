import { activateOrDeactivatePromoCodeByPromoCodeId, applyPromoCodeByPaymentId, createPromoCode, deletePromoCodeByPromoCodeId, getAllPromoCodeByStatus, getPromoCodeByPromoCodeId, updatePromoCodeByPromoCodeId } from "../api/promocode";
import { applyPromoCodeType, promoCodeType } from "../schemas/promocode.schema";

// Handle create promo code
export const handleCreatePromoCode = async (data: promoCodeType) => {
    try {
        const result = await createPromoCode(data);

        if (!result.success) {
            return {
                message: result.message || "Failed to create promocode!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode created successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to create promocode!",
            success: false
        };
    };
};

// Handle Apply promo code to a payment using payment ID
export const handleApplyPromoCodeByPaymentId = async (paymentId: string, data: applyPromoCodeType) => {
    try {
        const result = await applyPromoCodeByPaymentId(paymentId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to apply promocode!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode applied successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to apply promocode!",
            success: false
        };
    };
};

// Handle get All Promo Code By Status
export const handleGetAllPromoCodeByStatus = async (isActive: boolean, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllPromoCodeByStatus(isActive, page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch promocode!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch promocode!",
            success: false
        };
    };
};

// Handle Get All Promo Code By Promo Code ID
export const handleGetPromoCodeByPromoCodeId = async(promoCodeId: string) => {
    try {
        const result = await getPromoCodeByPromoCodeId(promoCodeId);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch promocode!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch promocode!",
            success: false
        };
    };
};

// Handle Activate or Deactivate Promo Code By  Promo Code ID
export const handleActivateOrDeactivatePromoCodeByPromoCodeId = async (promocodeId: string, isActive: boolean) => {
    try {
        const result = await activateOrDeactivatePromoCodeByPromoCodeId(promocodeId, isActive);

        if (!result.success) {
            return {
                message: result.message || "Failed to update promocode status!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode status updated successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update promocode status!",
            success: false
        };
    };
};

// Handle update Promo Code By  Promo Code ID
export const handleUpdatePromoCodeByPromoCodeId= async (promocodeId: string, data: promoCodeType) => {
    try {
        const result = await updatePromoCodeByPromoCodeId((promocodeId), data);

        if (!result.success) {
            return {
                message: result.message || "Failed to update promocode!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode updated successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update promocode!",
            success: false
        };
    };
};

// Handle delete Promo Code By Promo Code ID
export const handleDeletePromoCodeByPromoCodeId= async (promocodeId: string) => {
    try {
        const result = await deletePromoCodeByPromoCodeId(promocodeId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete promocode!",
                success: false
            };
        };

        return {
            message: result.message || "Promocode deleted successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete promocode!",
            success: false
        };
    };
};