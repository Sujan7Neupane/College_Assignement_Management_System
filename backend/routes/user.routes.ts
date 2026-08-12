import express from "express";
import { getAllUsers, registerUser } from "../controllers/user.controllers.ts";

const router = express.Router();

// admin
router.get("/users", getAllUsers);

router.get("/register", registerUser);

export default router;
