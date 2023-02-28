import express from "express";
import { productControl } from "../app/controllers/productController.js";

const router = express.Router();

router.get("/", productControl.getAllProducts);
router.get("/slug/:slug", productControl.getInfoProductBySlug);
router.get("/id/:id", productControl.getInfoProductById);

export default router;
