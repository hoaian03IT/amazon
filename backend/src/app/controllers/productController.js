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

    async getInfoProduct(req, res) {
        try {
            let product;
            const _id = req.params.id;
            const slug = req.params.slug;
            if (_id) {
                product = await productModel.findById(_id);
            } else {
                product = await productModel.findOne({ slug });
            }
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send({ message: "Product not found" });
        }
    }
}

export const productControl = new productClass();
