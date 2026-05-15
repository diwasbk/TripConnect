import express from "express";
import PromoCodeController from "../controllers/promocode.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { promoCodeSchema } from "../types/promocode.types";

const promoCodeRouter = express.Router();
const promoCodeController = new PromoCodeController();

promoCodeRouter.post("/create", schemaValidateMiddleware(promoCodeSchema), promoCodeController.createPromoCode);
promoCodeRouter.get("/all/:isActive", promoCodeController.getAllPromoCodeByStatus);

export default promoCodeRouter;