import express from "express";
import GalleryController from "../controllers/gallery.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { gallerySchema } from "../types/gallery.types";
import { upload } from "../middlewares/multer.middleware";

const galleryRouter = express.Router();
const galleryController = new GalleryController();

galleryRouter.post("/create", schemaValidateMiddleware(gallerySchema.pick({ title: true, caption: true })), galleryController.createGallery);
galleryRouter.get("/:galleryId", galleryController.getGalleryByGalleryId);
galleryRouter.get("/all/:isActive", galleryController.getAllGalleriesByStatus);
galleryRouter.put("/update/:galleryId", schemaValidateMiddleware(gallerySchema.partial()), galleryController.updateGalleryByGalleryId);
galleryRouter.patch("/upload-cover-photo/:galleryId", upload.single("myfile"), galleryController.uploadGalleryCoverPhotoByGalleryId);
galleryRouter.patch("/upload-photo/:galleryId", upload.single("myfile"), galleryController.uploadGalleryPhotoByGalleryId);
galleryRouter.delete("/delete-photo/:galleryId", galleryController.deleteGalleryPhotoByGalleryId);
galleryRouter.patch("/activate-deactivate/:galleryId/:isActive", galleryController.activateOrdeactivateGallerybyId);

export default galleryRouter;