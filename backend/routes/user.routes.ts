import express from "express";
import { getAllUsers, registerUser } from "../controllers/user.controllers.ts";

const router = express.Router();

// admin
router.get("/users", getAllUsers);

router.post("/register", registerUser);

export default router;
