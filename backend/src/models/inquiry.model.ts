import mongoose, { Schema } from "mongoose"
import { inquiryType } from "../types/inquiry.types";

const inquirySchema: Schema = new mongoose.Schema<inquiryType>({
    name: {
        type: String,
        required: true
    },      
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "replied"],
        default: "pending"
    },
    reply: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export interface IInquiry extends inquiryType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const inquiryModel = mongoose.model<IInquiry>('Inquiry', inquirySchema);