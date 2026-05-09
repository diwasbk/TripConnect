import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT as string;
export const MONGO_DB_URL = process.env.MONGO_DB_URL as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;