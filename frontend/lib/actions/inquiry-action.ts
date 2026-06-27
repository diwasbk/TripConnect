import { deleteInquiryByInquiryId, getAllInquiries, replyInquiryByInquiryId, sendInquiry, updateInquiryStatusByInquiryId } from "../api/inquiry";
import { inquiryReplyType, inquiryType } from "../schemas/inquiry.schema";

// Handle Send Inquiry
export const handleSendInquiry = async (data: inquiryType) => {
    try {
        const result = await sendInquiry(data);

        if (!result.success) {
            return {
                message: result.message || "Failed to send inquiry!",
                success: false
            };
        };

        return {
            message: result.message || "Inquiry sent successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to send inquiry!",
            success: false
        };
    };
};

// Handle Get All Inquiries
export const handleGetAllInquiries = async (page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllInquiries(page, limit);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch inquiries",
                success: false
            };
        };

        return {
            message: result.message || "Inquiries fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch inquiries!",
            success: false
        };
    };
};

// Handle Reply Inquiry By ID
export const handleReplyInquiryById = async (inquiryId: string, data: inquiryReplyType) => {
    try {
        const result = await replyInquiryByInquiryId(inquiryId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to reply inquiry!",
                success: false
            };
        };

        return {
            message: result.message || "Inquiry replied successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to reply inquiry!",
            success: false
        };
    };
};

// Handle Update Inquiry By Inquiry ID
export const handleUpdateInquiryByInquiryId = async (inquiryId: string, status: string) => {
    try {
        const result = await updateInquiryStatusByInquiryId(inquiryId, status);

        if (!result.success) {
            return {
                message: result.message || "Failed to update inquiry status!",
                success: false
            };
        };

        return {
            message: result.message || "Inquiry status updated successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update inquiry status!",
            success: false
        };
    };
};

// Handle Delete Inquiry By Inquiry ID
export const handleDeleteInquiryByInquiryId = async (inquiryId: string, data: inquiryReplyType) => {
    try {
        const result = await deleteInquiryByInquiryId(inquiryId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete inquiry",
                success: false
            };
        };

        return {
            message: result.message || "Inquiry deleted successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete inquiry!",
            success: false
        };
    };
};