import express from "express";
import GalleryController from "../controllers/gallery.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { gallerySchema } from "../types/gallery.types";

const galleryRouter = express.Router();
const galleryController = new GalleryController();

galleryRouter.post("/create", schemaValidateMiddleware(gallerySchema.pick({ title: true, caption: true })), galleryController.createGallery);

export default galleryRouter;