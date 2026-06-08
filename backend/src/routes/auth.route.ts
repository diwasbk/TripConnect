import express from "express";
import AuthController from "../controllers/auth.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { changePasswordSchema, loginSchema, requestPasswordResetEmailSchema, resetPasswordSchema, signupSchema } from "../types/auth.types";
import { jwtAuthMiddleware } from "../utils/jwt";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", schemaValidateMiddleware(signupSchema), authController.signupUser);
authRouter.post("/login", schemaValidateMiddleware(loginSchema), authController.loginUser);
authRouter.get("/whoami", jwtAuthMiddleware, authController.whoAmI);
authRouter.patch("/change-password", jwtAuthMiddleware, schemaValidateMiddleware(changePasswordSchema), authController.changePassword);
authRouter.delete("/delete-account", jwtAuthMiddleware, schemaValidateMiddleware(loginSchema.pick({ password: true })), authController.deleteUserAccount);
authRouter.post("/request-password-reset-email", schemaValidateMiddleware(requestPasswordResetEmailSchema), authController.requestPasswordResetEmail);
authRouter.patch("/reset-account-password", schemaValidateMiddleware(resetPasswordSchema), authController.resetAccountPassword);

export default authRouter;