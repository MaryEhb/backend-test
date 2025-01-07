import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],    
    },
    password: { 
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        validate: {
            validator: function(v) {
              return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(v);
            },
            message: 'Password must contain at least one letter, one number, and one special character.'
        },
    },
    role: { 
        type: String,
        enum: ["admin", "user"], 
        default: "user" 
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

export default mongoose.model("User", userSchema);