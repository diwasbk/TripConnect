import { getAllPaymentsByStatus, getPaymentById, updatePaymentStatusById, initializeEsewaPaymentById, verifyEsewaPayment } from "../api/payment";

// Handle Get All Payments By Status
export const handleGetAllPaymentsByStatus = async (paymentStatus: string) => {
    try {
        const result = await getAllPaymentsByStatus(paymentStatus);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch payments!",
                success: false
            };
        };

        return {
            message: result.message || "Payments fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch payments!",
            success: false
        };
    };
};

// Handle Get Payment By ID
export const handleGetPaymentById = async (paymentId: string) => {
    try {
        const result = await getPaymentById(paymentId);

        if (!result.success) {
            return {
                message: result.message || "Failed to fetch payment!",
                success: false
            };
        };

        return {
            message: result.message || "Payment fetched successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to fetch payment!",
            success: false
        };
    };
};

// Handle Update Payment Status By ID
export const handleUpdatePaymentStatusById = async (paymentId: string, paymentStatus: string) => {
    try {
        const result = await updatePaymentStatusById(paymentId, paymentStatus);

        if (!result.success) {
            return {
                message: result.message || "Failed to update payment status!",
                success: false
            };
        };

        return {
            message: result.message || "Payment status updated successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to update payment status!",
            success: false
        };
    };
};

// Handle Initialize Esewa Payment By ID
export const handleInitializeEsewaPaymentById = async (paymentId: string) => {
    try {
        const result = await initializeEsewaPaymentById(paymentId);

        if (!result.success) {
            return {
                message: result.message || "Failed to initialize Esewa payment!",
                success: false
            };
        };

        return {
            message: result.message || "Esewa payment initialized successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to initialize Esewa payment!",
            success: false
        };
    };
};

// Handle Verify Esewa Payment
export const handleVerifyEsewaPayment = async (data: string) => {
    try {
        const result = await verifyEsewaPayment(data);

        if (!result.success) {
            return {
                message: result.message || "Failed to verify Esewa payment!",
                success: false
            };
        };

        return {
            message: result.message || "Esewa payment verified successfully!",
            result: result.result,
            success: true
        };

    } catch (err: Error | any) {
        return {
            message: err.message || "Failed to verify Esewa payment!",
            success: false
        };
    };
};