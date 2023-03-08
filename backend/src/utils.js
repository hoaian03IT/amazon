import jwt from "jsonwebtoken";

export const generateToken = (user) =>
    jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "4d",
    });
