import app from "./app";
import { PORT } from "./config/config";
import connectDB from "./db/db";

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`✅ Server is running at http://localhost:${PORT}`);
        });

    } catch (err: any) {
        console.error("❌", "Failed to start server: ", err.message);

        process.exit(1);
    };
};

startServer();