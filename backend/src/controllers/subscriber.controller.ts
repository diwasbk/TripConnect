import { Request, Response } from "express";
import { SubscriberModel } from "../models/subscriber.model";

class SubscriberController {
    // Create Subscribe
    createSubscriber = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const subscriberExist = await SubscriberModel.findOne({ email: email });

            if (subscriberExist) {
                return res.status(409).send({
                    message: "You are already subscribed to our newsletter!",
                    success: false,
                });
            };

            await SubscriberModel.create({
                email: email
            });

            return res.status(201).send({
                message: "You have successfully subscribed. We'll keep you updated with our latest news.",
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

    // Get All Subscribers By Status
    getAllSubscribersByStatus = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;

            const { status } = req.params;

            if (status !== "subscribed" && status !== "unsubscribed") {
                return res.status(400).send({
                    message: "Invalid status. Status must be 'subscribed' or 'unsubscribed'.",
                    success: false,
                });
            };

            const total = await SubscriberModel.countDocuments({ status: status });

            const result = await SubscriberModel.find().skip((page - 1) * limit).limit(limit);

            res.status(200).send({
                message: result.length ? "Subscribers fetched successfully!." : "No subscribers found!",
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
                success: true
            });
        };
    };

    // Update Subscriber Status By Email
    updateSubscriberStatusByEmail = async (req: Request, res: Response) => {
        try {
            const { email, status } = req.params;

            if (status !== "subscribed" && status !== "unsubscribed") {
                return res.status(400).send({
                    message: "Invalid status. Status must be 'subscribed' or 'unsubscribed'.",
                    success: false,
                });
            };

            const subscriberExist = await SubscriberModel.findOne({ email: email });

            if (!subscriberExist) {
                return res.status(404).send({
                    message: "Subscriber not found!",
                    success: false,
                });
            };

            subscriberExist.status = status;

            await subscriberExist.save();

            return res.status(200).send({
                message: status === "subscribed" ? "Successfully subscribed!" : "Successfully unsubscribed!",
                success: true,
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: false,
            });
        };
    };

    // Delete Subscriber By ID
    deleteSubscriberById = async (req: Request, res: Response) => {
        try {
            const subscriberExist = await SubscriberModel.findOneAndDelete({ _id: req.params.subscriberId });

            if (!subscriberExist) {
                return res.status(404).send({
                    message: "Subscriber not found!",
                    success: false,
                });
            };

            return res.status(200).send({
                message: "Subscriber deleted successfully!",
                success: true,
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error!",
                success: false,
            });
        };
    };
};

export default SubscriberController;