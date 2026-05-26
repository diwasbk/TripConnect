import mongoose, { Document, Schema } from "mongoose";
import { galleryType } from "../types/gallery.types";

const gallerySchema: Schema = new mongoose.Schema<galleryType>({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    coverPhotoUrl: {
        type: String,
        default: ""
    },
    photoUrls: [
        {
            type: String,
            required: true
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    }
});

export interface IGallery extends galleryType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
};

export const GalleryModel = mongoose.model<IGallery>("Gallery", gallerySchema);