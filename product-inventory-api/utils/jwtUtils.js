import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_DAYS = Number(process.env.JWT_EXPIRATION_DAYS) || 7;

// Function to create a JWT
export const createToken = (payload) => {
    const expiresIn = JWT_EXPIRATION_DAYS * 24 * 60 * 60; 
    const expTimestamp = Math.floor(Date.now() / 1000) + expiresIn; 
    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_DAYS * 24 * 60 * 60 });

    return { token, exp: expTimestamp };
};

// Function to verify a JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};