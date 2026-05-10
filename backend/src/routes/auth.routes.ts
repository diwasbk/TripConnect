import express from "express";
import AuthController from "../controllers/auth.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { loginSchema, signupSchema } from "../types/auth.types";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", schemaValidateMiddleware(signupSchema), authController.signupUser);
authRouter.post("/login", schemaValidateMiddleware(loginSchema), authController.loginUser);

export default authRouter;