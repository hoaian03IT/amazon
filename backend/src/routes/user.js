import express from "express";

import { userController } from "../app/controllers/userController.js";

const router = express.Router();

router.post("/signin", userController.signIn);

export default router;
