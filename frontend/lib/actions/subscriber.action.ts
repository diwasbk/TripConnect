import { createSubscriber, getAllSubscribers } from "../api/subscriber";
import { subscriberType } from "../schemas/subscriber.schema";

// Handle  Create Subscriber
export const handleCreateSubscriber = async (data: subscriberType) => {
    try {
        const result = await createSubscriber(data);

        if (!result) {
            return {
                message: result.message || "Failed to subscribe!",
                success: false
            };
        };

        return {
            message: result.message || "Subscribed successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to subscribe!",
            success: false
        };
    };
};

// Handle Get All Subscribers
export const handleGetAllSubscribers = async () => {
    try {
        const result = await getAllSubscribers();

        if (!result) {
            return {
                message: result.message || "Failed to fetch subscribers!",
                success: false
            };
        };

        return {
            message: result.message || "Subscribers fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch subscribers!",
            success: false
        };
    };
};