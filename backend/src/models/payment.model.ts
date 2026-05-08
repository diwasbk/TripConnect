import mongoose, { Document, Schema } from "mongoose";
import { paymentType } from "../types/payment.types";

const paymentSchema: Schema = new mongoose.Schema<paymentType>({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    promoCodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PromoCode",
        default: null
    },
    originalAmount: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "esewa", "khalti", "others"],
        default: "esewa"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    }
}, { timestamps: true }
);

export interface IPayment extends paymentType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const PaymentModel = mongoose.model<IPayment>("Payment", paymentSchema);