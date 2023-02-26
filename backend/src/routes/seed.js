import express from "express";
import { productModel } from "../app/models/productModel.js";
import { userModel } from "../app/models/userModel.js";
import { data } from "../../data.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        await productModel.deleteMany();
        const createProducts = await productModel.insertMany(data.products);

        await userModel.deleteMany();
        const createUsers = await userModel.insertMany(data.users);

        res.status(200).send({ createProducts, createUsers });
    } catch (error) {
        res.status(400).send({ message: "Cannot create products and users" });
    }
});

export default router;
