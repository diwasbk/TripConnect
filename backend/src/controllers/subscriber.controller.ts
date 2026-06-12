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

            const result = await SubscriberModel.create({
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
};

export default SubscriberController;