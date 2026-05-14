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
};

export default BookingController;