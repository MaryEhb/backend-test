import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import connectToDatabase from "./config/db.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

// Create Express app
const app = express();
app.use(cookieParser());
app.use(express.json());

// Enable CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Allow requests from all origins (in production this will be changed to specific origins)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers to be sent to limit access to sensitive Data
    credentials: true, // This allow credentials as cookies, authentication tokens, etc
};
app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});