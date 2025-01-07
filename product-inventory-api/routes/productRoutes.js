import express from "express";
import { body } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import ProductController from "../controllers/productController.js";

const router = express.Router();

// if products are accessiable to public
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);

// if products are not accessiable until login
// router.get("/", authMiddleware, ProductController.getProducts);
// router.get("/:id", authMiddleware, ProductController.getProductById);

router.post("/",
    [
        body("name").isString().withMessage("Please enter a valid name"),
        body("category").optional().isString().withMessage("Please enter a valid category"),
        body("price").isNumeric().withMessage("Please enter a valid price"),
        body("quantity").isNumeric().withMessage("Please enter a valid quantity"),
    ], 
    authMiddleware,
    adminMiddleware, 
    ProductController.createProduct
);
router.put("/:id", 
    [
        body("name").optional().isString().withMessage("Please enter a valid name"),
        body("category").optional().isString().withMessage("Please enter a valid category"),
        body("price").optional().isNumeric().withMessage("Please enter a valid price"),
        body("quantity").optional().isNumeric().withMessage("Please enter a valid quantity"),
        body().custom((value, { req }) => {
            if (!req.body.name && !req.body.category && !req.body.price && !req.body.quantity) {
                throw new Error("At least one field (name, category, price, quantity) must be provided.");
            }
            return true;
        }),
    ],
    authMiddleware, 
    adminMiddleware,
    ProductController.updateProduct
);
router.delete("/:id", authMiddleware, adminMiddleware, ProductController.deleteProduct);

export default router;