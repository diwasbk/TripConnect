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

// Get All Subscribers
export const getAllSubscribers = async () => {
    try {
        const response = await axiosInstance.get(API.SUBSCRIBER.GET_ALL);

        return response.data;

    } catch (err: Error | any) {
        throw new Error(err.response?.data?.message || err.response || "Failed to fetch subscribers!");
    };
};