import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { PackageModel } from "../models/package.model";
import { UserModel } from "../models/user.model";
import { bookingStatuses } from "../config/constants";
import { PaymentModel } from "../models/payment.model";
import { generateBookingReference } from "../utils/helper";

class BookingController {
    // Create Booking By Package ID
    createBookingByPackageId = async (req: Request, res: Response) => {
        try {
            const user = req.user as { id: string } | null;
            let isGuest = true;
            let userId: string | undefined;

            // Associate the booking with the user only if the authenticated user exists
            if (user && user.id) {
                const userExist = await UserModel.findOne({ _id: user.id });
                if (userExist) {
                    isGuest = false;
                    userId = user.id;
                };
            };

            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const bookingReference = await generateBookingReference();

            const { fullName, email, phoneNumber, travelDate, noOfTravelers, specialRequest } = req.body;

            const selectedDeparture = packageExist.departures.find(dep =>
                new Date(dep.date).toDateString() === new Date(travelDate).toDateString()
            );

            if (!selectedDeparture) {
                return res.status(400).send({
                    message: "The selected departure date is not available. Please choose another date.",
                    success: false
                });
            };

            if (selectedDeparture.availableSeats < noOfTravelers) {
                return res.status(400).send({
                    message: `Sorry, only ${selectedDeparture.availableSeats} seat(s) are available for the selected departure date.`,
                    success: false
                });
            };

            const booking = await BookingModel.create({
                userId: userId,
                packageId: packageExist._id,
                bookingReference: bookingReference,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                travelDate: travelDate,
                noOfTravelers: noOfTravelers,
                specialRequest: specialRequest,
                isGuest: isGuest
            });

            selectedDeparture.availableSeats -= noOfTravelers;

            await packageExist.save();

            const finalAmount = noOfTravelers * packageExist.price;

            await PaymentModel.create({
                bookingId: booking._id,
                packageId: packageExist._id,
                originalAmount: finalAmount,
                finalAmount: finalAmount
            });

            res.status(201).send({
                message: "Booking created successfully!",
                result: booking,
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

    // Get All Bookings By Status And Guest Type
    getAllBookingsByStatusAndGuestType = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;

            const status = req.query.status as | "pending" | "confirmed" | "in-progress" | "completed" | "cancelled" | undefined;

            type BookingStatus = (typeof bookingStatuses)[number];

            if (typeof status !== "string" || !bookingStatuses.includes(status as BookingStatus)) {
                return res.status(400).send({
                    message: "Invalid booking status!",
                    success: false,
                });
            }

            let isGuest: boolean;

            if (req.query.isGuest == "true") {
                isGuest = true;
            } else if (req.query.isGuest == "false") {
                isGuest = false;
            } else {
                return res.status(400).send({
                    message: "Invalid guest value! Use true or false.",
                    success: false
                });
            };

            const total = await BookingModel.countDocuments({ status: status, isGuest: isGuest });

            const result = await BookingModel.find({
                status: status,
                isGuest: isGuest
            }).skip((page - 1) * limit).limit(limit);

            res.status(200).send({
                message: result.length ? "Bookings fetched successfully!" : "Booking not found!",
                result: result,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPreviousPage: page > 1
                },
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

    // Get Booking By Booking Id
    getBookingByBookingId = async (req: Request, res: Response) => {
        try {
            const bookingExist = await BookingModel.findOne({ _id: req.params.bookingId });

            if (!bookingExist) {
                return res.status(404).send({
                    message: "Booking not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "Booking fetched successfully!",
                result: bookingExist,
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

    // Get Booking By Booking Reference
    getBookingByBookingReference = async (req: Request, res: Response) => {
        try {
            const bookingExist = await BookingModel.findOne({ bookingReference: req.params.bookingReference });

            if (!bookingExist) {
                return res.status(404).send({
                    message: "Booking not found!",
                    success: false
                });
            };

            const paymentExist = await PaymentModel.findOne({ bookingId: bookingExist._id });

            if (!paymentExist) {
                return res.status(404).send({
                    message: "Payment not found",
                    success: false,
                });
            };

            const packageExist = bookingExist ? await bookingExist.populate("packageId") : null;
            const packageData = packageExist?.packageId as any;

            const promoCodeExist = paymentExist.promoCodeId ? await paymentExist.populate("promoCodeId") : null;
            const promoCodeData = promoCodeExist?.promoCodeId as any;

            const bookingData = {
                fullName: bookingExist.fullName,
                email: bookingExist.email,
                phoneNumber: bookingExist.phoneNumber,
                specialRequest: bookingExist.specialRequest,
                bookingDate: bookingExist?.createdAt,
                bookingReference: bookingExist.bookingReference,
                packageName: packageData.title,
                slug: packageData.slug,
                duration: packageData?.duration,
                destination: packageData?.destination,
                includes: packageData.includes,
                noOfTravelers: bookingExist?.noOfTravelers,
                travelDate: bookingExist.travelDate,
                pricePerTraveler: packageData.price,
                paymentId: paymentExist._id,
                originalAmount: paymentExist.originalAmount,
                discountAmount: paymentExist.discountAmount,
                discountPercentage: paymentExist.discountPercentage,
                totalPaidAmount: paymentExist.finalAmount,
                promoCode: promoCodeData?.code || null,
                paymentMethod: paymentExist.paymentMethod,
                paymentStatus: paymentExist.paymentStatus
            };

            res.status(200).send({
                message: "Booking fetched successfully!",
                result: bookingData,
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

    // Get All Bookings By Package ID
    getAllBookingsByPackageId = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;

            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const total = await BookingModel.countDocuments({ packageId: req.params.packageId });

            const result = await BookingModel.find({ packageId: req.params.packageId }).skip((page - 1) * limit).limit(limit);

            res.status(200).send({
                message: result.length ? "Bookings fetched successfully!" : "Bookings not found!",
                result: result,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPreviousPage: page > 1
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
    }

    // Get All Bookings By User Id
    getAllBookingsByUserId = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;
            
            const userExist = await UserModel.findOne({ _id: req.params.userId });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            const total = await BookingModel.countDocuments({  userId: req.params.userId});
            
            const result = await BookingModel.find({ userId: req.params.userId }).skip((page - 1) * limit).limit(limit);

            res.status(200).send({
                message: result.length ? "Bookings fetched successfully!" : "Bookings not found!",
                result: result,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPreviousPage: page > 1
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

    // Update Booking Details By Booking ID
    updateBookingDetailsByBookingId = async (req: Request, res: Response) => {
        try {
            const bookingExist = await BookingModel.findOne({ _id: req.params.bookingId });

            if (!bookingExist) {
                return res.status(404).send({
                    message: "Booking not found!",
                    success: false
                });
            };

            const { fullName, email, phoneNumber, travelDate, specialRequest } = req.body;

            await BookingModel.findOneAndUpdate(
                { _id: req.params.bookingId },
                { $set: { fullName: fullName, email: email, phoneNumber, travelDate, specialRequest } }
            );

            res.status(200).send({
                message: "Bookings details updated successfully!",
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

    // Update Booking's Status By Booking ID
    updateBookingStatusByBookingId = async (req: Request, res: Response) => {
        try {
            const bookingExist = await BookingModel.findOne({ _id: req.params.bookingId });

            if (!bookingExist) {
                return res.status(404).send({
                    message: "Booking not found!",
                    success: false
                });
            };

            const status = req.params.status;

            if (!bookingStatuses.includes(status as typeof bookingStatuses[number])) {
                return res.status(400).send({
                    message: "Invalid booking status!",
                    success: false
                });
            };

            const result = await BookingModel.findOneAndUpdate(
                { _id: req.params.bookingId },
                { $set: { status } },
                { new: true }
            );

            res.status(200).send({
                message: `Booking status updated successfully to ${result?.status}!`,
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

    // Delete Booking By Booking ID
    deleteBookingByBookingId = async (req: Request, res: Response) => {
        try {
            const bookingExist = await BookingModel.findOne({ _id: req.params.bookingId });

            if (!bookingExist) {
                return res.status(404).send({
                    message: "Booking not found!",
                    success: false
                });
            };

            await BookingModel.findOneAndDelete({ _id: req.params.bookingId });

            res.status(200).send({
                message: "Booking deleted successfully!",
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

export default BookingController;