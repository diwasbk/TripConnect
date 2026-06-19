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
export const getAllInquiries = async () => {
    try {
        const response = await axiosInstance.get(API.INQUIRY.GET_ALL);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch inquiries!");
    };
};

// Reply Inquiry By ID
export const replyInquiryById = async (inquiryId: string, data: inquiryReplyType) => {
    try {
        const response = await axiosInstance.patch(API.INQUIRY.REPLY_BY_ID(inquiryId), data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to reply inquiry!");
    };
};