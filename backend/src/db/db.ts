import mongoose from "mongoose";
import { MONGO_DB_URL } from "../config/config";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL);

        console.log("✅ MongoDB connected successfully");

    } catch (err: any) {
        console.error("❌ Database connection failed", err.message);

        process.exit(1);
    };
};

export default connectDB;