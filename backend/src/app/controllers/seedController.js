import data from "../../../data.js";
import { productModel } from "../models/productModel.js";
import { userModel } from "../models/userModel.js";

class seedClass {
    async async(req, res) {
        try {
            await productModel.deleteMany({});
            const createProducts = await productModel.insertMany(data.products);

            await userModel.deleteMany({});
            const createUsers = await userModel.insertMany(data.users);

            res.status(200).send({ createProducts, createUsers });
        } catch (error) {
            res.status(400).send({ message: "Cannot create products and users" });
        }
    }
}

export const seedController = new seedClass();
