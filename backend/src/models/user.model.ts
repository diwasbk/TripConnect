import mongoose, { Document, Schema } from "mongoose";
import { signupType } from "../types/auth.types";

const userSchema: Schema = new mongoose.Schema<signupType>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    termsAgreed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export interface IUser extends signupType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const UserModel = mongoose.model<IUser>("User", userSchema);