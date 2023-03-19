import { query } from "express";
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

    async getCategories(req, res) {
        try {
            const categories = await productModel.find().distinct("category");
            res.status(200).send(categories);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async getSearchedProducts(req, res) {
        const PAGE_SIZE = 3;
        try {
            const {
                category = "",
                price = "",
                rating = "",
                order = "",
                query: searchQuery = "",
                page = 1,
                pageSize = PAGE_SIZE,
            } = req.query;

            const queryFilter =
                searchQuery && searchQuery !== "all"
                    ? {
                          name: {
                              $regex: searchQuery,
                              $options: "i",
                          },
                      }
                    : {};

            const categoryFilter = category && category !== "all" ? { category } : {};
            const ratingFilter = rating && rating !== "all" ? { rating: { $gte: Number(rating) } } : {};
            const priceFilter =
                price && price !== "all"
                    ? {
                          price: {
                              $gte: Number(price.split("-")[0]), // great
                              $lte: Number(price.split("-")[1]), // least
                          },
                      }
                    : {};
            const sortOrder =
                order === "featured"
                    ? { featured: -1 }
                    : order === "lowest"
                    ? { price: 1 }
                    : order === "highest"
                    ? { price: -1 }
                    : order === "toprated"
                    ? { rating: -1 }
                    : order === "newest"
                    ? { createAt: -1 }
                    : { _id: -1 };

            const products = await productModel
                .find({
                    ...queryFilter,
                    ...categoryFilter,
                    ...ratingFilter,
                    ...priceFilter,
                })
                .sort(sortOrder)
                .skip(pageSize * (page - 1))
                .limit(pageSize);

            const countProducts = await productModel.countDocuments({ ...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter });

            res.status(200).send({
                products,
                page,
                pages: Math.ceil(countProducts / pageSize),
                quantityProducts: countProducts,
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export const productController = new productClass();
