import { Request, Response } from "express";
import { GalleryModel } from "../models/gallery.model";

class GalleryController {
    // Create Gallery
    createGallery = async (req: Request, res: Response) => {
        try {
            const { title, caption } = req.body;

            const result = await GalleryModel.create({
                title: title,
                caption: caption,
                photoUrls: []
            });

            res.status(201).send({
                message: "Gallery created successfully!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get Gallery By Gallery ID
    getGalleryByGalleryId = async (req: Request, res: Response) => {
        try {
            const galleryExist = await GalleryModel.findOne({ _id: req.params.galleryId });

            if (!galleryExist) {
                return res.status(404).send({
                    message: "Gallery not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "Gallery fetched successfully!",
                result: galleryExist,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};
export default GalleryController;