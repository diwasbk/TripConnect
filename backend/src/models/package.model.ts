import mongoose, { Document, Schema } from "mongoose";
import { packageType } from "../types/package.types";

const packageSchema: Schema = new mongoose.Schema<packageType>({
    title: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    includes: [
        {
            type: String,
            required: true
        }
    ],
    photoUrls: [
        {
            type: String,
            required: true
        }
    ],
    itinerary: [
        {
            day: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            activities: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ],
    departures: [
        {
            date: {
                type: Date,
                required: true
            },
            totalSeats: {
                type: Number,
                min: 1,
                required: true
            },
            availableSeats: {
                type: Number,
                min: 0,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export interface IPackage extends packageType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const PackageModel = mongoose.model<IPackage>("Package", packageSchema);