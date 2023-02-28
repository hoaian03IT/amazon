import { productModel } from "../models/productModel.js";

class productClass {
    async getAllProducts(req, res) {
        try {
            const products = await productModel.find();
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send({ message: "Fetch all products failed" });
        }
    }

    async getInfoProductBySlug(req, res) {
        try {
            const slug = req.params.slug;
            const product = await productModel.findOne({ slug });

            if (product) res.status(200).send(product);
            else res.status(400).send({ message: "Product not found" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async getInfoProductById(req, res) {
        try {
            const _id = req.params.id;
            const product = await productModel.findById(_id);

            res.status(200).send(product);
        } catch (error) {
            res.status(400).send({ message: "Product not found" });
        }
    }
}

export const productControl = new productClass();
