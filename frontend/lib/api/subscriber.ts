import { subscriberType } from "../schemas/subscriber.schema";
import axiosInstance from "./axios";
import API from "./endpoint";

// Create Subscriber
export const createSubscriber = async (data: subscriberType) => {
    try {
        const response = await axiosInstance.post(API.SUBSCRIBER.CREATE, data);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to subscribe!");
    };
};

// Get All Subscribers By Status
export const getAllSubscribersByStatus = async (status: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await axiosInstance.get(API.SUBSCRIBER.GET_ALL_BY_STATUS(status, page, limit));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch subscribers!");
    };
};

// Update Subscription Status By Email
export const updateSubscriptionStatusByEmail = async (email: string, status: string) => {
    try {
        const response = await axiosInstance.patch(API.SUBSCRIBER.UPDATE_STATUS_BY_EMAIL(email, status));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to update subscription status!");
    };
};

// Delete Subscriber By Subscriber ID
export const deleteSubscriberBySubscriberId = async (subscriberId: string) => {
    try {
        const response = await axiosInstance.delete(API.SUBSCRIBER.DELETE_BY_ID(subscriberId));

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to delete subscriber!");
    };
};