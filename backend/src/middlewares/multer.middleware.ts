import { Request } from "express";
import multer from "multer";

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, "uploads/packages");
    },
    filename: function (req: Request, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// Create and export multer upload middleware
export const upload = multer({ storage });