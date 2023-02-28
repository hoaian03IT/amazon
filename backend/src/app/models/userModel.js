import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

export const userModel = mongoose.model("userModel", userSchema);
