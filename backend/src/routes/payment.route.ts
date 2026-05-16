import express from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRouter = express.Router();
const paymentController = new PaymentController();

paymentRouter.post("/create/:bookingId", paymentController.createPaymentByBookingId);

export default paymentRouter;