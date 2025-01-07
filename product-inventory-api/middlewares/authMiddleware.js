import { verifyToken } from "../utils/jwtUtils.js";
import User from "../models/User.js";

// Middleware to check if the user is authenticated
export const authMiddleware = async (req, res, next) => {
    try {
        // Get the token from cookies or the Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Authentication required. No token provided." });
        }

        // Verify the token
        const decoded = verifyToken(token);

        if (!decoded || !decoded.email) {
            return res.status(401).json({ message: "Authentication required. Invalid token." });
        }

        // Fetch the user from the database
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "User not found. Please log in again." });
        }

        // Attach the user data to the request object for downstream handlers
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Please log in again." });
    }
}