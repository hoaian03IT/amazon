import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    try {
        const header = req.header("authorization"); // Bearer XXXX
        const token = header.slice(7, header.length);

        if (!token) return res.status(400).send({ message: "Invalid Authentication" });

        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(400).send({ message: "Invalid Authentication" });
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
