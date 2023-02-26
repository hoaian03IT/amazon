import express from "express";
import { productControl } from "../app/controllers/productController.js";

const router = express.Router();

router.get("/", productControl.getAllProducts);
router.get("/slug/:slug", productControl.getInfoProduct);
router.get("/:id", productControl.getInfoProduct);

export default router;
