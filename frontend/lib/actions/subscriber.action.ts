import { createSubscriber, deleteSubscriberBySubscriberId, getAllSubscribersByStatus, updateSubscriptionStatusByEmail } from "../api/subscriber";
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

// Handle Get All Subscribers By Status
export const handleGetAllSubscribersByStatus = async (status: string, page: number = 1, limit: number = 5) => {
    try {
        const result = await getAllSubscribersByStatus(status, page, limit);

        if (!result) {
            return {
                message: result.message || "Failed to fetch subscribers!",
                success: false
            };
        };

        return {
            message: result.message || "Subscribers fetched successfully!",
            result: result.result,
            pagination: result.pagination,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch subscribers!",
            success: false
        };
    };
};

// Handle Update Subscription Status By Email
export const handleUpdateSubscriptionStatusByEmail = async (email: string, status: string) => {
    try {
        const result = await updateSubscriptionStatusByEmail(email, status);

        if (!result.success) {
            return {
                message: result.message || "Failed to update subscription status!",
                success: false
            };
        };

        return {
            message: result.message || "Subscription status updated successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update subscription status!",
            success: false
        };
    };
};

// Delete Subscriber By Subscriber ID
export const handleDeleteSubscriberBySubscriberId = async (subscriberId: string) => {
    try {
        const result = await deleteSubscriberBySubscriberId(subscriberId);

        if (!result.success) {
            return {
                message: result.message || "Failed to delete subscriber",
                success: false
            };
        };

        return {
            message: result.message || "Subscriber deleted successfully!",
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to delete subscriber!",
            success: false
        };
    };
};