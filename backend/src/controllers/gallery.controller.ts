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

    // Get All Galleries By Status
    getAllGalleriesByStatus = async (req: Request, res: Response) => {
        try {
            let message: string;
            let isActive: boolean;

            if (req.params.isActive == "true") {
                message = "Active";
                isActive = true;
            } else if (req.params.isActive == "false") {
                message = "Deactive";
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            };

            const result = await GalleryModel.find({ isActive: isActive });

            res.status(200).send({
                message: result.length ? `${message} gallery fetched successfully!` : "Gallery not found!",
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

    // Update Gallery By Gallery ID
    updateGalleryByGalleryId = async (req: Request, res: Response) => {
        try {
            const galleryExist = await GalleryModel.findOne({ _id: req.params.galleryId });

            if (!galleryExist) {
                return res.status(404).send({
                    message: "Gallery not found!",
                    success: false
                });
            };

            const { title, caption } = req.body;

            const result = await GalleryModel.findOneAndUpdate(
                { _id: req.params.galleryId },
                { $set: { title: title, caption: caption } },
                { new: true }
            );

            res.status(200).send({
                message: "Gallery updated successfully!",
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

    // Upload Gallery Cover Photo By Gallery ID
    uploadGalleryCoverPhotoByGalleryId = async (req: Request, res: Response) => {
        try {
            const galleryExist = await GalleryModel.findOne({ _id: req.params.galleryId });

            if (!galleryExist) {
                return res.status(404).send({
                    message: "Gallery not found!",
                    success: false
                });
            };

            if (!req.file) {
                return res.status(400).send({
                    message: "No file uploaded!",
                    success: false
                });
            };

            const result = galleryExist.coverPhotoUrl = req.file.path.replace(/\\/g, "/");

            await galleryExist.save();

            res.status(200).send({
                message: "Gallery cover photo uploaded successfully!",
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