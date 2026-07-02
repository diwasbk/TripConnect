import mongoose from "mongoose";
import { Schema } from "mongoose";
import { reviewType } from "../types/review.type";

const reviewSchema: Schema = new mongoose.Schema<reviewType>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    packageId: {
        type: Schema.Types.ObjectId,
        ref: "Package",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: "",
    }
}, { timestamps: true });

// Prevent duplicate review from same user for same package
reviewSchema.index(
    { userId: 1, packageId: 1 },
    { unique: true }
);

export interface IReview extends reviewType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);