import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";
import { PackageModel } from "../models/package.model";
import { paymentStatuses } from "../config/constants";
import crypto from "crypto";
import { CLIENT_URL, PAYMENT_SECRET_KEY, PRODUCT_CODE } from "../config/config";

class PaymentController {
    // Create Payment By Booking ID
    createPaymentByBookingId = async (req: Request, res: Response) => {
        try {
            const bookingExist = await BookingModel.findOne({ _id: req.params.bookingId });

            if (!bookingExist) {
                return res.status(404).send({
                    message: "Booking not found!",
                    success: false
                });
            };

            const packageExist = await PackageModel.findOne({ _id: bookingExist.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const finalAmount = bookingExist.noOfTravellers * packageExist.price;

            await PaymentModel.create({
                bookingId: req.params.bookingId.toString(),
                packageId: bookingExist.packageId,
                originalAmount: finalAmount,
                finalAmount: finalAmount
            });

            res.status(201).send({
                message: "Payment created successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get All Payments By Status
    getAllPaymentsByPaymentStatus = async (req: Request, res: Response) => {
        try {
            const paymentStatus = req.params.paymentStatus as typeof paymentStatuses[number];

            if (!paymentStatus) {
                return res.status(400).send({
                    message: "Payment status is required.",
                    success: false
                });
            };

            if (!paymentStatuses.includes(paymentStatus as typeof paymentStatuses[number])) {
                return res.status(400).send({
                    message: `Invalid payment status '${paymentStatus}'. Allowed values are: pending, completed, failed.`,
                    success: false
                });
            };

            const result = await PaymentModel.find({ paymentStatus: paymentStatus });

            res.status(200).send({
                message: result.length ? `${paymentStatus} payments fetched successfully!` : " Payments not found!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: true
            });
        };
    };

    // Get All Payments By Payment Id
    getPaymentByPaymentId = async (req: Request, res: Response) => {
        try {
            const paymentExist = await BookingModel.findOne({ _id: req.params.bookingId });

            if (!paymentExist) {
                return res.status(404).send({
                    message: "Booking not found!",
                    success: false
                });
            };
            res.status(200).send({
                message: "Payment fetched successfully!",
                result: paymentExist,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: true
            });
        };
    };

    // Update Payment Status By Payment ID
    updatePaymentStatusByPaymentId = async (req: Request, res: Response) => {
        try {
            const paymentStatus = req.body.paymentStatus as typeof paymentStatuses[number];

            if (!paymentStatuses.includes(paymentStatus)) {
                return res.status(400).send({
                    message: `Invalid payment status. Please use: ${paymentStatuses.join(", ")}.`,
                    success: false
                });
            };

            const paymentExist = await PaymentModel.findOne({ _id: req.params.paymentId });

            if (!paymentExist) {
                return res.status(404).send({
                    message: "Payment not found!",
                    success: false
                });
            };

            paymentExist.paymentStatus = paymentStatus;
            await paymentExist.save();

            res.status(200).send({
                message: "Payment status updated successfully!",
                result: paymentExist,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: false
            });
        };
    };

    // Initialize Esewa Payment
    initializeEsewaPayment = async (req: Request, res: Response) => {
        try {
            const paymentExist = await PaymentModel.findOne({ _id: req.params.paymentId });

            if (!paymentExist) {
                return res.status(404).send({
                    message: "Payment not found!",
                    success: false
                });
            };

            const amount = paymentExist.finalAmount;
            const tax_amount = 0;

            const total_amount = amount + tax_amount || 0;
            const transaction_uuid = "TRIP" + Math.floor(Math.random() * 10000);
            const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${PRODUCT_CODE}`;
            const signature = crypto.createHmac("sha256", PAYMENT_SECRET_KEY).update(message).digest("base64");

            return res.status(201).send({
                message: "Esewa payment initialized successfully!",
                result: {
                    amount: amount,
                    tax_amount: tax_amount,
                    total_amount: total_amount,
                    transaction_uuid: transaction_uuid,
                    product_code: PRODUCT_CODE,
                    success_url: `${CLIENT_URL}/success/${paymentExist._id}`,
                    failure_url: `${CLIENT_URL}/failure/${paymentExist._id}`,
                    signature: signature
                },
                success: true
            });

        } catch (err: any) {
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Verify Esewa Payment
    verifyEsewaPayment = async (req: Request, res: Response) => {
        try {
            const { data } = req.query;

            if (!data) {
                return res.status(400).send({
                    message: "No data received from eSewa",
                    success: false,
                });
            };

            const decodedData = JSON.parse(
                Buffer.from(data as string, "base64").toString("utf-8")
            );

            if (decodedData.status === "COMPLETE") {
                await PaymentModel.findOneAndUpdate(
                    { _id: req.params.paymentId },
                    { $set: { paymentStatus: "completed" } }
                );
                return res.status(200).send({
                    message: "Payment successful",
                    data: decodedData,
                    success: true,
                });
            };

            if (decodedData.status === "FAILED") {
                await PaymentModel.findOneAndUpdate(
                    { _id: req.params.paymentId },
                    { $set: { paymentStatus: "failed" } }
                );
                return res.status(400).send({
                    message: "Payment failed",
                    data: decodedData,
                    success: false,
                });
            };

        } catch (err: any) {
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};

export default PaymentController;