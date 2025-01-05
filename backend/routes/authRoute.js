import express from "express";
import { signup, signin, signOut } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signOut);

export default router;
