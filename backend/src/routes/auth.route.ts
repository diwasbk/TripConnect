import express from "express";
import AuthController from "../controllers/auth.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { changePasswordSchema, loginSchema, requestPasswordResetEmailSchema, resetPasswordSchema, signupSchema, updateUserSchema } from "../types/auth.types";
import { jwtAuthMiddleware } from "../utils/jwt";
import { isOwnerOrAdminAuthMiddleware } from "../middlewares/auth.middleware";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", schemaValidateMiddleware(signupSchema), authController.signupUser);
authRouter.post("/login", schemaValidateMiddleware(loginSchema), authController.loginUser);
authRouter.get("/whoami", jwtAuthMiddleware, authController.whoAmI);
authRouter.get("/user/all", authController.getAllUsers);
authRouter.get("/user/:userId", jwtAuthMiddleware, authController.getUserById);
authRouter.put("/user/update/:userId", jwtAuthMiddleware, schemaValidateMiddleware(updateUserSchema), authController.updateUserInfoById);
authRouter.patch("/change-password", jwtAuthMiddleware, schemaValidateMiddleware(changePasswordSchema), authController.changePassword);
authRouter.delete("/delete-account/:userId", jwtAuthMiddleware, isOwnerOrAdminAuthMiddleware, schemaValidateMiddleware(loginSchema.pick({ password: true })), authController.deleteUserAccountByUserId);
authRouter.post("/request-password-reset-email", schemaValidateMiddleware(requestPasswordResetEmailSchema), authController.requestPasswordResetEmail);
authRouter.patch("/reset-account-password", schemaValidateMiddleware(resetPasswordSchema), authController.resetAccountPassword);

export default authRouter;