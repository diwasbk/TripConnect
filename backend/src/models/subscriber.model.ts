import mongoose, { Document, Schema } from "mongoose";
import { subscriberType } from "../types/subscriber.types";

const subscriberSchema: Schema = new mongoose.Schema<subscriberType>({
    email: {
        type: String,
        required: true,
        unique: true
    },status: {
        type: String,
        enum: ["subscribed", "unsubscribed"],
        default: "subscribed"
    }
}, { timestamps: true });

export interface ISubscriber extends subscriberType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const SubscriberModel = mongoose.model<ISubscriber>("Subscriber", subscriberSchema);