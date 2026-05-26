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
};
export default GalleryController;