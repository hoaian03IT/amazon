import express from "express";
import { productController } from "../app/controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/slug/:slug", productController.getInfoProductBySlug);
router.get("/id/:id", productController.getInfoProductById);

export default router;
