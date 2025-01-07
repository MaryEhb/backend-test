// Middleware to check if the use is and admin
export const adminMiddleware = (req, res, next) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access forbidden: Admins only." });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};