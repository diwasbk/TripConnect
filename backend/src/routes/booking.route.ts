import express from "express";
import BookingController from "../controllers/booking.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { bookingSchema } from "../types/booking.types";
import { jwtAuthMiddleware } from "../utils/jwt";

const bookingRouter = express.Router();
const bookingController = new BookingController();

bookingRouter.post("/guest-user/:packageId", schemaValidateMiddleware(bookingSchema), bookingController.bookPackageForGuestUserByPackageId);
bookingRouter.post("/registered-user/:packageId", jwtAuthMiddleware, schemaValidateMiddleware(bookingSchema.pick({ travelDate: true, noOfTravellers: true })), bookingController.bookPackageForRegisteredUserByPackageId);
bookingRouter.get("/all", bookingController.getAllBookingsByStatus);

export default bookingRouter;