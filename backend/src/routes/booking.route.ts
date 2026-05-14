import express from "express";
import BookingController from "../controllers/booking.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { bookingSchema } from "../types/booking.types";

const bookingRouter = express.Router();
const bookingController = new BookingController();

bookingRouter.post("/guest-user/:packageId", schemaValidateMiddleware(bookingSchema), bookingController.bookPackageForGuestUserByPackageId);

export default bookingRouter;