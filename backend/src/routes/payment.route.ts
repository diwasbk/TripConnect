import express from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRouter = express.Router();
const paymentController = new PaymentController();

paymentRouter.post("/create/:bookingId", paymentController.createPaymentByBookingId);
paymentRouter.get("/all/:paymentStatus", paymentController.getAllPaymentsByPaymentStatus);
paymentRouter.get("/:paymentId", paymentController.getPaymentByPaymentId);
paymentRouter.patch("/:paymentStatus", paymentController.updatePaymentStatusByPaymentId);
paymentRouter.get("/esewa/initialize/:paymentId", paymentController.initializeEsewaPayment);
paymentRouter.get("/esewa/verify-payment/:paymentId", paymentController.verifyEsewaPayment);

export default paymentRouter;