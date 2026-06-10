import express from "express";
import BookingController from "../controllers/booking.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { bookingSchema } from "../types/booking.types";
import { optionalAuthMiddleware } from "../middlewares/auth.middleware";

const bookingRouter = express.Router();
const bookingController = new BookingController();

bookingRouter.post("/:packageId", optionalAuthMiddleware, schemaValidateMiddleware(bookingSchema), bookingController.bookPackageByPackageId);
bookingRouter.get("/all", bookingController.getAllBookingsByStatus);
bookingRouter.get("/:bookingId", bookingController.getBookingByBookingId);
bookingRouter.get("/booking-reference/:bookingReference", bookingController.getBookingByBookingReference);
bookingRouter.get("/by-package-id/:packageId", bookingController.getAllBookingsByPackageId);
bookingRouter.get("/by-user-id/:userId", bookingController.getAllBookingsByUserId);
bookingRouter.put("/update-details/:bookingId", schemaValidateMiddleware(bookingSchema.partial()), bookingController.updateBookingDetailsByBookingId);
bookingRouter.patch("/update-status/:bookingId/:status", bookingController.updateBookingStatusByBookingId);
bookingRouter.delete("/delete/:bookingId", bookingController.deleteBookingByBookingId);

export default bookingRouter;