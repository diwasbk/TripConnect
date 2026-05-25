import express, { Application } from "express";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import packageRouter from "./routes/package.route";
import bookingRouter from "./routes/booking.route";
import promoCodeRouter from "./routes/promocode.route";
import paymentRouter from "./routes/payment.route";
import inquiryRouter from "./routes/inquiry.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/api/uploads/packages", express.static("uploads/packages"))

app.use("/api/auth", authRouter);
app.use("/api/package", packageRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/promocode", promoCodeRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/inquiry", inquiryRouter);

export default app;