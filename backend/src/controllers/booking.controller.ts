import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { PackageModel } from "../models/package.model";
import { UserModel } from "../models/user.model";
import { bookingStatuses } from "../config/constants";

class BookingController {
    // Book Package For Guest User By Package ID
    bookPackageForGuestUserByPackageId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const { fullName, email, phoneNumber, travelDate, noOfTravellers, specialRequest } = req.body;

            const selectedDeparture = packageExist.departures.find(dep =>
                new Date(dep.date).toDateString() === new Date(travelDate).toDateString()
            );

            if (!selectedDeparture) {
                return res.status(400).send({
                    message: "The selected departure date is not available. Please choose another date.",
                    success: false
                });
            };

            if (selectedDeparture.availableSeats < noOfTravellers) {
                return res.status(400).send({
                    message: `Sorry, only ${selectedDeparture.availableSeats} seat(s) are available for the selected departure date.`,
                    success: false
                });
            };

            const result = await BookingModel.create({
                packageId: packageExist._id,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                travelDate: travelDate,
                noOfTravellers: noOfTravellers,
                specialRequest: specialRequest,
            });

            selectedDeparture.availableSeats -= noOfTravellers;

            await packageExist.save();

            res.status(201).send({
                message: "Package book successfully!",
                result: result,
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

    // Book Package For Registered User By Package ID
    bookPackageForRegisteredUserByPackageId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const user = req.user as { id: string };

            const userExist = await UserModel.findOne({ _id: user.id });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            const { travelDate, noOfTravellers, specialRequest } = req.body;

            const selectedDeparture = packageExist.departures.find(dep =>
                new Date(dep.date).toDateString() === new Date(travelDate).toDateString()
            );

            if (!selectedDeparture) {
                return res.status(400).send({
                    message: "The selected departure date is not available. Please choose another date.",
                    success: false
                });
            };

            if (selectedDeparture.availableSeats < noOfTravellers) {
                return res.status(400).send({
                    message: `Sorry, only ${selectedDeparture.availableSeats} seat(s) are available for the selected departure date.`,
                    success: false
                });
            };

            const result = await BookingModel.create({
                userId: user.id,
                packageId: packageExist._id,
                fullName: userExist.fullName,
                email: userExist.email,
                phoneNumber: userExist.phoneNumber,
                travelDate: travelDate,
                noOfTravellers: noOfTravellers,
                specialRequest: specialRequest,
                isGuest: false
            });

            selectedDeparture.availableSeats -= noOfTravellers;

            await packageExist.save();

            res.status(201).send({
                message: "Package booked successfully!",
                result: result,
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

    // Get All Bookings By Status
    getAllBookingsByStatus = async (req: Request, res: Response) => {
        try {
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

            const result = await BookingModel.find({
                status: status,
                isGuest: isGuest
            });

            res.status(200).send({
                message: result.length ? "Bookings fetched successfully!" : "Booking not found!",
                result: result,
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

    // Get All Booking By Package ID
    getAllBookingsByPackageId = async (req: Request, res: Response) => {
        try {
            const packageExist = await PackageModel.findOne({ _id: req.params.packageId });

            if (!packageExist) {
                return res.status(404).send({
                    message: "Package not found!",
                    success: false
                });
            };

            const result = await BookingModel.find({ packageId: req.params.packageId });

            res.status(200).send({
                message: result.length ? "Bookings fetched successfully!" : "Bookings not found!",
                result: result,
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
            const userExist = await UserModel.findOne({ _id: req.params.userId });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            const result = await BookingModel.find({ userId: req.params.userId });

            res.status(200).send({
                message: result.length ? "Bookings fetched successfully!" : "Bookings not found!",
                result: result,
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