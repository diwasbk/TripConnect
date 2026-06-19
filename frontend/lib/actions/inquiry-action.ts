import { getAllInquiries, replyInquiryById, sendInquiry } from "../api/inquiry";
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
export const handleGetAllInquiries = async () => {
    try {
        const result = await getAllInquiries();

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch inquiries",
                success: false
            };
        };

        return {
            message: result.message || "Inquiries fetched successfully!",
            result: result.result,
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
        const result = await replyInquiryById(inquiryId, data);

        if (!result.success) {
            return {
                message: result.message || "Failed to reply inquiry",
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