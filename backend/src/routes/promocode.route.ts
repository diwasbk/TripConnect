import express from "express";
import PromoCodeController from "../controllers/promocode.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { promoCodeSchema } from "../types/promocode.types";

const promoCodeRouter = express.Router();
const promoCodeController = new PromoCodeController();

promoCodeRouter.post("/create", schemaValidateMiddleware(promoCodeSchema), promoCodeController.createPromoCode);
promoCodeRouter.get("/all/:isActive", promoCodeController.getAllPromoCodeByStatus);
promoCodeRouter.get("/:promoCodeId", promoCodeController.getPromoCodeByPromoCodeId);
promoCodeRouter.put("/update/:promoCodeId", schemaValidateMiddleware(promoCodeSchema.partial()), promoCodeController.updatePromoCodeByPromoCodeId);
promoCodeRouter.patch("/activate-deactivate/:promoCodeId/:isActive", promoCodeController.activateOrDeactivatePromoCodeByPromoCodeId);
promoCodeRouter.delete("/delete/:promoCodeId", promoCodeController.deletePromoCodeByPromoCodeId);

export default promoCodeRouter;