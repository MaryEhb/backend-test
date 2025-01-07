import mongoose from "mongoose";
import Product from "../models/Product.js";
import { validationResult } from "express-validator";

class ProductController {
    // Get array of all products
    static getProducts = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const products = await Product.find().skip(skip).limit(limit);
            const productsCount = await Product.countDocuments();

            return res.status(200).json({ 
                products,
                productsCount,
                currentPage: page,
                totalPages: Math.ceil(productsCount / limit) 
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch products" });
        }
    }

    // Get product by ID
    static getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            
            // Check if the ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid product ID." });
            }

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            return res.status(200).json({ product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch product" });
        }
    }

    // Create a new product
    static createProduct = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, description, price, quantity } = req.body;

            const product = new Product({ name, description, price, quantity });
            await product.save();

            return res.status(201).json({ message: "Product created successfully", product });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create product" });
        }
    }

    // Update an existing product
    static updateProduct = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;

            // Check if the ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid product ID." });
            }

            const { name, category, price, quantity } = req.body;

            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            // Update only the provided fields
            if (name) product.name = name;
            if (category) product.category = category;
            if (price) product.price = price;
            if (quantity) product.quantity = quantity;

            await product.save();

            return res.status(200).json({ message: "Product updated successfully", product });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update product" });
        }
    }

    // Delete a product
    static deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;

            // Check if the ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid product ID." });
            }

            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            return res.status(200).json({ message: "Product deleted successfully" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete product" });
        }
    }
}

export default ProductController;