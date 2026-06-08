import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";

// Optional Authentication
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth_token;
        
        if (!token) {
            req.user = null;
            return next();
        };

        const data = jwt.verify(token, JWT_SECRET_KEY);

        req.user = data;

        next();
    } catch {
        req.user = null;
        next();
    }
};