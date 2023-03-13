import express from "express";

import { userController } from "../app/controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.post("/updateInfo", isAuth, userController.updateInfo);

export default router;
