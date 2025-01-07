import { validationResult } from "express-validator";
import User from "../models/User.js";
import { createToken } from "../utils/jwtUtils.js";

class AuthController {
    // Login method
    static async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });

            // If user doesn't exist or password is incorrect
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Get JWT expiration from environment variables
            const { token, exp } = createToken({ email: user.email, role: user.role });

             // Set the token in an HTTP-only cookie
             res.cookie("token", token, {
                httpOnly: true,  // This ensures the cookie is not accessible via JavaScript
                secure: process.env.NODE_ENV === 'production',  // Set to true in production to not allow only HTTPS
                expires: new Date(exp * 1000),
                sameSite: 'Strict',  // Prevents CSRF attacks
            });

            res.status(200).json({ message: "Authentication successful" });

        } catch (error) {
            // console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default AuthController;