import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CLIENT_URL, JWT_SECRET_KEY } from "../config/config";
import { sendEmail } from "../services/email";
import { generatePasswordResetEmail, generatePasswordUpdatedEmail } from "../templates/email.templates";

class AuthController {
    // Signup User
    signupUser = async (req: Request, res: Response) => {
        try {
            const { password, role, ...data } = req.body;

            const userExist = await UserModel.findOne({ email: data.email });

            if (userExist) {
                return res.status(400).send({
                    message: "This email is already in use!",
                    success: false
                });
            };

            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hash(password, salt);

            await UserModel.create({
                ...data,
                password: hash
            });

            res.status(201).send({
                message: "Signup successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Login User
    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const userExist = await UserModel.findOne({ email: email });

            if (!userExist) {
                return res.status(404).send({
                    message: "Invalid email or password!",
                    success: false
                });
            };

            const isPasswordMatch = await bcrypt.compare(password, userExist.password);

            if (!isPasswordMatch) {
                return res.status(401).send({
                    message: "Invalid email or password!",
                    success: false
                });
            };

            const payload = {
                id: userExist._id.toString(),
                email: userExist.email,
                role: userExist.role
            };

            const auth_token = generateToken(payload);

            res.cookie("auth_token", auth_token, {
                httpOnly: true,
                maxAge: 3000 * 1000,
                sameSite: "lax",
                secure: false
            });

            res.status(200).send({
                message: "Logged in successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: true
            });
        };
    };

    // Change Password
    changePassword = async (req: Request, res: Response) => {
        try {
            const { currentPassword, newPassword } = req.body;

            const user = req.user as { id: string };

            const userExist = await UserModel.findOne({ _id: user.id });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            const isPasswordMatch = await bcrypt.compare(currentPassword, userExist.password);

            if (!isPasswordMatch) {
                return res.status(401).send({
                    message: "Current password do not match!",
                    success: false
                });
            };

            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hash(newPassword, salt);

            await UserModel.findOneAndUpdate(
                { _id: user.id },
                { $set: { password: hash } }
            );

            res.clearCookie("auth_token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            res.status(200).send({
                message: "Password changed successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Request Password Reset Email
    requestPasswordResetEmail = async (req: Request, res: Response) => {
        try {
            const userExist = await UserModel.findOne({ email: req.body.email });

            if (!userExist) {
                return res.status(404).send({
                    message: "Something went wrong! Please try again later!",
                    success: false
                });
            };

            const token = await jwt.sign({ email: userExist.email }, JWT_SECRET_KEY, { expiresIn: "5m" })

            const resetUrl = `${CLIENT_URL}/reset-password?token=${token}`;

            await sendEmail(userExist.email, "Reset Your Password", generatePasswordResetEmail(userExist, resetUrl));

            res.status(200).send({
                message: "Password reset email send successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.response.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Reset Account Password
    resetAccountPassword = async (req: Request, res: Response) => {
        try {
            const { token, newPassword } = req.body;

            let decoded;

            try {
                decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload

            } catch (err: any) {
                return res.status(400).send({
                    message: "Invalid or expired token!",
                    success: false
                });
            };

            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hash(newPassword, salt);

            const userExist = await UserModel.findOneAndUpdate(
                { email: decoded.email },
                { $set: { password: hash } }
            );

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            await sendEmail(userExist.email, "Your password has been changed", generatePasswordUpdatedEmail(userExist));

            res.status(200).send({
                message: "Your password changed successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.response.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Delete User Account
    deleteUserAccount = async (req: Request, res: Response) => {
        try {
            const user = req.user as { id: string, role: string };

            const userExist = await UserModel.findOne({ _id: user.id });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            const isPasswordMatch = await bcrypt.compare(req.body.password, userExist.password)

            if (!isPasswordMatch) {
                return res.status(401).send({
                    message: "Password do not match!",
                    success: false
                });
            };

            await UserModel.findOneAndDelete({ _id: user.id });

            res.clearCookie("auth_token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            res.status(200).send({
                message: "User account deleted successfully!",
                success: true
            });

        } catch (err: any) {
            console.log(err);
            res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};

export default AuthController;