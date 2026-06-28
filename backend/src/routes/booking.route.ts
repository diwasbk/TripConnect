import express from "express";
import BookingController from "../controllers/booking.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { bookingCancelSchema, bookingSchema } from "../types/booking.types";
import { optionalAuthMiddleware } from "../middlewares/auth.middleware";

const bookingRouter = express.Router();
const bookingController = new BookingController();

bookingRouter.post("/create/:packageId", optionalAuthMiddleware, schemaValidateMiddleware(bookingSchema), bookingController.createBookingByPackageId);
bookingRouter.get("/all/:status/:isGuest", bookingController.getAllBookingsByStatusAndGuestType);
bookingRouter.get("/booking-id/:bookingId", bookingController.getBookingByBookingId);
bookingRouter.get("/booking-reference/:bookingReference", bookingController.getBookingByBookingReference);
bookingRouter.get("/by-package-id/:packageId", bookingController.getAllBookingsByPackageId);
bookingRouter.get("/by-user-id/:userId", bookingController.getAllBookingsByUserId);
bookingRouter.put("/update-details/:bookingId", schemaValidateMiddleware(bookingSchema.partial()), bookingController.updateBookingDetailsByBookingId);
bookingRouter.patch("/update-status/:bookingId/:status", bookingController.updateBookingStatusByBookingId);
bookingRouter.delete("/delete/:bookingId", bookingController.deleteBookingByBookingId);
bookingRouter.patch("/cancel/:bookingId", schemaValidateMiddleware(bookingCancelSchema), bookingController.cancelBookingByBookingIdAndCancellationReason);

export default bookingRouter;