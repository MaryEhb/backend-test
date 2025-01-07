import express from "express";
import { body } from "express-validator";
import AuthController from "../controllers/authController.js";

const router = express.Router();

// POST route for login
router.post("/login", 
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password").notEmpty().withMessage("Please enter a password"),
    ], 
    AuthController.login
);

export default router;