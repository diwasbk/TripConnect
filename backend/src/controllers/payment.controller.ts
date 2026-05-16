import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";
import { PackageModel } from "../models/package.model";
import { paymentStatuses } from "../config/constants";

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
};

export default PaymentController;