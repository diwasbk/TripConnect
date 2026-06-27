import { inquiryReplyType, inquiryType } from "../schemas/inquiry.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Send Inquiry
export const sendInquiry = async (data: inquiryType) => {
    try {
        const response = await axiosInstance.post(API.INQUIRY.SEND, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to send inquiry!");
    };
};

// Get All Inquiries
export const getAllInquiries = async (page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.INQUIRY.GET_ALL(page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch inquiries!");
    };
};

// Reply Inquiry By Inquiry ID
export const replyInquiryByInquiryId = async (inquiryId: string, data: inquiryReplyType) => {
    try {
        const response = await axiosInstance.patch(API.INQUIRY.REPLY_BY_ID(inquiryId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to reply inquiry!");
    };
};

// Update Inquiry Status By Inquiry ID
export const updateInquiryStatusByInquiryId = async (inquiryId: string, status: string) => {
    try {
        const response = await axiosInstance.patch(API.INQUIRY.UPDATE_STATUS_BY_ID(inquiryId, status));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update inquiry status!");
    };
};

// Delete Inquiry By Inquiry ID
export const deleteInquiryByInquiryId = async (inquiryId: string) => {
    try {
        const response = await axiosInstance.delete(API.INQUIRY.DELETE_BY_ID(inquiryId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete inquiry!");
    };
};