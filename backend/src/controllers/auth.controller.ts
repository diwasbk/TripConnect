import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

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
};

export default AuthController;