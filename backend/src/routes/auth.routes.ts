import express from "express";
import AuthController from "../controllers/auth.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { changePasswordSchema, loginSchema, signupSchema } from "../types/auth.types";
import { jwtAuthMiddleware } from "../utils/jwt";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", schemaValidateMiddleware(signupSchema), authController.signupUser);
authRouter.post("/login", schemaValidateMiddleware(loginSchema), authController.loginUser);
authRouter.post("/login", schemaValidateMiddleware(loginSchema), authController.loginUser);
authRouter.patch("/change-password", schemaValidateMiddleware(changePasswordSchema), jwtAuthMiddleware, authController.changePassword);

export default authRouter;