import express, { Application } from "express";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import packageRouter from "./routes/package.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/api/uploads", express.static("uploads"))

app.use("/api/auth", authRouter);
app.use("/api/package", packageRouter);

export default app;