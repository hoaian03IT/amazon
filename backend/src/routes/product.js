import express from "express";
import { productControl } from "../app/controllers/productController.js";

const router = express.Router();

router.get("/:id", productControl.getStockProduct);
router.get("/", productControl.getAllProducts);
router.get("/slug/:slug", productControl.getInfoProduct);

export default router;
