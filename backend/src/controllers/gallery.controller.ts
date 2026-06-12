import { Request, Response } from "express";
import { GalleryModel } from "../models/gallery.model";

class GalleryController {
    // Create Gallery
    createGallery = async (req: Request, res: Response) => {
        try {
            const { title, caption } = req.body;

            const createdSlug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

            const result = await GalleryModel.create({
                title: title,
                slug: createdSlug,
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

    // Get Gallery By Slug
    getGalleryBySlug = async (req: Request, res: Response) => {
        try {
            const galleryExist = await GalleryModel.findOne({slug: req.params.slug });

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

    // Update Gallery Info By Gallery ID
    updateGalleryInfoByGalleryId = async (req: Request, res: Response) => {
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

    // Upload Gallery Photo
    uploadGalleryPhotoByGalleryId = async (req: Request, res: Response) => {
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

            galleryExist.photoUrls.push(req.file.path.replace(/\\/g, "/"));

            await galleryExist.save();

            res.status(200).send({
                message: "Gallery photo uploaded successfully!",
                result: galleryExist.photoUrls,
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

    // Delete Gallery Photo By Gallery ID
    deleteGalleryPhotoByGalleryId = async (req: Request, res: Response) => {
        try {
            const galleryExist = await GalleryModel.findOne({ _id: req.params.galleryId });

            if (!galleryExist) {
                return res.status(404).send({
                    mesage: "Gallery not found!",
                    success: false
                });
            };

            const photoUrl = req.body.photoUrl;

            if (!photoUrl) {
                return res.status(400).send({
                    message: "Photo URL is required!",
                    success: false
                });
            };

            const photoExists = galleryExist.photoUrls.includes(photoUrl);

            if (!photoExists) {
                return res.status(404).send({
                    message: "Photo not found in gallery!",
                    success: false
                });
            };

            galleryExist.photoUrls = galleryExist.photoUrls.filter((photo: string) =>
                photo !== photoUrl
            );

            await galleryExist.save();

            res.status(200).send({
                message: "Gallery photo deleted successfully!",
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

    // Activate or Deactivate Gallery By Gallery ID
    activateOrdeactivateGallerybyId = async (req: Request, res: Response) => {
        try {
            const galleryExist = await GalleryModel.findOne({ _id: req.params.galleryId });

            if (!galleryExist) {
                return res.status(404).send({
                    message: "Gallery not found!",
                    success: false
                });
            };

            let message: string;
            let isActive: boolean;

            if (req.params.isActive == "true") {
                message = "activated";
                isActive = true;
            } else if (req.params.isActive == "false") {
                message = "deactivated";
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            };

            await GalleryModel.findOneAndUpdate(
                { _id: req.params.galleryId },
                { $set: { isActive: isActive } }
            );

            res.status(200).send({
                message: `Gallery ${message} successfully!`,
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

    // Delete Gallery By Gallery ID
    deleteGalleryByGalleryId = async (req: Request, res: Response) => {
        try {
            const galleryExist = await GalleryModel.findOne({ _id: req.params.galleryId });

            if (!galleryExist) {
                return res.status(404).send({
                    message: "Gallery not found!",
                    success: false
                });
            };

            await GalleryModel.findOneAndDelete({ _id: req.params.galleryId });

            res.status(200).send({
                message: "Gallery deleted successfully!",
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