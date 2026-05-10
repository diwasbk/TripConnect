import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
import { NextFunction, Request, Response } from "express";

// Extend Request to include user
declare module "express" {
    interface Request {
        user?: string | JwtPayload
    }
};

// Payload type for token
interface tokenPayload {
    id: string,
    email: string,
    role: string
};

// Generate Token
const generateToken = (payload: tokenPayload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 60 * 60 }) // Token valid for 1 hour
};

// Verify Token
const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).send({
            message: "Unauthorized: No token provided!",
            success: false
        });
    };

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);

        req.user = data;

        next();

    } catch (err: any) {
        return res.status(401).send({
            message: "Unauthorized: Invalid or expired token!",
            success: false
        });
    };
};

export { generateToken, jwtAuthMiddleware };