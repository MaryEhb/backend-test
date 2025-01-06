import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = async () => {
    // Construct the URI from process.env variables
    const uri = process.env.USE_LOCAL_DB === "true"
        ? `mongodb://${process.env.LOCAL_DB_HOST || "localhost"}:${process.env.LOCAL_DB_PORT || 27017}/${process.env.LOCAL_DB_NAME || "product-inventory-api"}`
        : `mongodb://${process.env.REMOTE_DB_USER}:${process.env.REMOTE_DB_PASSWORD}@${process.env.REMOTE_DB_HOST}:${process.env.REMOTE_DB_PORT}/${process.env.REMOTE_DB_NAME}`;

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process with failure
    }
};

export default connectToDatabase;