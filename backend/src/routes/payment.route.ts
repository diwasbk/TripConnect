import express from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRouter = express.Router();
const paymentController = new PaymentController();

paymentRouter.get("/all/:paymentStatus", paymentController.getAllPaymentsByPaymentStatus);
paymentRouter.get("/:paymentId", paymentController.getPaymentByBookingId);
paymentRouter.patch("/update/:paymentId/:paymentStatus", paymentController.updatePaymentStatusByPaymentId);
paymentRouter.get("/esewa/initialize/:paymentId", paymentController.initializeEsewaPayment);
paymentRouter.get("/esewa/verify-payment", paymentController.verifyEsewaPayment);

export default paymentRouter;