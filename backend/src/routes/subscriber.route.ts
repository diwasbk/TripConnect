import express from "express";
import SubscriberController from "../controllers/subscriber.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { subscriberSchema } from "../types/subscriber.types";

const subscriberRouter = express.Router();
const subscriberController = new SubscriberController();

subscriberRouter.post("/create", schemaValidateMiddleware(subscriberSchema), subscriberController.createSubscriber);
subscriberRouter.get("/all/:status", subscriberController.getAllSubscribersByStatus);
subscriberRouter.get("/update-status/:email/:status", subscriberController.updateSubscriberStatusByEmail);
subscriberRouter.delete("/delete/:subscriberId", subscriberController.deleteSubscriberById);

export default subscriberRouter;