import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";
import { PackageModel } from "../models/package.model";

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
};

export default PaymentController;