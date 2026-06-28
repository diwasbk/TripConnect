import mongoose, { Document, Schema } from "mongoose";
import { bookingType } from "../types/booking.types";

const bookingSchema: Schema = new mongoose.Schema<bookingType>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    bookingReference: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    noOfTravelers: {
        type: Number,
        default: 1
    },
    specialRequest: {
        type: String,
        default: ""
    },
    isGuest: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
        default: "pending"
    },
    cancellationReason: {
        type: String
    }
}, { timestamps: true });

export interface IBooking extends bookingType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const BookingModel = mongoose.model<IBooking>("Booking", bookingSchema);