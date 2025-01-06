import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    category: { 
        type: String,
        trim: true,
        enum: ['Electronics', 'Clothing', 'Home', 'Books', 'Toys', 'General'], // Limit valid categories which can be adjusted as needed
        default: 'General'
    },
    price: { 
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 0,
        max: 9999999999 // can be adjusted as needed
    },
    quantity: { 
        type: Number,
        required: true,
        min: 0,
        max: 999 // can be adjusted as needed
    }
}, { timestamps: true });

// for better performance
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

export default mongoose.model("Product", productSchema);