import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";
import { paymentStatuses } from "../config/constants";
import crypto from "crypto";
import { CLIENT_URL, PAYMENT_SECRET_KEY, PRODUCT_CODE } from "../config/config";
import { sendEmail } from "../services/email";
import { generateBookingDetailEmail } from "../templates/email.templates";

class PaymentController {
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
            const transaction_uuid = `${paymentExist._id}X${Math.floor(Math.random() * 1000000)}`;
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
                    success_url: `${CLIENT_URL}/success`,
                    failure_url: `${CLIENT_URL}/failure`,
                    signature: signature
                },
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

            const paymentId = decodedData.transaction_uuid.split("X")[0];

            const paymentExist = await PaymentModel.findById(paymentId);

            if (!paymentExist) {
                return res.status(404).send({
                    message: "Payment not found",
                    success: false,
                });
            };

            if (decodedData.status === "COMPLETE") {
                paymentExist.paymentStatus = "completed";
                paymentExist.transactionCode = decodedData.transaction_code
                await paymentExist.save();

                const bookingExist = await BookingModel.findById(paymentExist.bookingId).populate("packageId");
                const promoCodeExist = paymentExist.promoCodeId ? await paymentExist.populate("promoCodeId") : null;

                if (bookingExist) {
                    const packageData = bookingExist.packageId as any;
                    const bookingObject = bookingExist.toObject();
                    const promoCodeData = promoCodeExist?.promoCodeId as any;

                    const bookingEmailData = {
                        ...bookingObject,
                        bookingId: bookingObject._id,
                        bookingReference: bookingObject.bookingReference,
                        packageName: packageData?.title,
                        destination: packageData?.destination,
                        duration: packageData?.duration,
                        tourPackage: packageData,
                        travelDate: bookingObject.travelDate,
                        numberOfTravelers: bookingObject.noOfTravellers,
                        phone: bookingObject.phoneNumber,
                        totalAmount: paymentExist.finalAmount,
                        totalPaidAmount: paymentExist.finalAmount,
                        paymentMethod: paymentExist.paymentMethod,
                        paymentStatus: paymentExist.paymentStatus,
                        originalAmount: paymentExist.originalAmount,
                        discountPercentage: paymentExist.discountPercentage,
                        discountAmount: paymentExist.discountAmount,
                        promoCode: promoCodeData?.code || null,
                    };

                    await sendEmail(
                        bookingExist.email,
                        "Your tour has been confirmed - TripConnect",
                        generateBookingDetailEmail(bookingEmailData)
                    );
                };

                return res.status(200).send({
                    message: "Payment successful",
                    data: decodedData,
                    success: true,
                });
            };

            if (decodedData.status === "FAILED") {
                paymentExist.paymentStatus = "failed";
                await paymentExist.save();

                return res.status(400).send({
                    message: "Payment failed",
                    data: decodedData,
                    success: false,
                });
            };

            return res.status(400).send({
                message: "Unknown payment status",
                data: decodedData,
                success: false,
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};

export default PaymentController;