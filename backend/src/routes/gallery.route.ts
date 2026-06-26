import express from "express";
import GalleryController from "../controllers/gallery.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { gallerySchema } from "../types/gallery.types";
import { upload } from "../middlewares/multer.middleware";

const galleryRouter = express.Router();
const galleryController = new GalleryController();

galleryRouter.post("/create", schemaValidateMiddleware(gallerySchema.pick({ title: true, caption: true })), galleryController.createGallery);
galleryRouter.get("/:slug", galleryController.getGalleryBySlug);
galleryRouter.get("/all/:isActive", galleryController.getAllGalleriesByStatus);
galleryRouter.put("/update-info/:galleryId", schemaValidateMiddleware(gallerySchema.partial()), galleryController.updateGalleryInfoByGalleryId);
galleryRouter.patch("/upload-cover-photo/:galleryId", upload.single("myfile"), galleryController.uploadGalleryCoverPhotoByGalleryId);
galleryRouter.patch("/upload-photo/:galleryId", upload.single("myfile"), galleryController.uploadGalleryPhotoByGalleryId);
galleryRouter.delete("/delete-photo/:galleryId", galleryController.deleteGalleryPhotoByGalleryId);
galleryRouter.patch("/activate-deactivate/:galleryId/:isActive", galleryController.activateOrDeactivateGalleryById);
galleryRouter.delete("/delete/:galleryId", galleryController.deleteGalleryByGalleryId);

export default galleryRouter;