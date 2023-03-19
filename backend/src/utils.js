import jwt from "jsonwebtoken";

export const generateAccessToken = (user) =>
    jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });

export const generateRefreshToken = (user) =>
    jwt.sign({ id: user }, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
