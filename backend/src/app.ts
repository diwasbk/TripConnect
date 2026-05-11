import express, { Application } from "express";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;