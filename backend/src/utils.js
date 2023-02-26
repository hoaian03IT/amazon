import jwt from "jsonwebtoken";

export const generateToken = (user) =>
    jwt.sign({ ...user }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "4d",
    });
