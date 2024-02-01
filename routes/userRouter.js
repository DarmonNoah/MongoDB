import express from "express";
import userController from "../controller/user.js";

const router = express.Router();

router.get("/", userController.getAll);

router.post("/", userController.create);

export default router;