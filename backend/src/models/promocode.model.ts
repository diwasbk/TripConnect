import mongoose, { Document, Schema } from "mongoose";
import { promocodeType } from "../types/promocode.types";

const promoCodeSchema: Schema = new mongoose.Schema<promocodeType>({
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        default: 0
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export interface IPromoCode extends promocodeType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const PromoCodeModel = mongoose.model<IPromoCode>("PromoCode", promoCodeSchema);