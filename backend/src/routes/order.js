import express from "express";
import { orderController } from "../app/controllers/orderController.js";

import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/", isAuth, orderController.createOrder);
router.post("/:id/pay", isAuth, orderController.payOrder);
router.get("/mine", isAuth, orderController.getAllOrderByUser);
router.get("/:id", isAuth, orderController.getOrder);
router.delete("/destroyAll", orderController.destroyAll);

export default router;
