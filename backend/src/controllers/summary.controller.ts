import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { PackageModel } from "../models/package.model";
import { UserModel } from "../models/user.model";
import { PaymentModel } from "../models/payment.model";

class SummaryController {
    // Get Dashboard Summary
    getDashboardSummary = async (req: Request, res: Response) => {
        try {

            const totalBookings = await BookingModel.countDocuments();

            const totalPackages = await PackageModel.countDocuments();

            const totalUsers = await UserModel.countDocuments();

            const revenue = await PaymentModel.aggregate([
                {
                    $match: {
                        paymentStatus: "completed"
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$finalAmount"
                        }
                    }
                }
            ]);

            const totalRevenue = revenue[0]?.totalRevenue || 0;

            return res.status(200).json({
                message: "Dashboard summary fetched successfully!",
                result: {
                    totalBookings,
                    totalPackages,
                    totalUsers,
                    totalRevenue
                },
                success: true,
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: false
            });
        };
    };

    // Get Package Summary
    getPackageSummary = async (req: Request, res: Response) => {
        try {

            const total = await PackageModel.countDocuments();

            const live = await PackageModel.countDocuments({
                status: "published",
                isActive: true
            });

            const draft = await PackageModel.countDocuments({
                status: "draft"
            });

            const deactivated = await PackageModel.countDocuments({
                isActive: false
            });

            return res.status(200).json({
                message: "Package summary fetched successfully!",
                result: {
                    total,
                    live,
                    draft,
                    deactivated
                },
                success: true,
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: false
            });
        };
    };

    // Get Booking Summary
    getBookingSummary = async (req: Request, res: Response) => {
        try {

            const pending = await BookingModel.countDocuments({
                status: "pending"
            });

            const confirmed = await BookingModel.countDocuments({
                status: "confirmed"
            });

            const completed = await BookingModel.countDocuments({
                status: "completed"
            });

            const cancelled = await BookingModel.countDocuments({
                status: "cancelled"
            });

            return res.status(200).json({
                message: "Booking summary fetched successfully!",
                result: {
                    pending,
                    confirmed,
                    completed,
                    cancelled
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
};

export default SummaryController;