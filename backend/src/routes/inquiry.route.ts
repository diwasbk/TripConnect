import express from "express";
import InquiryController from "../controllers/inquiry.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { inquiryReplySchema, inquirySchema } from "../types/inquiry.types";

const inquiryRouter = express.Router();
const inquiryController = new InquiryController();

inquiryRouter.post("/send", schemaValidateMiddleware(inquirySchema), inquiryController.sendInquiry);
inquiryRouter.get("/all", inquiryController.getAllInquiries);
inquiryRouter.patch("/reply/:inquiryId", schemaValidateMiddleware(inquiryReplySchema), inquiryController.replyInquiry);

export default inquiryRouter;